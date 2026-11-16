import { HOUR, dayStart, hourOf } from './calendar.js';

const museum = 'Cairo Museum';
const deviceReport = 'cm-device-report';
const kehLying = 'cm-keh-lying';
const cutoff = Date.UTC(1931, 9, 30);
const device = 'Karpathos Device';
const museumCaught = 'cm-caught';
const deviceReclaimed = 'cm-device-reclaimed';
const museumInjuries = 'cm-injuries';
const museumClosed = 'cm-closed';
const policeCordon = 'cm-police-cordon';
const nightDodge = 'cm-night-dodge';
const nightInt = 'cm-night-int';
const officeShock = 'cm-office-shock';
const officeEscape = 'cm-office-escape';
const guards = ['cm-guard-1','cm-guard-2','cm-guard-3'];
const guardGrabs = guards.map(entry=>`${entry}-grab`);
const firearms = ['Revolver','12-gauge shotgun','.30-06 rifle'];
const hasFirearm = s=>firearms.some(item=>s.inventory.includes(item));

export const CM_LOCATIONS = {
 cairoMuseum:{
  name:museum,entry:206,region:'cairo',hours:[9,18],
  hoursLabel:'9 AM–noon and 3–6 PM · Daily',
  description:'See the Karpathos Device exhibition and Akhenaten’s pyramid, or ask for the curator.'
 }
};

export function cmOpen(time) {
 const hour = hourOf(time);
 return hour>=9&&hour<12 || hour>=15&&hour<18;
}

export function cmEntry(time) {
 return time<cutoff?206:300;
}

