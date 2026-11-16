import { HOUR, dayStart, hourOf } from './calendar.js';

export const EGYPT_LOCATIONS = {
 alexandriaHarbor:{
  name:'Alexandria Harbor and Rail Station',entry:195,region:'alexandria',hours:[0,24],
  description:'Dockside cafés, lodging, and trains to Cairo.'
 },
 cairoRail:{
  name:'Cairo Rail Station',entry:205,region:'cairo',hours:[0,24],
  description:'A station restaurant and daily trains to Alexandria.'
 }
};

export const EGYPT_ENTRIES = {
 alexandriaHarbor:[195,219,221,222,227,240,241,'alexandria-ending'],
 cairoRail:[205]
};

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const EGYPT_SCENES = {
 195:scene('Alexandria Harbor and Rail Station','Alexandria · Egypt',195,39,
  'The docks and railway station lie a short walk apart. Shops and cafés line the narrow streets between them.',
  'You can spend the night in Alexandria or take a train to Cairo. Trains leave at 10 AM, 1 PM, and 6 PM and take one hour.'),
 205:scene('Cairo Rail Station','Cairo · Egypt',205,40,
  'British soldiers are posted around the station. A manure-like smell hangs in the air. The station restaurant serves meals from 5 AM to 8 PM.',
  'Trains to Alexandria leave at 9 AM, noon, and 5 PM. The journey takes one hour.'),
 219:scene('Stories over supper','Alexandria docks',219,42,
  'The locals trade stories about fortunes made and lost. The mention of Cairo draws little interest.'),
 221:scene('Along the docks','Alexandria harbor',221,42,
  'The dockside cafés offer a meal and entertainment between 8 AM and 7 PM. If you speak any Arabic, you can join the conversation.'),
 222:scene('A blade in the passage','Alexandria',222,42,
  'You cut through a cool passage between two streets. A man cries out in Aten’s name behind you and swings a curved blade past your neck.',
  'You can fight him or try to dodge past him.'),
 227:scene('Footsteps retreat','Alexandria',227,43,
  'Someone follows you into a narrow passage. Two policemen appear at the far end and the footsteps recede. As you turn, you catch sight of a white robe disappearing around the corner.',
  'You reach the hotel safely.'),
 240:scene('The way back to the hotel','Alexandria',240,44,
  'You leave the cafés and head back to your room. Listen for anything out of place.'),
 241:scene('Back at the hotel','Alexandria',241,44,
  'You escape the encounter in the passage and reach your hotel. In the morning, you can catch a train to Cairo.'),
 'alexandria-ending':scene('The passage falls silent','Alexandria',222,42,
  'Your attacker cuts you down in the passage. Your investigation ends here.')
};

export const EGYPT_CLUES = {
 'alexandria-aten':{
  title:'An attack in Aten’s name',type:'Alexandria · Encounter',source:'Entry 222 · p. 42',
  text:'In a passage off the Alexandria docks, a man attacked you with a curved blade and called out in Aten’s name.'
 }
};
export const EGYPT_ENTRY_CLUES = {222:'alexandria-aten'};

export const EGYPT_CHOICES = {
 195:[{id:'alexandria-docks',label:'Visit the dockside cafés',target:221,duration:0}],
 221:[{id:'alexandria-speak-arabic',label:'Talk with the locals in Arabic',target:219,duration:0}],
 219:[{id:'alexandria-leave-cafes',label:'Head back to the hotel',target:240,duration:0}]
};

export function egyptChoiceAvailable(state,choice) {
 if(choice.id==='alexandria-docks') return hourOf(state.time)>=8&&hourOf(state.time)<19;
 if(choice.id==='alexandria-speak-arabic') return (state.allocation['Language (Arabic)']||0)>0||state.flags.azharJahark;
 return true;
}

export function egyptFoodAvailable(state) {
 const hours = {205:[5,20],221:[8,19]}[state.entry];
 if(!hours) return false;
 const [open,close] = hours;
 return hourOf(state.time)>=open && state.time+HOUR<=dayStart(state.time)+close*HOUR;
}

const weapons = {
 'alexandria-fists':{skill:'Fighting (Brawl)',label:'Strike with your fists',sides:3},
 'alexandria-knife':{skill:'Fighting (Brawl)',label:'Use your hunting knife',sides:6,item:'Hunting knife'},
 'alexandria-revolver':{skill:'Firearms (Handgun)',label:'Fire your revolver',sides:10,item:'Revolver'}
};

export const EGYPT_CHECKS = {
 'alexandria-listen':{
  entry:240,skill:'Listen',label:'Listen for footsteps',duration:0,repeat:true,
  successEntry:227,failureEntry:222
 },
 'alexandria-dodge':{
  entry:222,skill:'Dodge',label:'Dodge past the attacker',duration:0,repeat:true,
  successEffect:'alexandria-escape',failureEffect:'alexandria-counterattack'
 },
 ...Object.fromEntries(Object.entries(weapons).map(([id,{skill,label}])=>[id,{
  entry:222,skill,label,duration:0,repeat:true,successEffect:id,failureEffect:'alexandria-counterattack'
 }]))
};

export function egyptCheckAvailable(state,id) {
 const item = weapons[id]?.item;
 return !item||state.inventory.includes(item);
}

export function egyptCombatEffect(state,effect,{rollDie,go,log}) {
 if(effect==='alexandria-escape') {
  delete state.alexandriaDamage;
  go(state,241);
  return true;
 }
 const weapon = weapons[effect];
 if(!weapon&&effect!=='alexandria-counterattack') return false;
 if(weapon) {
  const damage = rollDie(weapon.sides);
  log(state,`You deal ${damage} damage to the attacker.`);
  state.alexandriaDamage = (state.alexandriaDamage||0)+damage;
  if(state.alexandriaDamage>=6) {
   delete state.alexandriaDamage;
   go(state,241);
   return true;
  }
 }
 const roll = rollDie(100);
 log(state,`Curved blade attack: rolled ${roll} against 70%.`);
 if(roll<=70) {
  const damage = rollDie(6)+1;
  state.hp = Math.max(0,state.hp-damage);
  log(state,`The attacker wounds you for ${damage} health.`);
 }
 if(!state.hp) {
  delete state.alexandriaDamage;
  go(state,'alexandria-ending');
  state.phase='ending';
 }
 return true;
}
