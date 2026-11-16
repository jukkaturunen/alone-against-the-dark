import { HOUR, dayStart, hourOf } from './calendar.js';

const police = 'Cairo Police';
const market = 'Fuzira Marketplace';
const cafe = 'Fuzira café';
const cutoff = Date.UTC(1931, 10, 1);
const marketHours = [[6,11],[16,20]];
const mirrorHound = 'fuzira-mirror-hound';
const stallEscape = 'fuzira-stall-escape';
const stallEnding = 'fuzira-stall-ending';
const daggerWin = 'fuzira-dagger-win';

export const CITY_LOCATIONS = {
 cairoPolice:{
  name:police,entry:144,region:'cairo',hours:[0,24],
  description:'Ask the police about the Cairo Museum and the Karpathos Device.'
 },
 fuziraMarket:{
  name:market,entry:134,region:'cairo',hours:[6,20],windows:marketHours,
  hoursLabel:'6–11 AM and 4–8 PM · Daily',
  description:'Find transport, talk to traders, or linger at an outdoor café to hear local rumors.'
 }
};

function marketOpen(time) {
 return marketHours.some(([open,close])=>hourOf(time)>=open&&hourOf(time)<close);
}

export function cityOpen(location,time) {
 if(location==='fuziraMarket') return marketOpen(time);
}

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const CITY_SCENES = {
 144:scene(police,'Cairo · Egypt',144,30,
  'The officers are friendly, but they have little to tell you.'),
 114:scene('The police account of the theft',police,114,26,
  'The officers confirm that the Karpathos Device is gone. They have no suspect and suggest that the Fuzira Marketplace is a good place to hear the rumors for yourself.'),
 134:scene(market,'Cairo · Egypt',134,29,
  'British soldiers drift past row after row of stalls. You can read some of the signs in English. The market opens from six to eleven in the morning and again from four to eight in the evening.'),
 340:scene('An outdoor café',market,340,58,
  'Talk drifts from nearby tables. Spend an hour listening. The better your Arabic, the more you can make out.'),
 342:scene('Where the thieves fled',cafe,342,58,
  'One table puts the thieves near the Quattarra Depression. Another insists the Device belongs to a mechanical idol of Aten out in the desert. Someone says it is destined for Akhenaten’s city.'),
 343:scene('A key to the Lost Pyramid',cafe,343,58,
  'A patron claims the Device is part of an ancient lock and that Aten’s followers stole it to release something evil. Another names Tell-el-Amarna as the site of the Lost Pyramid. There is also talk of strange nomad bands near the Quattarra Depression.'),
 365:scene('The east side of the pyramid',cafe,365,60,
  'You hear that people have carried bodies to the eastern face of the Tell-el-Amarna pyramid. At the same table, a patron claims Amet Keh served the cult of Aten and that the cult may now want him dead.'),
 387:scene('The door has a key',cafe,387,63,
  'A voice insists that Keh is dead, that the Device opens a door, and that the Lost Tomb is occupied. Someone predicts a fresh upheaval at the vernal equinox.'),
 363:scene('The tomb’s guardians',cafe,363,60,
  'One patron claims creatures guard the lower levels of the tombs and feed on human sacrifices. They cannot bear sunlight, the patron says, and they have the Device that opens the door.'),
 318:scene('The fortune-teller',market,318,55,
  'An old woman looks up as you step behind the curtain. She accepts a small coin and studies your face.'),
 389:scene('A door in the dark',market,389,64,
  'She describes a creature with a basket, a door opening, and a gleam in the darkness. She sees you trembling, then falls silent.'),
 378:scene('A reluctant oracle',market,378,62,
  'The woman draws back. You can try to persuade her to tell you what else she saw.'),
 396:scene('A world of ice',market,396,64,
  'She sees you alone in darkness, then blood and ice as far as the eye can see. Whatever she sees last frightens her enough to usher you out.'),
 374:scene('Pottery and artifacts',market,374,62,
  'The shopkeeper looks familiar. Cheap pottery and imitation artifacts crowd his shelves. An hour among the racks might turn up something genuine.'),
 191:scene('An ornate mirror',market,191,38,
  'The frame looks like ordinary filigree from across the stall. Closer up, the metalwork resolves into a frieze of snarling animals.'),
 [mirrorHound]:scene('A face in the glass',market,191,38,
  'A hideous hound looks back from the glass. Its gaze settles on you before you can pull away. You have the awful certainty that it can follow you.'),
 375:scene('The shopkeeper blocks the door',market,375,62,
  'The shopkeeper draws a knife, steps between you and the exit, and cries out in Aten’s name.'),
 [stallEscape]:scene('Out of the stall',market,375,62,
  'The shopkeeper is no longer between you and the door. You make it out to the street.'),
 [stallEnding]:scene('The pottery stall falls quiet',market,375,62,
  'The shopkeeper cuts you down inside the stall. Your investigation ends here.'),
 383:scene('Outfitters and suppliers',market,383,63,
  'Travel supplies and weapons are available at a steep markup. A skilled negotiator can get the ordinary prices. The heat limits you to three pieces of expedition equipment.'),
 414:scene('The dagger-throw stall',market,414,67,
  'The stallholder offers finely balanced daggers and a small prize for hitting the mark. You have a piastre in your pocket.'),
 [daggerWin]:scene('The crowd cheers',market,414,67,
  'Your score draws a crowd. The stallholder counts out your winnings and closes the arcade.')
};

