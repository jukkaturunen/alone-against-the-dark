import { HOUR, hourOf } from './calendar.js';

const museum = 'Cairo Museum';
const deviceReport = 'cm-device-report';
const kehLying = 'cm-keh-lying';
const cutoff = Date.UTC(1931, 9, 30);

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
 cairoMuseum:Object.keys(CM_SCENES).map(entry=>Number(entry)||entry)
};

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
 'cm-office-dodge':check(408,'Dodge','Dodge past the men',322,300)
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
 209:[choice('cm-read-device-report','Read the Athens team’s report',deviceReport),...backToHall],
 [deviceReport]:backToHall,
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
 346:backToHall,
 314:backToHall,
 380:backToHall,
 372:[staff],
 362:[choice('cm-question-door','Ask what is behind the door',408),...backToHall],
 408:backToHall,
 322:backToHall
};
