import { startingHealth } from './investigators.js';
import { HOTEL_COWL, HOTEL_ESCAPE, HOTEL_ENDING } from './hotels.js';

const library = 155;
const cowl = 1201;
const aftermath = 1202;
const ending = 1203;
const infirmary = 1204;

const attacks = {
 unarmed:{skill:'Fighting (Brawl)',label:'Strike with your fists',sides:3,extra:0},
 knife:{skill:'Fighting (Brawl)',label:'Use your hunting knife',item:'Hunting knife',sides:6,extra:0},
 revolver:{skill:'Firearms (Handgun)',label:'Fire your revolver',item:'Revolver',sides:10,extra:0}
};
const encounters = {10:5,106:3,[library]:8,185:8};

function scene(title,eyebrow,source,...paragraphs) {
 return {title,eyebrow,source,paragraphs,adapted:true};
}

export const COMBAT_SCENES = {
 [library]:scene('Two men in the library','Ship’s library','Entry 155 · p. 32',
  'The library is deserted when you settle down with an Agatha Christie novel. A small man enters, followed by a tall figure in a cowl. They come closer. The smaller man smiles and draws a dagger.'),
 [cowl]:scene('The figure in the doorway','Ship’s library','Entry 155 · p. 32',
  'You get past the man with the dagger, but his companion blocks the door. As you try to fight your way out, your blows pass through him. Glowing eyes stare from beneath his hood. The air turns cold and the figure reaches for you.'),
 139:scene('An officer at the door','Ship’s library','Entry 139 · p. 30',
  'A ship’s officer walks in. The figure turns toward him, leaving you room to run. The officer takes one look and follows you down the passage.',
  'The captain orders a search, then assigns guards to protect you for the rest of the crossing. No trace of either attacker turns up.'),
 [aftermath]:scene('The ship is searched','Below decks','Entries 10 and 106 · pp. 11, 25',
  'You alert the crew. They search the ship and find no sign of your attacker. You can visit the ship’s infirmary if you were hurt.'),
 [infirmary]:scene('Under the ship doctor’s care','Ship’s infirmary','Entry 585 · p. 89',
  'The doctor dresses your wounds. Your first day of care restores 2D3 health on a successful Luck check, or 1D3 otherwise. You regain one health point for each further day of care.'),
 [ending]:scene('The crossing ends here','Cunard liner','Entries 10, 106 and 155 · pp. 11, 25, 32',
  'The struggle aboard the liner ends your investigation.')
};

function check(id,entry,skill,label,successEffect,failureEffect,options={}) {
 return [`ship-${id}`,{entry,skill,label,duration:0,repeat:true,successEffect,failureEffect,...options}];
}

function combatChecks(entry) {
 const stage = combatStage => ({combatStage});
 const attackChecks = Object.entries(attacks).filter(([weapon])=>entry!==106||weapon!=='unarmed');
 return [
  check(`draw-${entry}`,entry,'DEX','Reach for a weapon','combat-ready','combat-defend',stage('draw')),
  check(`evade-${entry}`,entry,'Dodge','Evade the dagger','combat-evade','combat-evade',stage('defend')),
  check(`run-${entry}`,entry,'Dodge','Slip past the attacker','combat-escape','combat-defend',stage('turn')),
  ...attackChecks.map(([weapon,data])=>check(`${weapon}-${entry}`,entry,data.skill,data.label,
   `combat-hit-${weapon}`,'combat-defend',{combatStage:'turn',combatWeapon:weapon,bonusDie:[library,185].includes(entry)&&weapon==='revolver'})),
  ...attackChecks.filter(([weapon])=>weapon!=='revolver').map(([weapon,data])=>check(`counter-${weapon}-${entry}`,entry,
   data.skill,weapon==='knife'?'Parry with your hunting knife':'Fight back with your fists',
   `combat-counter-${weapon}`,`combat-counter-${weapon}`,{combatStage:'defend',combatWeapon:weapon}))
 ];
}