export const CITY_ENTRIES = {
 cairoPolice:[144,114],
 fuziraMarket:Object.keys(CITY_SCENES)
  .map(entry=>Number(entry)||entry)
  .filter(entry=>!([144,114].includes(entry)))
};

function clue(title,type,entry,text=CITY_SCENES[entry].paragraphs.join('\n\n')) {
 return {title,type,source:CITY_SCENES[entry].source,text};
}

export const CITY_CLUES = {
 cairoPoliceTheft:clue('The police confirm the theft','Police interview',114),
 fuziraThieves:clue('The thieves and the desert route','Café rumor',342),
 fuziraPyramidLock:clue('An ancient lock at Tell-el-Amarna','Café rumor',343),
 fuziraEasternFace:clue('Activity at the eastern face','Café rumor',365),
 fuziraEquinox:clue('The tomb and the equinox','Café rumor',387),
 fuziraGuardians:clue('The tomb’s guardians','Café rumor',363),
 fuziraFortune:clue('The fortune-teller’s vision','Market encounter',389),
 fuziraFrozenWorld:clue('A vision of a frozen world','Market encounter',396),
 fuziraHound:clue('The creature in the mirror','Market encounter',mirrorHound),
 fuziraStallAten:clue('A shopkeeper attacks in Aten’s name','Market encounter',375)
};

export const CITY_ENTRY_CLUES = {
 114:'cairoPoliceTheft',342:'fuziraThieves',343:'fuziraPyramidLock',365:'fuziraEasternFace',
 387:'fuziraEquinox',363:'fuziraGuardians',389:'fuziraFortune',396:'fuziraFrozenWorld',
 [mirrorHound]:'fuziraHound',375:'fuziraStallAten'
};

export const CITY_FLAGS = ['fuziraDaggerWon','fuziraBargain'];
export const CITY_ENDINGS = [stallEnding];

function choice(id,label,target,options={}) {
 return {id,label,target,duration:0,detail:'No time passes',...options};
}

