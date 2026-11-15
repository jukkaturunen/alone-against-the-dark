import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,validAllocation,act,travel,actions,resolveRoll,luckCost,successLevel,validateSave,MORNING,clock,travelOptions} from '../web/engine.js';
import {SUGGESTED} from '../web/data.js';
import {exportSave,importSave,loadLibrary,saveLibrary} from '../web/storage.js';
const fresh=()=>newGame('test-dossier','Test',SUGGESTED);
const morning=()=>act(act(fresh(),'telegram'),'begin');
const wait=(s,n)=>{for(let i=0;i<n;i++)s=act(s,'wait');return s;};
const news=()=>travel(wait(morning(),1),'newspaper');
const memory=()=>{const values=new Map();return {getItem:k=>values.get(k),setItem:(k,s)=>values.set(k,s)};};
test('creation requires exactly 150 points and validates every skill',()=>{assert(validAllocation(SUGGESTED));assert.throws(()=>newGame('x','x',{}));assert(!validAllocation({...SUGGESTED,'Fake':1}));assert(!validAllocation({'Library Use':150}));assert(!validAllocation({...SUGGESTED,'Library Use':19.5}));assert(validateSave(fresh()));});
test('opening gates travel and unlocks only the telegram',()=>{const s=fresh();assert.throws(()=>travel(s,'bank'));assert.throws(()=>act(s,'begin'));const read=act(s,'telegram');assert.deepEqual(read.clues,['telegram']);assert.equal(s.clues.length,0);const next=act(read,'begin');assert.equal(next.time,MORNING);assert.equal(next.entry,102);assert.equal(next.sleep,8);assert(validateSave(next));});
test('bank arrival must be within opening hours and withdrawal cannot duplicate cash',()=>{let s=morning();assert.throws(()=>travel(s,'bank'));s=travel(wait(s,2),'bank');assert.equal(clock(s.time),'9:00 AM');s=act(s,'withdraw');assert.equal(s.cash,2200);assert.equal(s.bank,0);assert.throws(()=>act(s,'withdraw'));assert(validateSave(s));});
test('travel is one hour and distant destinations do not change state',()=>{const s=news();assert.equal(clock(s.time),'8:00 AM');assert.throws(()=>travel(s,'grandCentral'));assert.throws(()=>travel(s,'newspaper'));assert.equal(s.entry,60);});
test('research consumes an hour, locks movement, and persists pending roll',()=>{const s=news(),rolled=act(s,'news-library',()=>84);assert.equal(rolled.time-s.time,3600000);assert.equal(rolled.pending.roll,84);assert.throws(()=>act(rolled,'news-library',()=>1));assert.throws(()=>travel(rolled,'home'));const copy=importSave(exportSave(rolled));assert.equal(copy.pending.roll,84);assert(validateSave(copy));});
test('Luck changes a failed skill roll and permanently reduces Luck',()=>{const s=act(news(),'news-library',()=>84);assert.equal(luckCost(s),4);const result=resolveRoll(s,true);assert.equal(result.luck,46);assert(result.clues.includes('mylonas'));assert.equal(result.lastRoll.level,'Regular success');assert.equal(result.lastRoll.adjusted,80);assert(validateSave(result));assert.throws(()=>resolveRoll(result));});
test('failed newspaper check cannot be retried or reveal the clue',()=>{const s=resolveRoll(act(news(),'news-library',()=>90));assert(!s.clues.includes('mylonas'));assert.throws(()=>act(s,'news-library',()=>1));assert.equal(s.attempts['news-library'],1);});
test('Luck rolls and fumbles cannot be bought off',()=>{const luck=act(news(),'news-luck',()=>60);assert.equal(luckCost(luck),null);assert.throws(()=>resolveRoll(luck,true));const fumble=act(news(),'news-library',()=>100);assert.equal(luckCost(fumble),null);assert.throws(()=>resolveRoll(fumble,true));});
test('percentile success thresholds and fumbles',()=>{assert.equal(successLevel(1,80),'Critical success');assert.equal(successLevel(16,80),'Extreme success');assert.equal(successLevel(40,80),'Hard success');assert.equal(successLevel(80,80),'Regular success');assert.equal(successLevel(81,80),'Failure');assert.equal(successLevel(96,49),'Fumble');assert.equal(successLevel(96,50),'Failure');assert.equal(successLevel(100,99),'Fumble');});
test('Miskatonic explicitly permits repeat hourly checks after failure',()=>{let s=travel(wait(morning(),2),'university');s=act(s,'library');s=resolveRoll(act(s,'library-use',()=>95));s=resolveRoll(act(s,'library-use',()=>1));assert(s.clues.includes('museum'));assert.equal(s.attempts['library-use'],2);assert.equal(clock(s.time),'11:00 AM');assert(validateSave(s));});
test('library research can finish at closing but cannot start at closing',()=>{let s=travel(wait(morning(),2),'university');s=act(s,'library');s=wait(s,11);s=resolveRoll(act(s,'library-use',()=>95));assert.equal(clock(s.time),'9:00 PM');assert.throws(()=>act(s,'library-use',()=>1));});
test('meals take one hour with six hours between start times',()=>{let s=act(morning(),'eat');assert.equal(clock(s.time),'7:00 AM');assert.throws(()=>act(s,'eat'));s=wait(s,5);s=act(s,'eat');assert.equal(s.meals.length,2);assert.equal(clock(s.time),'1:00 PM');assert.throws(()=>act(s,'eat'));assert(validateSave(s));});
test('Dean branch funds tickets without granting spendable cash',()=>{let s=travel(wait(morning(),1),'university');s=act(s,'dean');assert.throws(()=>travel(s,'home'));s=act(s,'resign');assert.equal(s.entry,186);assert.equal(s.flags.ticketFunded,true);assert.equal(s.cash,0);assert(validateSave(s));});
test('abandonment is an ending and not an investigator death',()=>{const s=act(act(travel(wait(morning(),1),'university'),'dean'),'abandon');assert.equal(s.phase,'ending');assert.equal(s.entry,574);assert.equal(actions(s).length,0);assert(validateSave(s));});
test('train includes waiting time and arrives in Boston without charging local travel again',()=>{let s=travel(morning(),'depot');s=act(s,'train-9');assert.equal(clock(s.time),'10:00 AM');assert.equal(s.entry,64);assert.equal(s.location,'boston');assert.equal(s.phase,'playing');assert(validateSave(s));});
test('sleep at home wakes on the next day with meals due and further choices',()=>{
 const awake=act(wait(morning(),14),'rest');
 assert.equal(awake.phase,'playing');
 assert.equal(awake.time,Date.UTC(1931,8,3,4));
 assert.equal(awake.mealDebt,2);
 assert(validateSave(awake));
 assert(actions(awake).find(a=>a.id==='rest').disabled);
 assert.deepEqual(importSave(exportSave(awake)),awake);
});
test('export/import restores progress, notes, evidence, and pending results',()=>{const s=act(news(),'news-library',()=>84);s.notes='<script>not executable</script>';const result=importSave(exportSave(s));assert.deepEqual(result,s);});
test('reject malformed and incompatible saves without mutating library',()=>{const s=fresh();assert.throws(()=>importSave(JSON.stringify({format:'aatd-save',version:99,game:s})));assert.throws(()=>importSave(JSON.stringify({format:'aatd-save',version:1,game:{...s,time:0}})));assert(!validateSave({...s,location:'nope'}));assert(!validateSave({...s,notes:42}));assert(!validateSave({...s,meals:[MORNING,MORNING+3600000]}));assert(!validateSave({...s,clues:['spoiler']}));});
test('browser library round-trips separate investigations',()=>{const store=memory(),s=fresh(),other=newGame('second','Second',SUGGESTED);saveLibrary({active:other.id,games:[s,other]},store);const loaded=loadLibrary(store);assert.equal(loaded.active,'second');assert.equal(loaded.games.length,2);});
test('corrupt browser state remains intact rather than being overwritten',()=>{const store=memory();store.setItem('aatd.dossiers.v1','invalid');assert.throws(()=>loadLibrary(store));assert.equal(store.getItem('aatd.dossiers.v1'),'invalid');});
test('wait at the depot past midnight and catch the following day’s train',()=>{
 let s=wait(travel(morning(),'depot'),17);
 assert.equal(s.time,Date.UTC(1931,8,3));
 s=act(s,'train-9');
 assert.equal(s.time,Date.UTC(1931,8,3,10));
 assert.equal(s.location,'boston');
 assert(validateSave(s));
});
test('university library remains reachable after department offices close',()=>{let s=wait(morning(),11);s=travel(s,'university');assert.equal(clock(s.time),'6:00 PM');assert(actions(s).find(a=>a.id==='dean').disabled);s=act(s,'library');assert.equal(s.entry,145);assert(!actions(s).find(a=>a.id==='library-use').disabled);});