export const COMBAT_CHECKS = Object.fromEntries([
 ...[10,106,library,185].flatMap(combatChecks),
 check('library-sanity',cowl,'Sanity','Steady yourself','combat-sanity-pass','combat-sanity-loss',{combatStage:'sanity'}),
 check('library-rescue',cowl,'Luck','Look for a way out','combat-rescue','combat-lost',{combatStage:'rescue'}),
 check('hotel-sanity',HOTEL_COWL,'Sanity','Steady yourself','combat-sanity-pass','combat-sanity-loss',{combatStage:'sanity'}),
 check('hotel-dodge',HOTEL_COWL,'Dodge','Slip around the figure','combat-hotel-escape','combat-lost',{combatStage:'rescue'}),
 check('hotel-barge-past',HOTEL_COWL,'Fighting (Brawl)','Barge past the figure','combat-hotel-escape','combat-lost',{combatStage:'rescue'}),
 check('infirmary-treatment',infirmary,'Luck','Receive treatment','combat-care-good','combat-care-poor',{combatStage:'admitted'})
]);

export const COMBAT_CHOICES = {
 139:[{id:'ship-travel-under-guard',label:'Finish the crossing under guard',target:187,duration:0,skipVoyage:true}],
 [aftermath]:[
  {id:'ship-infirmary',label:'Ask the doctor to tend to your wounds',target:infirmary,duration:0,effect:'combat-admit',combatStage:'injured'},
  {id:'ship-leave-attack',label:'Continue the voyage',target:187,duration:0,advanceDay:true}
 ],
 [infirmary]:[
  {id:'ship-infirmary-stay',label:'Stay another day',duration:0,effect:'combat-care-extra',combatStage:'injured-and-treated'},
  {id:'ship-infirmary-leave',label:'Leave the infirmary',duration:0,effect:'combat-discharge',combatStage:'treated'}
 ]
};

function hasWeapon(s,weapon) {
 const item=attacks[weapon].item;
 return !item || s.inventory.includes(item);
}

function currentStage(s) {
 if (s.shipCombat) return s.shipCombat.stage;
 if (s.entry===106) return 'turn';
 if (s.entry===185&&s.flags.hotelReady) return 'turn';
 if ([10,library,185].includes(s.entry)) return hasWeapon(s,'knife')||hasWeapon(s,'revolver') ? 'draw' : 'defend';
 if ([cowl,HOTEL_COWL].includes(s.entry)) return 'sanity';
}

export function combatActionsAvailable(s,item) {
 if (item.combatWeapon&&!hasWeapon(s,item.combatWeapon)) return false;
 if (item.combatStage==='injured') return s.hp<startingHealth(s);
 if (item.combatStage==='injured-and-treated') return s.hp<startingHealth(s)&&currentStage(s)==='treated'&&s.voyage.day<8;
 if (item.combatWeapon&&item.combatStage==='defend'&&item.combatWeapon==='knife'&&!s.shipCombat?.ready) return false;
 return !item.combatStage||item.combatStage===currentStage(s);
}

export function receivingShipTreatment(s) {
 return s.location==='liner'&&s.entry===infirmary;
}

export function validateShipCombat(s) {
 if (!s.shipCombat) return s.shipCombat===undefined && (s.entry!==infirmary);
 const {stage,damage,ready}=s.shipCombat;
 if (Object.keys(s.shipCombat).length!==3||!Number.isInteger(damage)||damage<0||typeof ready!=='boolean') return false;
 if (s.entry===infirmary) return damage===0&&['admitted','treated'].includes(stage);
 if ([cowl,HOTEL_COWL].includes(s.entry)) return damage===0&&stage==='rescue';
 return Object.hasOwn(encounters,s.entry)&&damage<encounters[s.entry]&&['turn','defend'].includes(stage);
}

function beginStage(s,stage,damage=0,ready=false) {
 s.shipCombat={stage,damage,ready};
}

function finishFight(s,{go}) {
 delete s.shipCombat;
 go(s,s.entry===185 ? HOTEL_COWL : s.entry===library ? cowl : aftermath);
}

function endFight(s,{go,endVoyage},line) {
 delete s.shipCombat;
 if([185,HOTEL_COWL].includes(s.entry)) {go(s,HOTEL_ENDING);return;}
 go(s,ending);
 endVoyage(s,line);
}

