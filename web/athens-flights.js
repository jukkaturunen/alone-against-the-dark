import { DAY, HOUR, dayStart } from './calendar.js';
import { trainedSkill } from './investigators.js';

const terminal='Athens Airport';
const cabin='Cairo passenger flight';
const fokker='Fokker T-2';
const departed='athens-flight-departed';
const identify='athens-flight-identify';
const tilt='athens-flight-tilt';
const fight='athens-flight-fight';
const landing='athens-flight-landing';
const navigate='athens-flight-navigate';
const cabinEnding='athens-flight-ending';
const fokkerEnding='athens-fokker-ending';

export const AF_FLAGS = ['athensFlightHeard'];
export const AF_ENDINGS = new Set([cabinEnding,fokkerEnding]);
const inFlight = new Set([99,departed,76,59,50,55,39,44,71,identify,tilt,fight,landing,98,navigate]);
export const AF_ENTRIES = {athensAirport:[181,57,92,43,...inFlight,...AF_ENDINGS]};

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const AF_SCENES = {
 181:scene('Three aircraft at the airstrip',terminal,181,36,
  'A bystander watches as you look over the aircraft. The Ford trimotor leaves for Cairo at 8 AM daily. Jacques Risee, the pilot of the old mail plane, is waiting in the bar. The clerk says the Fokker is unavailable, but you can go and see it.'),
 99:scene('The morning flight',cabin,99,24,
  'A steward offers chewing gum and cotton for your ears. Through a window you see two men watching the plane. When one sees you, he points and smiles. You can still step off before takeoff.'),
 [departed]:scene('South over the sea',cabin,99,24,
  'The plane is barely warmer than the air outside. A passenger stands and walks past the steward toward the pilots’ compartment. He reaches for the cockpit door.'),
 76:scene('The hand on the latch',cabin,76,21,
  'As the passenger reaches for the cockpit door, you catch sight of his gray, claw-like hand. You have a moment to steady yourself.'),
 59:scene('An uneasy feeling',cabin,59,19,
  'Something is wrong. If you are carrying a weapon, you have time to ready it.'),
 50:scene('Behind the cockpit door',cabin,50,18,
  'The vibrating fuselage and the engine noise make it difficult to hear anything from the front of the cabin.'),
 55:scene('A scream over the engines',cabin,55,18,
  'You hear a scream from the cockpit.'),
 39:scene('The plane banks',cabin,39,16,
  'The sound of a scream cuts through the engine noise. The plane jerks right, and the reassuring rhythm of the engines gives way to a wobble.'),
 44:scene('The attack in the cockpit',cabin,44,17,
  'The pilot lies dead. The co-pilot is still struggling with the passenger, who turns toward you. His sunken eyes and gray skin make him look like a corpse.'),
 [identify]:scene('The gray skin',cabin,44,17,
  'The passenger turns back to the co-pilot. You try to place what struck you about his face.'),
 71:scene('Preserved flesh',cabin,71,21,
  'The gray skin has the texture and color of the preserved flesh of an Egyptian mummy.'),
 [tilt]:scene('Thrown off balance',cabin,44,17,
  'The trimotor lurches again. Passengers are thrown against the cabin walls as you try to keep your footing.'),
 [fight]:scene('A struggle for the controls',cabin,44,17,
  'The pilot is dead and the trimotor is losing altitude. The co-pilot can bring you back to Athens if you stop the attacker in time.'),
 [landing]:scene('The pilot’s seat is empty',cabin,44,17,
  'The attacker is down, but neither pilot can help. An unconscious Greek colonel wears pilot’s wings. You can try to revive him or take the controls yourself.'),
 [cabinEnding]:scene('The flight ends here',cabin,44,17,
  'Your investigation ends aboard the trimotor before it can return to Athens.'),
 43:scene('The unattended Fokker',terminal,43,16,
  'The mechanic is gone, and you can see that the plane is in good condition. With at least 5% in Pilot (Aircraft), you can try to make off with it.'),
 98:scene('Airborne in the Fokker',fokker,98,24,
  'The plane lifts off the runway. Now you have to keep it in the air.'),
 [navigate]:scene('South toward Egypt',fokker,98,24,
  'Once you are flying steadily, you try to work out a heading for the airport in Cairo.'),
 [fokkerEnding]:scene('The Fokker goes down',fokker,98,24,
  'You cannot keep the plane in the air. It crashes, ending your investigation.')
};