test('daily research failures reset, successful discoveries persist',()=>{
 let s=resolveRoll(act(news(),'news-library',()=>99));
 s=resolveRoll(act(s,'news-luck',()=>1));
 s=wait(s,22);
 assert(!actions(s).find(a=>a.id==='news-library').disabled);
 assert(actions(s).find(a=>a.id==='news-luck').disabled);
 assert(s.clues.includes('device'));
});

test('meal spacing survives midnight and missed sleep increases the next block',()=>{
 let s=act(wait(morning(),16),'eat');
 s=wait(s,2);
 assert.equal(s.mealDebt,1);
 assert(actions(s).find(a=>a.id==='eat').disabled);
 s=wait(s,19);
 assert.equal(s.sleepDebt,8);
 s=act(s,'rest');
 assert.equal(s.sleep,16);
 assert.equal(s.sleepDebt,0);
 assert.equal(s.time,Date.UTC(1931,8,4,12));
 assert(validateSave(s));
});

test('two substitute meal periods cost one health on the same date',()=>{
 let s=travel(morning(),'depot');
 s=act(s,'fast-rest');
 s=act(wait(s,5),'fast-rest');
 assert.equal(s.hp,8);
 assert.equal(s.meals.length,2);
 s=wait(s,10);
 assert.equal(s.mealDebt,0);
 assert.equal(s.hp,8);
 assert(validateSave(s));
});

