import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,validAllocation,act,travel,actions,resolveRoll,luckCost,successLevel,validateSave,MORNING,clock,travelOptions,skill,investigator,nextInvestigator,inheritInvestigation,oldOneDestinations,oldOneTravel,region} from '../web/engine.js';
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
 let s=travel({...travel(morning(),'depot'),time:Date.UTC(1931,9,1,7)},'newspaper');
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

test('a successor can recover private possessions once and a failed Luck roll loses them',()=>{
 const athens=landfall('athens');
 athens.inventory.push('Rope');
 const enter=s=>choose(travel(s,'athensCafe'),'cafe-hawkes','cafe-accept');
 const inspect=s=>{
  for(const id of ['edu','mythos','occult','spot','listen']) s=expeditionRoll(s,`hawkes-${id}`);
  return act(s,'hawkes-interpret');
 };
 const dead=expeditionRoll(inspect(enter(athens)),'hawkes-int',100);
 const old=importSave(JSON.stringify({format:'aatd-save',version:9,game:{...dead,version:9}}));
 const holt=inheritInvestigation(old,nextInvestigator(old).suggested);
 assert(!holt.inventory.includes('Rope'));
 assert(holt.log.some(event=>event.text.includes('left possessions')));
 let pier=travel(act(holt,'successor-morning'),'pier');
 while(new Date(pier.time).getUTCDay()!==6) pier=wait(pier,24);
 const port=choose(pier,'embark','ship-skip-to-port','ship-disembark-athens');
 const apartment=inspect(enter(port));
 const id='recover-grunewald-hawkes-ending';
 function recover(roll) {
  const pending=act(apartment,id,()=>roll);
  return resolveRoll(importSave(exportSave(pending)));
 }
 const recovered=recover(1);
 assert(recovered.inventory.includes('Rope'));
 assert(!actions(recovered).some(a=>a.id===id));
 const lost=recover(100);
 assert(!lost.inventory.includes('Rope'));
 assert(!actions(lost).some(a=>a.id===id));
 const publicDeath=choose(travel(athens,'athensParthenon'),'parthenon-hide','parthenon-talk');
 assert.equal(inheritInvestigation(publicDeath,nextInvestigator(publicDeath).suggested).estates,undefined);
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

function alAzhar() {
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 return travel({...cairo,time:Date.UTC(1931,8,16,6)},'cairoUniversity');
}

test('Al-Azhar’s two searches unlock the shelves and preserve a student translation roll',()=>{
 let s=choose(alAzhar(),'azhar-languages','azhar-assign-translator','azhar-library');
 s=expeditionRoll(s,'azhar-search-first');
 assert.equal(s.entry,253);
 s=expeditionRoll(act(s,'azhar-return-library'),'azhar-search-second');
 assert.equal(s.entry,275);
 assert.equal(clock(s.time),'11:00 AM');
 assert(!actions(s).some(a=>a.id==='assist-translator-azhar-read-265'));
 s=wait(s,4);
 const pending=act(s,'assist-translator-azhar-read-265',()=>30);
 assert.equal(pending.pending.companion,'translator');
 assert.equal(pending.pending.target,50);
 assert.equal(clock(pending.time),'4:00 PM');
 s=resolveRoll(importSave(exportSave(pending)));
 assert.equal(s.entry,265);
 assert(s.clues.includes('azharCultOfAten'));
 assert.equal(s.lastRoll.companion,'translator');
 assert.equal(skill(s,'Language (French)'),1);
});

test('Jahark’s map improves the east survey and his skills are offered on eligible checks',()=>{
 const interview=expeditionRoll(act(alAzhar(),'azhar-ancient'),'azhar-ancient-history');
 let s=choose(interview,'azhar-jahark-pyramid','azhar-take-map','azhar-hear-key-riddle','azhar-return-jahark');
 assert(s.clues.includes('azharEastMap'));
 s=choose(expeditionRoll(s,'azhar-jahark-spot'),'azhar-jahark-continue','azhar-recruit-jahark');
 assert(s.flags.azharJahark);
 const museum=act(travel(s,'cairoMuseum'),'cm-tombs');
 const withJahark=act(museum,'assist-jahark-cm-model-mythos',()=>10);
 assert.equal(withJahark.pending.target,10);
 assert.equal(withJahark.pending.companion,'jahark');
 assert.equal(resolveRoll(importSave(exportSave(withJahark))).entry,244);
 const site=amarna();
 const map={...site,clues:[...new Set([...site.clues,...s.clues])]};
 const survey=choose(map,'amarna-pyramid','amarna-survey-east');
 const rolled=act(survey,'amarna-face-east',()=>10);
 assert(rolled.log.some(event=>event.text.startsWith('Bonus dice')));
 assert.equal(resolveRoll(rolled).entry,397);
});

test('the Athens–Cairo train takes three days and the private suite has a saved danger branch',t=>{
 t.mock.method(globalThis.crypto,'getRandomValues',values=>{values.fill(0);return values;});
 const rail=travel(landfall('athens'),'athensRail');
 const start=act({...rail,time:Date.UTC(1931,8,15,9)},'cairo-train-board');
 assert.equal(start.entry,42);
 assert.equal(clock(start.time),'12:00 PM');
 const common=choose(start,'cairo-train-seat','cairo-train-arrive');
 assert.equal(common.time-start.time,72*3600000);
 assert.equal(common.entry,205);
 const suite=act(start,'cairo-train-suite');
 const alert=expeditionRoll(importSave(exportSave(suite)),'cairo-train-listen');
 assert.equal(alert.entry,97);
 assert(alert.flags.cairoTrainAlert);
 let s=choose(alert,'cairo-train-pull-cord','cairo-train-check-bite');
 s=expeditionRoll(s,'cairo-train-con',100);
 s=expeditionRoll(s,'cairo-train-doctor',100);
 s=expeditionRoll(s,'cairo-train-first-aid');
 const arrived=act(s,'cairo-train-arrive');
 assert.equal(arrived.time,common.time);
 assert.equal(arrived.egyptTrain,undefined);
 assert.deepEqual(importSave(exportSave(arrived)),arrived);
 const delayed=choose(alert,'cairo-train-window','cairo-train-next-train','cairo-train-arrive');
 assert.equal(delayed.time,common.time+24*3600000);
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

function amarna() {
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 return act(act(act(travel(wait(cairo,1),'fuziraMarket'),'fuzira-travel'),'amarna-rental'),'amarna-drive');
}

test('Tell-el-Amarna’s hired driver can strand the party or take them to the village',t=>{
 let die=9;
 t.mock.method(globalThis.crypto,'getRandomValues',values=>{values.fill(die);return values;});
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 const guide=choose(travel(wait(cairo,1),'fuziraMarket'),'fuzira-travel','amarna-rental','amarna-ask-guide');
 const arrived=act(guide,'amarna-drive-with-guide');
 assert.equal(arrived.entry,324);
 assert.equal(arrived.time-guide.time,48*3600000);
 const missing=act(arrived,'amarna-leave-car-with-guide');
 assert.equal(missing.entry,361);
 assert.equal(expeditionRoll(missing,'amarna-caravan-village').entry,341);
 die=1;
 const stranded=act(guide,'amarna-drive-with-guide');
 assert.equal(stranded.entry,321);
 const desert=choose(stranded,'amarna-try-river','amarna-follow-tracks','amarna-walk-into-desert');
 assert.equal(desert.entry,94);
 assert.equal(desert.quattarra.water,2);
 assert.deepEqual(importSave(exportSave(desert)),desert);
});

test('a saved Quattarra trek can reach Giza or perish after running out of water',t=>{
 t.mock.method(globalThis.crypto,'getRandomValues',values=>{values.fill(0);return values;});
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 const desert=choose(travel(wait(cairo,1),'fuziraMarket'),'fuzira-travel','quattarra-join','quattarra-caravan-camp');
 assert.equal(desert.entry,94);
 assert.equal(desert.quattarra.water,1);
 const pending=act(desert,'quattarra-ration',()=>100);
 const lost=resolveRoll(importSave(exportSave(pending)));
 assert.equal(lost.entry,213);
 assert.equal(lost.quattarra.water,0);
 assert(!travelOptions(lost).some(destination=>!destination.disabled));
 const giza=expeditionRoll(lost,'quattarra-navigate-213');
 assert.equal(giza.entry,234);
 const rescued=act(giza,'quattarra-giza');
 assert.equal(rescued.location,'cairoRail');
 assert.equal(rescued.quattarra,undefined);
 let doomed=expeditionRoll(lost,'quattarra-navigate-213',100);
 doomed=act(doomed,'quattarra-west');
 assert.equal(doomed.entry,257);
 assert(doomed.log.some(event=>event.text.includes('Lost 6 health to thirst')));
 doomed=expeditionRoll(doomed,'quattarra-astronomy',100);
 const dead=act(doomed,'quattarra-south');
 assert.equal(dead.phase,'ending');
 assert.equal(dead.hp,0);
 assert.deepEqual(importSave(exportSave(dead)),dead);
});

test('survey odds use the spent hour and first face, with Luck spending disabled',()=>{
 let s=act(amarna(),'amarna-pyramid');
 const surveyed=act(s,'amarna-survey-east');
 const roll=act(surveyed,'amarna-face-east',()=>25);
 assert.equal(roll.pending.target,24);
 assert.equal(luckCost(roll),null);
 s=resolveRoll(importSave(exportSave(roll)));
 assert.equal(s.entry,359);
 assert.throws(()=>act(s,'amarna-face-east'));
});

function hiddenEntrance(village=amarna()) {
 let s=act(village,'amarna-pyramid');
 s=act(s,'amarna-survey-east');
 s=resolveRoll(act(s,'amarna-face-east',()=>1));
 s=resolveRoll(act(s,'amarna-move-stone',()=>1));
 return act(s,'amarna-enter-secret');
}

test('the eastern survey opens the hidden entrance and preserves puzzle discoveries',()=>{
 const entrance=hiddenEntrance();
 assert.equal(entrance.entry,382);
 assert(validateSave(entrance));
 assert.deepEqual(importSave(exportSave(entrance)),entrance);
 assert(entrance.visited.includes(397));
 assert(entrance.visited.includes(379));
});

test('hidden passages add only discovered map sections and keep in-tomb time across saves',async()=>{
 const {discoveredSections,pyramidBoard}=await import('../web/amarna-map.js');
 let s=hiddenEntrance();
 assert.deepEqual([...discoveredSections(s.visited)],['K']);
 const before=s.time;
 s=act(s,'pyramid-descend');
 assert.equal(s.entry,399);
 assert.equal(s.time-before,1800000);
 s=act(s,'pyramid-pit-cross');
 s=resolveRoll(act(s,'pyramid-pit-jump',()=>1));
 s=resolveRoll(act(s,'pyramid-rites-sanity',()=>1));
 s=act(s,'pyramid-stairs-up');
 assert.equal(s.entry,313);
 const mapped=discoveredSections(s.visited);
 assert.deepEqual(mapped,new Set(['K','I']));
 assert.equal((pyramidBoard(mapped).match(/<img /g)||[]).length,2);
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('Bremen sea, train and air routes use their printed schedules',()=>{
 const monday=landfall('athens');
 assert(actions(monday).find(a=>a.id==='connection-bremenHarbor').disabled);
 const ship=act(wait(monday,24),'connection-bremenHarbor');
 assert.equal(ship.entry,449);
 assert.equal(ship.time,Date.UTC(1931,8,20,16));
 assert(validateSave(ship));
 const railway=travel(monday,'athensRail');
 const express=act(wait(railway,11),'connection-bremenHarbor');
 assert.equal(express.time,Date.UTC(1931,8,18,9));
 assert.equal(express.location,'bremenHarbor');
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 const airport=travel(cairo,'cairoAirport');
 const flight=act(wait(airport,9),'connection-bremenAirport');
 assert.equal(flight.time,Date.UTC(1931,8,16,17));
 assert.equal(flight.entry,450);
 assert.deepEqual(importSave(exportSave(flight)),flight);
});

test('waiting at the Bremen inn preserves time for boarding before departure',()=>{
 const harbor=act(wait(landfall('athens'),24),'connection-bremenHarbor');
 const inn=travel(harbor,'bremenInn');
 const ready=act(inn,'bremen-wait-season');
 assert.equal(ready.time,Date.UTC(1931,11,19,8));
 assert.equal(ready.entry,461);
 assert(validateSave(ready));
 assert(!actions(ready).some(a=>a.id==='bremen-wait-season'));
});

function boardDarkSea() {
 let s=act(wait(landfall('athens'),24),'connection-bremenHarbor');
 s=act(travel(s,'bremenInn'),'bremen-wait-season');
 s=travel(s,'bremenHarbor');
 s=act(s,'bremen-look-ships');
 s=act(s,'bremen-board-dark-sea');
 return ['dark-sea-captain','dark-sea-ask-for-berth','dark-sea-take-berth'].reduce((state,id)=>act(state,id),s);
}

test('an expedition berth reaches a playable Antarctica camp',()=>{
 const ship=boardDarkSea();
 assert.equal(ship.entry,500);
 assert(validateSave(ship));
 const camp=act(act(ship,'dark-sea-make-landfall'),'dark-sea-keep-to-yourself');
 assert.equal(camp.entry,520);
 assert.equal(camp.phase,'playing');
 assert.equal(camp.location,'antarctica');
 assert(camp.time-ship.time>=27*86400000);
 assert(camp.time-ship.time<=32*86400000);
 assert.deepEqual(importSave(exportSave(camp)),camp);
});

test('a version 6 base camp checkpoint reopens without advancing time',()=>{
 const ship=boardDarkSea();
 const camp=act(act(ship,'dark-sea-make-landfall'),'dark-sea-keep-to-yourself');
 const old={...camp,version:6,location:'darkSea',phase:'complete',notes:'Keep this observation.',clues:[]};
 const restored=importSave(JSON.stringify({format:'aatd-save',version:6,game:old}));
 assert.equal(restored.time,camp.time);
 assert.equal(restored.location,'antarctica');
 assert.equal(restored.phase,'playing');
 assert.equal(restored.notes,old.notes);
 assert(restored.clues.includes('antarcticExpeditionMap'));
});

test('investigating Jeffries’ locker can reach the sea victory ending',()=>{
 let s=act(boardDarkSea(),'dark-sea-investigate');
 s=resolveRoll(act(s,'dark-sea-deck-c-spot-hidden',()=>1));
 assert.equal(s.entry,509);
 assert(s.clues.includes('darkSeaLocker'));
 s=act(s,'dark-sea-return-from-509');
 s=act(s,'dark-sea-next-day');
 if(s.entry===500) s=act(s,'dark-sea-search');
 else if(s.entry===480) s=act(s,'dark-sea-search-cabins');
 s=act(s,'dark-sea-crew-quarters');
 s=act(s,'dark-sea-locker-jeffries');
 assert.equal(s.entry,576);
 const pending=act(s,'dark-sea-top-luck',()=>1);
 assert.deepEqual(importSave(exportSave(pending)),pending);
 s=act(resolveRoll(pending),'dark-sea-throw-top-overboard');
 assert.equal(s.entry,433);
 assert.equal(s.phase,'ending');
 assert.equal(nextInvestigator(s),null);
 assert(s.hp>0);
 assert(validateSave(s));
});

const choose = (s,...ids) => ids.reduce((state,id)=>act(state,id),s);
const expeditionRoll = (s,id,result=1) => resolveRoll(act(s,id,()=>result));
const expeditionCamp = ship => choose(ship,'dark-sea-make-landfall','dark-sea-keep-to-yourself');
const lostCity = camp => choose(camp,'antarctic-join-c','antarctic-leave-the-plane','antarctic-cross-the-outskirts',
 'antarctic-pursue-jeffries','antarctic-follow-jeffries','antarctic-enter-the-city');
const cavernRim = s => choose(s,'lost-city-war-west','lost-city-dome-south','lost-city-trail-figure','lost-city-enter-lower-opening');
function meetOldOne(camp) {
 const shrine=choose(lostCity(camp),'lost-city-city-buildings','lost-city-follow-sanctuary-path','lost-city-touch-rose-amulet');
 return expeditionRoll(expeditionRoll(shrine,'lost-city-old-one-sanity'),'lost-city-old-one-dodge',100);
}

test('expedition parties advance to the printed journal dates and each can finish',()=>{
 const camp=expeditionCamp(boardDarkSea());
 for(const [party,day,entry,ending] of [
  ['a',13,525,'antarctic-wait-with-blake'],['b',12,541,'antarctic-wait-for-blake'],
 ]) {
  const trip=act(camp,`antarctic-join-${party}`);
  assert.equal(trip.entry,entry);
  assert.equal(trip.time,Date.UTC(1932,1,day));
  const end=act(trip,ending);
  assert.equal(end.entry,574);
  assert.equal(end.phase,'ending');
  assert.equal(nextInvestigator(end),null);
  assert.deepEqual(importSave(exportSave(end)),end);
 }
 const city=lostCity(camp);
 assert.equal(city.entry,543);
 assert.equal(city.time,Date.UTC(1932,1,8));
 assert(city.flags.antarcticJones);
 assert(city.clues.includes('lostCityMap'));
});

test('a v7 ending passes the same journal through all successors at the printed intervals',()=>{
 const original=act(act(travel(wait(morning(),1),'university'),'dean'),'abandon');
 const {investigator:profile,...legacy}=original;
 const restored=importSave(JSON.stringify({format:'aatd-save',version:7,game:{...legacy,version:7,notes:'Follow the lead.'}}));
 assert.equal(investigator(restored).key,profile);
 assert.equal(nextInvestigator(restored).key,'holt');
 assert.throws(()=>inheritInvestigation(restored,{}));
 const holt=inheritInvestigation(restored,nextInvestigator(restored).suggested);
 assert.equal(holt.entry,36);
 assert.equal(holt.time,restored.time+3*86400000);
 assert.equal(holt.id,restored.id);
 assert.equal(holt.notes,restored.notes);
 assert.deepEqual(holt.log.slice(0,-1),restored.log);
 assert.deepEqual(holt.clues,[]);
 assert.equal(holt.hp,11);
 assert.equal(holt.cash,35000);
 assert.equal(skill(holt,'Firearms (Handgun)'),70);
 assert.equal(skill(holt,'Language (Hieroglyphics)'),1);
 assert(!travelOptions(holt).some(o=>!o.disabled));
 const awake=act(holt,'successor-morning');
 assert.equal(clock(awake.time),'6:00 AM');
 const pier=travel(awake,'pier');
 assert.equal(pier.entry,104);
 assert(!actions(pier).some(a=>a.id==='successor-morning'));
 const doomedHolt={...pier,sanity:0};
 assert.deepEqual(actions(doomedHolt),[]);
 const lau=inheritInvestigation(doomedHolt,nextInvestigator(doomedHolt).suggested);
 assert.equal(lau.entry,37);
 assert.equal(lau.time,doomedHolt.time+3*86400000);
 assert.equal(lau.cash,700);
 assert.equal(skill(lau,'Art/Craft (Copy Writing)'),65);
 const doomedLau={...act(lau,'successor-morning'),hp:0};
 const wilson=inheritInvestigation(doomedLau,nextInvestigator(doomedLau).suggested);
 assert.equal(wilson.entry,554);
 assert.equal(wilson.time,doomedLau.time+7*86400000);
 assert.equal(skill(wilson,'Navigate'),60);
 assert.equal(nextInvestigator({...wilson,sanity:0}),null);
 assert.deepEqual(importSave(exportSave(wilson)),wilson);
 for(const [port,entry] of [['pier',104],['athensHarbor',173],['alexandriaHarbor',195],['bremenHarbor',449]]) {
  const ashore=act(wilson,`rochester-${port}`);
  assert.equal(ashore.entry,entry);
  assert.equal(ashore.location,port);
  assert.equal(ashore.time,wilson.time);
  assert.equal(ashore.hp,13);
  assert.deepEqual(importSave(exportSave(ashore)),ashore);
 }
});

test('successors use distinct negotiation routes to board The Dark Sea',()=>{
 const grunewald=act(act(travel(wait(morning(),1),'university'),'dean'),'abandon');
 const successor=s=>inheritInvestigation(s,nextInvestigator(s).suggested);
 const holt=successor(grunewald);
 const lau=successor({...holt,sanity:0});
 const wilson=successor({...lau,sanity:0});
 const captain=s=>choose({...s,location:'darkSeaGangplank',entry:486,visited:[...s.visited,486]},
  'dark-sea-captain','dark-sea-ask-for-berth');
 const holtPitch=captain(holt);
 const refused=expeditionRoll(holtPitch,'dark-sea-holt-berth-persuade',100);
 assert(!actions(refused).some(a=>a.id==='dark-sea-holt-berth-charm'&&!a.disabled));
 const offered=expeditionRoll(holtPitch,'dark-sea-holt-berth-charm');
 assert.equal(offered.entry,489);
 assert(validateSave(act(offered,'dark-sea-holt-accept-berth')));
 let disguise=act(captain(lau),'dark-sea-lau-ask-for-berth');
 disguise=expeditionRoll(disguise,'dark-sea-lau-disguise');
 assert.equal(disguise.entry,463);
 assert(validateSave(disguise));
 const approach=act(captain(wilson),'dark-sea-wilson-ask-for-berth');
 assert.equal(act(approach,'dark-sea-wilson-uniform').entry,499);
 const berth=choose(approach,'dark-sea-wilson-civilian','dark-sea-wilson-accept-berth');
 assert.equal(berth.entry,500);
 const camp=expeditionCamp(berth);
 assert(!actions(camp).some(a=>a.id==='antarctic-join-c'));
 assert(actions(camp).some(a=>a.id==='antarctic-apply-c'));
 assert.deepEqual(importSave(exportSave(camp)),camp);
});

test('Lau can revisit Holt’s apartment and investigate the study in Arkham',()=>{
 const original=act(act(travel(wait(morning(),1),'university'),'dean'),'abandon');
 const holt=inheritInvestigation(original,nextInvestigator(original).suggested);
 assert(!travelOptions(holt).some(l=>l.id==='holtApartmentVisit'));
 const stopped={...holt,sanity:0};
 const lau=inheritInvestigation(stopped,nextInvestigator(stopped).suggested);
 const visit=travel(act(lau,'successor-morning'),'holtApartmentVisit');
 assert.equal(visit.entry,'lau-visits-holt');
 const boston=act(travel(visit,'grandCentral'),'rail-boston-18');
 const home=travel(act(boston,'rail-depot-10'),'home');
 assert.equal(home.entry,147);
 const study=choose(home,'home-return','search-grunewald-study');
 assert.equal(study.entry,165);
 const result=expeditionRoll(study,'grunewald-study-spot');
 assert.equal(result.entry,5);
 assert(result.clues.includes('grunewaldSkin'));
 assert.deepEqual(importSave(exportSave(result)),result);
});

test('the Cairo Museum night route preserves glass damage through reload and can reach victory',t=>{
 t.mock.method(globalThis.crypto,'getRandomValues',values=>{values.fill(5);return values;});
 const cairo=act(landfall('alexandria'),'rail-cairoRail-13');
 let s=choose(travel(cairo,'cairoMuseum'),'cm-device','cm-consider-theft','cm-theft-night');
 s=expeditionRoll(s,'cm-hide-until-closing');
 assert.equal(s.entry,280);
 s=act(s,'cm-glass-bench');
 assert.equal(s.cmGlass,6);
 s=act(importSave(exportSave(s)),'cm-glass-bench');
 assert.equal(s.entry,276);
 assert(s.inventory.includes('Karpathos Device'));
 s=act(s,'cm-look-into-dark');
 for(const id of ['cm-night-spot','cm-night-dodge','cm-night-int']) s=expeditionRoll(s,id);
 const won=act(s,'cm-dispose-device');
 assert.equal(won.entry,249);
 assert.equal(won.phase,'ending');
 assert.equal(nextInvestigator(won),null);
 assert.deepEqual(importSave(exportSave(won)),won);
});

test('a saved Lost City descent uses the lower skill, and the sanctuary amulet can win',()=>{
 let s=meetOldOne(expeditionCamp(boardDarkSea()));
 s=cavernRim(act(s,'lost-city-leave-new-ally'));
 const pending=act(s,'lost-city-quiet-descent',()=>1);
 assert.equal(pending.pending.base,Math.min(skill(s,'Jump'),skill(s,'Climb')));
 s=resolveRoll(importSave(exportSave(pending)));
 s=expeditionRoll(s,'lost-city-descent-luck',100);
 s=expeditionRoll(s,'lost-city-descent-know');
 assert.equal(s.entry,566);
 s=act(expeditionRoll(s,'lost-city-early-sanity'),'lost-city-use-rose-before-spin');
 assert.equal(s.entry,571);
 assert.equal(s.phase,'ending');
 assert.equal(s.hp,9);
 assert(!s.inventory.includes('Rose-colored amulet'));
 assert.deepEqual(importSave(exportSave(s)),s);
});

test('an older allied dossier can travel, receive protection, and return to the Lost City',()=>{
 const ship=boardDarkSea();
 const camp=expeditionCamp(ship);
 assert.deepEqual(oldOneDestinations(camp),[]);
 const ally=meetOldOne(camp);
 const older={...ally,version:8};
 const ready=importSave(JSON.stringify({format:'aatd-save',version:8,game:older}));
 let s=oldOneTravel(ready,'athensParthenon');
 assert.equal(region(s),'athens');
 assert.equal(s.time,ready.time);
 assert(s.clues.includes('lostCityAlly'));
 s=choose(importSave(exportSave(s)),'parthenon-hide','parthenon-run');
 assert.equal(s.entry,33);
 assert.equal(s.hp,ready.hp);
 s=act(s,'parthenon-rest');
 const returned=oldOneTravel(s,'antarctica');
 assert.equal(returned.entry,549);
 assert.equal(region(returned),'antarctica');
 assert.equal(returned.time,s.time);
 assert.deepEqual(importSave(exportSave(returned)),returned);
});

test('transport makes the previously unreachable pyramid dynamite branch playable',()=>{
 let ship=act(boardDarkSea(),'dark-sea-search');
 for(const id of ['dark-sea-cabin-a-luck','dark-sea-search-chart-room','dark-sea-enter-armory']) ship=expeditionRoll(ship,id);
 ship=choose(ship,'dark-sea-take-dynamite','dark-sea-leave-armory');
 ship=expeditionRoll(ship,'dark-sea-exit-cabin');
 let s=oldOneTravel(meetOldOne(expeditionCamp(ship)),'depot');
 s=act(travel(wait(s,8),'store'),'buy-rope');
 s=hiddenEntrance(oldOneTravel(wait(s,1),'amarna'));
 s=choose(s,'pyramid-descend','pyramid-pit-cross');
 s=expeditionRoll(s,'pyramid-pit-jump');
 s=expeditionRoll(s,'pyramid-rites-sanity');
 s=choose(s,'pyramid-stairs-up','pyramid-junction-up','pyramid-a-corridor','pyramid-a-down','pyramid-i-down',
  'pyramid-j-down','pyramid-j-rope','pyramid-mosaic-side','pyramid-side-forward');
 s=expeditionRoll(s,'pyramid-climb-notches');
 s=expeditionRoll(act(s,'pyramid-slope-down'),'pyramid-slope-grip');
 s=expeditionRoll(act(s,'pyramid-markings-down'),'pyramid-m-jump-west');
 s=choose(s,'pyramid-o-shaft','pyramid-o-chamber','pyramid-approach-chamber');
 s=expeditionRoll(s,'pyramid-late-approach',100);
 assert.equal(s.entry,431);
 const escaped=act(s,'pyramid-attack-dynamite');
 assert.equal(escaped.entry,421);
 assert(!escaped.inventory.includes('Dynamite'));
 assert.deepEqual(importSave(exportSave(escaped)),escaped);
});

test('armory equipment carries to the Lost City and the dynamite ending records permanent DEX loss',()=>{
 let ship=act(boardDarkSea(),'dark-sea-search');
 for(const id of ['dark-sea-cabin-a-luck','dark-sea-search-chart-room','dark-sea-enter-armory']) ship=expeditionRoll(ship,id);
 ship=choose(ship,'dark-sea-take-dynamite','dark-sea-leave-armory');
 ship=expeditionRoll(ship,'dark-sea-exit-cabin');
 const city=lostCity(expeditionCamp(ship));
 let s=cavernRim(choose(city,'lost-city-city-north','lost-city-avenue-west'));
 s=expeditionRoll(s,'lost-city-quiet-descent');
 s=expeditionRoll(s,'lost-city-descent-luck',100);
 s=expeditionRoll(s,'lost-city-descent-know');
 s=expeditionRoll(s,'lost-city-early-sanity');
 s=expeditionRoll(s,'lost-city-pedestal-throw');
 assert.equal(s.entry,569);
 assert.equal(s.phase,'ending');
 assert(!s.inventory.includes('Dynamite'));
 assert(skill(s,'DEX')>=30&&skill(s,'DEX')<=57);
 assert.deepEqual(importSave(exportSave(s)),s);
});
