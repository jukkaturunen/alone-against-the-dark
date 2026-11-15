import { hourOf, weekday } from './calendar.js';

const city = 'athens';
const bureau = 'Athens Bureau of Investigation';
const justice = 'Athens Hall of Justice';
const taxis = 'Athens Taxis';
const desk = 'case-justice-desk';
const review = 'case-report-review';
const dismissal = 'case-bureau-dismissed';
const quietRide = 'case-taxi-quiet-ride';
const greekPhrasebook = 'Harrison’s English/Greek Phrase Book';

export const CASE_LOCATIONS = {
 athensBureau:{
  name:bureau,entry:130,hours:[9,18],hoursLabel:'9 AM–noon and 2–6 PM · Mon–Fri',region:city,
  description:'Ask Corporal Ilionas about Gliere’s arrest and what became of the Karpathos Device.'
 },
 athensJustice:{
  name:justice,entry:87,hours:[9,19],hoursLabel:'9 AM–noon and 3–7 PM · Mon–Fri',region:city,
  description:'Follow up with the desk sergeant in charge of the jails.'
 },
 athensTaxis:{
  name:taxis,entry:58,hours:[0,24],region:city,
  description:'Talk to the drivers at the cab stand.'
 }
};

export function caseOpen(location,time) {
 const hour = hourOf(time);
 if(location==='athensTaxis') return true;
 if(!weekday(time)) return false;
 if(hour>=9&&hour<12) return true;
 if(location==='athensBureau') return hour>=14&&hour<18;
 return hour>=15&&hour<19;
}

export const CASE_FLAGS = ['athensIlionasName','athensEvgenia','athensChristos'];

function scene(title,eyebrow,entry,page,...paragraphs) {
 const pageLabel = Number.isInteger(page)?`p. ${page}`:`pp. ${page}`;
 return {title,eyebrow,source:`Entry ${entry} · ${pageLabel}`,paragraphs,adapted:true};
}

export const CASE_ENTRIES = {
 athensBureau:[130,170,204,40,21,128,174,review,226,dismissal,248],
 athensJustice:[87,desk,77,6,180,202,539],
 athensTaxis:[131,81,58,15,179,201,quietRide,162,223]
};

const letter = [
 'Gliere writes that the police arrested him before he could destroy the Karpathos Device. He expects the cult of Aten to kill him in his cell. He begs you to act on what he has learned.',
 'Ephegon of Karpathos, a sorcerer of the Alexandrian era, supposedly built a machine that reproduced the movement of the heavens. His plan was to send it to the cult of Aten in Egypt. In a ceremony there, the cult would use it to align natural forces with the power of an unnamed god and produce the Top of Aten, an octahedral crystal that spins like a child’s toy. The ship carrying the machine sank, Ephegon died, and the ceremony never took place.',
 'The cult meant to take the Top to the oldest beings’ last city in the far south. By summoning its god there, the cult hoped to shift the Earth’s axis, revive Antarctica, and destroy the lands inhabited by humanity. Gliere believes the machine recovered off Karpathos is Ephegon’s and the cult is trying again. He recalls the doomed Miskatonic expedition and the Starkweather–Moore party due to sail from Bremen this winter.',
 'Gliere says that two men have helped him. One is a learned, cruel man named Stanford, who claims to act in the service of his own god and says he can do no more. The other is a kinder Greek gentleman. Gliere suspects both serve powers beyond his understanding. His warning about one of the cultists ends in the middle of a sentence.'
];

