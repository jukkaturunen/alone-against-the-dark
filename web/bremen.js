import { hourOf, nightStart } from './calendar.js';

export const BR_DEPARTURE=Date.UTC(1931,11,20);
export const BR_AMULET='Amulet of Nodens';

const harbor='Bremen Harbor and Rail Station';
const airport='Bremen Airport';
const inn='Der Freischütz Inn';
const mission='Bremen mission house';
const escape='bremen-street-escape';
const fight='bremen-knife-fight';
const lastDodge='bremen-last-dodge';
const jail='bremen-released';
const ending='bremen-inn-ending';

export const BR_LOCATIONS={
 bremenHarbor:{name:harbor,entry:449,region:'bremen',hours:[0,24],description:'Bremerhaven’s docks and the expedition’s berth.'},
 bremenAirport:{name:airport,entry:450,region:'bremen',hours:[0,24],description:'A free shuttle to the harbor.'},
 bremenInn:{name:inn,entry:461,region:'bremen',hours:[0,24],description:'A public room, meals, and rooms for the night.'}
};
export const BR_ENTRIES={
 bremenHarbor:[449,451,452],
 bremenAirport:[450],
 bremenInn:[457,458,461,467,469,470,472,473,474,477,478,479,481,482,484,485,491,582,escape,fight,lastDodge,jail,ending]
};
export const BR_FLAGS=['bremenInnDanger','bremenAmuletTaken'];
export const BR_ENDINGS=new Set([ending]);
export const BR_LOCKED_ENTRIES=new Set([472,474,478,481,484,485,fight,lastDodge]);

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}
export const BR_SCENES={
 449:scene(harbor,'Bremen · Germany',449,70,'Icy fog hangs over Bremerhaven. From the quay, you can just make out the outlines of the ships at anchor.'),
 450:scene(airport,'Bremen · Germany',450,70,'Fog is rolling across the airfield. A free shuttle takes passengers directly to Bremerhaven.'),
 451:scene('The expedition freighter',harbor,451,70,'A reinforced freighter lies apart from the other ships. Silver wingtips stick out from under tarpaulins on deck. Through the fog you can just make out the Starkweather–Moore expedition’s banner. The gangplank is accessible between 8 AM and 8 PM.'),
 452:scene('An empty berth',harbor,452,70,'The freighter has sailed. As you pass the empty docks and warehouses, you hear voices singing from a nearby inn.'),
 457:scene('Words above the din',inn,457,71,'A table of Brownshirts breaks into laughter. You catch three words in German: Führer, triumph, and amulet.'),
 458:scene('Unease in the public room',inn,458,71,'For all the noise and laughter, some of the patrons look nervous. The fear seems to have a focus.'),
 461:scene(inn,'Bremen · Germany',461,72,'Smoke hangs over the crowded public room. Brownshirts fill several tables, their swastika armbands visible through the haze. The inn serves meals and lets rooms.'),
 467:scene('Shelter at the mission',mission,467,72,'You get clear of the inn and find a mission house where you can sleep. The Brownshirts know your face now.'),
 469:scene('Conversation in German',inn,469,73,'You catch the sound of German conversation from a nearby table. Try to pick out what the men are saying.'),
 470:scene('Inside the attaché case',inn,470,73,'The case contains a black amulet and a set of German notes. You can read the notes yourself or take them to a translator.'),
 472:scene('The man with the knife',inn,472,73,'The man is within arm’s reach. His friends wait to see what happens next.'),
 473:scene('A question in German',inn,473,73,'The man asks what you want. His friends push their chairs back.'),
 474:scene('Beside the table',inn,474,73,'They stand warily as you approach. One of them asks whether you speak German.'),
 477:scene('The amulet case',inn,477,73,'A group of Brownshirts crowds around a box. Its shape reminds you of the case for the Sacred Black Amulet of Klaath.'),
 478:scene('A knife under the table',inn,478,73,'The man studies you for a moment, then draws a knife. You have time to reach for your gun or try to get away.'),
 479:scene('A box among the steins',inn,479,73,'The Brownshirts at one table are gathered around a curiously shaped box. You can get a closer look.'),
 481:scene('The gun is in your hand',inn,481,74,'You draw before he can close the distance. The box and an attaché case are still on the table.'),
 482:scene('Turned away',inn,482,74,'The man tells you to leave. You retreat to the other side of the public room.'),
 484:scene('The box and the case',inn,484,74,'You grab the box and the attaché case. The knife-wielding man pushes himself upright. One of his companions reaches into his jacket.'),
 485:scene('A hostile reception',inn,485,74,'The man blocks your view of the box and demands to know why you are there.'),
 491:scene('Watch the room',inn,491,76,'Beer and conversation circulate through the public room. Choose one thing to investigate today.'),
 582:scene('The Amulet of Nodens',inn,582,89,'The notes describe a charm that can summon Nodens once. He can carry its bearer to a distant place or send a group of nightgaunts to assist in a single encounter. The charm vanishes after use.'),
 [escape]:scene('Out through the door',inn,472,73,'You get past the man with the knife and leave the inn behind.'),
 [fight]:scene('The knife comes around again',inn,472,73,'The man presses his attack. You can fight back or try to get past him.'),
 [lastDodge]:scene('One opening',inn,472,73,'His companions close in. There is just enough room to slip between them.'),
 [jail]:scene('Bail arrives',inn,481,74,'The police break up the fight and hold you in jail. Eventually bail arrives from abroad and you are released.'),
 [ending]:scene('Surrounded at the inn',inn,472,73,'The men close ranks around you. Another blade flashes in the haze. Your investigation ends in Bremen.')
};