export const AF_CLUES = {
 athensFlightMummy:{
  title:'Preserved flesh on the Cairo flight',type:'Athens lead',source:AF_SCENES[71].source,
  text:AF_SCENES[71].paragraphs[0]
 }
};
export const AF_ENTRY_CLUES = {71:'athensFlightMummy'};

const attacks = [
 {id:'unarmed',skill:'Fighting (Brawl)',label:'Strike with your fists',dice:[1,3]},
 {id:'knife',skill:'Fighting (Brawl)',label:'Use your hunting knife',item:'Hunting knife',dice:[1,6]},
 {id:'revolver',skill:'Firearms (Handgun)',label:'Fire your revolver',item:'Revolver',dice:[1,10],gun:true},
 {id:'shotgun',skill:'Firearms (Rifle/Shotgun)',label:'Fire your shotgun',item:'12-gauge shotgun',dice:[4,6],gun:true},
 {id:'rifle',skill:'Firearms (Rifle/Shotgun)',label:'Fire your rifle',item:'.30-06 rifle',dice:[2,6],extra:4,gun:true}
];
const hasWeapon=(s,attack)=>!attack.item||s.inventory.includes(attack.item);
const armed=s=>attacks.some(attack=>attack.item&&hasWeapon(s,attack));
const hasGun=s=>attacks.some(attack=>attack.gun&&hasWeapon(s,attack));
const check=(entry,skill,label,extra)=>({entry,skill,label,duration:0,repeat:true,solo:true,...extra});
const choice=(id,label,target,extra)=>({id,label,target,duration:0,...extra});
const back=choice('athens-airport-return','Return to the terminal',181);

export const AF_CHOICES = {
 181:[
  choice('athens-flight-board','Board the scheduled flight to Cairo',99,{effect:'af-board',detail:'Departs daily at 8 AM'}),
  choice('athens-fokker-inspect','Look over the Fokker',43)
 ],
 43:[
  choice('athens-fokker-take','Take the Fokker',98,{when:s=>trainedSkill(s,'Pilot (Aircraft)')>=5}),
  back
 ],
 99:[
  choice('athens-flight-stay','Stay aboard for takeoff',departed,{duration:1}),
  choice('athens-flight-disembark','Get off before takeoff',181)
 ],
 59:[
  choice('athens-flight-ready-weapon','Ready your weapon and listen',50,{when:armed,effect:'af-ready'}),
  choice('athens-flight-listen-forward','Listen without drawing a weapon',50)
 ],
 55:[choice('athens-flight-after-scream','See what happens next',50)],
 50:[
  choice('athens-flight-open-cockpit','Investigate the scream',44,{when:s=>s.flags.athensFlightHeard&&hasGun(s)}),
  choice('athens-flight-stay-seat','Stay in your seat',39,{when:s=>s.flags.athensFlightHeard})
 ],
 39:[choice('athens-flight-see-cockpit','Look into the cockpit',44)],
 71:[choice('athens-flight-return-cockpit','Turn back to the struggle',tilt)]
};

