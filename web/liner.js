import { DAY, HOUR, dayStart } from './calendar.js';
import { EARLY_RULES } from './liner-early.js';
import { LATE_RULES } from './liner-late.js';

const slots = ['am','pm','night'];
const periods = ['Morning','Afternoon','Evening'];
const activities = [
 ['bingo','Bingo','pm night'], ['bridge','Bridge','pm night'],
 ['cinema','Cinema','am pm night'], ['cocktails','Cocktails','pm night'],
 ['deck-tennis','Deck Tennis','am pm'], ['library','Library','am pm night'],
 ['mah-jong','Mah Jong','am pm night'], ['nightclub','Nightclub','night'],
 ['oil-painting','Oil Painting','am pm'], ['ping-pong','Ping Pong','am pm night'],
 ['rest-deck','Rest on Deck Chairs','am pm'], ['room','Rest in Room','am pm night'],
 ['sauna','Sauna','am pm night'], ['tour','Ship’s Tour','pm'],
 ['shopping','Shopping','am pm'], ['shuffleboard','Shuffleboard','am pm'],
 ['stroll','Stroll Decks','am pm night']
];
export const SHIP_DAYS = [73,109,126,148,148,192,193,171];
export const LINER_ARRIVALS = {
 athensHarbor:{name:'Piraeus Harbor',entry:173,region:'athens',hours:[0,24],description:'The harbor below Athens.'},
 alexandriaHarbor:{name:'Alexandria Harbor and Rail Station',entry:195,region:'alexandria',hours:[0,24],description:'The docks and railway station.'}
};
export const LINER_SCENES = {
 148:{title:'The promenade',eyebrow:'Atlantic crossing',source:'Entry 148 · p. 31',adapted:true,paragraphs:['You can take a turn on deck or join a game of shuffleboard.']},
 192:{title:'Friday on the liner',eyebrow:'Atlantic crossing',source:'Entry 192 · p. 39',adapted:true,paragraphs:['There is time for another visit to the ship’s public rooms.']},
 193:{title:'Saturday on the liner',eyebrow:'Atlantic crossing',source:'Entry 193 · p. 39',adapted:true,paragraphs:['You consider how to spend the day at sea.']},
 171:{title:'The last days at sea',eyebrow:'Atlantic crossing',source:'Entry 171 · p. 34',adapted:true,paragraphs:['You can rest in your room, join the painters, or visit the cocktail lounge.']},
 187:{title:'Aboard the Cunard liner',eyebrow:'Atlantic crossing',source:'Entry 187 · p. 37',adapted:true,
  paragraphs:['Choose an activity or skip ahead to the next period with an encounter. Meals and lodging are included during the voyage.']},
 173:{title:'Landfall at Piraeus',eyebrow:'Athens Harbor',source:'Entry 173 · pp. 34–35',adapted:true,
  paragraphs:['The liner docks beneath a brilliant midday sun. Beyond the harbor, Athens gleams on the hills. Your next lead is the Bureau of Investigation.']},
 195:{title:'The docks of Alexandria',eyebrow:'Alexandria Harbor and Rail Station',source:'Entry 195 · p. 39',adapted:true,
  paragraphs:['The ship docks beside a maze of narrow streets, shops, and cafés. Nearby, trains connect Alexandria to Cairo.']}
};

export function startVoyage(s) {
 s.voyage={departure:s.time,day:1,slot:0};
 s.phase='playing';
 setVoyageClock(s);
}

function setVoyageClock(s) {
 const {departure,day,slot}=s.voyage;
 if(slot===0) {
  const root=day===6?(s.visited.includes(126)?590:126):day===7?(s.visited.includes(148)?171:148):SHIP_DAYS[day-1];
  if(root) {
   s.voyage.dayRoot=root;
   const marker=SHIP_DAYS[day-1];
   if(marker&&!s.visited.includes(marker)&&![126,148].includes(marker)) s.visited.push(marker);
  } else delete s.voyage.dayRoot;
 }
 s.time=dayStart(departure)+day*DAY+[8,13,20][slot]*HOUR;
}

export function finishActivity(s,advanceDay=false) {
 if(advanceDay||++s.voyage.slot===slots.length) {
  s.voyage.slot=0;
  s.voyage.day++;
 }
 setVoyageClock(s);
}

export function voyagePeriod(s) {
 return s.voyage.day>8?'Arrival':periods[s.voyage.slot];
}

function periodActivities(s) {
 const slot=slots[s.voyage.slot];
 return activities.filter(([, ,times])=>times.split(' ').includes(slot)).map(([id,label])=>({
  id:'ship-activity-'+id,label,detail:periods[s.voyage.slot]
 }));
}

function hasEncounter(s) {
 return periodActivities(s).some(action=>activityResult(s,action.id));
}

export function skipQuietPeriods(s) {
 let skipped=0;
 do {
  finishActivity(s);
  skipped++;
 } while(s.voyage.day<=8&&!hasEncounter(s));
 return skipped;
}

export function voyageActions(s) {
 if(s.voyage.day>8) return [
  {id:'ship-disembark-athens',label:'Disembark at Piraeus',detail:'Monday · noon'},
  {id:'ship-disembark-alexandria',label:'Stay aboard for Alexandria',detail:'Tuesday · 1 PM'}
 ];
 const options=periodActivities(s);
 const fastForward={
  id:'ship-skip-quiet',
  label:hasEncounter(s)?'Pass on this period and skip ahead':'Skip quiet periods',
  detail:'Stop when an activity can lead to an encounter, or at landfall'
 };
 return [fastForward,{
  id:'ship-skip-to-port',
  label:'Skip to landfall',
  detail:'Pass on all remaining shipboard encounters and choose where to disembark'
 },...options];
}

export function activityResult(s,id) {
 const activity=id.slice('ship-activity-'.length);
 const rule=[...EARLY_RULES,...LATE_RULES].find(r=>r.day===s.voyage.day&&r.slot===slots[s.voyage.slot]&&(r.activities.includes(activity)||r.activities.includes('*')));
 const entry=rule?.entry;
 return typeof entry==='function'?entry(s,activity):entry;
}

export function skipVoyage(s) {
 s.voyage.day=9;
 s.voyage.slot=0;
 setVoyageClock(s);
}

export function arrive(s,destination) {
 const athens=destination==='athensHarbor';
 s.time=dayStart(s.voyage.departure)+(athens?9:10)*DAY+(athens?12:13)*HOUR;
 delete s.voyage;
 s.location=destination;
 s.phase='complete';
 s.mealDebt=0;
 s.fastingToday=false;
 s.sleep=8;
 s.sleepDebt=0;
 s.sleptNight=dayStart(s.time)-DAY;
}