test('Saturday library opens independently of faculty office hours',()=>{
 let s=travel(wait(morning(),75),'university');
 assert.equal(s.time,Date.UTC(1931,8,5,10));
 assert(actions(s).find(a=>a.id==='dean').disabled);
 assert.equal(act(s,'library').entry,145);
});

test('September 9 changes home and faculty entries without looping',()=>{
 let s=wait(morning(),7*24-6);
 assert.equal(s.entry,147);
 s=act(s,'home-return');
 assert(!actions(s).some(a=>['eat','rest'].includes(a.id)));
 s=travel(wait(s,7),'university');
 s=act(s,'fen');
 assert.equal(s.entry,143);
 s=act(s,'later-dean');
 assert.equal(s.entry,197);
 assert.equal(act(s,'later-university').entry,82);
 assert(validateSave(s));
});

test('October newspaper report opens and returns to the newspaper',()=>{
 let s=travel(wait(travel(morning(),'depot'),29*24),'newspaper');
 s=act(s,'october-news');
 assert.equal(s.entry,172);
 assert.equal(act(s,'news-return').entry,60);
});

test('Boston connection and half-hour return preserve the date and region',()=>{
 const boston=act(travel(morning(),'depot'),'train-9');
 const ny=act(boston,'rail-grandCentral-10');
 assert.equal(ny.entry,146);
 assert.equal(ny.time,Date.UTC(1931,8,2,17));
 assert(!travelOptions(ny).some(location=>location.id==='home'));
 assert.throws(()=>travel(ny,'home'));
 const back=act(ny,'rail-boston-18');
 assert.equal(back.entry,64);
 assert.equal(back.time,Date.UTC(1931,8,3,0,30));
 assert(validateSave(back));
 assert.equal(act(back,'rail-depot-10').time,Date.UTC(1931,8,3,11));
});