function clue(entry,title) {
 const {source,paragraphs}=BR_SCENES[entry];
 return {title,type:'Bremen · Lead',source,text:paragraphs.join('\n\n')};
}
export const BR_CLUES={
 bremenFreighter:clue(451,'The expedition’s freighter'),
 bremenDeparture:clue(452,'The Dark Sea has departed'),
 bremenConversation:clue(457,'The Brownshirts’ conversation'),
 bremenNodens:clue(582,'The Amulet of Nodens')
};
export const BR_ENTRY_CLUES={451:'bremenFreighter',452:'bremenDeparture',457:'bremenConversation',582:'bremenNodens'};

const choice=(id,label,target,extra={})=>({id,label,target,duration:0,...extra});
const check=(entry,skill,label,extra={})=>({entry,skill,label,duration:0,...extra});
const atNight=s=>(hourOf(s.time)<8||hourOf(s.time)>=20)&&s.sleptNight!==nightStart(s.time);
const boardable=s=>s.time<BR_DEPARTURE&&hourOf(s.time)>=8&&hourOf(s.time)<20;
const gun=s=>s.inventory.includes('Revolver');
const blade=s=>s.inventory.includes('Hunting knife');
const harborChoice=choice('bremen-return-harbor','Return to the harbor',449,{destination:'bremenHarbor'});
const innChoice=choice('bremen-enter-inn','Go to Der Freischütz',461,{destination:'bremenInn'});
const barChoice=choice('bremen-return-bar','Return to the public room',491);
const rest=(id,label,target)=>choice(id,label,target,{sleep:true,when:atNight});
const innCheckIds=['bremen-inn-spot','bremen-inn-listen','bremen-inn-psychology','bremen-inn-mythos'];
const innCheckAvailable=(...findings)=>s=>!innCheckIds.some(id=>s.attempts[id])&&!findings.some(entry=>s.visited.includes(entry));

export const BR_CHOICES={
 449:[
  choice('bremen-look-ships','Look for the expedition ship',451,{when:s=>s.time<BR_DEPARTURE}),
  choice('bremen-empty-quay','Walk along the docks',452,{when:s=>s.time>=BR_DEPARTURE})
 ],
 450:[choice('bremen-shuttle','Take the free shuttle to the harbor',449,{destination:'bremenHarbor'})],
 451:[
  choice('bremen-board-dark-sea','Go aboard The Dark Sea',486,{when:boardable,destination:'darkSeaGangplank'}),
  choice('bremen-check-berth','Check the berth again',452,{when:s=>s.time>=BR_DEPARTURE}),
  innChoice
 ],
 452:[innChoice],
 457:[barChoice],
 458:[barChoice],
 461:[choice('bremen-watch-inn','Watch the public room',491),rest('bremen-inn-rest','Take a room for the night',461)],
 467:[rest('bremen-mission-rest','Sleep at the mission house',467),harborChoice],
 469:[barChoice],
 470:[choice('bremen-translate-notes','Have the notes translated',582,{duration:1}),harborChoice],
 473:[choice('bremen-answer-question','Answer him',485)],
 474:[choice('bremen-hear-question','Listen to the man',473)],
 477:[choice('bremen-look-at-box','Look at the box',479),barChoice],
 479:[choice('bremen-approach-table','Approach the table',474,{when:s=>!s.flags.bremenAmuletTaken}),barChoice],
 482:[innChoice],
 484:[choice('bremen-face-knife','Stand your ground with the revolver',472,{when:gun})],
 485:[choice('bremen-feign-interest','Pretend you were only passing by',482),choice('bremen-ask-box','Ask about the box',478)],
 491:[innChoice,harborChoice],
 582:[harborChoice],
 [escape]:[choice('bremen-find-mission','Find a safer place to sleep',467)],
 [jail]:[choice('bremen-leave-jail','Go to the mission house',467),harborChoice]
};