export const CASE_SCENES = {
 130:scene('Corporal Ilionas',bureau,130,28,
  'The corporal in charge of Gliere’s case receives you in English. He tells you that your friend was found hanged in his cell. He believes Gliere took his own life after stealing the Karpathos Device.',
  'The pathologist reported injuries he took to be self-inflicted. He is on holiday in Switzerland for several weeks. Ilionas suggests asking at the Hall of Justice if you want to see where Gliere was held.'),
 170:scene('Evgenia',bureau,170,34,
  'The bureau finds Evgenia, an interpreter who is available for the rest of your stay in Athens.'),
 204:scene('The official report',bureau,204,40,
  'Ilionas lets you read the case report. Gliere made accusations against Museum Director Pisistratos, pleaded that the Karpathos Device stay out of Cairo, and demanded protection in his cell.'),
 40:scene('A question about the Device',bureau,40,16,
  'Ilionas concedes that the case is strange. He suggests that the scholars at the National Museum of Archaeology might be able to explain the Device.'),
 21:scene('A special exhibition',bureau,21,13,
  'Ilionas says the museum had already agreed to lend the Karpathos Device to the National Museum in Cairo for a special exhibition. It may be Egyptian. The theft did nothing to alter the arrangements.'),
 128:scene('Bound for Cairo',bureau,128,28,
  'The Karpathos Device is on a ship bound for Cairo.'),
 174:scene('Already in Cairo',bureau,174,35,
  'The Karpathos Device is already in Cairo.'),
 [review]:scene('Back to the report',bureau,204,40,
  'You turn back to the report and watch Ilionas as you weigh what he has told you.'),
 226:scene('A nervous corporal',bureau,226,43,
  'Ilionas seems uneasy about the official explanation. He says only that he is glad the Karpathos Device has left Greece.'),
 [dismissal]:scene('The interview is over',bureau,226,43,
  'Ilionas has nothing more to say. A cab stand is just outside the bureau.'),
 248:scene('Rumors at the café',bureau,248,46,
  'Ilionas says he has told you all he knows. For rumors, he suggests the Piosotos Café. You linger in the corridor without hearing anything further.'),
 131:scene('A cab at the bureau',taxis,131,28,
  'A young driver calls to you in English. Five drachmas, he says, will take you anywhere in Athens.'),
 81:scene('An offer from Christos',taxis,81,'21–22',
  'Your driver introduces himself as Christos. For fifty drachmas a day, he offers to drive you around Athens and interpret for you. He knows the city well, though you wonder whether he can always be counted on to stay close.'),
 58:scene('Three drivers',taxis,58,19,
  'A young man, an older man, and a sharply dressed man wait beside their taxis.'),
 15:scene('A closer look at the drivers',taxis,15,12,
  'Passengers seem to avoid the well-dressed driver. The older man looks calm, if a little unsteady, and the young driver seems friendly and impulsive.'),
 179:scene('The younger driver',taxis,179,35,
  'The young driver is happy to take you anywhere in Athens.'),
 201:scene('The older driver',taxis,201,40,
  'The older man asks why you have come to Athens. There is something guarded in the way he asks.'),
 [quietRide]:scene('A quiet ride',taxis,201,40,
  'The older driver agrees to take you wherever you wish. He asks no more questions.'),
 162:scene('A meeting at sundown',taxis,162,33,
  'The old driver warns that you have stumbled into a dangerous affair. He says his friends want to help. Once you have learned what you can, he wants you to meet him at the Parthenon at sundown.'),
 223:scene('Richard Hawkes',taxis,223,43,
  'The well-dressed driver introduces himself in English as Richard Hawkes. He drives to fund his stay in Greece while he works on a book. He suspects he knows something you are looking for and asks you to meet him at the Piosotos Café at 6 PM.'),
 87:scene('The Hall of Justice',justice,87,22,
  'The desk sergeant in charge of the jails works in one of the corridors of the Hall of Justice. The office is open on weekdays from 9 AM to noon and from 3 to 7 PM.'),
 [desk]:scene('At the sergeant’s desk',justice,87,22,
  'You reach the corridor where the desk sergeant oversees the jails. He speaks no English.'),
 77:scene('The sergeant’s account',justice,77,21,
  'The sergeant confirms that Gliere was found hanged. His body was shipped back to the United States. The sergeant claims the professor left nothing behind.'),
 6:scene('Lost in translation',justice,6,10,
  'Neither you nor the sergeant can make sense of the conversation. The Bureau of Investigation has English speakers and may be able to find you an interpreter.'),
 180:scene('The sergeant’s doubts',justice,180,35,
  'The sergeant looks frightened. He admits he doubts that Gliere killed himself. Gliere kept insisting that the Karpathos Device must never go to Egypt.'),
 202:scene('Evidence of foul play',justice,202,40,
  'The sergeant finally admits that Gliere’s face and body were badly disfigured, with large welts down his body. Ilionas thought he looked as though he had been dead some time before he was hanged.'),
 539:scene('Gliere’s last letter',justice,539,'81–82',
  'As you turn to leave, the sergeant pulls a folded sheet from his drawer. It is addressed to Louis Grunewald at Miskatonic University in Gliere’s handwriting, but has no date or signature.',
  ...letter,
  'The sergeant has nothing else of Gliere’s.')
};

function clue(title,type,entry,text) {
 return {title,type,source:CASE_SCENES[entry].source,text};
}

