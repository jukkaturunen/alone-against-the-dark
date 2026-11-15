import { DAY } from './calendar.js';

const camp = 'Antarctica base camp';
const ice = 'Victoria Land';
const ship = 'The Dark Sea';
const refusal = 'antarctic-party-refused';

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

const parties = {
 a:{entry:525,leader:'Blake',route:'Survey the mountains toward the pole',roster:'Blake, Fram, MacPherson, and Jackson'},
 b:{entry:541,leader:'Crawford',route:'Establish a northern base',roster:'Crawford, Thompson, Smith, and Klug'},
 c:{entry:527,leader:'Rambeau',route:'Cross the mountains to Lake’s last reported position',roster:'Rambeau, Bering, Jones, and Jeffries'},
};

export const AP_SCENES = {
 520:scene(camp,'McMurdo Sound',520,79,
  'Under the long summer light, the Starkweather–Moore expedition builds its camp at McMurdo Sound. Three Dornier aircraft will carry three parties into the interior. They leave together on February 1 and expect to be gone for two or three weeks.',
  'Blake’s party will survey the mountains toward the pole. Crawford will look for sites for new camps. Rambeau plans to cross the mountains and follow the reports Lake sent back from his last expedition.'),
 525:scene('Trip A · The mountains',ice,525,80,
  'February 1–6. Low mountains rise out of the ice. After a few days surveying them, Blake seems disoriented. He radios camp to ask about the other parties.',
  'February 7–10. Rambeau reports finding buildings in the interior. The news puts Blake on edge, and he orders Rambeau to turn back. A whiteout keeps your Dornier grounded for two days.',
  'February 13. You reach base camp to learn that Rambeau has fallen silent. Blake intends to go after him.'),
 527:scene('Trip C · Across the mountains',ice,527,80,
  'February 1–4. Beyond the mountains, the ice stretches to the horizon. Seen from the Dornier, the ridges and crevasses are barely visible. Rambeau and Jones keep to themselves. Jeffries works without complaint whenever you make camp.',
  'February 5–6. Twice you feel someone watching you. You never catch sight of anyone. The next day there is a violet glow beyond an unfamiliar range near 120° east. Rambeau decides to press on.',
  'February 7. Towers and immense roads emerge from the ice. Jones thinks he sees someone on the ground and radios the sighting to base. Bering sets the plane down outside the city.'),
 528:scene('One last appeal',camp,528,80,
  'Your application did not get you onto a team. You can still tell a party leader why you need to come along.'),
 529:scene('An ally at base camp',camp,529,80,
  'Your account confirms fears the expedition leader had already been keeping to himself. He agrees to use his influence to get you onto a party of your choosing.'),
 530:scene('Make your case',camp,530,80,
  'Choose someone to approach. You will have one chance to win their trust. What you know of the Mythos may help you make the case.'),
 531:scene('A confidence shared aboard ship',ship,531,80,
  'You explain why you have been searching the cabins. An expedition leader takes your account seriously and offers to help. You can draw on what he tells you when putting your own knowledge to the test.'),
 534:scene('Beyond the first towers',ice,534,81,
  'By morning, you can see that the buildings beside the landing site are an outlying district. Far beyond them, towers rise beside caverns large enough to swallow the expedition’s aircraft.'),
 541:scene('Trip B · The Ross Ice Shelf',ice,541,82,
  'February 1–3. Crawford’s spirits improve as soon as the Dornier leaves the ground. You fly along Scott’s route and talk of looking for his missing depot on the return leg.',
  'February 8–9. A storm pins you down on the Ross Ice Shelf. The wind lets up the next afternoon, just as a radio message orders you back. Rambeau’s party is feared lost.',
  'February 12. You return to base camp to await Blake.'),
 542:scene('Jeffries breaks away',ice,542,82,
  'Jones is still taking readings when Jeffries turns on Rambeau. With one blow from a hammer, he brings him down. There is a bulge in Jeffries’ jacket as he walks toward the caverns.',
  'Bering goes for the radio while Jones rushes to Rambeau. If you mean to catch Jeffries, you will have to start now.'),
 550:scene('Jones catches up',ice,550,84,
  'Jones catches you at the edge of the city. He still has no idea why Jeffries turned on Rambeau. If you took explosives or extra weapons from the ship, he offers to carry some of the load.'),
 577:scene('Tracks in the snow',ice,577,88,
  'Jeffries pulls away from you with each stride. The tracks he leaves in the snow look nothing like the prints of a man in boots. Ahead, he slips into a street to your left.'),
 [refusal]:scene('Back under guard',camp,529,80,
  'Your story has bought you a hearing, but no place on an aircraft. You are sent back aboard The Dark Sea under guard. The three parties will depart without you.'),
};

