import { BASE_SKILLS, CLUES, LOCATIONS, CHECKS } from './data.js';
import { ENTRY_CLUES as HARDING_CLUES, HARDING_ENTRIES } from './harding.js';
import { NYC_ENTRIES, NYC_ENTRY_CLUES, NYC_CHOICES, NYC_CHECKS } from './new-york.js';
import { NY_TRAVEL_ENTRIES } from './ny-travel.js';
import { serviceActions, performService } from './arkham-services.js';
import { CONTACT_LOCATIONS, CONTACT_ENTRIES, CONTACT_ENTRY_CLUES, CONTACT_CHOICES, contactOpen, contactChoiceStatus } from './ny-contacts.js';
import { NEWS_ENTRIES, NEWS_ENTRY_CLUES, NEWS_CHOICES, NEWS_AVAILABILITY_ENTRY } from './ny-news.js';
const ENTRY_CLUES = {...HARDING_CLUES, ...NYC_ENTRY_CLUES, ...CONTACT_ENTRY_CLUES, ...NEWS_ENTRY_CLUES};
import { LATER_CHOICES } from './arkham-later.js';
import { readLegacySave } from './legacy-save.js';
import { HOUR, HALF_HOUR, DAY, MORNING, LATE_ARKHAM, dayStart, weekday, nightStart, mealCount, mealTarget, canEat, sleepHours, advanceCalendar, hourOf } from './calendar.js';
export { MORNING, mealCount, mealTarget, canEat, sleepHours };
export const VERSION = 4;
export const START = Date.UTC(1931, 8, 1, 20);

const CHARACTERISTICS = { STR:70, CON:50, SIZ:45, DEX:60, INT:70, APP:55, POW:55, EDU:93 };
const ENTRIES = {home:[13,102,147],bank:[3],newspaper:[60,172],university:[82,122,100,186,145,574,143,197],diner:[593],depot:[16],boston:[64],harding:HARDING_ENTRIES,store:[38],hospital:[585],...NYC_ENTRIES,...NY_TRAVEL_ENTRIES,...CONTACT_ENTRIES,...NEWS_ENTRIES};
export function region(s) {
 return LOCATIONS[s.location].region || 'arkham';
}

