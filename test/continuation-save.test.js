import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { act, actions, canLeaveLocation, luckCost, resolveRoll, validateSave } from '../web/engine.js';
import { exportSave, importSave, loadLibrary, saveLibrary } from '../web/storage.js';

const KEY='aatd.dossiers.v1';
const BACKUP_V1='aatd.dossiers.backup-before-v2';
const BACKUP_V3='aatd.dossiers.backup-before-v3';
const legacy=JSON.parse(readFileSync(new URL('./fixtures/v1-pending.json',import.meta.url),'utf8'));
const at=(day,hour)=>Date.UTC(1931,8,day,hour);
const portable=game=>JSON.stringify({format:'aatd-save',version:game.version,game});
const originalLibrary=(...games)=>JSON.stringify({version:games[0].version,active:games[0].id,games},null,2)+'\n';

function memory(raw, backupV1) {
 const values=new Map([[KEY,raw],[BACKUP_V1,backupV1]]);
 return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
}

function openingDossier(overrides) {
 const baseline=structuredClone(legacy.game);
 return {
  ...baseline,version:2,id:'opening',mythos:0,time:at(2,6),location:'home',entry:102,
  pending:null,attempts:{},log:baseline.log.slice(0,3),visited:[13,102],...overrides
 };
}

function legacyDossiers() {
 return {
  rest:openingDossier({
   id:'rest',time:at(3,4),phase:'complete',flags:{telegramRead:true,endReason:'rest'},
   meals:[at(2,19)],attempts:{'news-library':1,'door-locksmith':1},clues:['telegram','mylonas'],
   visited:[13,102,60,113,90,28],hp:8,
  }),
  depot:openingDossier({
   id:'depot',time:at(2,23),phase:'complete',flags:{telegramRead:true,endReason:'dayEnd'},
   location:'depot',entry:16,visited:[13,102,16],
  }),
  harding:openingDossier({
   id:'harding',time:at(2,23),phase:'complete',flags:{telegramRead:true,endReason:'dayEnd'},
   location:'harding',entry:150,visited:[13,102,113,67,150],
  }),
  pending:openingDossier({
   id:'pending',time:at(2,20),location:'harding',entry:28,visited:[13,102,90,28],
   attempts:{'door-mechanical':1},
   pending:{id:'door-mechanical',roll:10,base:10,target:5,skill:'Mechanical Repair',difficulty:'Hard',duration:0,level:'Regular success'},
  }),
  boston:openingDossier({
   id:'boston',time:at(2,10),phase:'complete',flags:{telegramRead:true,endReason:'boston'},
   location:'boston',entry:64,visited:[13,102,16,64],
  }),
  ending:openingDossier({
   id:'ending',time:at(2,9),phase:'ending',location:'university',entry:574,visited:[13,102,82,100,574],
  }),
 };
}

test('portable and browser migration preserve the version 1 pending roll and Luck cost',()=>{
 const browser=memory(originalLibrary(legacy.game));
 const migrated=importSave(JSON.stringify(legacy));
 assert.deepEqual(loadLibrary(browser).games[0],migrated);
 assert.equal(migrated.version,12);
 assert.equal(migrated.time,legacy.game.time);
 assert.equal(migrated.notes,legacy.game.notes);
 assert.equal(migrated.pending.roll,84);
 assert.equal(migrated.pending.target,80);
 assert.equal(luckCost(migrated),4);
 const resolved=resolveRoll(migrated,true);
 assert.equal(resolved.luck,46);
 assert(resolved.clues.includes('mylonas'));
 const legacyResolved={
  ...legacy.game, pending:null, luck:46, clues:resolved.clues,
  lastRoll:{...legacy.game.pending,adjusted:80,spent:4,success:true,level:'Regular success'},
 };
 assert.deepEqual(importSave(portable(legacyResolved)).lastRoll,resolved.lastRoll);
 assert.deepEqual(importSave(exportSave(migrated)),migrated);
 assert.equal(browser.getItem(BACKUP_V1),originalLibrary(legacy.game));
 assert.equal(browser.getItem(BACKUP_V3),originalLibrary(legacy.game));
});

