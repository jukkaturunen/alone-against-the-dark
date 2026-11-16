import { HOUR, dayStart, weekday } from './calendar.js';
import { PAR_RING } from './parthenon.js';

const university = 'Al-Azhar University';
const windows = [[7,11],[15,18]];
const ring = 'azhar-jahark-ring';
const literatureDevice = 'azhar-literature-device';

export const AZ_LOCATIONS = {
 cairoUniversity:{
  name:university,entry:149,region:'cairo',hours:[7,18],windows,
  hoursLabel:'7–11 AM and 3–6 PM · Mon–Fri',
  description:'Consult six academic departments or research the case in the university library.'
 }
};

export function azharOpen(time,hours=0) {
 const openingDay = dayStart(time);
 return weekday(time)&&windows.some(([start,end])=>
  time>=openingDay+start*HOUR&&time<openingDay+end*HOUR&&time+hours*HOUR<=openingDay+end*HOUR);
}

export const AZ_FLAGS = ['azharTranslator','azharJahark'];

export const AZ_JAHARK_SKILLS = {
 STR:50,CON:50,SIZ:55,DEX:70,INT:75,APP:60,POW:80,EDU:85,Sanity:80,Luck:60,
 'Fighting (Brawl)':30,'Firearms (Handgun)':55,Dodge:35,
 Archaeology:25,'Art/Craft (Map Making)':20,Climb:40,'Credit Rating':45,
 'Cthulhu Mythos':10,'Drive Auto':30,'Fast Talk':30,'First Aid':40,History:90,Jump:40,
 'Language (Arabic)':90,'Language (Hieroglyphics)':50,'Language (English)':55,
 'Language (Latin)':35,'Language (Greek)':45,'Library Use':55,Listen:60,Navigate:30,
 Occult:15,Persuade:55,Psychology:45,'Science (Cryptography)':15,'Science (Geology)':10,
 'Spot Hidden':65,Stealth:30,'Survival (Desert)':15
};

export const AZ_JAHARK = {
 name:'Professor Jahark',skills:AZ_JAHARK_SKILLS,hp:10,mp:16,damageBonus:0,build:0,move:8,
 attacks:{'Fighting (Brawl)':'1D3','Firearms (Handgun)':'1D10+2'}
};

export function azharTranslatorSkill(s,name) {
 if(!s.flags.azharTranslator||(!s.location.startsWith('cairo')&&s.location!=='fuziraMarket')) return 0;
 if(name==='Language (Arabic)') return 90;
 return name.startsWith('Language (')?50:0;
}