export function hour(s) { return new Date(s.time).getUTCHours(); }
export function clock(time) { return new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'UTC'}).format(time); }
export function date(time) { return new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(time); }
export function allocationTotal(a) { return Object.values(a).reduce((sum,n)=>sum+n,0); }
export function validAllocation(a) {
 return a && typeof a==='object' && !Array.isArray(a) && Object.entries(a).every(([k,n])=>Object.hasOwn(BASE_SKILLS,k)&&Number.isInteger(n)&&n>=0&&n+BASE_SKILLS[k]<=99) && allocationTotal(a)===150;
}
export function newGame(id,name,allocation) {
 if(!validAllocation(allocation)) throw new Error('Assign exactly 150 points. Skills may not exceed 99%.');
 return {version:VERSION,id,name:name.trim().slice(0,60)||'An Arkham investigation',time:START,entry:13,location:'home',phase:'playing',allocation:{...allocation},hp:9,sanity:55,luck:50,mythos:0,bank:2200,cash:0,inventory:['Passport','Packed clothes and sundries'],clues:[],flags:{},attempts:{},meals:[],mealDebt:0,fastingToday:false,sleep:0,sleepDebt:0,sleptNight:null,pending:null,lastRoll:null,notes:'',log:[{time:START,text:'The investigation begins at Grunewald’s home.'}],visited:[13]};
}
export function skill(s,name) {
 if(name==='Luck') return s.luck;
 if(name==='Cthulhu Mythos') return s.mythos;
 if(Object.hasOwn(CHARACTERISTICS,name)) return CHARACTERISTICS[name];
 return (BASE_SKILLS[name]||0)+(s.allocation[name]||0);
}
export function successLevel(roll,base,required=base) {
 if(roll===100||(required<50&&roll>=96)) return 'Fumble';
 if(roll===1) return 'Critical success';
 if(roll<=Math.floor(base/5)) return 'Extreme success';
 if(roll<=Math.floor(base/2)) return 'Hard success';
 if(roll<=base) return 'Regular success';
 return 'Failure';
}
function rollDie(sides) {
 const values=new Uint32Array(1), ceiling=Math.floor(2**32/sides)*sides;
 do { globalThis.crypto.getRandomValues(values); } while(values[0]>=ceiling);
 return values[0]%sides+1;
}
export function d100() { return rollDie(100); }
function log(s,text) { s.log.push({time:s.time,text}); }
function unlock(s,id) {
 if(!s.clues.includes(id)) { s.clues.push(id); log(s,`Collected: ${CLUES[id].title}.`); }
}
function go(s,entry) {
 s.entry=entry;
 if(!s.visited.includes(entry)) {
  s.visited.push(entry);
  if(entry===140) {
   s.mythos++;
   s.sanity=Math.max(0,Math.min(99-s.mythos,s.sanity-1));
   log(s,'Studied the occult text. Gained 1 Cthulhu Mythos and lost 1 Sanity.');
  }
 }
 if(ENTRY_CLUES[entry]) unlock(s,ENTRY_CLUES[entry]);
 if(entry===46&&!s.inventory.includes('Notepaper with a map-like symbol')) s.inventory.push('Notepaper with a map-like symbol');
 if([23,45,89].includes(entry)) s.flags.hardingRejected=true;
 if(entry===28) delete s.flags.doorOpen;
 if(entry===7) delete s.flags.windowQuiet;
}
function dailyCheck(id) {
 return CHECKS[id].daily === true;
}
function resetDailyAttempts(s) {
 for (const id of Object.keys(s.attempts)) {
  if (dailyCheck(id)) delete s.attempts[id];
 }
}
function advance(s,hours,sleeping=false,medicalCare=false) {
 const previousTime=s.time;
 advanceCalendar(s,hours,resetDailyAttempts,log,sleeping,medicalCare);
 if(s.entry===102&&previousTime<LATE_ARKHAM&&s.time>=LATE_ARKHAM) go(s,147);
}
function officeOpen(time) { return weekday(time)&&hourOf(time)>=8&&time+HOUR<=dayStart(time)+17*HOUR; }
function newspaperOpen(time) { return isOpen('newspaper',time)&&time+HOUR<=dayStart(time)+17*HOUR; }
function libraryOpen(time) { return weekday(time,6)&&hourOf(time)>=9&&hourOf(time)<21; }
function foodAvailable(s) {
 return s.entry===102&&s.time<LATE_ARKHAM || s.entry===593&&s.time+HOUR<=dayStart(s.time)+17*HOUR&&isOpen('diner',s.time) || [146,583,586].includes(s.entry);
}
function laterChoiceAvailable(s,choice) {
 if(choice.id==='later-dean') return officeOpen(s.time);
 if(choice.id==='later-library') return libraryOpen(s.time);
 return true;
}
export function isOpen(location,time) {
 const h=new Date(time).getUTCHours();
 if(['home','depot','boston','harding'].includes(location)) return true;
 if(LOCATIONS[location].hours[1]===24&&LOCATIONS[location].hours[0]===0) return true;
 if(Object.hasOwn(CONTACT_LOCATIONS,location)) return contactOpen(location,time);
 if(location==='nySun') return h>=5&&h<14;
 if(location==='nyLibrary') return h>=9&&h<21;
 if(location==='university') return officeOpen(time)||libraryOpen(time);
 const [open,close]=LOCATIONS[location].hours;
 return weekday(time,LOCATIONS[location].lastWeekday)&&h>=open&&h<close;
}
export function canLeaveLocation(s) {
 if(s.pending||s.phase!=='playing'||s.flags.caughtOnEntry||[12,13,100,147,172,197].includes(s.entry)) return false;
 if(s.location!=='harding') return true;
 return [113,23,45,89,90,2,51].includes(s.entry)||(s.entry===7&&s.flags.windowQuiet===true);
}
function checkAvailable(s,id) {
 const r=CHECKS[id];
 if(!r||s.entry!==r.entry||(!r.repeat&&s.attempts[id])) return false;
 if(id==='room-mythos'&&s.flags.bookSkimmed) return false;
 if(id==='ny-sun-luck'&&isOpen('nySun',s.time)) return false;
 if(r.clue&&s.clues.includes(r.clue)) return false;
 const duration=(r.duration??1)+(r.successDuration||0);
 if(s.entry===60&&(!isOpen('newspaper',s.time)||s.time+duration*HOUR>dayStart(s.time)+17*HOUR)) return false;
 if(s.entry===145&&(!libraryOpen(s.time)||s.time+duration*HOUR>dayStart(s.time)+21*HOUR)) return false;
 if(Object.hasOwn(NYC_CHECKS,id) && ((s.attempts[id]||0)>0 || !nyResearchOpen(s,duration))) return false;
 if(s.entry===7&&s.flags.windowQuiet) return false;
 if(s.entry===28&&((id==='door-stealth')!==!!s.flags.doorOpen)) return false;
 return true;
}
const RAIL_ROUTES = {
 boston:[
  {to:'grandCentral',departures:[[10,7],[16,6]]},
  {to:'depot',departures:[[10,1],[13,1],[18,1]]}
 ],
 grandCentral:[{to:'boston',departures:[[8,7],[18,6.5]]}]
};

