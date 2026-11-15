import { VERSION, validateSave, migrateSave } from './engine.js';

const KEY='aatd.dossiers.v1';
const BACKUP_V1='aatd.dossiers.backup-before-v2';
const BACKUP_V3='aatd.dossiers.backup-before-v3';
const BACKUP_V4='aatd.dossiers.backup-before-v4';
const BACKUP_V5='aatd.dossiers.backup-before-v5';
const BACKUP_V6='aatd.dossiers.backup-before-v6';
const SUPPORTED_VERSIONS=[1,2,3,4,5,VERSION];
const LIBRARY_ERROR='The saved dossiers could not be read. Your browser copy has not been overwritten.';

function parseLibrary(raw) {
 let data;
 try { data=JSON.parse(raw); }
 catch { throw new Error(LIBRARY_ERROR); }
 if(!data||!SUPPORTED_VERSIONS.includes(data.version)||!Array.isArray(data.games)||data.games.length>30) throw new Error(LIBRARY_ERROR);
 if(data.games.some(game=>game?.version!==data.version)) throw new Error(LIBRARY_ERROR);
 return data;
}

function checkUniqueIds(games) {
 if(new Set(games.map(g=>g.id)).size!==games.length) throw new Error('Duplicate dossiers in browser storage.');
}

function readGames(data) {
 const games=data.games.map(migrateSave);
 checkUniqueIds(games);
 return games;
}

function backUpLibrary(data,raw,storage) {
 if(data.version===VERSION) return;
 try {
  if(data.version===1&&storage.getItem(BACKUP_V1)==null) storage.setItem(BACKUP_V1,raw);
  const backup=data.version<=2?BACKUP_V3:data.version===3?BACKUP_V4:data.version===4?BACKUP_V5:BACKUP_V6;
  if(storage.getItem(backup)==null) storage.setItem(backup,raw);
 }
 catch { throw new Error('A backup could not be saved before upgrading. Free browser storage or export your old dossier first.'); }
}

export function loadLibrary(storage=localStorage) {
 const raw=storage.getItem(KEY);
 if(raw==null) return {active:null,games:[]};
 const data=parseLibrary(raw);
 const games=readGames(data);
 backUpLibrary(data,raw,storage);
 return {active:games.some(g=>g.id===data.active)?data.active:null,games};
}

export function saveLibrary(library,storage=localStorage) {
 if(!Array.isArray(library?.games)||library.games.length>30||!library.games.every(validateSave)) throw new Error('The saved dossiers failed validation.');
 checkUniqueIds(library.games);
 const raw=storage.getItem(KEY);
 if(raw!=null) {
  const data=parseLibrary(raw);
  if(data.version===VERSION) {
   if(!data.games.every(validateSave)) throw new Error(LIBRARY_ERROR);
   checkUniqueIds(data.games);
  } else {
   readGames(data);
   backUpLibrary(data,raw,storage);
  }
 }
 storage.setItem(KEY,JSON.stringify({version:VERSION,active:library.active,games:library.games}));
}

export function exportSave(game) {
 if(!validateSave(game)) throw new Error('Cannot export an invalid save.');
 return JSON.stringify({format:'aatd-save',version:VERSION,game},null,2);
}

export function importSave(raw) {
 if(raw.length>1000000) throw new Error('That save file is too large.');
 const data=JSON.parse(raw);
 if(data?.format!=='aatd-save'||!SUPPORTED_VERSIONS.includes(data.version)||data.game?.version!==data.version) throw new Error('This is not a supported dossier save.');
 return migrateSave(data.game);
}
