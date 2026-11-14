import { validateSave, migrateSave } from './engine.js';
const KEY='aatd.dossiers.v1';
const BACKUP='aatd.dossiers.backup-before-v2';
export function loadLibrary(storage=localStorage) {
 const raw=storage.getItem(KEY);
 if(!raw) return {active:null,games:[]};
 const data=JSON.parse(raw);
 if(!data||![1,2].includes(data.version)||!Array.isArray(data.games)||data.games.length>30) throw new Error('The saved dossiers could not be read. Your browser copy has not been overwritten.');
 const games=data.games.map(migrateSave);
 if(new Set(games.map(g=>g.id)).size!==games.length) throw new Error('Duplicate dossiers in browser storage.');
 if(data.version===1) {
  try { storage.setItem(BACKUP,raw); }
  catch { throw new Error('A backup could not be saved before upgrading. Free browser storage or export your old dossier first.'); }
 }
 return {active:games.some(g=>g.id===data.active)?data.active:null,games};
}
export function saveLibrary(library,storage=localStorage) {
 if(!library.games.every(validateSave)) throw new Error('The saved dossiers failed validation.');
 storage.setItem(KEY,JSON.stringify({version:2,...library}));
}
export function exportSave(game) {
 if(!validateSave(game)) throw new Error('Cannot export an invalid save.');
 return JSON.stringify({format:'aatd-save',version:2,game},null,2);
}
export function importSave(raw) {
 if(raw.length>1000000) throw new Error('That save file is too large.');
 const data=JSON.parse(raw);
 if(data?.format!=='aatd-save'||![1,2].includes(data.version)||data.game?.version!==data.version) throw new Error('This is not a supported dossier save.');
 return migrateSave(data.game);
}