export const CASE_CLUES = {
 athensDeath:clue('The official account of Gliere’s death','Bureau interview',130,
  'Corporal Ilionas says Gliere was found hanged at the Hall of Justice. The pathologist judged his injuries self-inflicted and is now in Switzerland.'),
 athensReport:clue('Gliere’s demands for protection','Bureau case report',204,
  'Gliere accused Museum Director Pisistratos, pleaded that the Karpathos Device stay out of Cairo, and feared for his safety in custody.'),
 athensDeviceLoan:clue('The loan to Cairo','Bureau interview',21,
  'The Karpathos Device is on loan for a special exhibit at the National Museum in Cairo. The museum kept to its plans after the theft.'),
 athensPiosotos:clue('Rumors at the Piosotos Café','Bureau interview',248,
  'Corporal Ilionas says you may learn more from the people at the Piosotos Café.'),
 athensParthenonMeeting:clue('A meeting at the Parthenon','Taxi conversation',162,
  'The older driver says his friends want to help and asks you to meet him at the Parthenon at sundown.'),
 athensHawkesMeeting:clue('A meeting with Richard Hawkes','Taxi conversation',223,
  'Richard Hawkes says he may know something relevant to the investigation and asks you to meet him at the Piosotos Café at 6 PM.'),
 athensSergeant:clue('The sergeant doubts the official story','Hall of Justice interview',180,
  'The sergeant fears somebody wanted Gliere dead. Before he died, Gliere warned him that the Karpathos Device must never go to Egypt.'),
 athensFoulPlay:clue('Gliere’s injuries','Hall of Justice interview',202,
  'Gliere had severe disfigurement and large welts down his body. Ilionas suspected he had been dead some time before he was hanged.'),
 gliereLetter:clue('Gliere’s last letter','Letter from the jail',539,letter.join('\n\n'))
};

export const CASE_ENTRY_CLUES = {
 130:'athensDeath',204:'athensReport',21:'athensDeviceLoan',248:'athensPiosotos',
 162:'athensParthenonMeeting',223:'athensHawkesMeeting',180:'athensSergeant',
 202:'athensFoulPlay',539:'gliereLetter'
};

function check(entry,skill,label,successEntry,failureEntry,options={}) {
 return {entry,skill,label,successEntry,failureEntry,duration:0,repeat:false,...options};
}

function untried(...ids) {
 return s=>ids.every(id=>!s.attempts[id]);
}

const ilionasUntried = untried('athens-ilionas-persuade','athens-ilionas-charm');
const interviewUntried = untried('athens-interview-fast-talk','athens-interview-persuade');
const taxiUntried = untried('athens-taxis-psychology','athens-taxis-spot');

export const CASE_CHECKS = {
 'athens-ilionas-persuade':check(130,'Persuade','Ask to use Ilionas’s name at the Hall of Justice',undefined,undefined,{
  successFlag:'athensIlionasName',when:ilionasUntried
 }),
 'athens-ilionas-charm':check(130,'Charm','Win permission to mention Ilionas at the Hall of Justice',undefined,undefined,{
  successFlag:'athensIlionasName',when:ilionasUntried
 }),
 'athens-device-int':check(40,'INT','Ask where the Device is now',21,review),
 'athens-ilionas-psychology':check(review,'Psychology','Read Ilionas’s reaction',226,dismissal),
 'athens-interview-fast-talk':check(226,'Fast Talk','Keep Ilionas talking',248,dismissal,{when:interviewUntried}),
 'athens-interview-persuade':check(226,'Persuade','Persuade Ilionas to tell you more',248,dismissal,{when:interviewUntried}),
 'athens-taxis-psychology':check(58,'Psychology','Size up the three drivers',15,undefined,{when:taxiUntried}),
 'athens-taxis-spot':check(58,'Spot Hidden','Look more closely at the cab stand',15,undefined,{when:taxiUntried}),
 'athens-justice-greek':check(desk,'Language (Greek)','Speak to the sergeant in Greek',77,6,{
  when:s=>!hasInterpreter(s)&&speaksGreek(s)
 }),
 'athens-justice-psychology':check(77,'Psychology','Watch the sergeant as he speaks',180,desk),
 'athens-justice-persuade':check(180,'Persuade','Press the sergeant for details',202,desk)
};

export function caseCheckAvailable(s,id) {
 return CASE_CHECKS[id]?.when?.(s)??true;
}

function choice(id,label,target,options={}) {
 return {id,label,target,detail:'No time passes',duration:0,...options};
}

function hasInterpreter(s) {
 return s.flags.athensChristos||s.flags.athensEvgenia;
}

function speaksGreek(s) {
 return (s.allocation['Language (Greek)']||0)>0;
}