export const BR_CHECKS={
 'bremen-inn-spot':check(491,'Spot Hidden','Watch the Brownshirts',{daily:true,when:innCheckAvailable(479),successEntry:479}),
 'bremen-inn-listen':check(491,'Listen','Listen to the nearest group',{daily:true,when:innCheckAvailable(457),successEntry:469}),
 'bremen-inn-psychology':check(491,'Psychology','Read the mood in the room',{daily:true,when:innCheckAvailable(479),successEntry:458}),
 'bremen-inn-mythos':check(491,'Cthulhu Mythos','Study the case’s shape',{daily:true,when:innCheckAvailable(477,479),successEntry:477}),
 'bremen-overhear-german':check(469,'Language (German)','Make out the conversation',{successEntry:457,failureEntry:491,repeat:true}),
 'bremen-unease-luck':check(458,'Luck','Follow the uneasy looks',{successEntry:479,failureEntry:491,repeat:true}),
 'bremen-knife-dex':check(478,'DEX','Draw your revolver first',{when:gun,successEntry:481,failureEffect:'bremen-arrest',repeat:true}),
 'bremen-knife-dodge':check(478,'Dodge','Dodge past the man with the knife',{successEntry:467,failureEffect:'bremen-arrest',repeat:true}),
 'bremen-close-shot':check(481,'Firearms (Handgun)','Fire at point-blank range',{when:gun,bonusDie:true,successEntry:484,failureEffect:'bremen-arrest',repeat:true}),
 'bremen-box-dodge':check(484,'Dodge','Escape with the cases',{successEntry:470,failureEffect:'bremen-arrest',repeat:true}),
 'bremen-stand-shot':check(472,'Firearms (Handgun)','Fire at the knife-wielding man',{when:gun,successEffect:'bremen-revolver',failureEffect:'bremen-counter',repeat:true}),
 'bremen-fight-shot':check(fight,'Firearms (Handgun)','Fire again',{when:gun,successEffect:'bremen-revolver',failureEffect:'bremen-counter',repeat:true}),
 'bremen-fight-dodge':check(fight,'Dodge','Dodge away',{successEntry:escape,failureEffect:'bremen-counter',repeat:true}),
 'bremen-fight-fists':check(fight,'Fighting (Brawl)','Strike with your fists',{successEffect:'bremen-fists',failureEffect:'bremen-counter',repeat:true}),
 'bremen-fight-knife':check(fight,'Fighting (Brawl)','Fight back with your knife',{when:blade,successEffect:'bremen-blade',failureEffect:'bremen-counter',repeat:true}),
 'bremen-final-dodge':check(lastDodge,'Dodge','Dodge through the last opening',{successEntry:escape,failureEntry:ending,repeat:true}),
 'bremen-notes-german':check(470,'Language (German)','Read the notes in German',{successEntry:582})
};

export function bremenEnter(s,{go,log}={}) {
 if(s.location!=='bremenInn') return;
 if(s.entry===461&&s.flags.bremenInnDanger&&go) {
  go(s,467);
  return;
 }
 if([467,escape,jail].includes(s.entry)) s.flags.bremenInnDanger=true;
 if(![fight,lastDodge].includes(s.entry)) delete s.bremenDamage;
 if(s.entry===470&&!s.flags.bremenAmuletTaken) {
  s.inventory.push(BR_AMULET);
  s.flags.bremenAmuletTaken=true;
  log?.(s,`Acquired the ${BR_AMULET}.`);
 }
 if(s.entry===ending) {
  s.phase='ending';
  s.hp=0;
 }
}

const damageDice={'bremen-revolver':10,'bremen-fists':3,'bremen-blade':6};
export function bremenCheckEffect(s,effect,{rollDie,go,log,advanceJourney}) {
 if(effect==='bremen-arrest') {
  const damage=rollDie(3)+1;
  s.hp=Math.max(0,s.hp-damage);
  log(s,`Lost ${damage} health in the fight at the inn.`);
  if(!s.hp) {
   go(s,ending);
   return true;
  }
  const days=rollDie(10)+rollDie(10);
  advanceJourney(s,24*days);
  log(s,`Spent ${days} days in custody before bail arrived.`);
  go(s,jail);
  return true;
 }
 if(effect!=='bremen-counter'&&!Object.hasOwn(damageDice,effect)) return false;
 if(damageDice[effect]) {
  const damage=rollDie(damageDice[effect]);
  s.bremenDamage=(s.bremenDamage||0)+damage;
  log(s,`You deal ${damage} damage to the man with the knife.`);
  if(s.bremenDamage>=6) {
   log(s,'The man collapses and his companions flee.');
   go(s,470);
   return true;
  }
 }
 const attack=rollDie(100);
 log(s,`Knife attack: rolled ${attack} against 50%.`);
 if(attack<=50) {
  const damage=rollDie(6);
  s.hp=Math.max(0,s.hp-damage);
  log(s,`The blade wounds you for ${damage} health.`);
 }
 if(!s.hp) go(s,ending);
 else if(attack>50) go(s,escape);
 else go(s,s.entry===fight?lastDodge:fight);
 return true;
}

export function validateBremen(s) {
 return s.bremenDamage===undefined||([fight,lastDodge].includes(s.entry)&&Number.isInteger(s.bremenDamage)&&s.bremenDamage>=1&&s.bremenDamage<6);
}