const atMarketHours = s=>marketOpen(s.time);
const enoughTime = s=>atMarketHours(s)&&marketOpen(s.time+HOUR-1);
const returnToMarket = choice('fuzira-return','Return to the marketplace',134);
const returnFromRumor = [choice('fuzira-return-cafe','Return to the café',340),returnToMarket];
const marketStall = (id,label,target,when=atMarketHours)=>choice(id,label,target,{when});
const shopReopened = s=>!s.log.some(visit=>visit.time>=dayStart(s.time)&&visit.text==='Left the pottery stall after the attack.');
const supplies = {
 'fuzira-buy-flashlight':{item:'Flashlight',price:5},
 'fuzira-buy-rope':{item:'Rope',price:3},
 'fuzira-buy-compass':{item:'Compass',price:5},
 'fuzira-buy-bandages':{item:'Gauze bandages',price:2},
 'fuzira-buy-knife':{item:'Hunting knife',price:8},
 'fuzira-buy-revolver':{item:'Revolver',price:25}
};
const supplyItems = Object.values(supplies).map(supply=>supply.item);
const buySupplies = Object.entries(supplies).flatMap(([id,{item,price}])=>[false,true].map(bargain=>{
 const cost = bargain?price:3*price;
 return choice(`${id}${bargain?'-bargain':''}`,`Buy ${item.toLowerCase()}`,null,{
  detail:`$${cost}`,
  effect:id,
  when:s=>atMarketHours(s)&&Boolean(s.flags.fuziraBargain)===bargain&&s.cash>=cost
   &&!s.inventory.includes(item)&&s.inventory.length<100&&s.inventory.filter(item=>supplyItems.includes(item)).length<3
 });
}));

export const CITY_CHOICES = {
 144:[choice('cairo-police-theft','Ask about the missing Device',114,{when:s=>s.time>=cutoff})],
 114:[choice('cairo-police-market','Follow the lead to Fuzira Marketplace',134,{
  destination:'fuziraMarket',duration:1,detail:'Travel takes one hour',when:s=>marketOpen(s.time+HOUR)
 })],
 134:[
  marketStall('fuzira-travel','Ask about caravans and travel',384),
  marketStall('fuzira-pottery','Browse the pottery and artifacts',374,s=>atMarketHours(s)&&shopReopened(s)),
  marketStall('fuzira-fortune','Visit the fortune-teller',318),
  marketStall('fuzira-cafe','Sit down at the outdoor café',340),
  marketStall('fuzira-suppliers','Visit the outfitters',383),
  marketStall('fuzira-daggers','Try the dagger-throw game',414,s=>atMarketHours(s)&&!s.flags.fuziraDaggerWon)
 ],
 318:[choice('fuzira-pay-fortune','Offer a coin for a reading',389),returnToMarket],
 389:[choice('fuzira-press-fortune','Ask what else she saw',378),returnToMarket],
 378:[returnToMarket],
 396:[returnToMarket],
 340:[choice('fuzira-listen','Listen to the conversations',null,{effect:'fuzira-rumors',duration:1,detail:'1 hour · 1D10 plus Arabic',when:enoughTime}),returnToMarket],
 342:returnFromRumor,
 343:returnFromRumor,
 365:returnFromRumor,
 387:returnFromRumor,
 363:returnFromRumor,
 374:[returnToMarket],
 191:[returnToMarket],
 [stallEscape]:[returnToMarket],
 383:[...buySupplies,returnToMarket],
 414:[returnToMarket],
 [daggerWin]:[returnToMarket]
};

function check(entry,skill,label,options={}) {
 return {entry,skill,label,duration:0,...options};
}

const stallWeapons = {
 'fuzira-fists':{skill:'Fighting (Brawl)',label:'Fight with your fists',sides:3},
 'fuzira-knife':{skill:'Fighting (Brawl)',label:'Fight with your hunting knife',sides:6,item:'Hunting knife'},
 'fuzira-revolver':{skill:'Firearms (Handgun)',label:'Fire your revolver at close range',sides:10,item:'Revolver'}
};
const daggerTime = s=>atMarketHours(s)&&marketOpen(s.time+3*HOUR-1);
const bargainOpen = s=>atMarketHours(s)&&!s.flags.fuziraBargain
 && !s.attempts['fuzira-barter-charm']&&!s.attempts['fuzira-barter-fast-talk'];