export const AF_CHECKS = {
 'athens-flight-spot':check(departed,'Spot Hidden','Watch the passenger at the cockpit door',{successEntry:76,failureEntry:50}),
 'athens-flight-pow':check(76,'POW','Master your unease',{successEntry:59,failureEntry:50}),
 'athens-flight-listen':check(50,'Listen','Listen at the front of the cabin',{
  when:s=>!s.flags.athensFlightHeard,successEntry:55,successFlag:'athensFlightHeard',failureEntry:39
 }),
 'athens-flight-sanity':check(44,'Sanity','Face the passenger in the cockpit',{successEntry:identify,failureEffect:'af-sanity'}),
 'athens-flight-history':check(identify,'History','Recognize the strange appearance',{successEntry:71,failureEntry:tilt}),
 'athens-flight-dex':check(tilt,'DEX','Keep your footing as the plane lurches',{successEntry:fight,failureEffect:'af-fall'}),
 ...Object.fromEntries(attacks.map(attack=>[`athens-flight-${attack.id}`,check(fight,attack.skill,attack.label,{
  when:s=>!s.athensFlight?.held&&hasWeapon(s,attack),bonusDie:attack.gun,
  successEffect:`af-hit-${attack.id}`,failureEffect:'af-fight-round'
 })])),
 'athens-flight-break-hold':check(fight,'STR','Break the attacker’s grip',{
  when:s=>s.athensFlight?.held,successEffect:'af-break-hold',failureEffect:'af-break-hold'
 }),
 'athens-flight-first-aid':check(landing,'First Aid','Revive the colonel',{
  when:s=>!s.athensFlight?.firstAidTried,successEffect:'af-return',failureEffect:'af-first-aid-failed'
 }),
 'athens-flight-pilot':check(landing,'Pilot (Aircraft)','Take the controls',{
  when:s=>!s.athensFlight?.pilotTried,successEffect:'af-return',failureEffect:'af-pilot-failed'
 }),
 'athens-fokker-pilot':check(98,'Pilot (Aircraft)','Keep control of the Fokker',{successEntry:navigate,failureEntry:fokkerEnding}),
 'athens-fokker-navigate':check(navigate,'Navigate','Set a course for Cairo',{successEffect:'af-cairo',failureEffect:'af-desert'})
};

export function athensFlightLocked(s) {
 return s.location==='athensAirport'&&inFlight.has(s.entry);
}

export function athensFlightStatus(s) {
 const state=s.athensFlight;
 if(!state) return '';
 const rounds=state.coPilotRounds||state.crashRounds;
 const deadline=state.coPilotRounds?'to save the co-pilot':'before the plane crashes';
 return `${rounds} round${rounds===1?'':'s'} ${deadline}.${state.held?' The attacker has you in a chokehold.':''}`;
}

export function athensFlightEnter(s,previousEntry,{rollDie,log}) {
 if(!athensFlightLocked(s)) delete s.flags.athensFlightHeard;
 if(s.location!=='athensAirport'||![fight,landing].includes(s.entry)) delete s.athensFlight;
 if(s.location!=='athensAirport') return;
 if(AF_ENDINGS.has(s.entry)) {
  s.hp=0;
  s.phase='ending';
 }
 if(s.entry===fight&&previousEntry!==fight) {
  const coPilotRounds=rollDie(6);
  s.athensFlight={health:15,coPilotRounds,crashRounds:0,held:false,firstAidTried:false,pilotTried:false};
  log(s,`There are ${coPilotRounds} rounds to save the co-pilot.`);
 }
}

const whole=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
export function validateAthensFlight(s) {
 if(s.location!=='athensAirport'||![fight,landing].includes(s.entry)) return s.athensFlight===undefined;
 const state=s.athensFlight;
 if(!state||Object.keys(state).length!==6||
  !whole(state.health,0,15)||!whole(state.coPilotRounds,0,6)||!whole(state.crashRounds,0,12)||
  ![state.held,state.firstAidTried,state.pilotTried].every(value=>typeof value==='boolean')) return false;
 if(s.entry===landing) {
  return state.health===0&&!state.coPilotRounds&&state.crashRounds>0&&!state.held&&!(state.firstAidTried&&state.pilotTried);
 }
 return state.health>0&&!state.firstAidTried&&!state.pilotTried&&
  (state.coPilotRounds>0?!state.crashRounds&&!state.held:state.crashRounds>0);
}

function hurt(s,damage,{go,log}) {
 s.hp=Math.max(0,s.hp-damage);
 log(s,`You lose ${damage} health.`);
 if(s.hp===0) go(s,cabinEnding);
 return s.hp===0;
}

function returnToAthens(s,{go,advance,log}) {
 advance(s,1);
 log(s,'The trimotor lands safely back at Athens Airport.');
 go(s,181);
}