function scene(title,entry,page,...paragraphs) {
 return {title,eyebrow:museum,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const CM_SCENES = {
 206:scene(museum,206,40,
  'The museum opens from 9 AM to noon and from 3 to 6 PM. Three exhibits might bear on your investigation. Its curator, Amet Keh, usually receives visitors from 9 AM to 5 PM.'),
 300:scene(museum,300,53,
  'The museum’s hours are 9 AM to noon and 3 to 6 PM. Allow one hour for each gallery or office visit.'),
 290:scene('Treasures from the Pyramids',290,52,
  'Gold and silver combs, tools, and household objects fill the cases. A placard beside an empty sarcophagus explains that enslaved people were killed when their lord died so that they could continue to serve him in the afterlife.',
  'A picture of Akhenaten’s amulet and a panel of hieroglyphs are displayed nearby.'),
 207:scene('Akhenaten’s amulet',207,40,
  'The picture shows a disc with four triangular arms meeting at the center. You can try to make a faithful copy for your notes.'),
 298:scene('A top and a doorway',298,53,
  'Two references in the hieroglyphs stand out: a top and a door opening.'),
 236:scene('Tombs of the Ancients',236,44,
  'A cutaway model of Akhenaten’s pyramid exposes its known rooms and corridors. You can study its proportions, look for its survey map, or examine the carvings.'),
 252:scene('The pyramid’s interior',252,46,
  'The passages and rooms shown in the model occupy very little of the pyramid. There may be more chambers inside.'),
 287:scene('The Tell-el-Amarna pyramid map',287,52,
  'You find a plan of the pyramid at Tell-el-Amarna, drawn as a flattened view.'),
 244:scene('A chiseled frieze',244,45,
  'Someone partly chiseled a strange, viscous creature out of the frieze. You remember forbidden accounts of the creatures the Old Ones enslaved. The name was shoggoth.'),
 209:scene('The Karpathos Device',209,41,
  'The ancient machine looks remarkably modern. Its metal has a sheen like aluminum and appears much stronger. Electrical leads run into the glass case. The museum seems determined to prevent another theft.'),
 [deviceReport]:scene('The Athens museum’s report',168,33,
  'The archaeological team dated the machine to at least two thousand years ago. They described a complex assembly of gears and linkages, cryptic Greek inscriptions around the edges of some gears, and unusual Egyptian hieroglyphs inside.',
  'The team could offer no explanation for its purpose.'),
 211:scene('The Device could be stolen',211,41,
  'You could try to take the Device before it falls into the wrong hands. The alarm is active and the galleries are staffed until closing.'),
 229:scene('The alarmed case',229,43,
  'Thick glass surrounds the Device. Electrical leads connect the case to an alarm.'),
 281:scene('Wait inside the museum',281,51,
  'Find a place to hide before the attendants make their final round at 6 PM.'),
 [museumClosed]:scene('Escorted out',281,51,
  'An attendant discovers you as the museum closes and escorts you outside. You can return when the museum reopens tomorrow.'),
 280:scene('Break open the display',280,51,
  'The toughened glass can withstand 10 points of damage. A blow with your bare hands also costs you 1 HP.'),
 230:scene('The first guard',230,43,
  'The glass shatters. You lift the surprisingly heavy Device as a guard reaches for his revolver. Three galleries lie between you and the exit.'),
 ...Object.fromEntries(guards.map((entry,index)=>[entry,scene(`Gallery ${index+1}`,230,43,
  'A guard intercepts you as you run for the exit. Your hands are occupied by the Device.')])),
 ...Object.fromEntries(guardGrabs.map((entry,index)=>[entry,scene(`A guard blocks gallery ${index+1}`,230,43,
  'The guard lunges to catch you. You can evade him or swing the Device to push past him.')])),
 276:scene('A sound in the galleries',276,51,
  'The glass gives way. As you lift the Device from its stand, you hear something moving in the dark.'),
 263:scene('The museum comes alive',263,47,
  'Mummies and prehistoric creatures stalk the dim corridors. You need three successful rolls in a row to find a way out. On each failure you lose 1 HP and start the sequence again.'),
 [nightDodge]:scene('Through the galleries',263,47,
  'You pick out a route past the moving exhibits. Claws rake the darkness as you slip by.'),
 [nightInt]:scene('Find a way outside',263,47,
  'You have slipped past the creatures. Find a window you can break through before they reach you. The fall through the glass costs 1D4 + 1 HP.'),
 274:scene('Police outside the museum',274,51,
  'Police cars surround the museum. You still have the Device and a moment to decide what to do.'),
 [policeCordon]:scene('The cordon closes',274,51,
  'You can try to talk your way past the police or surrender.'),
 301:scene('Away from the museum',301,53,
  'You have slipped past the police with the Device.'),
 293:scene('The Device is yours',293,53,
  'The Device is in your hands and the police are looking for you. Will you try to destroy it, keep it, or surrender?'),
 249:scene('The Device sinks in the Nile',249,46,
  'Your blows leave the Device intact. You drift down the Nile in a felucca and drop it into deep water.',
  'The police catch you, and you spend seven years in prison. You never learn what the Device might have done. It lies buried in the river silt, beyond the reach of those who would have used it.'),
 315:scene('Confession',315,55,
  'You tell the police what you did. They take the Device and confine you to a sanatorium. Years pass before you are released.'),
 [museumCaught]:scene('The police recover the Device',230,43,
  'The police recover the Device and imprison you. After the museum puts it back on display, someone else steals it. You only hear about the theft from the newspapers.'),
 [deviceReclaimed]:scene('The police reclaim the Device',249,46,
  'The police catch you with the Device. After several years in prison, you are released and return to America.'),
 [museumInjuries]:scene('You fall in the museum',230,43,
  'Your injuries overwhelm you before you can escape with the Device.'),
 247:scene('The empty display case',247,45,
  'The glass case is empty. A placard says that the Karpathos Device has been stolen.'),
 302:scene('Amet Keh',302,54,
  'Keh welcomes you to his office and asks how he can help.'),
 330:scene('A short audience',330,56,
  'Keh laughs at the idea of letting you examine the Device or returning it to Athens. He denies ever hearing of Gliere and moves to escort you out.'),
 350:scene('A closer look at Keh',350,59,
  'Something about Keh makes you uneasy. You have time to pay attention to one detail before he ushers you out.'),
 316:scene('Keh grows impatient',316,55,
  'Keh narrows his eyes and says he has told you all he knows. You weigh his answer.'),
 [kehLying]:scene('Keh’s lie',17,13,
  'You are convinced he is lying. There is time to notice one more thing before you leave.'),
 326:scene('Someone behind the door',326,56,
  'Keh is breathing heavily. You can hear someone moving in the room behind him.'),
 336:scene('Keh’s bookshelves',336,57,
  'Ancient books bound in an unsettling kind of hide sit among the other books on his shelves. Keh makes a point of standing in front of the inner door.'),
 346:scene('The inner door',346,59,
  'You ask what is behind the door. “Nothing,” Keh insists. You doubt his answer.'),
 370:scene('The visitor behind the door',370,61,
  'Keh stands aside. The man inside smiles, then his face dissolves into a mass of bubbles, each holding a staring eye. A part of him reaches for you.'),
 [officeShock]:scene('The horror sinks in',370,61,
  'You struggle to make sense of what you have just seen. A moment of understanding could cost you your chance to run.'),
 [officeEscape]:scene('Out of reach',370,61,
  'The creature stretches toward you. You have only a moment to get clear.'),
 259:scene('The dream',259,47,
  'You dream of eyes and mouths opening across a mass of flesh. You wake to find the creatures are already upon you.'),
 587:scene('The creature closes in',587,90,
  'The creature envelops you before you can reach the door.'),
 314:scene('Three worried men',314,55,
  'Three men stand inside the curator’s office. One of them mutters that Amet Keh is unavailable.'),
 380:scene('What happened to Keh?',380,62,
  'One of the men says Keh is dead and that the Karpathos Device has been stolen. He claims they have no idea who took it or why.'),
 372:scene('Two accounts of the theft',372,61,
  'One man says some people suspect the cult of Aten. Another thinks a wealthy collector commissioned the theft.'),
 362:scene('The guarded door',362,60,
  'The men seem particularly protective of the door behind them.'),
 408:scene('The men block the way',408,66,
  'They say the curator’s belongings must be left undisturbed and order you to leave.'),
 322:scene('The missing curator',322,56,
  'You find Keh standing rigidly behind the door. His skin has a glazed sheen and his face is fixed in terror. You have the terrible impression that he is still aware of his surroundings.',
  'One of the men says whoever did this also took the Karpathos Device.')
};

export const CM_ENTRIES = {
 cairoMuseum:[...Object.keys(CM_SCENES).map(entry=>Number(entry)||entry),574]
};

export const CM_ENDINGS = new Set([249,259,587,museumInjuries]);
export const CM_VICTORIES = new Set([249]);

function clue(title,type,entry,text,visual={}) {
 return {title,type,source:CM_SCENES[entry].source,text,...visual};
}

export const CM_CLUES = {
 cairoAkhenatenAmulet:clue('Akhenaten’s amulet','Copied illustration',207,
  'You made a copy of the museum’s picture of Akhenaten’s amulet.',{
   image:'assets/akhenaten-amulet.png',alt:'A round disc with four triangular arms meeting at the center.'
  }),
 cairoPyramidHieroglyphs:clue('A top and a doorway','Translated exhibit panel',298,
  'The hieroglyphs in the Treasures from the Pyramids exhibit refer to a top and a door opening.'),
 cairoPyramidInterior:clue('Unaccounted-for space in the pyramid','Exhibit observation',252,
  'The model of Akhenaten’s pyramid shows an unexpectedly small interior. More chambers could be hidden inside.'),
 cairoPyramidMap:clue('Tell-el-Amarna pyramid map','Exhibit map',287,
  'The exhibit map shows a flattened view of the pyramid at Tell-el-Amarna.',{
   image:'assets/tell-el-amarna-map.png',alt:'Four triangular faces meet at the center of a square pyramid plan. A chamber is marked on the left face.'
  }),
 cairoPyramidFrieze:clue('The damaged shoggoth frieze','Exhibit observation',244,
  'A creature partly erased from a pyramid frieze resembles a shoggoth, one of the beings enslaved by the Old Ones.'),
 cairoDeviceDisplay:clue('The Karpathos Device in Cairo','Exhibit observation',209,
  'The Karpathos Device is on display in an electrically guarded glass case.',{
   image:'assets/karpathos-device.png',alt:'A metal mechanism with exposed gears under a glass display dome.'
  }),
 cairoDeviceReport:clue('The Athens team’s examination','Exhibit report',deviceReport,
  'The gears bear cryptic Greek inscriptions, and the interior has unusual Egyptian hieroglyphs. The Karpathos Device is at least two thousand years old.'),
 cairoDeviceMissing:clue('The theft of the Karpathos Device','Museum notice',247,
  'By October 30, the museum’s display case is empty. The exhibit notice says the Device was stolen.'),
 cairoKehOffice:clue('Keh’s inner office','Curator interview',326,
  'Someone was in the room behind Amet Keh, though he did not acknowledge them.'),
 cairoKehBooks:clue('Keh’s concealed doorway','Curator interview',336,
  'Some of the curator’s books were ancient and had unsettling bindings. Keh positioned himself in front of the inner door.'),
 cairoTheftRumors:clue('Suspects in the museum theft','Museum staff interview',372,
  'One staff member suspects the cult of Aten. Another thinks a wealthy collector commissioned the theft.'),
 cairoKehFate:clue('Amet Keh’s fate','Museum staff interview',322,
  'The curator appears petrified. The men guarding him believe whoever did this also stole the Karpathos Device.')
};

export const CM_ENTRY_CLUES = {
 298:'cairoPyramidHieroglyphs',252:'cairoPyramidInterior',287:'cairoPyramidMap',
 244:'cairoPyramidFrieze',209:'cairoDeviceDisplay',[deviceReport]:'cairoDeviceReport',
 247:'cairoDeviceMissing',326:'cairoKehOffice',336:'cairoKehBooks',
 372:'cairoTheftRumors',322:'cairoKehFate'
};

export const CM_FLAGS = [];

function check(entry,skill,label,successEntry,failureEntry,options={}) {
 return {entry,skill,label,successEntry,failureEntry,duration:0,repeat:false,...options};
}

function untried(...ids) {
 return s=>ids.every(id=>!s.attempts[id]);
}

const amuletUntried = untried('cm-amulet-int','cm-amulet-art');
const curatorObservation = s=>untried('cm-keh-psychology','cm-keh-listen','cm-keh-spot')(s)
 || s.visited.includes(kehLying);
const staffSkills = ['Charm','Fast Talk','Intimidate','Persuade'];
const staffIds = staffSkills.map(skill=>`cm-staff-${skill.toLowerCase().replace(' ','-')}`);
const staffUntried = untried(...staffIds);

export const CM_CHECKS = {
 'cm-amulet-int':check(207,'INT','Copy the amulet from the drawing',290,290,{
  clue:'cairoAkhenatenAmulet',when:amuletUntried
 }),
 'cm-amulet-art':check(207,'Art/Craft (Photography)','Copy the amulet using your visual training',290,290,{
  clue:'cairoAkhenatenAmulet',when:amuletUntried
 }),
 'cm-hieroglyphs':check(290,'Language (Hieroglyphics)','Decipher the exhibit hieroglyphs',298),
 'cm-model-int':check(236,'INT','Compare the rooms with the pyramid’s size',252),
 'cm-model-luck':check(236,'Luck','Look for a survey map',287),
 'cm-model-mythos':check(236,'Cthulhu Mythos','Identify the damaged carving',244),
 'cm-keh-fast-talk':check(330,'Fast Talk','Keep Keh talking',350,206),
 'cm-keh-psychology':check(350,'Psychology','Read Keh’s expression',316,206,{when:curatorObservation}),
 'cm-keh-listen':check(350,'Listen','Listen past Keh’s voice',326,206,{when:curatorObservation}),
 'cm-keh-spot':check(350,'Spot Hidden','Look closely around the office',336,206,{when:curatorObservation}),
 'cm-keh-int':check(316,'INT','Think through Keh’s answer',kehLying,350),
 ...Object.fromEntries(staffSkills.map((skill,index)=>[
  staffIds[index],
  check(314,skill,`Ask about Keh or the Device (${skill})`,380,300,{when:staffUntried})
 ])),
 'cm-staff-theft':check(380,'Fast Talk','Press the men for suspects',372),
 'cm-staff-psychology':check(380,'Psychology','Watch what the men are guarding',362),
 'cm-office-dex':check(362,'DEX','Dash through the door',322),
 'cm-office-dodge':check(408,'Dodge','Dodge past the men',322,300),
 'cm-hide-until-closing':check(281,'Stealth','Hide until the final closing round',null,null,{
  successEffect:'cm-hide-success',failureEffect:'cm-hide-failure',repeat:true
 }),
 'cm-escape-first-guard':check(230,'DEX','Run before the guard can fire',guards[0],null,{
  failureEffect:'cm-first-guard-shot'
 }),
 ...Object.fromEntries(guardGrabs.flatMap((entry,index)=>[
  [`cm-guard-${index+1}-dodge`,check(entry,'Dodge','Evade the guard',guards[index+1]??293,museumCaught)],
  [`cm-guard-${index+1}-brawl`,check(entry,'Fighting (Brawl)','Swing the Device to get past',guards[index+1]??293,museumCaught)]
 ])),
 'cm-night-spot':check(263,'Spot Hidden','Look for a clear path',nightDodge,null,{
  repeat:true,failureEffect:'cm-night-injury'
 }),
 'cm-night-dodge':check(nightDodge,'Dodge','Slip past the creatures',nightInt,null,{
  repeat:true,failureEffect:'cm-night-injury'
 }),
 'cm-night-int':check(nightInt,'INT','Find a window you can jump through',null,null,{
  repeat:true,successEffect:'cm-night-window',failureEffect:'cm-night-injury'
 }),
 'cm-police-stealth':check(274,'Stealth','Slip past the police',301,policeCordon),
 'cm-police-fast-talk':check(policeCordon,'Fast Talk','Talk your way out of the cordon',301,315),
 'cm-police-persuade':check(policeCordon,'Persuade','Persuade the police to let you pass',301,315),
 'cm-office-sanity':check(370,'Sanity','Steady yourself at the sight',null,null,{
  successEffect:'cm-office-sanity-pass',failureEffect:'cm-office-sanity-fail'
 }),
 'cm-office-shock':check(officeShock,'INT','Make sense of what you saw',259,officeEscape,{noLuck:true}),
 'cm-office-escape':check(officeEscape,'DEX','Leap back into the hall',206,587)
};

function choice(id,label,target,options={}) {
 return {id,label,target,detail:'No time passes',duration:0,...options};
}

const early = s=>cmEntry(s.time)===206;
const late = s=>cmEntry(s.time)===300;
const openEarly = s=>early(s)&&cmOpen(s.time);
const openLate = s=>late(s)&&cmOpen(s.time)&&cmOpen(s.time+HOUR-1);
const backToHall = [
 choice('cm-return-early','Return to the museum hall',206,{when:early}),
 choice('cm-return-late','Return to the museum hall',300,{when:late})
];
const treasures = choice('cm-return-treasures','Return to the Treasures exhibit',290);
const tombs = choice('cm-return-tombs','Return to the Tombs exhibit',236);
const staff = choice('cm-return-staff','Return to the curator’s office',380);
const surrender = choice('cm-surrender','Surrender to the police',315);
const dispose = choice('cm-dispose-device','Try to destroy the Device',249);
const fate = choice('cm-face-the-world','Continue',574);
const glassBlows = {
 'cm-glass-fists':{label:'Strike the glass with your fists',sides:3},
 'cm-glass-bench':{label:'Swing a gallery bench against the glass',sides:6},
 'cm-glass-firearm':{label:'Fire at the glass',sides:10,when:hasFirearm}
};

function exhibitChoices(routes,afterCutoff=false) {
 return routes.map(([id,label,target])=>choice(`cm-${id}${afterCutoff?'-late':''}`,label,target,afterCutoff
  ?{when:openLate,duration:1,detail:'1 hour'}
  :{when:openEarly}));
}

const galleries = [
 ['treasures','See Treasures from the Pyramids',290],
 ['tombs','See Tombs of the Ancients',236]
];

export const CM_CHOICES = {
 206:[
  ...exhibitChoices([...galleries,['device','See the Karpathos Device',209]]),
  choice('cm-curator','Interview Amet Keh',302,{when:s=>openEarly(s)&&hourOf(s.time)<17}),
  choice('cm-update-hall','Return to the museum hall',300,{when:late})
 ],
 300:exhibitChoices([
  ...galleries,['device','Go to the Karpathos Device exhibit',247],
  ['curator','Visit the curator’s office',314]
 ],true),
 290:[choice('cm-see-amulet','Look at Akhenaten’s amulet',207),...backToHall],
 207:[treasures],
 298:[treasures],
 236:backToHall,
 252:[tombs],
 287:[tombs],
 244:[tombs],
 209:[
  choice('cm-read-device-report','Read the Athens team’s report',deviceReport),
  choice('cm-consider-theft','Consider taking the Device',211,{when:openEarly}),
  ...backToHall
 ],
 [deviceReport]:backToHall,
 211:[
  choice('cm-theft-day','Try to take the Device now',229,{when:openEarly}),
  choice('cm-theft-night','Wait for the doors to close',281,{when:openEarly}),
  ...backToHall
 ],
 229:[choice('cm-approach-case','Break the glass',280,{when:openEarly}),...backToHall],
 [museumClosed]:[
  choice('cm-reenter-early','Enter the museum when it reopens',206,{when:openEarly}),
  choice('cm-reenter-late','Enter the museum when it reopens',300,{when:openLate})
 ],
 280:Object.entries(glassBlows).map(([id,blow])=>choice(id,blow.label,280,{
  effect:id,when:blow.when,
  detail:id==='cm-glass-fists'?'1D3 damage to the glass and 1 HP lost':`1D${blow.sides} damage to the glass`
 })),
 276:[choice('cm-look-into-dark','Look toward the noise',263)],
 274:[dispose,surrender,choice('cm-keep-at-museum','Try to leave with the Device in the open',deviceReclaimed)],
 [policeCordon]:[surrender],
 301:[choice('cm-decide-device','Decide what to do with the Device',293),surrender],
 293:[dispose,choice('cm-keep-device','Try to keep the Device',deviceReclaimed),surrender],
 315:[fate],
 [museumCaught]:[fate],
 [deviceReclaimed]:[fate],
 247:backToHall,
 302:[
  choice('cm-ask-examine','Ask to examine the Karpathos Device',330),
  choice('cm-ask-return','Ask him to return the Device to Athens',330),
  choice('cm-ask-gliere','Ask about Professor Gliere',330),
  choice('cm-ask-office','Ask about his work and look around the office',350),
  ...backToHall
 ],
 330:backToHall,
 350:backToHall,
 316:backToHall,
 [kehLying]:[choice('cm-look-again','Look around the office again',350),...backToHall],
 326:[choice('cm-ask-door-noise','Ask who is behind the door',346),...backToHall],
 336:[choice('cm-ask-door-books','Ask what is behind the door',346),...backToHall],
 346:[
  choice('cm-threaten-keh','Draw your gun and demand he open the door',370,{
   when:s=>openEarly(s)&&hourOf(s.time)<17&&hasFirearm(s)&&!s.attempts['cm-office-sanity']
  }),
  ...backToHall
 ],
 314:backToHall,
 380:backToHall,
 372:[staff],
 362:[choice('cm-question-door','Ask what is behind the door',408),...backToHall],
 408:backToHall,
 322:backToHall
};

const encounters = new Set([
 230,263,274,276,280,281,293,301,315,370,officeShock,officeEscape,nightDodge,nightInt,policeCordon,
 museumCaught,deviceReclaimed,...guards,...guardGrabs
]);

export function cmIsEncounter(s) {
 return s.location==='cairoMuseum'&&encounters.has(s.entry);
}

export function validateMuseum(s) {
 return s.location==='cairoMuseum'&&s.entry===280
  ?Number.isInteger(s.cmGlass)&&s.cmGlass>=0&&s.cmGlass<10
  :s.cmGlass===undefined;
}

function removeDevice(s) {
 s.inventory = s.inventory.filter(item=>item!==device);
}

export function cmEnter(s,previousEntry,{go,rollDie,log}) {
 if(s.location!=='cairoMuseum') return;
 if(s.entry===280) {
  if(previousEntry!==280) s.cmGlass=0;
 } else delete s.cmGlass;
 if(CM_ENDINGS.has(s.entry)||s.entry===574) {
  removeDevice(s);
  s.phase='ending';
  if(s.entry!==574&&!CM_VICTORIES.has(s.entry)) s.hp=0;
 }
 if(s.entry===315||s.entry===museumCaught||s.entry===deviceReclaimed) removeDevice(s);
 const guard = guards.indexOf(s.entry);
 if(guard===-1) return;
 const next = guards[guard+1]??293;
 if(rollDie(6)===6) {
  const grabbed = rollDie(100)<=30;
  log(s,grabbed?'A guard lunges at you.':'A guard reaches for you and misses.');
  go(s,grabbed?guardGrabs[guard]:next);
 } else if(guardShot(s,{go,rollDie,log})) go(s,next);
}

function loseHealth(s,amount,message,{go,log}) {
 s.hp=Math.max(0,s.hp-amount);
 log(s,`${message} Lost ${amount} HP.`);
 if(s.hp===0) go(s,museumInjuries);
 return s.hp>0;
}

function guardShot(s,tools) {
 if(tools.rollDie(100)>25) {
  tools.log(s,'A museum guard fires and misses.');
  return true;
 }
 return loseHealth(s,tools.rollDie(8),'A museum guard shoots you.',tools);
}

export function cmChoiceEffect(s,effect,tools) {
 const blow=glassBlows[effect];
 if(!blow) return false;
 const damage=tools.rollDie(blow.sides);
 const total=s.cmGlass+damage;
 tools.log(s,`You deal ${damage} damage to the case (${Math.min(total,10)} of 10).`);
 if(effect==='cm-glass-fists'&&!loseHealth(s,1,'The blow injures your hand.',tools)) return true;
 if(total>=10) {
  if(!s.inventory.includes(device)) s.inventory.push(device);
  tools.go(s,hourOf(s.time)>=18?276:230);
 } else s.cmGlass=total;
 return true;
}

export function cmCheckEffect(s,effect,tools) {
 const {advance,go,rollDie,log}=tools;
 switch(effect) {
  case 'cm-hide-success':
  case 'cm-hide-failure':
   advance(s,(dayStart(s.time)+18*HOUR-s.time)/HOUR);
   go(s,effect==='cm-hide-success'?280:museumClosed);
   return true;
  case 'cm-first-guard-shot':
   if(guardShot(s,tools)) go(s,guards[0]);
   return true;
  case 'cm-night-injury':
   if(loseHealth(s,1,'A creature strikes as you pass.',tools)) go(s,263);
   return true;
  case 'cm-night-window':
   if(loseHealth(s,rollDie(4)+1,'You crash through the window.',tools)) go(s,274);
   return true;
  case 'cm-office-sanity-pass':
  case 'cm-office-sanity-fail': {
   const loss=Math.min(s.sanity,rollDie(effect==='cm-office-sanity-pass'?6:20));
   s.sanity-=loss;
   log(s,`The sight costs you ${loss} Sanity.`);
   go(s,s.sanity===0?259:loss>=5?officeShock:officeEscape);
   return true;
  }
  default:
   return false;
 }
}