function railOptions(s) {
 const today=dayStart(s.time);
 return (RAIL_ROUTES[s.location]||[]).flatMap(({to,departures}) =>
  departures.map(([departure,hours]) => ({
   id:`rail-${to}-${departure}`, to, time:today+departure*HOUR, arrival:today+(departure+hours)*HOUR,
  }))
 ).filter(train => train.time>=s.time);
}

function nyResearchOpen(s,hours) {
 const close=dayStart(s.time)+21*HOUR;
 return (isOpen('nyLibrary',s.time)||hours===0&&s.time===close)&&s.time+hours*HOUR<=close;
}

function nyChoiceAvailable(s,choice) {
 if(!choice.topic) return true;
 return (s.nyTopics||0)<2&&nyResearchOpen(s,choice.duration);
}

function nextSailing(time) {
 const weekday = new Date(time).getUTCDay();
 let departure = dayStart(time) + ((6-weekday+7)%7)*DAY + 12*HOUR;
 if(departure<time) departure+=7*DAY;
 return departure;
}

export function actions(s) {
 if(s.phase!=='playing'||s.pending) return [];
 const a=[], add=(id,label,detail='',disabled=false)=>a.push({id,label,detail,disabled});
 if(s.flags.caughtOnEntry) { add('caught','Someone has heard you','Continue'); return a; }
 if(s.entry===13) {
  if(!s.flags.telegramRead) add('telegram','Read the telegram','A message from Athens');
  else add('begin','Reply, pack, and turn in','Continue to 2 September · 6 AM');
  return a;
 }
 if(s.location==='home'&&s.entry===102) {
  if(s.time<LATE_ARKHAM) add('eat','Prepare a meal','1 hour · meals must be at least 6 hours apart',!canEat(s));
  add('phone-sailings','Telephone for sailing schedules','Arkham Advertiser · 1 hour',!newspaperOpen(s.time));
  add('phone-curator','Telephone for news of Athens','Arkham Advertiser · 1 hour',!newspaperOpen(s.time));
  if(s.time<LATE_ARKHAM) add('rest','Turn in for the night',`${sleepHours(s)} continuous hours · continue after waking`,
   (hour(s)>=8&&hour(s)<20)||s.sleptNight===nightStart(s.time));
 }
 if(s.entry===3) add('withdraw',s.bank?'Withdraw travel funds':'Funds withdrawn',s.bank?`Withdraw $${s.bank.toLocaleString('en-US')}`:'Your money is now carried cash',s.bank===0||!isOpen('bank',s.time));
 if(s.entry===60) {
  add('sailings','Ask about ocean liners','1 hour · shipping information',!newspaperOpen(s.time));
  add('curator','Ask for news of Athens','1 hour · current news',!newspaperOpen(s.time));
  if(s.time>=Date.UTC(1931,9,1)) add('october-news','Ask about Gliere and Miskatonic','1 hour',!newspaperOpen(s.time));
 }
 for(const [id,r] of Object.entries(CHECKS)) {
  if(r.entry!==s.entry) continue;
  if(s.entry===28&&((id==='door-stealth')!==!!s.flags.doorOpen)) continue;
  if(s.entry===7&&s.flags.windowQuiet) continue;
  const base=skill(s,r.skill), required=r.difficulty==='Hard'?Math.floor(base/2):base;
  const used=!r.repeat&&s.attempts[id];
  const timing=(r.duration??1)===1?'1 hour':r.successDuration?'1 hour on success':'No additional hour';
  add(id,r.label||`Research with ${r.skill}`,`${r.skill} ${required}%${r.difficulty?' · '+r.difficulty:''} · ${timing}${used?(id==='ny-sun-luck'?' · tried this visit':' · tried today'):''}`,!checkAvailable(s,id));
 }
 if(s.entry===82) {
  add('library','Visit the library','Open 9 AM–9 PM · no additional travel hour',!libraryOpen(s.time));
  add('fen','Speak with Dr. Fen','1 hour',!officeOpen(s.time));
  add('dean','See Dean Wilcox','1 hour',!officeOpen(s.time));
 }
 if(s.entry===122) { add('dean','Speak with the Dean','1 hour',!officeOpen(s.time)); add('university','Return to the university','No time passes'); }
 if(s.entry===100) { add('resign','Threaten to resign','Stand by your decision to help Gliere'); add('abandon','Let Gliere fend for himself','Ends this investigation'); }
 if([186,145].includes(s.entry)) add('university','Return to the university','No time passes');
 for(const choice of LATER_CHOICES[s.entry]||[]) {
  add(choice.id,choice.label,choice.detail,!laterChoiceAvailable(s,choice));
 }
 if(s.entry===593) add('eat','Order a meal','1 hour · meals must be at least 6 hours apart',!canEat(s)||!foodAvailable(s));
 if(s.entry===16) for(const departure of [9,12,17]) {
  if(hour(s)>departure) continue;
  const time = dayStart(s.time) + departure * HOUR;
  if(s.time>time) continue;
  add(`train-${departure}`,`Take the ${clock(time)} train`,`Arrive Boston ${clock(time+HOUR)}`);
 }
 for(const train of railOptions(s)) {
  add(train.id,`Take the ${clock(train.time)} train to ${LOCATIONS[train.to].name}`,`Arrive ${clock(train.arrival)}`);
 }
 if(s.entry===64&&(hour(s)<8||railOptions(s).length===0)&&s.sleptNight!==nightStart(s.time)) add('boston-rest','Stay with friends in Boston',`${sleepHours(s)} continuous hours · free`);
 if(s.entry===583) add('hotel-rest','Stay at the hotel',`${sleepHours(s)} continuous hours`,(hour(s)>=8&&hour(s)<20)||s.sleptNight===nightStart(s.time));
 if([146,583,586].includes(s.entry)) add('eat','Order a meal','1 hour · meals must be at least 6 hours apart',!canEat(s));
 if(s.entry===104) {
  const departure=nextSailing(s.time);
  add('embark','Board the Saturday liner',`${date(departure)} · noon`,dayStart(departure)!==dayStart(s.time));
 }
 if(s.location==='nyLibrary') {
  for(const choice of NYC_CHOICES[s.entry]||[]) add(choice.id,choice.label,choice.detail,!nyChoiceAvailable(s,choice));
 }
 for(const choice of CONTACT_CHOICES[s.entry]||[]) {
  const {disabled,detail}=contactChoiceStatus(s,choice);
  add(choice.id,choice.label,detail,disabled);
 }
 for(const choice of NEWS_CHOICES[s.entry]||[]) {
  if(s.time>=choice.availableFrom) add(choice.id,choice.label,choice.detail);
 }
 if(s.entry===NEWS_AVAILABILITY_ENTRY&&isOpen('nySun',s.time)) add('ny-sun-open','Read today’s Sun','No time passes');
 if([38,585].includes(s.entry)) a.push(...serviceActions(s,isOpen));
 if(s.entry===113) {
  const late=hour(s)>=20||hour(s)<8;
  if(!late) {
   add('harding-fast','Try Fast Talk','1 hour · speak with Mrs. Harding');
   add('harding-charm','Try Charm','1 hour · speak with Mrs. Harding');
   add('harding-ask','Try Persuade','1 hour · speak with Mrs. Harding',!!s.attempts['harding-persuade']);
   add('harding-bribe','Offer a bribe','1 hour · speak with Mrs. Harding');
  }
  if(late) add('porch','Approach the quiet porch','Enter the nighttime branch');
 }
 if([23,45,89].includes(s.entry)) add('wait-for-night','Wait until the house is quiet',hour(s)<20?`Advance to 8 PM · ${(dayStart(s.time)+20*HOUR-s.time)/HOUR} hours`:'Approach the porch');
 if(s.entry===90) { add('window','Try the window','No additional hour'); add('door','Try the door','No additional hour'); }
 if(s.entry===28&&!s.flags.doorOpen) { add('window','Try the window','No additional hour'); add('porch','Return to the porch','No additional hour'); }
 if(s.entry===7&&s.flags.windowQuiet) add('window-door','Try an upstairs door','Continue');
 if(s.entry===11) add('listen-door','Listen at the door','Continue');
 if(s.entry===72) add('study-map','Examine the map','No additional hour');
 if(s.entry===49) add('study-symbol','Examine the design','No additional hour');
 if(s.entry===121&&!s.flags.bookSkimmed) add('skim-book','Read the book over','1 additional hour · +3 Cthulhu Mythos');
 if([24,29,32,49,72,124,212,282,208,53,46,68,188].includes(s.entry)||(s.entry===121&&s.flags.bookSkimmed)) add('return-room','Return to your search','No additional hour');
 if(canLeaveLocation(s)) {
  if(!foodAvailable(s)&&canEat(s)) add('fast-rest','Rest in place of a meal','1 hour · fasting costs 1 health per day');
  add('wait','Wait one hour','The clock advances');
 }
 return a;
}
export function travelOptions(s) {
 return Object.entries(LOCATIONS).filter(([,l])=>(l.region||'arkham')===region(s)).map(([id,l])=>({id,...l,open:id==='nySun'||isOpen(id,s.time+HOUR),disabled:l.unavailable||id===s.location||!canLeaveLocation(s)}));
}
function startCheck(s,id,rollFn) {
 const r=CHECKS[id],base=skill(s,r.skill),target=r.difficulty==='Hard'?Math.floor(base/2):base,roll=rollFn();
 if(!Number.isInteger(roll)||roll<1||roll>100) throw new Error('Invalid dice result.');
 const duration=r.duration??1;
 s.attempts[id]=(s.attempts[id]||0)+1;
 advance(s,duration);
 s.pending={id,roll,target,base,skill:r.skill,difficulty:r.difficulty||'Regular',duration,level:successLevel(roll,base,target)};
 log(s,`${r.skill}: rolled ${roll} against ${target} (${s.pending.level}; ${s.pending.difficulty} difficulty).`);
}
export function act(original,id,rollFn=d100,foodRoll=()=>rollDie(10)) {
 const s=structuredClone(original);
 if(!actions(s).some(a=>a.id===id&&!a.disabled)) throw new Error('That action is not available now.');
 if(Object.hasOwn(CHECKS,id)) { startCheck(s,id,rollFn); return s; }
 if(id==='telegram') { unlock(s,'telegram'); s.flags.telegramRead=true; return s; }
 if(id==='begin') { s.time=MORNING;s.sleep=8;s.sleptNight=dayStart(START);go(s,102);log(s,'Replied to Gliere and Ernest Holt, packed, and slept. Awake on 2 September.');return s; }
 if(['rest','hotel-rest','boston-rest'].includes(id)) {
  s.sleptNight=nightStart(s.time);
  s.sleep=sleepHours(s);
  s.sleepDebt=0;
  advance(s,s.sleep,true);
  log(s,`Slept for ${s.sleep} continuous hours. Woke at ${clock(s.time)}.`);
  return s;
 }
 if(id==='abandon') {go(s,574);s.phase='ending';log(s,'Abandoned the journey. The investigation ends.');return s;}
 if(id.startsWith('train-')) {
  const departure=Number(id.split('-')[1]);
  advance(s,(dayStart(s.time)+(departure+1)*HOUR-s.time)/HOUR);
  s.location='boston';go(s,64);
  log(s,'Took the train to Boston.');return s;
 }
 if(id==='embark') {
  const departure=nextSailing(s.time);
  advance(s,(departure-s.time)/HOUR);
  s.location='liner';
  go(s,187);
  s.phase='complete';
  log(s,'Boarded the Cunard liner at Pier 56.');
  return s;
 }
 if(id==='eat'||id==='fast-rest') {
  s.meals.push(s.time);
  if(id==='fast-rest'&&!s.fastingToday) {
   s.hp=Math.max(0,s.hp-1);
   s.fastingToday=true;
   log(s,'Fasted. Lost 1 health.');
  }
  advance(s,1);
  log(s,id==='eat'?'Ate a meal.':'Rested in place of a meal.');
  if(id==='eat'&&s.entry===586) {
   const roll=foodRoll();
   if(!num(roll,1,10)) throw new Error('Invalid dice result.');
   log(s,`Street food: rolled ${roll} on 1D10.`);
   if(roll===10) go(s,12);
  }
  return s;
 }
 const train=railOptions(s).find(train=>train.id===id);
 if(train) {
  advance(s,(train.arrival-s.time)/HOUR);
  s.location=train.to;
  go(s,LOCATIONS[train.to].entry);
  log(s,`Took the train to ${LOCATIONS[train.to].name}.`);
  return s;
 }
 if(id==='ny-sun-open') {go(s,86);return s;}
 const choices=NYC_CHOICES[s.entry]||LATER_CHOICES[s.entry]||CONTACT_CHOICES[s.entry]||NEWS_CHOICES[s.entry];
 const choice=(choices||[]).find(choice=>choice.id===id);
 if(choice?.topic) s.nyTopics=(s.nyTopics||0)+1;
 if(choice) {
  advance(s,choice.duration);
  if(choice.item) {
   s.inventory.push(choice.item);
   log(s,`Bought ${choice.item} at E.S. Wilentz Booksellers.`);
  }
  go(s,choice.target);
  return s;
 }
 if([38,585].includes(s.entry)&&performService(s,id,{advance,log,rollFn})) return s;
 if(id==='october-news') {advance(s,1);go(s,172);return s;}
 if(id==='withdraw') {s.cash+=s.bank;s.bank=0;log(s,'Withdrew $2,200 in travel funds.');return s;}
 if(id==='wait') {advance(s,1);log(s,'Waited one hour.');return s;}
 if(['phone-sailings','sailings','phone-curator','curator'].includes(id)) {advance(s,1);unlock(s,id.includes('sailings')?'sailings':'curator');return s;}
 if(id==='library') {go(s,145);return s;}
 if(id==='university') {go(s,82);return s;}
 if(id==='fen'||id==='dean') {const late=s.time>=LATE_ARKHAM;advance(s,1);go(s,id==='fen'?(late?143:122):(late?197:100));log(s,id==='fen'?'Spoke with Dr. Fen.':'Asked Dean Wilcox for leave.');return s;}
 if(id==='resign') {go(s,186);s.flags.ticketFunded=true;log(s,'The university agreed to pay for a round-trip ticket.');return s;}
 const conversations={'harding-fast':23,'harding-charm':45,'harding-ask':67,'harding-bribe':89};
 if(Object.hasOwn(conversations,id)) {advance(s,1);go(s,conversations[id]);log(s,'Spoke with Mrs. Harding.');return s;}
 if(id==='wait-for-night') {advance(s,Math.max(0,(dayStart(s.time)+20*HOUR-s.time)/HOUR));go(s,90);log(s,'Waited for nightfall at Harding House.');return s;}
 if(id==='skim-book') {
  advance(s,1);s.mythos+=3;s.sanity=Math.min(s.sanity,99-s.mythos);s.flags.bookSkimmed=true;unlock(s,'nameless');
  s.inventory.push('Nameless Cults (Golden Goblin Press edition)');log(s,'Read Nameless Cults for one hour; gained 3 Cthulhu Mythos points.');return s;
 }
 const transitions={porch:90,window:7,door:28,'window-door':51,'listen-door':141,'study-map':24,'study-symbol':46,'return-room':150,caught:51};
 if(Object.hasOwn(transitions,id)) {delete s.flags.caughtOnEntry;go(s,transitions[id]);return s;}
 throw new Error('Unknown action.');
}
export function luckCost(s) {
 const p=s.pending;
 if(!p||p.skill==='Luck'||p.level==='Fumble'||p.roll<=p.target||p.roll===1) return null;
 // A zero-valued skill cannot be bought up into a critical: criticals cannot be purchased.
 const cost=p.roll-p.target;
 return p.target>1&&cost<=s.luck?cost:null;
}
export function resolveRoll(original,spend=false) {
 const s=structuredClone(original),p=s.pending;
 if(!p) throw new Error('No roll to resolve.');
 const r=CHECKS[p.id],cost=spend?luckCost(s):0;
 if(spend&&cost===null) throw new Error('Luck cannot alter this roll.');
 if(spend) {s.luck-=cost;log(s,`Spent ${cost} Luck. ${s.luck} Luck remains.`);}
 const adjusted=p.roll-cost,level=successLevel(adjusted,p.base,p.target),success=level!=='Fumble'&&(adjusted===1||adjusted<=p.target);
 const extraHours=success?r.successDuration:r.failureDuration;
 if(extraHours) advance(s,extraHours);
 if(!success&&r.failureDamage) {
  s.hp=Math.max(0,s.hp-r.failureDamage);
  log(s,`Lost ${r.failureDamage} health while recovering.`);
 }
 if(success&&r.clue) unlock(s,r.clue);
 const target=success?r.successEntry:r.failureEntry;
 if(target) go(s,target);
 if(success&&r.successFlag) s.flags[r.successFlag]=true;
 if(!success&&r.caughtOnFailure) s.flags.caughtOnEntry=true;
 if(!success) log(s,r.clue?'Research revealed no useful evidence.':'The attempt failed.');
 const clue=success?(r.clue||ENTRY_CLUES[r.successEntry]||null):null;
 s.lastRoll={...p,adjusted,level,spent:cost,success,clue};s.pending=null;
 return s;
}
export function travel(original,destination) {
 const option=travelOptions(original).find(l=>l.id===destination);
 if(!option||option.disabled) throw new Error('That destination is not available.');
 if(!option.open) throw new Error('That location will be closed when you arrive.');
 const s=structuredClone(original);advance(s,1);s.location=destination;
 delete s.flags.hospitalTreated;
 if(destination==='nyLibrary') {
  s.nyTopics=0;
  for(const id of Object.keys(NYC_CHECKS)) delete s.attempts[id];
 } else delete s.nyTopics;
 let entry=LOCATIONS[destination].entry;
 if(destination==='nySun') {
  delete s.attempts['ny-sun-luck'];
  if(!isOpen('nySun',s.time)) entry=NEWS_AVAILABILITY_ENTRY;
 }
 if(destination==='harding'&&(hour(s)>=20||hour(s)<8)) entry=90;
 if(destination==='home'&&s.time>=LATE_ARKHAM) entry=147;
 go(s,entry);
 log(s,`Travelled to ${LOCATIONS[destination].name}.`);return s;
}
function plain(x) {return x&&typeof x==='object'&&!Array.isArray(x);}
function num(x,min,max) {return Number.isInteger(x)&&x>=min&&x<=max;}
function str(x,max) {return typeof x==='string'&&x.length<=max;}
function validRoll(p,s,pending) {
 if(!plain(p)||!Object.hasOwn(CHECKS,p.id)) return false;
 const r=CHECKS[p.id];
 if(!num(p.roll,1,100)||!num(p.base,0,99)||p.skill!==r.skill||p.difficulty!==(r.difficulty||'Regular')||p.duration!==(r.duration??1)) return false;
 const required=r.difficulty==='Hard'?Math.floor(p.base/2):p.base;
 if(p.target!==required) return false;
 if(pending) return s.entry===r.entry&&s.phase==='playing'&&p.base===skill(s,r.skill)&&p.level===successLevel(p.roll,p.base,p.target);
 if(!num(p.adjusted,1,100)||!num(p.spent,0,50)||p.adjusted!==p.roll-p.spent||p.level!==successLevel(p.adjusted,p.base,p.target)||p.success!==(p.level!=='Fumble'&&(p.adjusted===1||p.adjusted<=p.target))) return false;
 if(p.spent&&(p.skill==='Luck'||successLevel(p.roll,p.base,p.target)==='Fumble'||p.adjusted===1)) return false;
 return p.clue===null||(Object.hasOwn(CLUES,p.clue)&&s.clues.includes(p.clue));
}
export function validateSave(s) {
 if(!plain(s)||s.version!==VERSION||!str(s.id,100)||!s.id||!str(s.name,60)||!validAllocation(s.allocation)) return false;
 if(!num(s.time,START,Date.UTC(2100,0,1))||s.time%HALF_HOUR!==0||!num(s.hp,0,9)||!num(s.mythos,0,4)||!num(s.sanity,0,99-s.mythos)||!num(s.luck,0,50)||!num(s.bank,0,2200)||!num(s.cash,0,2200)||s.bank+s.cash>2200||!num(s.sleep,0,2000000)||!num(s.sleepDebt,0,2000000)||!num(s.mealDebt,0,2)||typeof s.fastingToday!=='boolean'||(s.sleptNight!==null&&(!num(s.sleptNight,dayStart(START),s.time)||s.sleptNight%DAY!==0))) return false;
 if(!Object.hasOwn(LOCATIONS,s.location)||!['playing','complete','ending'].includes(s.phase)||!Array.isArray(s.clues)||s.clues.length>Object.keys(CLUES).length||!s.clues.every(c=>Object.hasOwn(CLUES,c))||new Set(s.clues).size!==s.clues.length) return false;
 if(!ENTRIES[s.location]?.includes(s.entry)||!plain(s.flags)) return false;
 const boolFlags=['telegramRead','ticketFunded','hardingRejected','doorOpen','windowQuiet','caughtOnEntry','bookSkimmed','hospitalTreated'];
 if(Object.entries(s.flags).some(([k,v])=>k==='endReason'?v!=='boston':!boolFlags.includes(k)||typeof v!=='boolean')) return false;
 if(s.flags.hospitalTreated&&s.entry!==585) return false;
 if(s.nyTopics!==undefined&&(s.location!=='nyLibrary'||!num(s.nyTopics,0,2))) return false;
 if(s.flags.caughtOnEntry&&![141,2,11,150].includes(s.entry)) return false;
 if(s.flags.endReason!==undefined) return false;
 if(s.phase==='playing'&&s.entry===574) return false;
 if((s.phase==='complete')!==(s.location==='liner')) return false;
 if(s.phase==='ending'&&s.entry!==574) return false;
 if(!str(s.notes,20000)||!Array.isArray(s.inventory)||s.inventory.length>100||!s.inventory.every(i=>str(i,200))||!Array.isArray(s.log)||s.log.length>15000||!s.log.every(l=>plain(l)&&num(l.time,START,s.time)&&str(l.text,500))) return false;
 if(!Array.isArray(s.meals)||s.meals.length>15000||!s.meals.every((t,i)=>num(t,MORNING,s.time)&&t%HALF_HOUR===0&&(!i||t-s.meals[i-1]>=6*HOUR))) return false;
 if(mealCount(s)>mealTarget(s)) return false;
 if(!Array.isArray(s.visited)||s.visited.length>593||!s.visited.every(e=>Object.values(ENTRIES).flat().includes(e))||!plain(s.attempts)||!Object.entries(s.attempts).every(([id,n])=>Object.hasOwn(CHECKS,id)&&num(n,1,15000))) return false;
 if(s.pending!==null&&!validRoll(s.pending,s,true)) return false;
 if(s.lastRoll!==null&&!validRoll(s.lastRoll,s,false)) return false;
 return true;
}
export function migrateSave(original) {
 const s=[3,VERSION].includes(original?.version) ? structuredClone(original) : readLegacySave(original);
 if(s.version===2) {
  s.version=3;
  s.mealDebt=0;
  s.fastingToday=false;
  s.sleepDebt=0;
  s.sleptNight=s.entry===13 ? null : dayStart(START);
  if(s.flags.endReason==='rest') {
   s.mealDebt=2-s.meals.length;
   s.sleptNight=dayStart(MORNING);
   resetDailyAttempts(s);
  }
  if(['rest','dayEnd'].includes(s.flags.endReason)) {
   s.phase='playing';
   delete s.flags.endReason;
  }
 }
 if(s.version===3) {
  s.version=VERSION;
  if(s.phase==='complete'&&s.entry===64&&s.location==='boston'&&s.flags?.endReason==='boston') {
   s.phase='playing';
   delete s.flags.endReason;
  }
 }
 if(!validateSave(s)) throw new Error('This dossier could not be read safely. The original has not been changed.');
 return s;
}