function scene(title,entry,page,...paragraphs) {
 return {title,eyebrow:university,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const AZ_SCENES = {
 149:scene(university,149,31,
  'The university’s main building houses six departments. British troops in the city have made some scholars wary of strangers. Allow an hour for each visit.'),
 216:scene('Department of Islamic Culture',216,42,
  'Professor Jahark is busy. You have one chance today to convince him to give you his time.'),
 217:scene('Department of Ancient History',217,42,
  'Professor Jahark will see you if you can persuade him or interest him in a question of history. You can try once a day.'),
 225:scene('Professor Emu',225,43,
  'Something you said caught Emu’s ear. He is willing to discuss the cult and the expeditions to Akhenaten’s pyramid.'),
 228:scene('Behind a locked door',228,43,
  'Jahark crosses the room and locks the door before he answers.'),
 231:scene('The god behind Aten',231,43,
  'The professor opens an old book to a rough sketch. Its subject is named the Lord of Mu, the Master of the Deep, and Ghatanothoa. He says the cult serves this being and that it seeks a new kingdom. He smiles and dismisses the account as nonsense.'),
 233:scene('Creatures of the Netherworld',233,44,
  'Jahark says few people today believe creatures can pass between this world and the Netherworld.'),
 237:scene('Jahark’s office',237,44,
  'In his book-lined office, Jahark invites you to ask about the cult, the pyramid, the Book of the Dead, or the Karpathos Device. You can also see whether he notices anything unusual among your things.'),
 238:scene('Department of Modern History',238,44,
  'Professor Emu can spare a few minutes if you can catch his attention. You can try once a day.'),
 239:scene('Department of Languages',239,44,
  'Professor Khargeh can arrange translations and offers to assign you a student for your work in Cairo. The student speaks Arabic at 90% and can help with other languages at 50%.'),
 250:scene('Jahark hears you out',250,46,
  'You catch Jahark’s attention before he can dismiss you. He gets up from his desk.'),
 258:scene('Finding help in Cairo',258,47,
  'Jahark directs you to Fuzira Marketplace, where you can join a caravan, hire help, and hear local rumors.'),
 260:scene('Department of Science',260,47,
  'Professor Ben ‘Ozen can look at a picture or diagram of the Karpathos Device if you have one to show him.'),
 261:scene('Department of Literature',261,47,
  'The professor invites you to ask about the cult of Aten, the Lost Pyramid, and the Karpathos Device.'),
 266:scene('A puzzle for the scientists',266,50,
  'Ben ‘Ozen shakes his head. He doubts anyone can say what the mechanism was actually made to do.'),
 270:scene('The cult’s master',270,50,
  'Jahark says the people you’re investigating are killers, perhaps ghouls. He doubts they serve Aten and thinks whoever commands them treats them as expendable.'),
 271:scene('What could the Device do?',271,50,
  'Ben ‘Ozen studies the mechanism. He suggests it might be an astronomical clock, a lock, or a part designed to synchronize a much larger machine.'),
 272:scene('An interview with Jahark',272,50,
  'Jahark speaks enough English to discuss the cult, local customs for hiring help, and beliefs about the Netherworld.'),
 273:scene('Disappearances in Egypt',273,50,
  'Emu says the cult has grown more active. Many people have vanished in recent years, and the authorities have kept it quiet.'),
 286:scene('Jahark studies you',286,52,
  'Jahark pauses and takes a closer look at you before he continues.'),
 [ring]:scene('The ring from Athens',286,52,
  'Jahark lowers his voice. He recognizes the ring’s power, though he cannot say if it will help you.'),
 288:scene('A passage in the Lost Pyramid',288,52,
  'One passage opens the way. According to the parchment, the gate is where you climb up in order to go down.'),
 291:scene('The Book of the Undead',291,52,
  'Jahark says the mummies described in the book are real and that fire destroys them. He says the British troops and the smell hanging over Cairo are signs of something the city won’t talk about.'),
 292:scene('Akhenaten’s pyramid',292,52,
  'Jahark identifies a small pyramid at Tell-el-Amarna. He thinks it still holds secrets, and he has something to give you.'),
 294:scene('Jahark’s marked map',294,53,
  'Jahark hands you a map and tells you to look for an opening on the east face. The map grants a bonus die when you search there.'),
 295:scene('The missing search party',295,53,
  'Many people have looked for a second entrance to the pyramid. Emu says one of those search parties disappeared without a trace.'),
 296:scene('Jahark offers to come along',296,53,
  'Jahark offers to join your investigation for as long as you want his help in Egypt. You can call on his skills during the investigation.'),
 297:scene('A key to a cursed box',297,53,
  'Jahark recalls a passage about a cursed key that opens a cursed box and unlocks something called the Top of Terror. He wonders whether it refers to the Device.'),
 [literatureDevice]:scene('A key to a cursed box',297,53,
  'The professor recalls a passage about a cursed key that opens a cursed box and unlocks something called the Top of Terror. He wonders whether it refers to the Device.')
};

export const AZ_ENTRIES = {cairoUniversity:Object.keys(AZ_SCENES).map(entry=>Number(entry)||entry)};

function clue(title,type,entry,text=AZ_SCENES[entry].paragraphs.join('\n\n')) {
 return {title,type,source:AZ_SCENES[entry].source,text};
}

export const AZ_CLUES = {
 azharDeviceImage:{
  title:'Sketch of the Karpathos Device',type:'Copied illustration',source:'Entries 176, 209 · pp. 35 and 41',
  text:'You copied the museum display so you can show the Karpathos Device to someone who might know what it does.',
  image:'assets/karpathos-device.png',alt:'The Karpathos Device has a metal casing and exposed gears.'
 },
 azharGhatanothoa:clue('Ghatanothoa, the Lord of Mu','Literature interview',231),
 azharNetherworld:clue('Travel between worlds','Islamic Culture interview',233),
 azharCaravans:clue('Travel and hiring at Fuzira','Islamic Culture interview',258),
 azharCultMaster:clue('Someone behind the cult of Aten','Jahark interview',270),
 azharDeviceTheory:clue('A lock or part of a larger device','Science interview',271),
 azharDisappearances:clue('Disappearances tied to the cult','Modern History interview',273),
 azharRing:clue('Jahark recognizes the ring','Jahark interview',ring),
 azharPassage:clue('A cryptic passage through the pyramid','Literature interview',288),
 azharUndead:clue('Why the mummies are burned','Jahark interview',291),
 azharPyramid:clue('The pyramid is at Tell-el-Amarna','Jahark interview',292),
 azharEastMap:clue('Jahark’s map of the east face','Marked map',294),
 azharMissingParty:clue('A missing search party','Modern History interview',295),
 azharCursedKey:clue('A cursed key and the Top of Terror','Faculty interview',297)
};

export const AZ_ENTRY_CLUES = {
 231:'azharGhatanothoa',233:'azharNetherworld',258:'azharCaravans',270:'azharCultMaster',
 271:'azharDeviceTheory',273:'azharDisappearances',[ring]:'azharRing',288:'azharPassage',
 291:'azharUndead',292:'azharPyramid',294:'azharEastMap',295:'azharMissingParty',
 297:'azharCursedKey',[literatureDevice]:'azharCursedKey'
};

const choice = (id,label,target,options={})=>({id,label,target,duration:0,detail:'No time passes',...options});
const campus = choice('azhar-return-campus','Return to the university entrance',149);
const jahark = choice('azhar-return-jahark','Ask Jahark another question',237);
const islamic = choice('azhar-return-islamic','Ask another question about Islamic culture',272);
const modern = choice('azhar-return-emu','Ask Professor Emu another question',225);
const literature = choice('azhar-return-literature','Ask another question about literature',261);
const departmentVisit = (id,label,target)=>choice(id,label,target,{
 duration:1,detail:'1 hour',when:s=>azharOpen(s.time,1)
});
const copyDevice = (id)=>choice(id,'Copy the Karpathos Device illustration',null,{
 clue:'azharDeviceImage',when:s=>!s.clues.includes('azharDeviceImage')
});
const dismissJahark = choice('azhar-dismiss-jahark','Part ways with Professor Jahark',149,{
 when:s=>s.flags.azharJahark,clearFlag:'azharJahark'
});
const canShowDevice = s=>s.inventory.includes('Karpathos Device')
 ||s.clues.some(id=>id==='azharDeviceImage'||id==='cairoDeviceDisplay');

export const AZ_CHOICES = {
 149:[
  choice('azhar-library','Visit the university library',215,{
   duration:1,detail:'1 hour',when:s=>azharOpen(s.time,1)&&azharOpen(s.time+HOUR)
  }),
  departmentVisit('azhar-islamic','Visit Islamic Culture',216),
  departmentVisit('azhar-ancient','Visit Ancient History',217),
  departmentVisit('azhar-modern','Visit Modern History',238),
  departmentVisit('azhar-languages','Visit Languages',239),
  departmentVisit('azhar-science','Visit Science',260),
  departmentVisit('azhar-literature','Visit Literature',261),
  dismissJahark
 ],
 176:[copyDevice('azhar-copy-athens-device')],
 209:[copyDevice('azhar-copy-cairo-device')],
 216:[campus],
 217:[campus],
 225:[
  choice('azhar-emu-cult','Ask about the cult of Aten',273),
  choice('azhar-emu-searchers','Ask about the search parties',295),
  campus
 ],
 228:[choice('azhar-hear-confidential','Hear what Jahark has to say',270)],
 231:[literature],
 233:[islamic],
 237:[
  choice('azhar-jahark-cult','Ask about the cult of Aten',270),
  choice('azhar-jahark-pyramid','Ask about the Lost Pyramid',292),
  choice('azhar-jahark-dead','Ask about the Book of the Dead',291),
  choice('azhar-jahark-device','Ask about the Karpathos Device',297),
  campus
 ],
 238:[campus],
 239:[
  choice('azhar-assign-translator','Accept the student translator’s help in Cairo',149,{
   when:s=>!s.flags.azharTranslator,flag:'azharTranslator'
  }),
  choice('azhar-dismiss-translator','Release the student translator',149,{
   when:s=>s.flags.azharTranslator,clearFlag:'azharTranslator'
  }),
  campus
 ],
 250:[choice('azhar-fast-talk-continue','Follow Jahark’s lead',228)],
 258:[islamic],
 260:[choice('azhar-show-device','Show him the Karpathos Device',271,{when:canShowDevice}),campus],
 261:[
  choice('azhar-literature-cult','Ask about the cult of Aten',231),
  choice('azhar-literature-pyramid','Ask about the Lost Pyramid',288),
  choice('azhar-literature-device','Ask about the Karpathos Device',literatureDevice),
  campus
 ],
 266:[campus],
 270:[jahark,campus],
 271:[choice('azhar-ask-ben-ozen','Ask what he thinks the mechanism does',266)],
 272:[
  choice('azhar-islamic-cult','Ask about the cult of Aten',228),
  choice('azhar-islamic-customs','Ask about travel and hiring help',258),
  choice('azhar-islamic-superstitions','Ask about beliefs about the Netherworld',233),
  campus
 ],
 273:[modern],
 286:[
  choice('azhar-discuss-ring','Let Jahark examine your ring',ring,{when:s=>s.inventory.includes(PAR_RING)}),
  choice('azhar-jahark-continue','Hear Jahark’s offer',296,{when:s=>!s.inventory.includes(PAR_RING)})
 ],
 [ring]:[choice('azhar-ring-continue','Hear Jahark’s offer',296)],
 288:[literature],
 291:[jahark,campus],
 292:[choice('azhar-take-map','Take the map of the pyramid',294)],
 294:[choice('azhar-hear-key-riddle','Hear Jahark’s last lead',297)],
 295:[modern],
 296:[
  choice('azhar-recruit-jahark','Ask Professor Jahark to join your investigation',149,{
   flag:'azharJahark',when:s=>!s.flags.azharJahark
  }),
  campus
 ],
 297:[jahark,campus],
 [literatureDevice]:[literature]
};

const interviewOpen = s=>azharOpen(s.time)||azharOpen(s.time-1);

function dailyInterview(entry,choices) {
 const ids = choices.map(([id])=>id);
 return Object.fromEntries(choices.map(([id,skill,label,successEntry])=>[id,{
  entry,skill,label,successEntry,failureEntry:149,duration:0,daily:true,solo:true,
  when:s=>interviewOpen(s)&&ids.every(id=>!s.attempts[id])
 }]));
}

export const AZ_CHECKS = {
 ...dailyInterview(216,[
  ['azhar-islamic-persuade','Persuade','Persuade Jahark to hear you out',272],
  ['azhar-islamic-fast-talk','Fast Talk','Catch Jahark’s attention with a quick explanation',250]
 ]),
 ...dailyInterview(217,[
  ['azhar-ancient-persuade','Persuade','Persuade Jahark to give you an interview',237],
  ['azhar-ancient-history','History','Interest Jahark in a question of ancient history',237]
 ]),
 ...dailyInterview(238,[
  ['azhar-modern-luck','Luck','See if a remark catches Professor Emu’s interest',225],
  ['azhar-modern-education','EDU','Draw on your education to interest Professor Emu',225]
 ]),
 'azhar-jahark-spot':{
  entry:237,skill:'Jahark’s Spot Hidden',label:'See what Jahark notices',duration:0,daily:true,
  when:s=>!s.flags.azharJahark&&interviewOpen(s),
  skillBonus:()=>50,noLuck:true,successEntry:286
 }
};
