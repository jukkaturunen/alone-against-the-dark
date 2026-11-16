import { HOUR, hourOf, nightStart, sleepHours } from './calendar.js';

export const HOTEL_COWL='hotel-cowl';
export const HOTEL_ESCAPE='hotel-escape';
export const HOTEL_ENDING='hotel-ending';
const footsteps='hotel-footsteps';
const host='hotel-private-evening';
const arabic='hotel-host-arabic';
const rest='hotel-safe';

export const HOTEL_LOCATIONS={
 athensCheapHotel:{name:'Inexpensive Athens hotel',entry:424,region:'athens',hours:[0,24],description:'A cheap room off the main streets.'},
 athensExpensiveHotel:{name:'Expensive Athens hotel',entry:127,region:'athens',hours:[0,24],description:'A comfortable room with round-the-clock service.'},
 cairoHotels:{name:'Cairo lodgings',entry:164,region:'cairo',hours:[0,24],description:'Look for a vacant hotel room or lodging in a private home.'}
};
function scene(entry,page,title,...paragraphs) {
 return {title,eyebrow:'Lodgings',source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}
export const HOTEL_SCENES={
 26:scene(26,12,'Watched in the lobby','Strangers are standing around the lobby. One turns away as you pass.'),
 123:scene(123,27,'A room off the corridor','You close your door. The sounds from the corridor grow faint.'),
 127:scene(127,28,'An expensive room','The room is comfortable and the hotel serves meals at any hour.'),
 154:scene(154,32,'A room in a private home','Your host has a room to let. You can spend the evening here and see what your host knows.'),
 164:scene(164,33,'Lodgings in Cairo','Space is tight. Try to find an available room among the hotels and private homes.'),
 169:scene(169,33,'Akhenaten’s cult','The words make you think of Akhenaten and his worship of Aten. Accounts of his reforms grew stranger as his reign progressed.'),
 175:scene(175,35,'A conversation by phrase book','Your host hesitates, then you make out three words: Aten, door, and open. The host leaves the room murmuring a prayer.'),
 185:scene(185,37,'Two visitors at the door','A short man advances with a dagger. His tall companion hangs back in a shadowy cloak.'),
 198:scene(198,39,'A warning from your host','Your host has something to say. First you need to find a language you have in common.'),
 199:scene(199,39,'An ancient curse','Your host says a dangerous object has returned to Egypt. An old curse may soon be fulfilled.'),
 200:scene(200,39,'The Top That Turns the World','Your host says the door of Aten will open and the Top will return to a pit. Egypt will turn green again, and the world you know will disappear.'),
 424:scene(424,67,'An inexpensive room','The hotel is shabby, but the hall is quiet. There is a vacant room.'),
 [footsteps]:scene(594,90,'Footsteps outside','Someone has stopped outside your door. You have time to take a quick look around or prepare to face whoever is there.'),
 [HOTEL_COWL]:scene(185,37,'The figure blocks the doorway','Your blows pass through the cloaked figure. Its eyes glow as it reaches for you.'),
 [HOTEL_ESCAPE]:scene(594,90,'Clear of the room','You make it down to the street. You can find another room and resume the investigation in the morning.'),
 [HOTEL_ENDING]:scene(185,37,'The room falls quiet','The figure catches you before you can reach the stairs.'),
 [host]:scene(154,32,'The evening at home','Your host is still awake. There may be a chance to start a conversation.'),
 [arabic]:scene(198,39,'Looking for common words','Your host speaks no English. Try Arabic or work through a phrase book.'),
 [rest]:scene(198,39,'A quiet night','Your host leaves you to rest.')
};
const encounter=[26,123,185,footsteps,HOTEL_COWL,HOTEL_ESCAPE,HOTEL_ENDING];
export const HOTEL_ENTRIES={
 athensHotel:[101,...encounter],
 athensCheapHotel:[424,...encounter],
 athensExpensiveHotel:[127,...encounter],
 cairoHotels:[101,127,154,164,169,175,198,199,200,host,arabic,rest,...encounter],
};
export const HOTEL_ENDINGS=new Set([HOTEL_ENDING]);
export const HOTEL_FLAGS=['cairoHotelStayed','hotelReady','hotelWatched'];
export const hotelLocked=s=>Object.hasOwn(HOTEL_ENTRIES,s.location)&&
 [...encounter,169,175,198,199,200,host,arabic,rest].includes(s.entry);
export const hotelMeals=s=>s.entry===127&&Object.hasOwn(HOTEL_ENTRIES,s.location);

const choice=(id,label,target,extra={})=>({id,label,target,duration:0,...extra});
const canSleep=s=>(hourOf(s.time)<8||hourOf(s.time)>=20)&&s.sleptNight!==nightStart(s.time);
const stay=choice('athens-rest','Turn in at the hotel',null,{when:canSleep,effect:'hotel-sleep-moderate'});
const sleep=choice('hotel-sleep-safely','Sleep until morning',null,{effect:'hotel-sleep-safely'});
const weapon=s=>s.inventory.includes('Revolver')||s.inventory.includes('Hunting knife');
const phraseBook=s=>s.inventory.includes('Harrison’s English/Arabic Phrase Book');
export const HOTEL_CHOICES={
 26:[],
 101:[stay],
 127:[choice('hotel-stay-expensive','Stay the night',null,{when:canSleep,effect:'hotel-sleep-expensive'})],
 154:[choice('hotel-private-night','Spend the evening in the private home',host)],
 164:[choice('hotel-find-room','See what rooms are available',null,{effect:'hotel-find-room'})],
 169:[sleep],
 175:[sleep],
 200:[sleep],
 424:[choice('hotel-take-cheap-room','Take the vacant room',26)],
 [footsteps]:[
  choice('hotel-check-window','Look out the window',HOTEL_ESCAPE),
  choice('hotel-ready-weapon','Ready your weapon',185,{when:weapon,flag:'hotelReady'}),
  choice('hotel-lock-door','Lock the door',185),choice('hotel-hide','Hide in the room',185)
 ],
 [HOTEL_ESCAPE]:[choice('hotel-sleep-safely','Continue from another room',null,{effect:'hotel-sleep-safely'})],
 [arabic]:[choice('hotel-use-phrase-book','Try your English/Arabic phrase book',175,{when:phraseBook}),sleep],
 [rest]:[sleep]
};
const check=(entry,skill,label,successEntry,failureEntry,extra={})=>({entry,skill,label,successEntry,failureEntry,duration:0,...extra});
export const HOTEL_CHECKS={
 'hotel-spot-watchers':check(26,'Spot Hidden','Look around the lobby',123,123,{successFlag:'hotelWatched',repeat:true}),
 'hotel-listen-door':check(123,'Listen','Listen at the door',footsteps,185,{repeat:true}),
 'hotel-private-luck':check(host,'Luck','See whether the host will talk',198,rest,{repeat:true}),
 'hotel-host-english':check(198,'Luck','See whether the host speaks English',199,arabic,{repeat:true}),
 'hotel-host-arabic':check(arabic,'Language (Arabic)','Speak with the host in Arabic',199,null,{daily:true}),
 'hotel-host-history':check(175,'History','Recall the history of Aten',169,rest,{repeat:true}),
 ...Object.fromEntries(['Charm','Fast Talk','Persuade'].map(skill=>[
  `hotel-host-${skill.toLowerCase().replace(' ','-')}`,check(199,skill,`Ask for more details with ${skill}`,200,rest,{repeat:true})
 ]))
};
function sleepNight(s,{advance,log}) {
 s.sleptNight=nightStart(s.time);
 s.sleep=Math.max(sleepHours(s),(s.sleptNight+30*HOUR-s.time)/HOUR);
 s.sleepDebt=0;
 advance(s,s.sleep,true);
 log(s,'Slept at the lodgings.');
}
export function hotelChoiceEffect(s,effect,tools) {
 const {go,rollDie,log}=tools;
 if(effect==='hotel-find-room') {
  const roll=rollDie(10);
  log(s,`Availability at the Cairo lodgings: rolled ${roll}.`);
  go(s,roll<=3?123:roll<=6?101:roll<=9?127:154);
  return true;
 }
 if(effect==='hotel-sleep-moderate') {
  const flag=s.location==='cairoHotels'?'cairoHotelStayed':'athensHotelStayed';
  sleepNight(s,tools);
  if(s.flags[flag]) go(s,26);
  else s.flags[flag]=true;
  return true;
 }
 if(effect==='hotel-sleep-expensive') {
  const field=s.location==='cairoHotels'?'cairoHotelNights':'athensHotelNights';
  sleepNight(s,tools);
  const nights=s[field]=Math.min(10,(s[field]||0)+1);
  if(nights>=2&&rollDie(10)>10-nights) go(s,26);
  return true;
 }
 if(effect==='hotel-sleep-safely') {
  if(s.entry!==HOTEL_ESCAPE||s.sleptNight!==nightStart(s.time)) sleepNight(s,tools);
  go(s,HOTEL_LOCATIONS[s.location]?.entry??101);
  return true;
 }
 return false;
}
export function hotelEnter(s) {
 if(s.entry===26) delete s.flags.hotelWatched;
 if(![185,HOTEL_COWL].includes(s.entry)) delete s.flags.hotelReady;
 if([HOTEL_ESCAPE,HOTEL_ENDING].includes(s.entry)) delete s.shipCombat;
 if(s.entry===HOTEL_ENDING) {s.hp=0;s.phase='ending';}
}
export function validateHotel(s) {
 return [s.athensHotelNights,s.cairoHotelNights].every(n=>n===undefined||Number.isInteger(n)&&n>=1&&n<=10)
  &&(!s.flags.hotelReady||[185,HOTEL_COWL].includes(s.entry));
}
