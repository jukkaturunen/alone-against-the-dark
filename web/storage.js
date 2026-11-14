import { validateSave } from './engine.js';
const KEY='aatd.dossiers.v1';
export function loadLibrary(storage=localStorage){
 const raw=storage.getItem(KEY);if(!raw)return {active:null,games:[]};
 const data=JSON.parse(raw);if(!data||data.version!==1||!Array.isArray(data.games)||data.games.length>30||!data.games.every(validateSave))throw new Error('The saved dossiers could not be read. Your browser copy has not been overwritten.');
 if(new Set(data.games.map(g=>g.id)).size!==data.games.length)throw new Error('Duplicate dossiers in browser storage.');
 return {active:data.games.some(g=>g.id===data.active)?data.active:null,games:data.games};
}
export function saveLibrary(library,storage=localStorage){storage.setItem(KEY,JSON.stringify({version:1,...library}));}
export function exportSave(game){if(!validateSave(game))throw new Error('Cannot export an invalid save.');return JSON.stringify({format:'aatd-save',version:1,game},null,2);}
export function importSave(raw){if(raw.length>1000000)throw new Error('That save file is too large.');const data=JSON.parse(raw);if(data?.format!=='aatd-save'||data.version!==1||!validateSave(data.game))throw new Error('This is not a valid opening-chapter save.');return structuredClone(data.game);}
