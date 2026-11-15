import { EARLY_RULES } from './liner-early.js';

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const LATE_SCENES = {
 135:scene('Footsteps in the passage','Below decks',135,29,
  'On your way through the ship, you turn into a long, quiet passage. Someone may be waiting around the bend.'),
 96:scene('The woman at the easel','Oil painting on deck',96,24,
  'One of the painters is quietly crying. You approach her easel and stop. Beneath a purple sky, stalk-like figures stand among buildings whose angles look impossibly wrong. The figures seem to be screaming, though you can see nothing that looks like a mouth.',
  'You walk away without speaking.'),
 590:scene('An invitation to shoot skeet','The fantail',590,90,
  'The purser tells you that skeet shooting is about to start on the fantail. There’s still time to join.'),
 189:scene('A shot from elsewhere','The fantail',189,38,
  'A faint pop cuts through the clatter of the competition, and a bullet whistles past your ear. You turn to look for the shooter. The other passengers carry on as if they heard nothing. You leave the fantail at once.'),
 579:scene('Baccarat in the ship’s casino','The casino',579,88,
  'A flirtation leads you to the casino, where a hand of baccarat goes unexpectedly well.'),
 203:scene('A stranger asks to join you','The bar',203,40,
  'An elderly man catches your eye across the bar and quietly asks if he can sit with you.'),
 132:scene('A quiet drink','The bar',132,28,
  'The man nods and leaves you to your drink.'),
 142:scene('A warning over a martini','The bar',142,30,
  'The stranger orders a martini. He says he’s seen people following you, and tells you to stay away from the deck, the library, and anywhere else you could be caught alone. He speaks of assassins as if he knows them well.',
  'You’re sure you’ve never met him. He talks about chess for a while before finishing his drink and leaving.'),
 385:scene('A hand of poker','The dining room',385,63,
  'Your dinner companions invite you to play poker. See how your hand fares.'),
 1200:scene('Someone is following you','Below decks',135,29,
  'You spot a man lurking ahead, something glinting in his hand. You turn into a side passage and quicken your pace. Footsteps follow, and the passage seems to darken. You try to remember which way leads to the promenade.'),
 1205:scene('Back in the open air','The promenade',135,29,
  'You find the stairs to the promenade and step into the open air. The footsteps stop behind you.')
};

export const LATE_CLUES = {
 linerPainting:{title:'The painting under a purple sky',type:'Shipboard observation',source:LATE_SCENES[96].source,
  text:'On deck, a weeping passenger painted stalk-like creatures that seemed to scream among oddly angled buildings under a purple sky.'},
 linerWarning:{title:'An unknown passenger’s warning',type:'Shipboard conversation',source:LATE_SCENES[142].source,
  text:'A stranger warned that people were following you aboard the liner. He advised staying away from the deck, library, and other isolated places.'}
};

export const LATE_ENTRY_CLUES = {96:'linerPainting',142:'linerWarning'};

export const LATE_CHECKS = {
 'ship-corridor-spot':{entry:135,skill:'Spot Hidden',label:'Look ahead along the passage',duration:0,successEntry:1200,failureEntry:106},
 'ship-corridor-know':{entry:1200,skill:'EDU',label:'Recall the way back to the promenade',duration:0,successEntry:1205,failureEntry:106},
 'ship-poker-luck':{entry:385,skill:'Luck',label:'Play the hand',duration:0,successEntry:187,failureEntry:187,successCashDice:[2,10],fumbleCashDice:[2,10],successAdvanceDay:true,failureAdvanceDay:true}
};

function choice(id,label,target) {return {id:`ship-${id}`,label,target,duration:0};}
function finish(id,label) {return choice(id,label,187);}

export const LATE_CHOICES = {
 96:[finish('leave-painting','Leave the painting class')],
 1205:[finish('leave-passage','Continue the voyage')],
 590:[choice('shoot-skeet','Join the skeet shooting',189),{...finish('decline-skeet','Decline the invitation'),advanceDay:true}],
 189:[{...finish('leave-fantail','Leave the fantail'),advanceDay:true}],
 579:[{...finish('collect-baccarat','Collect your winnings'),cashDice:[1,100],advanceDay:true}],
 203:[choice('accept-stranger','Invite him to sit',142),choice('decline-stranger','Decline politely',132)],
 132:[finish('finish-drink','Finish your drink')],
 142:[finish('leave-bar','Leave the bar')]
};

const periods = ['am','pm','night'];
const promenadeActivities = ['stroll','shuffleboard','stroll'];
const quietActivities = ['room','oil-painting','cocktails'];
const quietEntries = [167,96,203];

function promenadeEntry(s) {
 if (!s.visited.includes(135)) return 135;
 if (!s.visited.includes(579)) return 579;
}

function quietEntry(s,index,activity) {
 const entry = quietEntries[index];
 if (activity===quietActivities[index]&&!s.visited.includes(entry)) return entry;
 if (index===2&&!s.visited.includes(385)&&quietEntries.every(seen=>s.visited.includes(seen))) return 385;
}

export const LATE_RULES = [
 ...[4,5].flatMap(day=>periods.map((slot,index)=>({day,slot,activities:[promenadeActivities[index]],entry:promenadeEntry}))),
 ...periods.map((slot,index)=>({day:6,slot,activities:['*'],entry(s,activity) {
  if (s.voyage.dayRoot===590) return index===0 ? 590 : undefined;
  const rule=EARLY_RULES.find(rule=>rule.day===3&&rule.slot===slot&&rule.activities.includes(activity));
  return typeof rule?.entry==='function' ? rule.entry(s,activity) : rule?.entry;
 }})),
 ...periods.map((slot,index)=>({day:7,slot,activities:['*'],entry(s,activity) {
  if (s.voyage.dayRoot===171) return quietEntry(s,index,activity);
  if (activity===promenadeActivities[index]) return promenadeEntry(s);
 }})),
 ...periods.map((slot,index)=>({day:8,slot,activities:['*'],entry(s,activity) {
  return quietEntry(s,index,activity);
 }}))
];