export const AP_CLUES = {
 antarcticExpeditionMap:{title:'Antarctic expedition routes',type:'Expedition map',source:AP_SCENES[520].source,
  text:'All three routes begin at McMurdo Sound. Blake is headed toward the pole. Crawford will scout for further camps. Rambeau will cross the mountains in search of Lake’s city.',
  image:'assets/antarctic-expedition-map.png',alt:'Map of Antarctica with three arrows from base camp D at McMurdo Sound. Route A points toward the South Pole, B follows the ice shelf, and C points toward Lake’s City across the mountains.'},
 antarcticLakeCity:{title:'Rambeau finds a city',type:'Antarctic journal',source:AP_SCENES[527].source,
  text:'Rambeau’s party sights a mountain range near 120° east and lands the next day beyond it, beside roads and towers buried in the ice. Jones radios the discovery to base.'},
 antarcticJeffries:{title:'Jeffries flees toward the caverns',type:'Antarctic journal',source:AP_SCENES[542].source,
  text:'Jeffries struck Rambeau with a hammer and made for the caverns. Something was concealed under his jacket.'},
};

export const AP_ENTRY_CLUES = {520:'antarcticExpeditionMap',527:'antarcticLakeCity',542:'antarcticJeffries'};
export const AP_FLAGS = ['antarcticBlakeAid','antarcticRambeauAid','antarcticEducationAid','antarcticIdentityRevealed','antarcticJones'];

const choice = (id,label,target,options={}) => ({id:`antarctic-${id}`,label,target,duration:0,...options});
const check = (entry,skill,label,successEntry,failureEntry,options={}) => ({entry,skill,label,successEntry,failureEntry,duration:0,...options});
const slug = text => text.toLowerCase().replaceAll(' ','-');
const supportFlag = {Blake:'antarcticBlakeAid',Rambeau:'antarcticRambeauAid'};
const sponsored = s => s.flags.antarcticBlakeAid||s.flags.antarcticRambeauAid;
const canJoinOpenly = s => !s.investigator||['grunewald','holt'].includes(s.investigator);
const canJoin = s => s.darkSea.boarded===500&&canJoinOpenly(s)||s.flags.antarcticIdentityRevealed||sponsored(s);
const returnCamp = choice('return-to-camp','Return to the base camp',520);

export const AP_CHOICES = {
 520:[...Object.entries(parties).flatMap(([id,{entry,route,roster}]) => {
  const trip=`Trip ${id.toUpperCase()} · ${route}`;
  return [choice(`join-${id}`,`Join ${trip}`,entry,{detail:roster,when:canJoin}),
   choice(`apply-${id}`,`Apply for ${trip}`,`antarctic-apply-${id}`,{detail:roster,when:s=>!canJoin(s)})];
 }),choice('reveal-identity','Introduce yourself under your own name',520,{
  detail:'Qualify to choose a flight directly',flag:'antarcticIdentityRevealed',
  when:s=>s.darkSea.boarded===501&&canJoinOpenly(s)&&!canJoin(s),
 })],
 525:[choice('wait-with-blake','Wait at base camp for word of Rambeau',574)],
 527:[choice('leave-the-plane','Explore the ruins the next morning',534)],
 528:[],
 529:[returnCamp],
 530:[],
 531:[choice('resume-investigation','Resume the shipboard investigation',null,{effect:'dark-sea-return'}),
  choice('lie-low','Keep out of sight until Antarctica',520)],
 534:[choice('cross-the-outskirts','Continue toward the city',542)],
 541:[choice('wait-for-blake','Wait for Blake to return',574)],
 542:[choice('pursue-jeffries','Run after Jeffries',577),choice('wait-for-help','Stay with the aircraft and wait for help',574)],
 550:[choice('enter-the-city','Follow the tracks into the city',543)],
 577:[choice('follow-jeffries','Follow the tracks to the city entrance',550)],
 [refusal]:[choice('wait-under-guard','Wait for news from the interior',574)],
};