function newYork() {
 const boston=act(travel(morning(),'depot'),'train-9');
 return act(boston,'rail-grandCentral-10');
}

test('a New York library visit allows two topics and resets only after leaving',()=>{
 let s=travel(newYork(),'nyLibrary');
 s=act(s,'ny-study-greece');
 s=resolveRoll(act(s,'ny-greece-edu',()=>1));
 assert.equal(s.entry,25);
 assert(s.clues.includes('museum'));
 s=act(s,'ny-library-return');
 assert(actions(s).find(a=>a.id==='ny-study-egyptology').disabled);
 s=act(travel(s,'nyHotel'),'hotel-rest');
 s=travel(wait(s,3),'nyLibrary');
 assert.equal(s.nyTopics,0);
 s=act(s,'ny-study-egyptology');
 s=resolveRoll(act(s,'ny-egyptology-library',()=>1));
 s=act(s,'ny-library-return');
 s=act(s,'ny-other-topics');
 s=act(s,'ny-study-pacific');
 s=act(s,'ny-topics-return');
 assert(actions(s).find(a=>a.id==='ny-study-germany').disabled);
 assert(s.clues.includes('pacificIdols'));
 assert(validateSave(s));
});

test('occult readings consume time on success and grant Mythos once',()=>{
 let s=travel(newYork(),'nyHotel');
 s=act(wait(s,2),'hotel-rest');
 s=travel(wait(s,4),'nyLibrary');
 s=act(s,'ny-study-occult');
 const before=s.time;
 s=resolveRoll(act(s,'ny-occult-latin',()=>1));
 assert.equal(s.time,before+2*3600000);
 assert.equal(s.mythos,1);
 assert.equal(s.sanity,54);
 s=act(s,'ny-occult-return');
 assert(actions(s).find(a=>a.id==='ny-occult-latin').disabled);
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('Cunard boards at noon Saturday and resumes through both landfalls',()=>{
 let s=travel(newYork(),'pier');
 assert(actions(s).find(a=>a.id==='embark').disabled);
 s=act(wait(s,54),'embark');
 assert.equal(s.voyage.departure,Date.UTC(1931,8,5,12));
 assert.equal(s.time,Date.UTC(1931,8,6,8));
 assert.equal(s.entry,187);
 assert.equal(s.phase,'playing');
 assert.deepEqual(importSave(exportSave(s)),s);
 const old={...s,version:4,phase:'complete',time:s.voyage.departure};
 delete old.voyage;
 assert.deepEqual(importSave(JSON.stringify({format:'aatd-save',version:4,game:old})),s);
 // Quiet itinerary interspersed with required day prompts.
 for(let i=0;s.voyage.day<=8&&i<80;i++) {
  const options=actions(s).filter(a=>!a.disabled);
  const next=options.find(a=>a.id==='ship-activity-mah-jong')||options.find(a=>a.target===187);
  assert(next,s.entry+' must allow returning to the schedule');
  s=act(s,next.id);
  assert(validateSave(s));
 }
 const athens=act(s,'ship-disembark-athens');
 const egypt=act(s,'ship-disembark-alexandria');
 assert.equal(athens.time,Date.UTC(1931,8,14,12));
 assert.equal(athens.entry,173);
 assert.equal(egypt.time,Date.UTC(1931,8,15,13));
 assert.equal(egypt.entry,195);
 assert(validateSave(athens));
 assert(validateSave(egypt));
});

test('consulate hours include a lunch closure and Wilentz stores at most three purchases',()=>{
 const city=newYork();
 assert.throws(()=>travel(city,'greekConsulate'));
 const morning=wait(city,15);
 const consulate=travel(morning,'greekConsulate');
 assert(consulate.clues.includes('consulateIlionas'));
 assert.throws(()=>travel(wait(morning,3),'greekConsulate'));
 let store=travel(wait(morning,1),'wilentz');
 for(const lang of ['greek','arabic','german']) store=act(store,'wilentz-buy-'+lang);
 assert.equal(store.inventory.length,morning.inventory.length+3);
 assert.throws(()=>act(store,'wilentz-buy-worst-journey'));
 assert.equal(store.cash,morning.cash);
});

test('newspaper Luck gate protects the reports and later editions depend on date',()=>{
 let s=travel(newYork(),'nySun');
 assert(!s.clues.includes('sunFirstReports'));
 s=resolveRoll(act(s,'ny-sun-luck',()=>99));
 assert.throws(()=>act(s,'ny-sun-luck',()=>1));
 s=act(wait(s,11),'ny-sun-open');
 assert(s.clues.includes('sunFirstReports'));
 assert.throws(()=>act(s,'ny-sun-gliere'));
 const later=travel({...newYork(),time:Date.UTC(1931,11,1,8)},'nySun');
 s=later;
 for(const id of ['gliere','exhibition','disappearance','expedition']) s=act(s,'ny-sun-'+id);
 assert.equal(s.entry,156);
 assert.equal(s.clues.filter(id=>id.startsWith('sun')).length,5);
 assert(validateSave(s));
});

test('street food sickness resolves its mandatory Constitution check before travel',()=>{
 const s=travel(newYork(),'nyVendors');
 const sick=act(s,'eat',()=>100,()=>10);
 assert.equal(sick.entry,12);
 assert.throws(()=>travel(sick,'nyHospital'));
 const failed=resolveRoll(act(sick,'street-food-con',()=>100));
 assert.equal(failed.hp,8);
 assert.equal(failed.time,sick.time+3*3600000);
 assert.equal(failed.entry,586);
 assert.equal(travel(failed,'nyHospital').entry,585);
 assert.equal(resolveRoll(act(sick,'street-food-con',()=>1)).time,sick.time);
});

function boardLiner() {
 return act(wait(travel(newYork(),'pier'),54),'embark');
}

function quietSlots(s,n) {
 for(let i=0;i<n;i++) s=act(s,'ship-activity-mah-jong');
 return s;
}

test('cabin encounter persists a pending roll and returns to the next ship day',()=>{
 let s=act(boardLiner(),'ship-activity-room');
 s=act(s,'ship-admit-steward');
 const pending=act(s,'ship-steward-spot',()=>1);
 assert.deepEqual(importSave(exportSave(pending)),pending);
 s=resolveRoll(pending);
 assert.equal(s.entry,91);
 s=resolveRoll(act(s,'ship-steward-dodge',()=>1));
 assert.equal(s.voyage.day,2);
 assert.equal(s.entry,187);
 assert(validateSave(s));
});

test('library encounter can end under guard and preserves Sanity and Luck checks',()=>{
 let s=act(quietSlots(boardLiner(),8),'ship-activity-library');
 assert.equal(s.entry,155);
 const health=s.hp;
 s=resolveRoll(act(s,'ship-evade-155',()=>1));
 assert.equal(s.hp,health);
 s=resolveRoll(act(s,'ship-run-155',()=>1));
 const pending=act(s,'ship-library-sanity',()=>1);
 assert.equal(luckCost(pending),null);
 assert.deepEqual(importSave(exportSave(pending)),pending);
 s=resolveRoll(pending);
 s=resolveRoll(act(s,'ship-library-rescue',()=>1));
 assert.equal(s.entry,139);
 s=act(s,'ship-travel-under-guard');
 assert.equal(s.voyage.day,9);
 assert.equal(act(s,'ship-disembark-athens').entry,173);
});

test('baccarat winnings are posted to carried cash and persist in a dossier',()=>{
 let s=act(quietSlots(boardLiner(),9),'ship-activity-stroll');
 s=resolveRoll(act(s,'ship-corridor-spot',()=>1));
 s=resolveRoll(act(s,'ship-corridor-know',()=>1));
 s=act(s,'ship-leave-passage');
 s=act(s,'ship-activity-shuffleboard');
 assert.equal(s.entry,579);
 const before=s.cash;
 s=act(s,'ship-collect-baccarat');
 assert(s.cash>=before+1&&s.cash<=before+100);
 assert.equal(s.voyage.day,5);
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('skipping quiet periods stops at the next encounter choice without resolving it',()=>{
 const sunday=boardLiner();
 const afternoon=act(sunday,'ship-skip-quiet');
 assert.equal(afternoon.voyage.slot,1);
 assert(actions(afternoon).some(a=>a.id==='ship-activity-tour'));
 const tour=act(afternoon,'ship-activity-tour');
 assert.equal(tour.entry,73);
 assert.throws(()=>act(tour,'ship-skip-quiet'));
 const night=resolveRoll(act(tour,'ship-tour-spot',()=>100));
 const next=act(night,'ship-skip-quiet');
 assert.equal(next.voyage.day,2);
 assert.equal(next.voyage.slot,0);
 assert.equal(next.entry,187);
 assert.deepEqual(next.clues,night.clues);
 assert.deepEqual(importSave(exportSave(next)),next);
});

test('skip to landfall preserves the dossier and leaves the port choice open',()=>{
 const boarded=boardLiner();
 const s=act(boarded,'ship-skip-to-port');
 assert.equal(s.voyage.day,9);
 assert.equal(s.location,'liner');
 assert.deepEqual(s.clues,['telegram']);
 assert.equal(s.hp,boarded.hp);
 assert.equal(s.cash,boarded.cash);
 assert(!s.visited.includes(155));
 assert(actions(s).some(a=>a.id==='ship-disembark-alexandria'));
 assert(validateSave(s));
});

function landfall(destination) {
 const s=act(boardLiner(),'ship-skip-to-port');
 return act(s,'ship-disembark-'+destination);
}

test('legacy harbor checkpoints reopen without changing the arrival time',()=>{
 for(const destination of ['athens','alexandria']) {
  const s=landfall(destination);
  const old={...s,version:5,phase:'complete'};
  const actual=importSave(JSON.stringify({format:'aatd-save',version:5,game:old}));
  assert.deepEqual(actual,s);
  assert.equal(actual.phase,'playing');
  assert(actions(actual).length>0);
 }
});

test('Alexandria connects to Cairo and back by scheduled rail',()=>{
 const harbor=landfall('alexandria');
 const cairo=act(harbor,'rail-cairoRail-13');
 assert.equal(cairo.entry,205);
 assert.equal(cairo.time,Date.UTC(1931,8,15,14));
 assert(!travelOptions(cairo).some(place=>place.id==='alexandriaHarbor'));
 assert.equal(act(cairo,'rail-alexandriaHarbor-17').time,Date.UTC(1931,8,15,18));
});

test('the Mediterranean steamer uses weekday departures and takes 24 hours',()=>{
 let s=landfall('athens');
 assert(actions(s).find(action=>action.id==='med-steamer').disabled);
 s=act(wait(s,24),'med-steamer');
 assert.equal(s.entry,195);
 assert.equal(s.time,Date.UTC(1931,8,16,15));
 s=act(s,'med-steamer');
 assert.equal(s.entry,173);
 assert.equal(s.time,Date.UTC(1931,8,17,15));
 assert(validateSave(s));
});

test('Alexandria’s dockside encounter checks spoken Arabic and persists the escape',()=>{
 const harbor=landfall('alexandria');
 let s=act(harbor,'alexandria-docks');
 assert(!actions(s).some(a=>a.id==='alexandria-speak-arabic'));
 s={...s,allocation:{...s.allocation,'Language (Greek)':0,'Language (Arabic)':20}};
 s=act(s,'alexandria-speak-arabic');
 s=act(s,'alexandria-leave-cafes');
 s=resolveRoll(act(s,'alexandria-listen',()=>100));
 assert.equal(s.entry,222);
 assert(s.clues.includes('alexandria-aten'));
 assert.throws(()=>travel(s,'alexandriaStore'));
 s=resolveRoll(act(s,'alexandria-dodge',()=>1));
 assert.equal(s.entry,241);
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('Athens case report, interpreter and letter persist across save and travel',()=>{
 let s=landfall('athens');
 assert(actions(s).find(a=>a.id==='piraeus-cab').disabled);
 s=act(wait(s,1),'piraeus-cab');
 assert.equal(s.entry,130);
 assert(s.clues.includes('athensDeath'));
 s=resolveRoll(act(s,'athens-ilionas-persuade',()=>1));
 assert(s.flags.athensIlionasName);
 s=act(s,'athens-read-report');
 s=act(s,'athens-ask-device');
 s=resolveRoll(act(s,'athens-device-int',()=>1));
 assert.equal(s.entry,21);
 s=act(s,'athens-device-september');
 assert.equal(s.entry,128);
 s=travel(s,'athensJustice');
 s=act(s,'athens-justice-name');
 s=act(s,'athens-justice-find-interpreter');
 assert.equal(s.entry,77);
 s=act(s,'athens-gliere-letter');
 assert.equal(s.entry,539);
 assert(s.clues.includes('gliereLetter'));
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('Athens museum reveals the display and resolves Pisistratos’s interview in order',()=>{
 let s=landfall('athens');
 assert.throws(()=>travel(s,'athensMuseum'));
 s=travel(wait(s,2),'athensMuseum');
 s=act(s,'athens-museum-galleries');
 s=act(s,'athens-museum-read-report');
 assert(s.clues.includes('device'));
 s=act(s,'athens-museum-return-display');
 s=resolveRoll(act(s,'athens-museum-luck',()=>1));
 for(const topic of ['gliere','loan','clock']) {
  s=resolveRoll(act(s,`athens-museum-gallery-${topic}-psychology`,()=>1));
  s=act(s,`athens-museum-gallery-${topic}-lie-continue`);
 }
 assert.equal(s.clues.filter(id=>id.startsWith('athensMuseum')).length,3);
 assert(validateSave(s));
});

test('Hawkes’s apartment uses observations for the pending Intelligence roll',()=>{
 let s=travel(landfall('athens'),'athensCafe');
 s=act(act(s,'cafe-hawkes'),'cafe-accept');
 assert.throws(()=>travel(s,'athensHarbor'));
 for(const id of ['edu','mythos','occult','spot','listen']) s=resolveRoll(act(s,'hawkes-'+id,()=>1));
 s=act(s,'hawkes-interpret');
 s=act(s,'hawkes-int',()=>91);
 assert.equal(s.pending.target,99);
 assert.deepEqual(importSave(exportSave(s)),s);
 s=resolveRoll(s);
 const escaped=resolveRoll(act(s,'hawkes-dodge',()=>1));
 assert.equal(escaped.entry,'hawkes-escape');
 const ended=resolveRoll(act(s,'hawkes-dodge',()=>100));
 assert.equal(ended.phase,'ending');
 assert(validateSave(ended));
});

test('Cairo museum keeps split hours and switches the exhibition on October 30',()=>{
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 let s=travel(cairo,'cairoMuseum');
 assert.equal(s.entry,206);
 s=act(s,'cm-device');
 assert(s.clues.includes('cairoDeviceDisplay'));
 s=act(s,'cm-return-early');
 s=act(s,'cm-treasures');
 s=act(s,'cm-see-amulet');
 s=resolveRoll(act(s,'cm-amulet-int',()=>1));
 assert(s.clues.includes('cairoAkhenatenAmulet'));
 assert.deepEqual(importSave(exportSave(s)),s);
 const late=travel({...cairo,time:Date.UTC(1931,9,30,8)},'cairoMuseum');
 assert.equal(late.entry,300);
 assert.throws(()=>travel({...cairo,time:Date.UTC(1931,9,30,11)},'cairoMuseum'));
 const exhibit=act(late,'cm-device-late');
 assert.equal(exhibit.time-late.time,3600000);
 assert(exhibit.clues.includes('cairoDeviceMissing'));
 assert(validateSave(exhibit));
});

test('Cairo museum staff investigation unlocks Keh’s fate after the cutoff',()=>{
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 let s=travel({...cairo,time:Date.UTC(1931,9,30,8)},'cairoMuseum');
 s=act(s,'cm-curator-late');
 s=resolveRoll(act(s,'cm-staff-persuade',()=>1));
 s=resolveRoll(act(s,'cm-staff-psychology',()=>1));
 s=resolveRoll(act(s,'cm-office-dex',()=>1));
 assert.equal(s.entry,322);
 assert(s.clues.includes('cairoKehFate'));
 assert(validateSave(s));
});

test('Parthenon escape preserves the warning and ring without replaying the encounter',()=>{
 let s=travel(landfall('athens'),'athensParthenon');
 assert.throws(()=>travel(s,'athensHarbor'));
 s=act(s,'parthenon-sneak');
 s=resolveRoll(act(s,'parthenon-sneak-climb',()=>1));
 assert.equal(s.entry,33);
 assert(s.clues.includes('parthenonWarning'));
 assert(s.inventory.includes('Gold ring with a flaming star'));
 s=act(s,'parthenon-rest');
 assert.equal(s.location,'athensHotel');
 assert.equal(s.time,Date.UTC(1931,8,15,6));
 assert.equal(travel(s,'athensParthenon').entry,'parthenon-quiet');
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('the second Parthenon grapple uses Extreme difficulty and can end the dossier',()=>{
 let s=travel(landfall('athens'),'athensParthenon');
 s=act(act(s,'parthenon-hide'),'parthenon-run');
 s=resolveRoll(act(s,'parthenon-break-grip',()=>100));
 const pending=act(s,'parthenon-break-both',()=>15);
 assert.equal(pending.pending.target,14);
 const ending=resolveRoll(importSave(exportSave(pending)));
 assert.equal(ending.phase,'ending');
 assert.equal(ending.hp,0);
 assert(validateSave(ending));
});

test('the Kyonas charter advances 72 hours and lands in Alexandria',()=>{
 const s=travel(landfall('athens'),'kyonas');
 const arrival=act(s,'kyonas-hire');
 assert.equal(arrival.entry,195);
 assert.equal(arrival.time-s.time,72*3600000);
 assert.equal(arrival.hp,9);
 assert.equal(arrival.sleepDebt,0);
 assert(validateSave(arrival));
});

test('Fuzira respects the lunch closure and connects Cairo to the first tomb chamber',()=>{
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 assert.throws(()=>travel(cairo,'fuziraMarket'));
 let s=travel(wait(cairo,1),'fuziraMarket');
 s=act(s,'fuzira-travel');
 s=act(s,'amarna-rental');
 const departure=s.time;
 s=act(s,'amarna-drive');
 assert.equal(s.entry,324);
 assert.equal(s.time-departure,48*3600000);
 assert(!travelOptions(s).some(location=>location.id==='cairoRail'));
 for(const id of ['amarna-pyramid','amarna-tomb-entrance','amarna-admission','amarna-enter']) s=act(s,id);
 assert.equal(s.entry,338);
 s=resolveRoll(act(s,'amarna-spot',()=>1));
 assert.equal(s.entry,357);
 assert(s.clues.includes('amarnaErasedRelief'));
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('Fuzira haggling lowers the price charged to carried cash',()=>{
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 let s=travel({...wait(cairo,1),cash:100},'fuziraMarket');
 s=act(s,'fuzira-suppliers');
 const before=actions(s).find(action=>action.id==='fuzira-buy-compass');
 assert(before);
 s=resolveRoll(act(s,'fuzira-barter-charm',()=>1));
 const after=actions(s).find(action=>action.id==='fuzira-buy-compass-bargain');
 assert(after);
 const price=Number(after.detail.slice(1));
 assert.equal(Number(before.detail.slice(1)),3*price);
 s=act(s,after.id);
 assert(s.inventory.includes('Compass'));
 assert.equal(s.cash,100-price);
 assert(validateSave(s));
});
