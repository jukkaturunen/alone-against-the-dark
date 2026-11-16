import { dayStart, HOUR } from './calendar.js';

const pyramid='Akhenaten’s pyramid';
const village='Tell-el-Amarna';
const sides=[['north',317],['east',359],['south',337],['west',561]];
const scene=(title,eyebrow,entry,page,...paragraphs)=>({
 title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true
});
export const EXTERIOR_SCENES = {
 344:scene('Nothing more on this face',pyramid,344,58,'You search the stonework and find no opening.'),
 397:scene('The stone with a hairline crack',pyramid,397,64,'One stone shifts slightly under pressure. You have found a concealed opening.'),
 379:scene('The concealed entrance opens',pyramid,379,62,'The stone gives way. A dark corridor leads down into the pyramid.'),
 319:scene('A night in the open',village,319,55,'The desert is bitterly cold after dark. You survive the night and can return to the village in the morning.'),
 447:scene('A room at the inn',village,447,70,'You wake groggy and disoriented. Cold air rushes around you. When you open your eyes, you can see only darkness.')
};

for(const [side,entry] of sides) {
 const pages={317:55,359:60,337:57,561:85};
 EXTERIOR_SCENES[entry]=scene(`The ${side} face`,pyramid,entry,pages[entry],'After an hour studying the stonework, see whether you can make out anything unusual.');
}
export const EXTERIOR_ENTRIES=Object.keys(EXTERIOR_SCENES).map(Number);
const choice=(id,label,target,extra={})=>({id,label,target,duration:0,...extra});
const toPyramid=choice('amarna-back-exterior','Go back to the pyramid',360);
const toVillage=choice('amarna-back-village','Return to Tell-el-Amarna',324);
const open=s=>s.time>=dayStart(s.time)+10*HOUR&&s.time<dayStart(s.time)+18*HOUR;
const earlierMap=s=>['symbolMap','strangeDrawing'].some(id=>s.clues.includes(id));
const surveyChance=(s,entry)=>Math.min(99,
 (s.amarnaSurvey?.first===entry?20:0)
 + Math.max(0,Math.floor((dayStart(s.time)+18*HOUR-s.time)/HOUR))*5
 + (earlierMap(s)?20:0));
export const EXTERIOR_CHOICES = {
 360:sides.map(([side,entry])=>choice(`amarna-survey-${side}`,`Survey the ${side} face`,entry,{
  duration:1,detail:'1 hour',survey:true,when:s=>open(s)&&s.time+HOUR<=dayStart(s.time)+18*HOUR&&!s.attempts[`amarna-face-${side}`]
 })),
 344:[toPyramid,toVillage,choice('amarna-344-tomb','Return to the tomb attendant',376)],
 397:[toPyramid,toVillage],
 379:[
  choice('amarna-enter-secret','Enter the concealed passage',382,{when:s=>!s.flags.athensChristos}),
  choice('amarna-enter-alone','Enter without Christos',382,{when:s=>s.flags.athensChristos,clearFlag:'athensChristos'})
 ],
 324:[choice('amarna-reenter-secret','Return to the concealed entrance',382,{when:s=>s.visited.includes(382)})],
 444:[choice('amarna-inn-room','Stay in a room at the inn',447,{sleep:true}),choice('amarna-desert-sleep','Sleep in the desert',319,{sleep:true})],
 319:[toPyramid,toVillage],
 447:[choice('amarna-inn-darkness','Continue in the darkness',373)]
};
for(const [side,entry] of sides) {
 EXTERIOR_CHOICES[entry]=[toPyramid,toVillage];
 if(side==='east'||side==='south') EXTERIOR_CHOICES[entry].push(choice(`amarna-${side}-tomb`,'Go to the public entrance',side==='east'?390:376));
}

export const EXTERIOR_CHECKS = Object.fromEntries(sides.map(([side,entry])=>[
 `amarna-face-${side}`,{
  entry,skill:'Survey chance',label:`Search the ${side} face`,duration:0,daily:true,
  skillBonus:s=>Math.max(0,surveyChance(s,entry)-1),noLuck:true,strictChance:true,
  successEntry:side==='east'?397:344,failureEntry:side==='north'||side==='west'?360:entry,
  bonusDie:s=>side==='east'&&s.clues.includes('azharEastMap')
 }
]));
EXTERIOR_CHECKS['amarna-move-stone']={
 entry:397,skill:'STR',label:'Move the stone',duration:1,repeat:true,successEntry:379,
 bonusDie:s=>!!s.flags.athensChristos
};


for(const skill of ['Charm','Intimidate','Fast Talk']) {
 const id=skill.toLowerCase().replace(' ','-');
 EXTERIOR_CHECKS[`amarna-companion-${id}`]={
  entry:379,skill,label:'Ask Christos to come with you',duration:0,when:s=>s.flags.athensChristos,
  successEntry:382,failureEntry:382,clearOnFailure:'athensChristos'
 };
}