export const AP_CHECKS = {
 'dark-sea-caught-charm':check('dark-sea-caught','Charm','Talk your way out of trouble',531,459),
 'dark-sea-caught-fast':check('dark-sea-caught','Fast Talk','Improvise an excuse',531,459),
};

for(const [id,{entry,leader}] of Object.entries(parties)) {
 const application=`antarctic-apply-${id}`;
 AP_SCENES[application]=scene(`A place on Trip ${id.toUpperCase()}`,camp,520,79,
  `${leader} needs someone who can help keep the party on course and the aircraft flying. You can offer to navigate, fly, or show how you would manage a forced landing on the ice.`);
 AP_CHOICES[application]=[returnCamp];
 for(const [skill,label,difficulty] of [
  ['Navigate','Offer to navigate'],['Pilot (Aircraft)','Offer to fly'],
  ['Survival (Desert)','Show how you would survive in extreme conditions','Hard'],
 ]) {
  AP_CHECKS[`antarctic-apply-${id}-${slug(skill)}`]=check(application,skill,label,entry,528,{
   difficulty,bonusDie:s=>Boolean(s.flags[supportFlag[leader]]),
  });
 }
 AP_CHOICES[528].push(choice(`ask-${slug(leader)}`,`Explain the danger to ${leader}`,supportFlag[leader]?529:refusal,
  {flag:supportFlag[leader]}));
}

for(const leader of ['Blake','Rambeau','Crawford','Jones']) {
 const key=slug(leader);
 const appeal=`antarctic-appeal-${key}`;
 const flag=supportFlag[leader];
 AP_SCENES[appeal]=scene(`An appeal to ${leader}`,camp,530,80,
  `You ask ${leader} to hear you out. Decide how to persuade him that you belong on one of the flights.`);
 AP_CHOICES[530].push(choice(`approach-${key}`,`Make your case to ${leader}`,appeal));
 AP_CHOICES[appeal]=[choice(`return-from-${key}`,'Choose someone else',530)];
 for(const [skill,label] of [
  ['Credit Rating','Invoke your standing'],['Persuade','Explain the danger'],['Fast Talk','Improvise a cover story'],
  ['Intimidate','Insist on a place'],['Charm','Ask for his help'],
 ]) {
  const options={skillBonus:s=>s.mythos,successFlag:flag};
  AP_CHECKS[`${appeal}-${slug(skill)}`]=check(appeal,skill,label,flag?529:refusal,574,options);
  if(flag) {
   // Preserve unfinished rolls and their history from the ship-only release.
   AP_CHECKS[`dark-sea-appeal-${key}-${slug(skill)}`]=check(530,skill,`Ask ${leader} to help you`,529,574,
    {...options,when:()=>false});
  }
 }
}

export function approachEnter(s,previousEntry,{log}) {
 if(s.entry===531) s.flags.antarcticEducationAid=true;
 if(s.location!=='antarctica') return;
 if(s.entry===550) s.flags.antarcticJones=true;
 const day = {525:13,527:7,534:8,541:12}[s.entry]||
  (s.entry===574&&[525,541,542,refusal,530,...AP_CHOICES[530].map(choice=>choice.target)].includes(previousEntry)?13:null);
 if(!day) return;
 const time=Date.UTC(1932,1,day);
 if(time<=s.time) return;
 s.time=time;
 s.sleptNight=time-DAY;
 if(s.entry!==574) log(s,`The expedition journal advances to February ${day}.`);
}

export function antarcticEducationBonus(s) {
 return Boolean(s.flags.antarcticEducationAid);
}