export const CITY_CHECKS = {
 'fuzira-persuade-fortuneteller':check(378,'Persuade','Persuade her to continue',{successEntry:396,failureEntry:134}),
 'fuzira-spot-mirror':check(374,'Spot Hidden','Look for something unusual',{
  duration:1,daily:true,when:enoughTime,successEntry:191,failureEntry:134
 }),
 'fuzira-int-mirror':check(191,'INT','Study the frame before looking into the glass',{
  repeat:true,successEntry:375,failureEntry:mirrorHound
 }),
 'fuzira-mirror-sanity':check(mirrorHound,'Sanity','Steady yourself and leave the stall',{
  successEffect:'fuzira-mirror-shaken',failureEffect:'fuzira-mirror-terrified'
 }),
 'fuzira-stall-dodge':check(375,'Dodge','Dodge past the shopkeeper',{
  repeat:true,successEffect:'fuzira-stall-finish',failureEffect:'fuzira-stall-counter'
 }),
 ...Object.fromEntries(Object.entries(stallWeapons).map(([id,weapon])=>[id,check(375,weapon.skill,weapon.label,{
  when:s=>!weapon.item||s.inventory.includes(weapon.item),
  repeat:true,successEffect:id,failureEffect:'fuzira-stall-counter'
 })])),
 'fuzira-barter-charm':check(383,'Charm','Bargain with the merchant',{
  difficulty:'Hard',when:bargainOpen,daily:true,successFlag:'fuziraBargain'
 }),
 'fuzira-barter-fast-talk':check(383,'Fast Talk','Talk the merchant down to ordinary prices',{
  difficulty:'Hard',when:bargainOpen,daily:true,successFlag:'fuziraBargain'
 }),
 'fuzira-play-daggers':check(414,'Throw','Play for the arcade prize',{
  when:s=>daggerTime(s)&&!s.flags.fuziraDaggerWon,repeat:true,
  successDuration:3,successEntry:daggerWin,successFlag:'fuziraDaggerWon'
 })
};

export function cityChoiceEffect(s,effect,{rollDie,go,log,skill}) {
 const supply = supplies[effect];
 if(supply) {
  const cost = s.flags.fuziraBargain?supply.price:3*supply.price;
  s.cash -= cost;
  s.inventory.push(supply.item);
  log(s,`Bought ${supply.item.toLowerCase()} for $${cost} at Fuzira Marketplace.`);
  return true;
 }
 if(effect!=='fuzira-rumors') return false;
 const roll = rollDie(10);
 const arabic = skill(s,'Language (Arabic)');
 const total = roll+Math.ceil(arabic/10);
 const entry = [342,343,365,387,363][Math.min(4,Math.floor((total-1)/2))];
 log(s,`Café rumors: rolled ${roll}, modified to ${total}.`);
 go(s,entry);
 return true;
}

function leaveTheStall(s,go,log) {
 delete s.cityStallDamage;
 log(s,'Left the pottery stall after the attack.');
 go(s,stallEscape);
}

export function cityCheckEffect(s,effect,{rollDie,go,log,scheduleHound}) {
 if(effect==='fuzira-mirror-shaken'||effect==='fuzira-mirror-terrified') {
  const damage = rollDie(effect==='fuzira-mirror-shaken'?3:20);
  const loss = Math.min(s.sanity,damage);
  s.sanity -= loss;
  log(s,`The creature in the glass costs you ${loss} Sanity.`);
  if(s.sanity>0) scheduleHound(s,{rollDie,log});
  go(s,134);
  return true;
 }
 if(effect==='fuzira-stall-finish') {
  leaveTheStall(s,go,log);
  return true;
 }
 const weapon = stallWeapons[effect];
 if(!weapon&&effect!=='fuzira-stall-counter') return false;
 if(weapon) {
  const damage = rollDie(weapon.sides);
  log(s,`You deal ${damage} damage to the shopkeeper.`);
  s.cityStallDamage = (s.cityStallDamage||0)+damage;
  if(s.cityStallDamage>=6) {
   leaveTheStall(s,go,log);
   return true;
  }
 }
 const attack = rollDie(100);
 log(s,`The shopkeeper’s knife: rolled ${attack} against 25%.`);
 if(attack<=25) {
  const damage = rollDie(6);
  s.hp = Math.max(0,s.hp-damage);
  log(s,`The shopkeeper wounds you for ${damage} health.`);
 }
 if(!s.hp) {
  delete s.cityStallDamage;
  go(s,stallEnding);
  s.phase = 'ending';
 }
 return true;
}
