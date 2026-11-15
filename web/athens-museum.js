import { hourOf, weekday } from './calendar.js';

const museum = 'National Museum of Archaeology';
const directorVacation = Date.UTC(1931, 11, 1);
const directorAvailable = s => s.time < directorVacation;
const withChristos = s => s.flags.athensChristos;

export const AM_LOCATIONS = {
 athensMuseum:{
  name:museum,entry:118,hours:[9,19],hoursLabel:'9 AM–noon and 3–7 PM · Mon–Fri',region:'athens',
  description:'See where the Karpathos Device was displayed and ask for Director Pisistratos.'
 }
};

export function amOpen(time) {
 const hour = hourOf(time);
 return weekday(time) && ((hour >= 9 && hour < 12) || (hour >= 15 && hour < 19));
}

export const AM_FLAGS = [];

function scene(title,entry,page,...paragraphs) {
 return {title,eyebrow:museum,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

function choice(id,label,target,options={}) {
 return {id,label,target,detail:'No time passes',duration:0,...options};
}

const backToMuseum = choice('athens-museum-return','Return to the museum entrance',118);

export const AM_SCENES = {
 118:scene('National Museum of Archaeology',118,27,
  'The galleries hold treasures from across ancient Greece. The director, Zeno Pisistratos, receives visitors by appointment and is away from December onward.'),
 153:scene('The director’s secretary',153,31,
  'The secretary tells you in careful English that Pisistratos’s schedule is full.'),
 34:scene('The secretary refuses',34,15,
  'The secretary hears you out and asks you to leave. She will make no exception.'),
 22:scene('Christos’s suggestion',22,13,
  'Christos leans over and whispers that the two of you could go straight past the secretary and into the office.'),
 176:scene('The empty display',176,35,
  'A drawing and a photograph occupy the place of the Karpathos Device. The notes describe rival theories about its purpose. It might have recorded the positions of stars for priests, produced something tangible, or amused a wealthy patron.',
  'The museum has yet to identify the Device’s origin or the material from which it was made.'),
 168:scene('An ancient mechanism',168,33,
  'The museum’s archaeologists date the mechanism to at least two thousand years ago. Its intricate gears and linkages suggest a level of engineering the team had never seen in an object of that age.',
  'Some gears bear cryptic Greek inscriptions. There are unusual Egyptian hieroglyphs on interior parts. The team offers no conclusion about what the machine did.')
};

export const AM_ENTRY_CLUES = {168:'device'};
export const AM_CLUES = {
 athensMuseumGliere: {
  title:'Pisistratos knows more about the theft',type:'Museum interview',source:'Entry 17 · p. 13',
  text:'Pisistratos is lying when he claims he does not know why Gliere stole the Karpathos Device.'
 },
 athensMuseumLoan: {
  title:'Pisistratos downplays the loan',type:'Museum interview',source:'Entry 1 · p. 10',
  text:'Pisistratos is lying when he calls the transfer of the Karpathos Device to Cairo a routine museum loan.'
 },
 athensMuseumClock: {
  title:'Pisistratos’s explanation of the Device',type:'Museum interview',source:'Entry 4 · p. 10',
  text:'Pisistratos is lying when he says the Karpathos Device is a kind of clock.'
 }
};

export const AM_CHOICES = {
 118:[
  choice('athens-museum-galleries','Look around the galleries',176),
  choice('athens-museum-secretary','Ask to see Pisistratos',153,{when:directorAvailable})
 ],
 153:[
  choice('athens-museum-insist','Ask the secretary to make an exception',34),
  choice('athens-museum-consult-christos','Hear Christos’s suggestion',22,{when:withChristos}),
  backToMuseum
 ],
 34:[backToMuseum],
 22:[choice('athens-museum-enter-office','Follow Christos into Pisistratos’s office',177),backToMuseum],
 176:[choice('athens-museum-read-report','Read the archaeological report',168),backToMuseum],
 168:[choice('athens-museum-return-display','Return to the display',176)]
};

export const AM_CHECKS = {
 'athens-museum-luck':{
  entry:176,skill:'Luck',label:'See if Pisistratos is in the galleries',successEntry:166,
  failureEntry:118,duration:0,repeat:true,when:directorAvailable
 }
};

const questions = [
 {
  id:'gliere',title:'Gliere’s theft',claim:'Pisistratos says he has no idea why Gliere stole the Device.',
  lie:17,page:13,clue:'athensMuseumGliere'
 },
 {
  id:'loan',title:'The loan to Cairo',claim:'Pisistratos describes the Cairo loan as a routine exchange between museums.',
  lie:1,page:9,clue:'athensMuseumLoan'
 },
 {
  id:'clock',title:'The purpose of the Device',claim:'Pisistratos insists the mechanism is a kind of clock.',
  lie:4,page:9,clue:'athensMuseumClock'
 }
];

const interviews = [
 {
  id:'gallery',entry:166,page:33,
  opening:'You catch sight of Pisistratos showing an English dignitary around the museum. You step up to ask him about Gliere before he can move on.',
  ending:'The director excuses himself and rejoins his guest.'
 },
 {
  id:'office',entry:177,page:35,
  opening:'You and Christos push past the secretary. The director is on his feet before Christos forces him back into his chair.',
  ending:'Christos hears the police coming and calls to you. You run from the office while Pisistratos shouts after you.'
 }
];

for(const interview of interviews) {
 const prefix = `athens-museum-${interview.id}`;
 const done = `${prefix}-done`;
 const entries = [interview.entry,`${prefix}-loan`,`${prefix}-clock`];
 questions.forEach((question,index)=>{
  const entry = entries[index];
  const next = entries[index+1] ?? done;
  const caughtLie = `${prefix}-${question.id}-lie`;
  const dialogue = index===0 ? [interview.opening,question.claim] : [question.claim];

  AM_SCENES[entry] = scene(question.title,interview.entry,interview.page,...dialogue);
  AM_SCENES[caughtLie] = scene('A lie',question.lie,question.page,question.claim,
   'His manner gives him away. You are sure he is lying.');
  AM_ENTRY_CLUES[caughtLie] = question.clue;
  AM_CHECKS[`${prefix}-${question.id}-psychology`] = {
   entry,skill:'Psychology',label:'Read Pisistratos’s reaction',
   successEntry:caughtLie,failureEntry:next,duration:0,repeat:true
  };
  AM_CHOICES[caughtLie] = [choice(`${caughtLie}-continue`,'Continue the interview',next)];
 });
 AM_SCENES[done] = scene('The interview is over',interview.entry,interview.page,interview.ending);
 AM_CHOICES[done] = [backToMuseum];
}

export const AM_ENTRIES = {
 athensMuseum:Object.keys(AM_SCENES).map(id=>/^\d+$/.test(id)?Number(id):id)
};