function fightRound(s,{go,log,rollDie},attackerActs=true) {
 const state=s.athensFlight;
 if(state.coPilotRounds>0) {
  if(--state.coPilotRounds===0) {
   state.crashRounds=rollDie(6)+6;
   log(s,`The co-pilot stops struggling. The attacker turns toward you. The plane will crash in ${state.crashRounds} rounds.`);
  }
  return;
 }
 if(--state.crashRounds===0) {
  log(s,'The uncontrollable plane crashes.');
  go(s,cabinEnding);
  return;
 }
 if(!attackerActs) return;
 if(!state.held) {
  const roll=rollDie(100);
  log(s,`The attacker tries to grab you: rolled ${roll} against 45%.`);
  state.held=roll<=45;
 }
 if(state.held) hurt(s,rollDie(4)+1,{go,log});
}

const oppositeRanks={'Critical success':4,'Extreme success':3,'Hard success':2,'Regular success':1};
function breakHold(s,tools) {
 const {rollDie,log,level,skill}=tools;
 const roll=rollDie(100);
 const rank=roll===1?4:roll<=12?3:roll<=30?2:roll<=60?1:0;
 const player=oppositeRanks[level]||0;
 const escaped=player>rank||player>0&&player===rank&&skill(s,'STR')>60;
 log(s,`Opposed STR: the attacker rolls ${roll} against 60%. ${escaped?'You break free.':'The attacker keeps hold of you.'}`);
 if(escaped) s.athensFlight.held=false;
 fightRound(s,tools,!escaped);
}

function hitAttacker(s,attack,tools) {
 const {rollDie,log,go}=tools;
 const [count,sides]=attack.dice;
 let damage=attack.extra||0;
 for(let die=0;die<count;die++) damage+=rollDie(sides);
 const state=s.athensFlight;
 state.health=Math.max(0,state.health-damage);
 log(s,`You deal ${damage} damage to the attacker.`);
 if(state.health>0) {
  fightRound(s,tools);
 } else if(state.coPilotRounds>0) {
  log(s,'The co-pilot breaks free and takes the controls.');
  returnToAthens(s,tools);
 } else {
  fightRound(s,tools,false);
  if(s.phase==='playing') go(s,landing);
 }
}

export function athensFlightEffect(s,effect,tools) {
 const {go,rollDie,log,advance}=tools;
 switch(effect) {
 case 'af-board': {
  let departure=dayStart(s.time)+8*HOUR;
  if(s.time>departure) departure+=DAY;
  advance(s,(departure-s.time)/HOUR);
  delete s.flags.athensFlightHeard;
  go(s,99);
  break;
 }
 case 'af-ready':
  log(s,'You ready your weapon.');
  go(s,50);
  break;
 case 'af-sanity': {
  const loss=rollDie(6);
  s.sanity=Math.max(0,s.sanity-loss);
  log(s,`The sight costs you ${loss} Sanity.`);
  go(s,s.sanity?identify:cabinEnding);
  break;
 }
 case 'af-fall':
  if(!hurt(s,rollDie(3),tools)) go(s,fight);
  break;
 case 'af-fight-round':
  fightRound(s,tools);
  break;
 case 'af-break-hold':
  breakHold(s,tools);
  break;
 case 'af-return':
  returnToAthens(s,tools);
  break;
 case 'af-first-aid-failed':
 case 'af-pilot-failed': {
  const state=s.athensFlight;
  if(effect==='af-first-aid-failed') state.firstAidTried=true;
  else state.pilotTried=true;
  if(state.firstAidTried&&state.pilotTried) go(s,cabinEnding);
  else fightRound(s,tools,false);
  break;
 }
 case 'af-cairo':
  advance(s,3);
  s.location='cairoAirport';
  go(s,196);
  break;
 case 'af-desert':
  advance(s,3);
  go(s,94);
  break;
 default: {
  const attack=attacks.find(attack=>effect===`af-hit-${attack.id}`);
  if(!attack) return false;
  hitAttacker(s,attack,tools);
 }
 }
 return true;
}