function hitAttacker(s,weapon,tools) {
 const {rollDie,log}=tools;
 const {sides,extra}=attacks[weapon];
 const damage=rollDie(sides)+extra;
 const accumulated=s.entry===106 ? damage : (s.shipCombat?.damage||0)+damage;
 log(s,`You deal ${damage} damage to the man with the dagger.`);
 if (accumulated>=encounters[s.entry]) finishFight(s,tools);
 else beginStage(s,'defend',accumulated,true);
}

const ranks = {'Critical success':4,'Extreme success':3,'Hard success':2,'Regular success':1};

function enemyAttack(s,tools,counter=false,weapon) {
 const {rollDie,log,go,level}=tools;
 const roll=rollDie(100);
 const attackerRank=roll===1 ? 4 : roll<=10 ? 3 : roll<=25 ? 2 : roll<=50 ? 1 : 0;
 const playerRank=ranks[level]||0;
 log(s,`Dagger attack: rolled ${roll} against 50%.`);
 if (counter&&playerRank>attackerRank) return hitAttacker(s,weapon,tools);
 const damage=attackerRank>playerRank||counter&&attackerRank===playerRank&&attackerRank>0 ? rollDie(6) : 0;
 if (damage) log(s,`The dagger hits. You lose ${damage} health.`);
 else log(s,'The dagger misses you.');
 if (damage>=s.hp) {
  const incapacitated=s.entry===10&&damage===s.hp;
  s.hp=0;
  if (!incapacitated) return endFight(s,tools,'The man with the dagger kills you.');
  log(s,'The crew finds you unconscious and takes you to the infirmary.');
  beginStage(s,'admitted');
  go(s,infirmary);
  return;
 }
 s.hp-=damage;
 beginStage(s,'turn',s.shipCombat?.damage||0,s.shipCombat?.ready||false);
}

function treatment(s,tools,dice) {
 const {rollDie,log,finishActivity}=tools;
 const hp= s.hp;
 const restored=dice===0 ? 1 : Array.from({length:dice},()=>rollDie(3)).reduce((total,roll)=>total+roll,0);
 s.hp=Math.min(startingHealth(s),hp+restored);
 log(s,`The ship’s doctor treats your wounds. You regain ${s.hp-hp} health.`);
 beginStage(s,'treated');
 if(s.voyage.day<8) finishActivity(s,true);
}

export function shipCombatEffect(s,effect,tools) {
 const {rollDie,go,log}=tools;
 if (!effect?.startsWith('combat-')) return false;
 switch(effect) {
 case 'combat-ready': beginStage(s,'turn',0,true); break;
 case 'combat-defend': beginStage(s,'defend',s.shipCombat?.damage||0,s.shipCombat?.ready||false); break;
 case 'combat-evade': enemyAttack(s,tools); break;
 case 'combat-escape': finishFight(s,tools); break;
 case 'combat-sanity-loss': {
  const loss=rollDie(6);
  s.sanity=Math.max(0,s.sanity-loss);
  log(s,`The sight of the hooded figure costs you ${loss} Sanity.`);
  if (!s.sanity) {endFight(s,tools,'The hooded figure overwhelms your senses.');break;}
  beginStage(s,'rescue');
  break;
 }
 case 'combat-sanity-pass': beginStage(s,'rescue'); break;
 case 'combat-rescue': delete s.shipCombat; go(s,139); break;
 case 'combat-hotel-escape': go(s,HOTEL_ESCAPE); break;
 case 'combat-lost': endFight(s,tools,'The hooded figure catches you before you can escape.'); break;
 case 'combat-admit': beginStage(s,'admitted'); go(s,infirmary); break;
 case 'combat-care-good': treatment(s,tools,2); break;
 case 'combat-care-poor': treatment(s,tools,1); break;
 case 'combat-care-extra': treatment(s,tools,0); break;
 case 'combat-discharge':
  delete s.shipCombat;
  s.entry=187;
  if(s.voyage.day===8) finishActivity(s,true);
  break;
 default:
  if (effect.startsWith('combat-hit-')) hitAttacker(s,effect.slice('combat-hit-'.length),tools);
  else if (effect.startsWith('combat-counter-')) enemyAttack(s,tools,true,effect.slice('combat-counter-'.length));
  else return false;
 }
 return true;
}
