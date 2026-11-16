import { DAY, HOUR, dayStart } from './calendar.js';

const desert = 'Western Desert';
const death = 'quattarra-death';
const dagger = 'Jeweled dagger from the Western Desert';

export const QT_LOCATIONS = {
 quattarra:{
  name:'Western Desert',entry:341,region:'quattarra',hours:[0,24],unavailable:true,
  description:'The caravan route toward the Quattarra Depression.'
 }
};

function scene(entry,page,title,...paragraphs) {
 return {title,eyebrow:desert,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const QT_SCENES = {
 341:scene(341,58,'With the caravan',
  'In the chill before sunrise, the camel drivers share hot coffee and milk. Once the caravan starts moving, there is little conversation.',
  'At night you lay out your bedding a short distance from the others. By dawn the camels and their drivers have vanished.'),
 94:scene(94,24,'Alone in the desert',
  'Sand stretches in every direction. The water in your flask will determine how far you can walk. Try to judge how sparingly you can drink before setting out.'),
 210:scene(210,41,'The Nile',
  'You splash water from the Nile over your face. Engineers and archaeologists working along the river can give you rides north to Cairo.'),
 213:scene(213,42,'A featureless trail',
  'The flat horizon gives you few landmarks. Try to get your bearings before deciding whether to walk or wait for help.'),
 214:scene(214,42,'Familiar sands',
  'You could swear you have passed these dunes before. There is nothing in sight by which to judge.'),
 220:scene(220,42,'Watching for a caravan',
  'A caravan might pass this way. You scan the horizon for the outline of camels.'),
 232:scene(232,44,'The burning sands',
  'The desert goes on for miles. You can keep to your last heading or risk a different direction.'),
 234:scene(234,44,'The outskirts of Giza',
  'You work out that Cairo lies east. By nightfall you reach the western suburbs of Giza.'),
 235:scene(235,44,'Searching the horizon',
  'Heat blurs the distance. If you cannot fix your position, you can pick a direction or stop and watch for help.'),
 242:scene(242,'44–45','The caravan trail',
  'You find a track across the sand. A caravan is visible, but it is too far away to see which way it is going.'),
 245:scene(245,45,'The mirage',
  'You hurry toward a distant city. Its domes seem to tremble in the heat, then disappear.'),
 246:scene(246,45,'The edge of a ravine',
  'The sand falls away only a few steps ahead. Below you, the ravine is deep enough to disappear into shadow.'),
 254:scene(254,46,'The Mediterranean',
  'The dunes give way to open water. A railway maintenance crew offers you a ride to Alexandria on a handcar.'),
 255:scene(255,46,'A sandstorm',
  'Yellow clouds drive you into a gully. By the time the storm lets up, you can no longer recognize the ground you have crossed.'),
 256:scene(256,'46–47','A little water',
  'You find a shallow pool and drink from it, saving what remains in your flask.'),
 257:scene(257,47,'Finding your bearings',
  'The sky may give you a bearing. If that fails, you can wait for help or choose a direction on foot.'),
 268:scene(268,50,'Fractured rock',
  'Rock breaks loose under your foot. You pull yourself upright with a sprained ankle and cuts from the fall.'),
 269:scene(269,50,'A flower in a cleft',
  'A single white flower grows in the shade of the ravine. You pause before pressing on.'),
 277:scene(277,51,'Alexandria in sight',
  'The rocks have cut through your shoes. Then, just as you think you cannot take another step, the skyline of Alexandria comes into view.'),
 278:scene(278,51,'Eastward across the sands',
  'The sun beats down on you, but you begin to see signs that you are on the right course.'),
 279:scene(279,51,'Too far south',
  'From a hill you glimpse what might be palm trees further south. You can trust your eyes or retrace your steps.'),
 283:scene(283,51,'Bones in the sand',
  'The wind has uncovered human and animal bones. A jeweled dagger lies among them. A buyer in Cairo would pay $100 for it.'),
 285:scene(285,52,'The oasis',
  'You drink your fill at the oasis. The inhabitants tend to you for two days, then traders offer to carry you back to Cairo.'),
 299:scene(299,53,'The desert closes in',
  'You are exhausted and the horizon swims. Try to find a bearing or gather the will to go on.'),
 [death]:scene(299,53,'Lost in the Western Desert',
  'Your strength gives out in the desert. Another investigator may be able to take up the trail.')
};

export const QT_ENDINGS = new Set([death]);
export const QT_ENTRIES = {quattarra:Object.keys(QT_SCENES).map(key=>Number(key)||key)};

const choice = (id,label,target,options={})=>({id:`quattarra-${id}`,label,target,duration:0,...options});
const walk = (id,label,target,when)=>choice(id,label,target,{effect:'quattarra-walk',detail:'One day on foot',when});
const direction = (name,target,when)=>walk(name,`Walk ${name}`,target,when);
const directions = (north,east,south,west,when)=>[
 direction('north',north,when),direction('east',east,when),
 direction('south',south,when),direction('west',west,when)
];
const failed = (s,...ids)=>ids.every(id=>s.quattarra?.failed.includes(id));
const noBearing = s=>s.quattarra?.failed.length>0;
const bothFailed = s=>failed(s,'quattarra-far-navigate','quattarra-far-pow');
const forced = (id,label,target,detail)=>choice(id,label,target,{detail,effect:`quattarra-${id}`});
const waitForHelp = walk('wait-help','Wait for someone to pass',256,noBearing);

export const QT_CHOICES = {
 384:[choice('join','Join the caravan to the Quattarra Depression',341)],
 341:[forced('caravan-camp','Continue with the caravan',94,'Travel to the following dawn')],
 134:[choice('sell-dagger','Sell the jeweled dagger',134,{
  when:s=>s.inventory.includes(dagger)&&s.cash<=99900,detail:'Receive $100',effect:'quattarra-sell-dagger'
 })],
 210:[forced('nile','Follow the river to Cairo',205,'1D4 days')],
 213:[waitForHelp,...directions(277,278,269,257,noBearing)],
 214:directions(269,210,279,232),
 232:directions(235,214,279,245),
 234:[forced('giza','Continue into Cairo',205)],
 235:[waitForHelp,...directions(257,269,232,255,noBearing)],
 245:directions(255,232,279,299),
 246:directions(255,232,279,299),
 254:[forced('coast','Ride the handcar to Alexandria',195)],
 255:directions(283,235,245,299),
 257:[waitForHelp,...directions(246,213,235,283,noBearing)],
 268:directions(254,246,283,299),
 269:directions(213,210,214,235),
 277:[forced('alexandria','Enter Alexandria',195)],
 278:[choice('continue-east','Keep going east',234)],
 279:[
  walk('palms','Head toward the palm trees',285),
  walk('retrace-dunes','Retrace your steps to the dunes',214),
  walk('retrace-sands','Retrace your steps across the open sands',232),
  walk('retrace-ravine','Retrace your steps to the ravine',246)
 ],
 283:directions(268,257,255,299),
 285:[forced('oasis','Join the traders travelling to Cairo',134,'Two days at the oasis · 1D3 + 1 days of travel')],
 299:[
  direction('south',255,s=>failed(s,'quattarra-far-survived')),
  direction('west',283,s=>failed(s,'quattarra-far-survived')),
  walk('last-mirage','Go back toward the mirage',245,s=>failed(s,'quattarra-far-survived'))
 ]
};

const check = (entry,skill,label,options={})=>({entry,skill,label,duration:0,repeat:true,...options});
const navigate = entry=>check(entry,'Navigate','Try to get your bearings',{
 when:s=>!noBearing(s),successEffect:'quattarra-east',failureEffect:'quattarra-no-bearing'
});
const bearing = (skill,label,options={})=>check(257,skill,label,{
 when:s=>!noBearing(s),successEffect:'quattarra-east',failureEffect:'quattarra-no-bearing',...options
});
const farCheck = (id,skill,label)=>check(299,skill,label,{
 when:s=>!failed(s,id),successEffect:'quattarra-find-oasis',failureEffect:id
});

export const QT_CHECKS = {
 'quattarra-ration':check(94,'Survival (Desert)','Ration your water and set out',{
  successEffect:'quattarra-start-extra-water',failureEffect:'quattarra-start'
 }),
 'quattarra-navigate-213':navigate(213),
 'quattarra-navigate-235':navigate(235),
 'quattarra-astronomy':bearing('Science (Astronomy)','Look for a bearing in the sky'),
 'quattarra-know':bearing('EDU','Recall what you know of the desert',{difficulty:'Hard'}),
 'quattarra-caravan':check(220,'Luck','Look for a friendly caravan',{
  successEffect:'quattarra-friendly-caravan',failureEffect:'quattarra-missed-caravan'
 }),
 'quattarra-trail':check(242,'Luck','See which way the caravan is heading',{
  successEffect:'quattarra-trail-rescue',failureEffect:'quattarra-lost-caravan'
 }),
 'quattarra-wait':check(256,'Luck','See who comes by',{
  successEffect:'quattarra-spot-alexandria',failureEffect:'quattarra-waited-in-vain'
 }),
 'quattarra-far-navigate':farCheck('quattarra-far-navigate','Navigate','Try to find a bearing'),
 'quattarra-far-pow':farCheck('quattarra-far-pow','POW','Gather the will to go on'),
 'quattarra-far-survival':check(299,'Survival (Desert)','Fight exhaustion',{
  when:s=>bothFailed(s)&&!failed(s,'quattarra-far-survived'),
  successEffect:'quattarra-far-survived',failureEntry:death
 })
};

const relief = new Set([210,234,254,285]);

export function quattarraEnter(s,previousEntry,{go,rollDie,log}) {
 if(s.entry===341||s.entry===94) {
  s.location='quattarra';
  if(s.entry===94) {
   const water=rollDie(10);
   s.quattarra={water,failed:[]};
   log(s,`Your flask holds ${water} day${water===1?'':'s'} of water.`);
  }
  return;
 }
 if(s.location!=='quattarra') {
  delete s.quattarra;
  return;
 }
 if(QT_ENDINGS.has(s.entry)) {
  s.phase='ending';
  s.hp=0;
  delete s.quattarra;
  return;
 }
 const trail=s.quattarra;
 if(s.entry===previousEntry) return;
 trail.failed=[];
 delete trail.waitFrom;
 if(s.entry===256) trail.waitFrom=previousEntry;
 if(s.entry!==256&&!relief.has(s.entry)) {
  if(trail.water>0) trail.water--;
  else {
   s.hp=Math.max(0,s.hp-6);
   log(s,'You are out of water. Lost 6 health to thirst.');
  }
 }
 if(s.entry===268&&s.hp>0) {
  const damage=rollDie(2);
  s.hp=Math.max(0,s.hp-damage);
  log(s,`Lost ${damage} health in the fall.`);
 }
 if(s.hp===0) {
  go(s,death);
  return;
 }
 if(s.entry===283&&s.inventory.length<100&&!s.inventory.includes(dagger)) {
  s.inventory.push(dagger);
  log(s,'Picked up a jeweled dagger from the bones.');
 }
}

function returnToCity(s,location,entry,hours,{advanceJourney,go}) {
 if(hours) advanceJourney(s,hours);
 s.location=location;
 go(s,entry);
}
const returnToCairo = (s,hours,ops,marketArrival=false)=>
 returnToCity(s,marketArrival?'fuziraMarket':'cairoRail',marketArrival?134:205,hours,ops);
const returnToAlexandria = (s,hours,ops)=>returnToCity(s,'alexandriaHarbor',195,hours,ops);

function travelOnFoot(s,target,{advance,go}) {
 // Each day's travel includes camping overnight, but there is nowhere to buy meals.
 advance(s,24,true);
 go(s,target);
}

export function quattarraChoiceEffect(s,effect,ops,target) {
 const {rollDie,go,advanceJourney,log}=ops;
 switch(effect) {
  case 'quattarra-caravan-camp': {
   const dawn=dayStart(s.time)+6*HOUR;
   const departure=s.time<dawn?dawn:dawn+DAY;
   advanceJourney(s,(departure+DAY-s.time)/HOUR,'Travelled with the caravan and camped overnight.');
   go(s,94);
   break;
  }
  case 'quattarra-walk': travelOnFoot(s,target,ops); break;
  case 'quattarra-nile': returnToCairo(s,24*rollDie(4),ops); break;
  case 'quattarra-giza': returnToCairo(s,0,ops); break;
  case 'quattarra-coast':
  case 'quattarra-alexandria': returnToAlexandria(s,0,ops); break;
  case 'quattarra-oasis': returnToCairo(s,24*(3+rollDie(3)),ops,true); break;
  case 'quattarra-sell-dagger':
   s.inventory.splice(s.inventory.indexOf(dagger),1);
   s.cash+=100;
   log(s,'Sold the jeweled dagger for $100.');
   break;
  default: return false;
 }
 return true;
}

function firstDirection(rollDie) {
 let roll=rollDie(10);
 // Entry 94 omits 5. Reroll it to preserve the printed outcomes.
 while(roll===5) roll=rollDie(10);
 if(roll===1) return 213;
 if(roll<=4) return 235;
 return roll===10?279:257;
}

export function quattarraCheckEffect(s,effect,ops) {
 const {rollDie,log}=ops;
 switch(effect) {
  case 'quattarra-start-extra-water': {
   const water=rollDie(3);
   s.quattarra.water+=water;
   log(s,`Rationing stretches your supply by ${water} day${water===1?'':'s'}.`);
   travelOnFoot(s,firstDirection(rollDie),ops);
   break;
  }
  case 'quattarra-start': travelOnFoot(s,firstDirection(rollDie),ops); break;
  case 'quattarra-east': travelOnFoot(s,234,ops); break;
  case 'quattarra-find-oasis': travelOnFoot(s,285,ops); break;
  case 'quattarra-friendly-caravan': returnToCairo(s,24*rollDie(3),ops); break;
  case 'quattarra-trail-rescue': returnToCairo(s,0,ops); break;
  case 'quattarra-missed-caravan': travelOnFoot(s,232,ops); break;
  case 'quattarra-lost-caravan': travelOnFoot(s,235,ops); break;
  case 'quattarra-spot-alexandria': returnToAlexandria(s,0,ops); break;
  case 'quattarra-waited-in-vain': travelOnFoot(s,s.quattarra.waitFrom===213?220:242,ops); break;
  case 'quattarra-no-bearing':
  case 'quattarra-far-navigate':
  case 'quattarra-far-pow':
  case 'quattarra-far-survived': s.quattarra.failed.push(effect); break;
  default: return false;
 }
 return true;
}

export function quattarraStatus(s) {
 if(!s.quattarra||relief.has(s.entry)) return null;
 const {water}=s.quattarra;
 return water===0?'Out of water · Lose 6 health on each day without relief':
  `Water remaining · ${water} day${water===1?'':'s'}`;
}

const bearingEntries = [213,235,257];
const farEffects = ['quattarra-far-navigate','quattarra-far-pow','quattarra-far-survived'];

export function validateQuattarra(s) {
 const trail=s.quattarra;
 if(s.location!=='quattarra'||s.entry===341||QT_ENDINGS.has(s.entry)) return trail===undefined;
 if(!trail||typeof trail!=='object'||Array.isArray(trail)||!Number.isInteger(trail.water)||trail.water<0||trail.water>13) return false;
 const effects=s.entry===299?farEffects:bearingEntries.includes(s.entry)?['quattarra-no-bearing']:[];
 if(!Array.isArray(trail.failed)||new Set(trail.failed).size!==trail.failed.length||!trail.failed.every(effect=>effects.includes(effect))) return false;
 if(trail.failed.includes('quattarra-far-survived')&&!bothFailed(s)) return false;
 return s.entry===256?bearingEntries.includes(trail.waitFrom):trail.waitFrom===undefined;
}