const bureauReturn = choice('athens-bureau-return','Return to the bureau office',130);
const taxiStand = choice('athens-bureau-cab','Go to the cab stand',131,{
 destination:'athensTaxis',when:s=>!s.visited.includes(131)
});
const taxiAgain = choice('athens-bureau-cab-again','Go to the cab stand',58,{
 destination:'athensTaxis',when:s=>s.visited.includes(131)
});
const taxiReturn = choice('athens-taxis-return','Go back to the cab stand',58);
const reportReturn = choice('athens-review-report','Return to the case report',review);
const deskReturn = choice('athens-desk-return','Return to the sergeant’s desk',desk);
const readLetter = choice('athens-gliere-letter','Read the letter the sergeant offers as you leave',539);
const isSeptember = s=>new Date(s.time).getUTCMonth()===8;

export const CASE_CHOICES = {
 130:[
  choice('athens-read-report','Ask to see the case report',204),
  choice('athens-find-evgenia','Ask Ilionas for an interpreter',170,{
   durationDice:[1,3],detail:'Wait 1D3 hours',when:s=>!s.flags.athensEvgenia
  }),
  taxiStand,taxiAgain
 ],
 170:[
  choice('athens-hire-evgenia','Hire Evgenia for your stay in Athens',130,{flag:'athensEvgenia'}),
  bureauReturn
 ],
 204:[
  choice('athens-ask-device','Ask about the Karpathos Device',40,{when:untried('athens-device-int')}),
  choice('athens-review-report-again','Reconsider Ilionas’s report',review,{when:s=>!!s.attempts['athens-device-int']}),
  bureauReturn
 ],
 40:[bureauReturn],
 21:[
  choice('athens-device-september','Find out how far the shipment has gone',128,{when:isSeptember}),
  choice('athens-device-october','Find out how far the shipment has gone',174,{when:s=>!isSeptember(s)})
 ],
 128:[reportReturn],
 174:[reportReturn],
 [review]:[bureauReturn,taxiStand,taxiAgain],
 226:[bureauReturn],
 [dismissal]:[taxiStand,taxiAgain,bureauReturn],
 248:[taxiStand,taxiAgain,bureauReturn],
 131:[
  choice('athens-taxi-christos','Take the English-speaking driver’s cab',81),
  choice('athens-taxi-another','Look for a different cab',58)
 ],
 81:[
  choice('athens-hire-christos','Hire Christos as your driver and interpreter',179,{
   flag:'athensChristos',detail:'50 drachmas a day'
  }),
  choice('athens-christos-ride-only','Take the ride without hiring Christos as a guide',179),
  taxiReturn
 ],
 58:[
  choice('athens-taxi-young','Take the young driver’s cab',179),
  choice('athens-taxi-old','Take the older driver’s cab',201),
  choice('athens-taxi-hawkes','Take the well-dressed driver’s cab',223)
 ],
 15:[taxiReturn],
 201:[
  choice('athens-taxi-answer','Tell the older driver why you came to Athens',162),
  choice('athens-taxi-destination','Ask him to take you to your destination',quietRide),
  taxiReturn
 ],
 87:[
  choice('athens-justice-with-christos','Let Christos lead you to the sergeant',desk,{when:s=>s.flags.athensChristos}),
  choice('athens-justice-name','Ask for the desk sergeant and mention Ilionas',desk,{
   duration:1,detail:'1 hour',when:s=>!s.flags.athensChristos&&s.flags.athensIlionasName
  }),
  choice('athens-justice-search','Find the desk sergeant in charge of the jails',desk,{
   duration:1,detail:'1 hour',when:s=>!s.flags.athensChristos&&!s.flags.athensIlionasName
  })
 ],
 [desk]:[
  choice('athens-justice-interpret','Ask your interpreter to speak to the sergeant',77,{
   when:s=>hasInterpreter(s)
  }),
  choice('athens-justice-phrasebook','Try the English/Greek phrasebook',6,{
   when:s=>!hasInterpreter(s)&&s.inventory.includes(greekPhrasebook)
  }),
  choice('athens-justice-find-interpreter','Find someone who speaks English and Greek',77,{
   durationDice:[1,3],detail:'Wait 1D3 hours',when:s=>!hasInterpreter(s)
  }),
  readLetter
 ],
 77:[readLetter,deskReturn],
 6:[deskReturn,readLetter],
 180:[readLetter,deskReturn],
 202:[readLetter,deskReturn],
 539:[deskReturn]
};

export function caseChoiceAvailable(s,action) {
 if(action.flag&&s.flags[action.flag]) return false;
 return action.when?Boolean(action.when(s)):true;
}