test('portable and browser migration reopen the version 2 checkpoints at their saved times',()=>{
 const before=legacyDossiers();
 const originals=Object.values(before);
 const raw=originalLibrary(...originals);
 const browser=memory(raw,originalLibrary(legacy.game));
 const library=loadLibrary(browser);
 const portableCopies=originals.map(game=>importSave(portable(game)));
 assert.deepEqual(library.games,portableCopies);
 assert.equal(library.active,before.rest.id);

 const [rest,depot,harding,pending,boston,ending]=library.games;
 assert.equal(rest.phase,'playing');
 assert.equal(rest.location,'home');
 assert.equal(rest.entry,102);
 assert.equal(rest.time,at(3,4));
 assert.equal(rest.sleep,8);
 assert.equal(rest.sleepDebt,0);
 assert.equal(rest.mealDebt,1);
 assert.equal(rest.hp,before.rest.hp);
 assert.equal(rest.attempts['door-locksmith'],1);
 assert.equal(rest.attempts['news-library'],undefined);
 assert.deepEqual(rest.clues,before.rest.clues);
 assert.deepEqual(rest.meals,before.rest.meals);
 assert.deepEqual(rest.log.slice(0,before.rest.log.length),before.rest.log);
 assert(actions(rest).some(action=>action.id==='eat'&&!action.disabled));

 assert.equal(depot.phase,'playing');
 assert.equal(depot.time,at(2,23));
 assert.equal(depot.entry,16);
 assert.equal(act(act(depot,'wait'),'train-9').time,at(3,10));

 assert.equal(harding.phase,'playing');
 assert.equal(harding.time,at(2,23));
 assert(!canLeaveLocation(harding));
 const exited=resolveRoll(act(harding,'room-exit',()=>1));
 assert(canLeaveLocation(exited));
 const caught=importSave(portable({...before.harding,flags:{...before.harding.flags,caughtOnEntry:true}}));
 assert.deepEqual(actions(caught).map(action=>action.id),['caught']);
 assert.equal(act(caught,'caught').entry,51);

 assert.equal(pending.phase,'playing');
 assert.equal(pending.time,before.pending.time);
 assert.deepEqual(pending.pending,before.pending.pending);
 assert.equal(luckCost(pending),5);
 assert.equal(resolveRoll(pending,true).luck,45);

 for(const reopened of [rest,depot,harding]) {
  assert.equal(reopened.flags.endReason,undefined);
 }
 assert.equal(boston.phase,'playing');
 assert.equal(boston.entry,64);
 assert.equal(boston.time,before.boston.time);
 assert.equal(act(boston,'rail-grandCentral-10').entry,146);
 assert.equal(ending.phase,'ending');
 assert.equal(ending.entry,574);
 assert.deepEqual(actions(ending),[]);
 assert(library.games.every(validateSave));

 assert.equal(browser.getItem(KEY),raw);
 assert.equal(browser.getItem(BACKUP_V3),raw);
 saveLibrary(library,browser);
 assert.equal(JSON.parse(browser.getItem(KEY)).version,12);
 assert.equal(browser.getItem(BACKUP_V1),originalLibrary(legacy.game));
 assert.equal(browser.getItem(BACKUP_V3),raw);
 assert.deepEqual(loadLibrary(browser),library);
 for(const game of library.games) {
  const exported=exportSave(game);
  assert.equal(JSON.parse(exported).version,12);
  assert.deepEqual(importSave(exported),game);
 }
});

test('a direct upgrade write backs up the source and a failed backup preserves the old library',()=>{
 const rest=legacyDossiers().rest;
 const raw=originalLibrary(rest);
 const library={active:rest.id,games:[importSave(portable(rest))]};
 const unblocked=memory(raw);
 saveLibrary(library,unblocked);
 assert.equal(unblocked.getItem(BACKUP_V3),raw);
 assert.equal(JSON.parse(unblocked.getItem(KEY)).version,12);

 const original=memory(raw);
 const blocked={
  getItem:key=>original.getItem(key),
  setItem(key,value) {
   if(key===BACKUP_V3) throw new Error('Storage quota exceeded.');
   original.setItem(key,value);
  }
 };
 assert.throws(()=>loadLibrary(blocked),/A backup could not be saved/);
 assert.throws(()=>saveLibrary(library,blocked),/A backup could not be saved/);
 assert.equal(blocked.getItem(KEY),raw);
});

test('reject invalid legacy records and unknown versions without touching browser storage',()=>{
 const rest=legacyDossiers().rest;
 const examples=[
  {...rest,time:at(4,4)},
  {...rest,meals:[at(2,6),at(2,12),at(2,18)]},
  {...rest,flags:{endReason:'unknown'}},
  {...rest,version:99},
 ];
 for(const game of examples) {
  const raw=originalLibrary(game);
  const browser=memory(raw);
  const library={active:rest.id,games:[importSave(portable(rest))]};
  assert.throws(()=>importSave(portable(game)));
  assert.throws(()=>loadLibrary(browser));
  assert.throws(()=>saveLibrary(library,browser));
  assert.equal(browser.getItem(KEY),raw);
  assert.equal(browser.getItem(BACKUP_V3),null);
 }
 assert.throws(()=>importSave(JSON.stringify({format:'aatd-save',version:3,game:rest})));
});

test('v0.3 Boston checkpoint reopens and browser preserves the old library',()=>{
 const {boston}=legacyDossiers();
 const v3={...boston,version:3,mealDebt:0,fastingToday:false,sleepDebt:0,sleptNight:at(1,0)};
 const raw=originalLibrary(v3), store=memory(raw);
 const upgraded=loadLibrary(store);
 assert.equal(upgraded.games[0].phase,'playing');
 assert.equal(upgraded.games[0].time,v3.time);
 assert.equal(store.getItem('aatd.dossiers.backup-before-v4'),raw);
 saveLibrary(upgraded,store);
 assert.deepEqual(loadLibrary(store),upgraded);
});
