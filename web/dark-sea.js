import { DAY, hourOf } from './calendar.js';
import { COMMON_SKILLS, trainedSkill } from './investigators.js';

const ship = 'The Dark Sea';
const sailing = Date.UTC(1931,11,20);
const deck = name => `${ship} · ${name}`;

export const DS_LOCATIONS = {
 darkSeaGangplank:{name:`${ship} gangplank`,entry:486,region:'bremen',hours:[8,20],
  hoursLabel:'8 AM–8 PM daily · until December 20',description:'The Starkweather–Moore expedition is preparing to sail.'},
 darkSea:{name:ship,entry:500,region:'darkSea',hours:[0,24],description:'The expedition’s reinforced Antarctic freighter.'},
};

export function darkSeaOpen(location,time) {
 if(location==='darkSeaGangplank') return time<sailing&&hourOf(time)>=8&&hourOf(time)<20;
}

function scene(title,entry,page,...paragraphs) {
 return {title,eyebrow:ship,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const DS_SCENES = {
 453:scene('A place to stow away',453,70,'You could hide aboard with provisions and water. Each hiding place has its own risks.'),
 454:scene('A naval officer at the gangplank',454,71,'Crawford takes a moment to look you over. Decide whether you approached him in uniform or in civilian clothes.'),
 456:scene('Hidden aboard',456,71,'The expedition sails for Antarctica. You have to keep your hiding place secret until landfall.'),
 459:scene('Locked below deck',459,72,'Captain Crawford has you confined to a windowless room. The crew brings food until the ship reaches Antarctica.'),
 460:scene('Cabins and lockers',460,72,'Eight cabins line B deck. An unlocked door is a matter of Luck. If you find a door locked, come back on a later ship day with Locksmith or Mechanical Repair. The sailors’ lockers are on C deck.'),
 462:scene('A quiet passage',462,72,'You can keep to yourself until the expedition lands.'),
 463:scene('Passing as a sailor',463,72,'The expedition still needs hands. You can shorten your hair and try to pass as a sailor.'),
 464:scene('Show what you can do',464,72,'Crawford will give you a berth if your training adds at least 100 points above the starting chances in mechanical repair, navigation, heavy machinery, aircraft piloting, and survival.'),
 465:scene('Three new recruits',465,72,'You ask about recent arrivals. The sailors remember Jackson, Jeffries, and Klug.'),
 466:scene('Something on the deck',466,72,'A figure changes shape before you. Its surface boils with eyes and mouths as it moves toward you.'),
 471:scene('Crawford stands his ground',471,73,'Crawford says he commands this expedition. The tone Holt uses in New York boardrooms will get him no further here.'),
 475:scene('The sailors’ bunks',475,73,'Names are painted on the footlockers. If you have a name to go on, you could try that sailor’s locker.'),
 480:scene('Investigate the decks',480,74,'Choose one investigation per ship day. Sailors can investigate B and C decks. The expedition’s guests have access to all four.'),
 483:scene('The question of sponsorship',483,74,'Crawford refers you to Starkweather and Moore. They are the ones to ask whether a contribution can buy you a place.'),
 486:scene('The gangplank is down',486,74,'Supplies are coming aboard the freighter. You could speak to a sailor, ask for Captain Crawford, or seek out the expedition leader, Professor Blake.'),
 487:scene('The captain is hiring',487,74,'The expedition needs people with at least 25% in Electrical Repair, Mechanical Repair, Navigate, Operate Heavy Machinery, Pilot (Aircraft), or Survival.'),
 488:{...scene('A place on the expedition',488,74,'Crawford considers who you are and what you bring to the expedition.'),source:'Entry 488 · pp. 74, 76'},
 489:scene('An offer to publish',489,76,'You offer to publish the expedition’s work and finance its future research. The leaders accept and make room for you on the December 20 sailing.'),
 490:scene('Another way aboard',490,76,'You can make another approach to the captain, or look for a different way aboard.'),
 492:scene('The expedition roster',492,76,'Captain Crawford commands the ship. Professor Eustace Blake leads the expedition, and Dr. Jerome Thompson is its physician. Olav Fram oversees the equipment, including three Dornier aircraft. MacPherson, Smith, and Bering are the pilots. Dr. Rambeau is a geologist. Paddy Jones serves as first mate and radio officer. Eighteen sailors round out the crew.'),
 494:scene('Talk along the gangplank',494,76,'The crew calls Crawford “Old Haddock.” They are worried about the weather and say he is hiring only people with the skills for a polar expedition. You could try to bluff your way aboard.'),
 495:scene('The captain cuts you short',495,76,'Crawford says he has no time to argue. You will have to find another approach.'),
 496:scene('A seaman’s disguise',496,76,'With some work you could pass as a sailor. Or you could ask Crawford directly.'),
 497:scene('Professor Eustace Blake',497,76,'Blake explains that his expedition hopes to retrace Lake’s journey. He dismisses the stories of a lost city as something that happens to people after too long in Antarctica.'),
 498:scene('No reporters aboard',498,76,'Crawford refuses to take a reporter, and his reasons have little to do with your qualifications. You could try to find a way around his refusal.'),
 499:scene('Where are your orders?',499,77,'Seeing the uniform, Crawford asks for orders assigning you to his expedition. You are on leave and have no orders to show him.'),
 500:scene('A berth on The Dark Sea',500,77,'You secured passage before the December 20 sailing. The freighter takes 26 plus 1D6 days to reach Antarctica. You can make one investigation each ship day or wait out the voyage.'),
 501:scene('A place with the crew',501,77,'You secured a place as a sailor before the December 20 sailing. The passage takes 26 plus 1D6 days. You can search the ship or investigate B and C decks between shifts.'),
 503:scene('The stores below deck',503,77,'You find food, skis, and other expedition supplies.'),
 506:scene('Crawford seems uneasy',506,77,'Something about the passage worries the captain. You can try to draw him out.'),
 509:scene('Jeffries’ footlocker',509,78,'One footlocker has a lock unlike anything else aboard. The name on the lid is Jeffries.'),
 510:scene('Landfall in hiding',510,78,'You made it to Antarctica without being discovered. You can seek someone’s help, turn yourself in, or try to stay out of sight.'),
 511:scene('Under guard at base camp',511,78,'The expedition puts you to work setting up camp. You will need someone on the team to help you get assigned to a party.'),
 513:scene('Shipboard conversation',513,78,'The officers say the sea is unseasonably calm and the ship is handling well. The crew seem on edge all the same.'),
 514:scene('Your course on the chart',514,78,'A chart shows the current position and the rest of the expedition’s route. Something else in the cabin catches your eye.'),
 515:scene('Rumors about Dr. Thompson',515,78,'The crew says the ship’s doctor has been acting strangely and keeps to himself.'),
 516:scene('An uneasy crew',516,78,'The crew seem worried about one of their own. You may be able to get someone to talk.'),
 517:scene('A trail on the deck',517,78,'A slick residue leads to the sailors’ quarters on C deck.'),
 518:scene('A greater hand',518,78,'Crawford admits he feels as if something is steering them toward Antarctica. He puts it down to an old sailor’s superstition.'),
 520:{...scene('Antarctica base camp',520,79,'The expedition establishes camp under the long summer light. Three Dornier aircraft will take separate parties into the interior. One party is bound for the mountains toward the pole, one is setting up camps farther north, and the third will follow Lake’s reports across the mountains.'),eyebrow:'Antarctica'},
 521:scene('Sketches from Lake’s expedition',521,79,'The report dismisses the rumors of a city. Sketches show a squat, stump-like creature and a mass of misshapen flesh. The notes give particular attention to the prints taken back to Miskatonic.'),
 522:scene('Antarctic flight plans',522,79,'Three planned flight paths are marked on a map. The central route crosses the mountains toward the site of Lake’s reported city.'),
 523:scene('Notes on the drowned cities',523,79,'The writer believes the reports of a city and caverns. His own notes describe frog-like creatures and the beings they worship in cities beneath the sea.'),
 524:scene('The armory key',524,79,'You find the key to the armory in the cargo hold. It contains explosives and firearms. You could risk going down to the hold.'),
 526:scene('The Antarctic library',526,80,'Shelves of books and papers cover the polar expeditions. A careful search may turn up useful notes.'),
 530:scene('A case for joining a party',530,80,'You may be able to convince Blake or Rambeau to speak on your behalf. What you know of the Mythos strengthens your account.'),
 532:scene('The cold drives you back',532,81,'It is easy enough to avoid a patrol outside the camp. The cold is another matter. You turn back toward the buildings.'),
 533:scene('Something about Jeffries',533,81,'One of the sailors finally names Jeffries. Something about the new man’s stare frightens his crewmates.'),
 535:scene('A bare cabin',535,81,'You find nothing that helps the investigation.'),
 536:scene('The radio cabin',536,81,'Spare parts and signal logs are strewn around the radio, mixed with novels and cigarette ends.'),
 538:scene('Carvings in the cabin',538,81,'Among the carvings you notice a headless figure and a worm with arresting eyes.'),
 540:scene('A hidden supply of whisky',540,82,'Several bottles have been stashed out of sight. You could look for something else before leaving.'),
 544:scene('Over the side',544,83,'You hid the crystal to sell it later, but it vanishes. An assailant waiting by the hatch strikes you down and throws you into the freezing sea. The investigation ends here.'),
 576:scene('The Top of Aten',576,88,'Inside Jeffries’ footlocker is a crystal octahedron. You have only a moment to decide what to do before someone returns.'),
 578:scene('Jeffries gives chase',578,89,'Jeffries follows you up the ladder. His body swells into a shifting mass as you reach the hatch.'),
 591:scene('A ringing blow',591,90,'The hammer strikes the Top and the crystal rings like a bell. It is still intact. Jeffries has heard you.'),
 433:scene('The Top goes into the sea',433,69,'You throw the Top over the rail. Salt water darkens the crystal and eats into it. Jeffries leaps after it as his shape comes apart. The crystal sinks and disintegrates. You have saved the world.'),
 'dark-sea-caught':scene('Caught in the cabin',460,72,'Someone finds you as you leave. You have one chance to talk your way clear.'),
 'dark-sea-reassured':scene('An expedition ally',531,80,'Your explanation convinces an expedition leader. You have an ally and can continue your investigation.'),
 'dark-sea-no-discovery':scene('Nothing conclusive',480,74,'You find nothing that advances your search today.'),
 'dark-sea-door-locked':scene('A locked cabin',460,72,'The door is locked. You can try to open it on another ship day.'),
 'dark-sea-armory':scene('Inside the armory',524,79,'You have time to take some equipment before leaving the cargo hold.'),
 'dark-sea-top-options':scene('A moment to act',576,88,'Jeffries has not returned. You can carry the crystal onto the deck, try to break it here, or hide it to sell later.'),
 'dark-sea-porthole':scene('The open porthole',578,89,'The creature forces the hatch open. Your only chance to get the Top into the sea is through the porthole.'),
 'dark-sea-saved-at-sea':scene('The Top is gone',578,89,'The Top flies through the porthole and into the salt water. The creature closes in before you can escape. You saved the world at the cost of your life.'),
 'dark-sea-jeffries-death':scene('Taken by the creature',578,89,'You miss the porthole. Jeffries engulfs you and the Top remains aboard.'),
 'dark-sea-shoggoth-death':scene('Engulfed on deck',466,72,'You cannot get clear before the creature reaches you. The investigation ends here.'),
};

DS_SCENES[480].eyebrow=deck('Investigation table');
DS_SCENES[460].eyebrow=deck('Cabins');

const dockEntries=[453,454,463,464,471,483,486,487,488,489,490,494,495,496,497,498,499];
const endings=['dark-sea-saved-at-sea','dark-sea-jeffries-death','dark-sea-shoggoth-death',544,433];
export const DS_ENDINGS = new Set(endings);
export const DS_ENTRIES={
 darkSeaGangplank:dockEntries,
 darkSea:[...Object.keys(DS_SCENES)
  .map(key=>Number(key)||key)
  .filter(entry=>!dockEntries.includes(entry)),574],
};

function evidence(title,entry,text) {
 return {title,type:'Expedition observation',source:DS_SCENES[entry].source,text};
}

export const DS_CLUES={
 darkSeaRoster:evidence('The expedition roster',492,'Crawford commands The Dark Sea. Blake leads the expedition, Thompson is physician, and Fram is in charge of equipment. MacPherson, Smith, and Bering fly the planes. Rambeau is the geologist and Jones doubles as first mate and radio officer.'),
 darkSeaRecruits:evidence('Three recent recruits',465,'The sailors remember Jackson, Jeffries, and Klug joining shortly before departure.'),
 darkSeaLocker:evidence('Jeffries’ footlocker',509,'Jeffries keeps a footlocker with an unusually strong lock in the C-deck sailors’ quarters.'),
 darkSeaThompson:evidence('Dr. Thompson keeps to himself',515,'The crew says their physician has been behaving strangely.'),
 darkSeaTrail:evidence('The trail to C deck',517,'A slimy trail leads to the sailors’ quarters.'),
 darkSeaCaptain:evidence('Crawford’s misgivings',518,'The captain suspects a greater hand is forcing his ship toward Antarctica.'),
 darkSeaJeffries:evidence('The crew fears Jeffries',533,'A sailor said Jeffries’ stare unsettles the crew.'),
 darkSeaSketches:evidence('Sketches and tracks from Lake’s expedition',521,'The sketches depict a stump-like creature and a shapeless mass of flesh. The notes dismiss the city reports but take the footprints now at Miskatonic seriously.'),
 darkSeaPlan:evidence('Antarctic exploration routes',522,'The central flight route crosses the mountains toward the place where Lake reported a city.'),
 darkSeaNotes:evidence('Notes on creatures beneath the sea',523,'The writer believes the reports of a city and caverns, and records encounters with frog-like creatures that worship strange beings in cities beneath the sea.'),
 darkSeaTop:evidence('The Top of Aten was aboard',576,'The crystal Top of Aten was hidden in Jeffries’ footlocker.'),
};

export const DS_ENTRY_CLUES={
 492:'darkSeaRoster',465:'darkSeaRecruits',509:'darkSeaLocker',515:'darkSeaThompson',
 517:'darkSeaTrail',518:'darkSeaCaptain',533:'darkSeaJeffries',521:'darkSeaSketches',
 522:'darkSeaPlan',523:'darkSeaNotes',576:'darkSeaTop',
};

export const DS_FLAGS=['darkSeaBluffFailed'];

function choice(id,label,target,extra={}) {
 return {id:`dark-sea-${id}`,label,target,duration:0,...extra};
}
function check(entry,skill,label,successEntry,failureEntry,extra={}) {
 return {entry,skill,label,successEntry,failureEntry,duration:0,...extra};
}
const resetOnShipDay=new Set([506,514,516,524,526,540,'dark-sea-gossip','dark-sea-leave-cabin','dark-sea-caught']);
const returnToShip=choice('return','Return to your berth',null,{effect:'dark-sea-return'});
const nextDay=choice('next-day','Wait until the next ship day',null,{effect:'dark-sea-next',when:s=>s.darkSea.day<s.darkSea.days});
const land=choice('make-landfall','Wait out the voyage',null,{effect:'dark-sea-land'});
const beforeSailing=s=>s.time<sailing;
const isInvestigator=key=>s=>(s.investigator??'grunewald')===key;
const crewSkills=['Mechanical Repair','Navigate','Operate Heavy Machinery','Pilot (Aircraft)','Survival (Desert)','Survival (Sea)'];
const crewQualified=s=>['Electrical Repair',...crewSkills].some(skill=>trainedSkill(s,skill)>=25);
const wilsonQualified=s=>crewSkills.reduce((total,skill)=>total+trainedSkill(s,skill)-COMMON_SKILLS[skill],0)>=100;
const holtBerthOptions={Persuade:483, Charm:489, 'Fast Talk':495, Intimidate:471};
const holtBerthId=skill=>`dark-sea-holt-berth-${skill.toLowerCase().replaceAll(' ','-')}`;
const isHolt=isInvestigator('holt');
const holtCanNegotiate=s=>beforeSailing(s)&&isHolt(s)&&!Object.keys(holtBerthOptions).some(skill=>s.attempts[holtBerthId(skill)]);
const holtBerthChecks=Object.fromEntries(Object.entries(holtBerthOptions).map(([skill,target])=>[holtBerthId(skill),
 check(488,skill,`Make your case with ${skill}`,target,488,{daily:true,when:holtCanNegotiate}),
]));
const shipActivity = s=>!s.darkSea.landed&&!s.darkSea.used;
const lodge = s=>s.darkSea.boarded===500;
const lockersKnown = name => s=>s.clues.includes('darkSeaRecruits')||name==='Jeffries'&&(s.clues.includes('darkSeaLocker')||s.clues.includes('darkSeaJeffries'));
const hidingPlaces={
 lifeboat:'lifeboat',
 cargo:'cargo hold',
 storage:'lower-deck storage',
 engine:'rear engine room',
};

export const DS_CHOICES = {
 453:[
  ...Object.entries(hidingPlaces).map(([id,name])=>choice(`hide-${id}`,`Stow away in the ${name}`,null,{effect:`dark-sea-hide-${id}`})),
  choice('abandon-stowaway','Return to the gangplank',486),
 ],
 454:[choice('wilson-uniform','Approach in uniform',499),choice('wilson-civilian','Approach in civilian clothes',464)],
 459:[choice('finish-confinement','Wait for Antarctica',null,{effect:'dark-sea-arrive-caught'})],
 460:[
  choice('crew-quarters','Search the sailors’ footlockers',475,{when:shipActivity}),
  choice('decks','Investigate the decks',480),
  returnToShip,nextDay,land,
 ],
 462:[choice('keep-to-yourself','Continue to landfall',null,{effect:'dark-sea-land'}),returnToShip],
 463:[choice('ask-crew','Talk to the sailors',494),choice('ask-captain','Talk to Captain Crawford',487)],
 464:[
  choice('wilson-accept-berth','Accept the berth on your qualifications',500,{when:s=>beforeSailing(s)&&wilsonQualified(s)}),
  choice('wilson-reconsider','Look for another way aboard',490,{when:s=>!wilsonQualified(s)}),
 ],
 465:[choice('return-roster','Return to the roster',492)],
 471:[
  choice('holt-reconsider-intimidate','Return to the captain',488),
  choice('holt-wait-after-intimidate','Wait one day and try another approach',490,{journey:24,when:s=>s.time+DAY<sailing}),
 ],
 475:[
  ...['Jackson','Jeffries','Klug'].map(name=>choice(`locker-${name.toLowerCase()}`,`Search ${name}’s locker`,null,{
   when:s=>shipActivity(s)&&lockersKnown(name)(s),
   effect:`dark-sea-locker-${name.toLowerCase()}`,
  })),
  choice('return-cabins','Return to B deck',460),
 ],
 480:[choice('search-cabins','Search the cabins on B deck',460),returnToShip,nextDay,land],
 483:[choice('holt-reconsider-persuade','Return to the captain',488),choice('holt-leave-sponsors','Look for another way aboard',490)],
 486:[
  choice('sailors','Talk to the sailors',494),
  choice('captain','Ask to see the captain',487),
  choice('blake','Ask to see the expedition leader',497),
 ],
 487:[
  choice('take-crew-berth','Sign on with the crew',501,{
   when:s=>beforeSailing(s)&&crewQualified(s),
  }),
  choice('ask-for-berth','Explain who you are to Crawford',488),
 ],
 488:[
  choice('take-berth','Accept a berth on the expedition',500,{when:s=>beforeSailing(s)&&isInvestigator('grunewald')(s)}),
  choice('lau-ask-for-berth','Ask to join as a reporter',498,{when:isInvestigator('lau')}),
  choice('wilson-ask-for-berth','Present yourself to Crawford',454,{when:isInvestigator('wilson')}),
  choice('holt-other-approach','Look for another way aboard',490,{when:isHolt}),
 ],
 489:[choice('holt-accept-berth','Accept a berth on the expedition',500,{when:beforeSailing})],
 490:[choice('try-captain','Ask for the captain',487),choice('return-gangplank','Return to the gangplank',486)],
 492:[returnToShip,nextDay,land],
 494:[choice('apply','Apply for a crew position',487),choice('leave-sailors','Return to the gangplank',486)],
 495:[choice('holt-reconsider-fast-talk','Look for another way aboard',490)],
 496:[choice('pose-as-sailor','Pose as a sailor and approach the crew',494),choice('see-crawford','See Crawford',487)],
 497:[choice('join-expedition','Try to join the expedition',463),choice('leave-blake','Return to the gangplank',486)],
 498:[choice('lau-leave-captain','Return to the gangplank',486)],
 499:[choice('wilson-reconsider-uniform','Look for another way aboard',490)],
 500:[
  choice('roster','Ask about expedition members',492,{when:shipActivity}),
  choice('search','Search the cabins',460),choice('investigate','Investigate the decks',480),nextDay,land,
 ],
 501:[choice('search','Search the ship',460),choice('investigate','Investigate B and C decks',480),nextDay,land],
 510:[
  choice('turn-in','Turn yourself in',511),choice('seek-an-ally','Ask a leader for help',530),
  choice('sneak-at-camp','Try to sneak around camp',532),
 ],
 511:[choice('find-an-ally','Ask for help joining an exploration party',530)],
 532:[choice('return-to-shelter','Return to the camp',510)],
 591:[choice('run-for-the-hatch','Run for the hatch',578)],
 'dark-sea-reassured':[returnToShip,land],
 'dark-sea-door-locked':[choice('leave-locked-door','Return to the corridor',460)],
 'dark-sea-armory':[
  choice('take-dynamite','Take dynamite',null,{when:s=>!s.inventory.includes('Dynamite'),effect:'dark-sea-dynamite'}),
  choice('leave-armory','Leave with what you chose',null,{effect:'dark-sea-armory-exit'}),
 ],
 'dark-sea-top-options':[
  choice('throw-top-overboard','Throw the Top overboard',433),
  choice('smash-top','Try to break the Top with the hammer',591),
  choice('keep-top','Hide the Top and sell it later',544),
 ],
};

for(const entry of [503,509,513,515,517,518,533,'dark-sea-no-discovery']) {
 DS_CHOICES[entry]=[choice(`return-from-${entry}`,'Return to the investigation table',480)];
}
for(const entry of [514,521,522,523,524,526,535,536,538,540]) {
 DS_CHOICES[entry]=[choice(`leave-cabin-${entry}`,'Go to the cabin door','dark-sea-leave-cabin')];
}

DS_SCENES['dark-sea-leave-cabin']=scene('Leaving the cabin',460,72,'You listen at the door. With any luck you can slip back into the corridor unseen.');
DS_ENTRIES.darkSea.push('dark-sea-leave-cabin');

export const DS_CHECKS = {
 ...holtBerthChecks,
 'dark-sea-lau-disguise':check(498,'INT','Work out a way to get aboard',463,498,{daily:true,when:beforeSailing}),
 'dark-sea-stowaway':check(486,'INT','Look for a place to hide',453,486,{daily:true}),
 'dark-sea-perform-bluff':check(494,'EDU','Make up a plausible account of your experience','dark-sea-cover',487,{
  when:s=>!s.flags.darkSeaBluffFailed,failureEffect:'dark-sea-failed-bluff',
 }),
 'dark-sea-apply-cover':check('dark-sea-cover','Luck','See whether the bluff holds',501,487,{failureEffect:'dark-sea-failed-bluff'}),
 'dark-sea-disguise':check(490,'INT','Think of a way to blend in',496,490,{daily:true}),
 'dark-sea-interview-int':check('dark-sea-gossip','INT','Work out which sailors are new',465,492),
 'dark-sea-monster-dodge':check(466,'Dodge','Get clear of the creature',500,'dark-sea-shoggoth-death',{successEffect:'dark-sea-return'}),
 'dark-sea-captain-fast-talk':check(506,'Fast Talk','Ask the captain what worries him',518,'dark-sea-no-discovery'),
 'dark-sea-captain-psychology':check(506,'Psychology','Read the captain’s mood',518,'dark-sea-no-discovery'),
 'dark-sea-search-chart-room':check(514,'Spot Hidden','Look for what the chart conceals',524,'dark-sea-leave-cabin'),
 'dark-sea-enter-armory':check(524,'Luck','Get into the cargo hold unseen','dark-sea-armory',459),
 'dark-sea-search-books':check(526,'Library Use','Search the books and papers',523,'dark-sea-leave-cabin'),
 'dark-sea-search-whisky-room':check(540,'Spot Hidden','Look behind the bottles',538,'dark-sea-leave-cabin'),
 'dark-sea-exit-cabin':check('dark-sea-leave-cabin','Luck','Slip into the corridor',460,'dark-sea-caught'),
 'dark-sea-caught-charm':check('dark-sea-caught','Charm','Talk your way out of trouble','dark-sea-reassured',459),
 'dark-sea-caught-fast':check('dark-sea-caught','Fast Talk','Improvise an excuse','dark-sea-reassured',459),
 'dark-sea-top-luck':check(576,'Luck','Check you still have time','dark-sea-top-options',578),
 'dark-sea-hatch-dex':check(578,'DEX','Shut the hatch before Jeffries gets through',433,'dark-sea-porthole'),
 'dark-sea-top-throw':check('dark-sea-porthole','Throw','Throw the Top through the porthole','dark-sea-saved-at-sea','dark-sea-jeffries-death'),
};

DS_SCENES['dark-sea-cover']=scene('Put the story to Crawford',494,76,'You have a convincing story about your experience. Now it has to survive the captain’s questions.');
DS_ENTRIES.darkSeaGangplank.push('dark-sea-cover');
DS_SCENES['dark-sea-gossip']=scene('The crew’s new faces',455,71,'Thompson keeps to himself and reads unusual books. Fram sailed with Lake. Eddy Smith was signed recently, and Rambeau replaced a geologist who fell ill. You think there may be other recent arrivals.');
DS_CHOICES['dark-sea-gossip']=[choice('leave-gossip','Return to the roster',492)];
DS_ENTRIES.darkSea.push('dark-sea-gossip');

for(const [place,skills] of Object.entries({lifeboat:['Stealth'],cargo:['Stealth'],storage:['Charm','Fast Talk'],engine:['Charm','Psychology']})) {
 for(const skill of skills) {
  const id=skill.toLowerCase().replaceAll(' ','-');
  DS_CHECKS[`dark-sea-hide-${place}-${id}`]=check(456,skill,`Avoid discovery with ${skill}`,510,459,{
   when:s=>s.darkSea.hiding===place,
  });
 }
}

for(const role of ['captain','professor']) {
 for(const skill of ['Charm','Persuade']) {
  DS_CHECKS[`dark-sea-ask-${role}-${skill.toLowerCase()}`]=check(492,skill,`Ask the ${role} about the crew`,'dark-sea-gossip',492,{
   when:s=>shipActivity(s)&&(s.darkSea.interviews[role]||0)<3,
   repeat:true,successEffect:`dark-sea-interview-${role}`,failureEffect:`dark-sea-interview-${role}`,
  });
 }
}

for(const [skill,targets] of [
 ['Anthropology',['dark-sea-no-discovery','dark-sea-no-discovery',506,'dark-sea-no-discovery']],
 ['Listen',[513,515,'dark-sea-no-discovery','dark-sea-no-discovery']],
 ['Psychology',[518,'dark-sea-no-discovery',516,'dark-sea-no-discovery']],
 ['Spot Hidden',['dark-sea-no-discovery','dark-sea-no-discovery',509,503]],
 ['Track',['dark-sea-no-discovery',517,'dark-sea-no-discovery',517]],
]) {
 for(const [index,target] of targets.entries()) {
  const letter='ABCD'[index];
  DS_CHECKS[`dark-sea-deck-${letter.toLowerCase()}-${skill.toLowerCase().replaceAll(' ','-')}`]=check(480,skill,`${letter} deck · ${skill}`,target,'dark-sea-no-discovery',{
   repeat:true,when:s=>shipActivity(s)&&(lodge(s)||letter==='B'||letter==='C'),
   successEffect:'dark-sea-activity',failureEffect:'dark-sea-activity',
  });
 }
}
for(const skill of ['Charm','Fast Talk','Persuade','Psychology']) {
 DS_CHECKS[`dark-sea-crew-${skill.toLowerCase().replaceAll(' ','-')}`]=check(516,skill,`Ask what is upsetting the crew`,533,'dark-sea-no-discovery');
}

for(const [cabin,target] of Object.entries({A:514,B:535,C:521,D:540,E:526,F:536,G:535,H:522})) {
 const fresh=s=>shipActivity(s)&&!Object.hasOwn(s.darkSea.locks,cabin);
 const locked=s=>shipActivity(s)&&s.darkSea.locks[cabin]<s.darkSea.day;
 DS_CHECKS[`dark-sea-cabin-${cabin.toLowerCase()}-luck`]=check(460,'Luck',`Try cabin ${cabin}`,target,'dark-sea-door-locked',{
  repeat:true,when:fresh,successEffect:'dark-sea-activity',failureEffect:`dark-sea-locked-${cabin}`,
 });
 for(const skill of ['Mechanical Repair','Locksmith']) {
  DS_CHECKS[`dark-sea-cabin-${cabin.toLowerCase()}-${skill.toLowerCase().replaceAll(' ','-')}`]=check(460,skill,`Open cabin ${cabin}`,target,'dark-sea-door-locked',{
   repeat:true,when:locked,successEffect:'dark-sea-activity',failureEffect:`dark-sea-locked-${cabin}`,
  });
 }
}
for(const leader of ['Blake','Rambeau']) {
 for(const skill of ['Credit Rating','Persuade','Fast Talk','Intimidate','Charm']) {
  DS_CHECKS[`dark-sea-appeal-${leader.toLowerCase()}-${skill.toLowerCase().replaceAll(' ','-')}`]=check(530,skill,`Ask ${leader} to help you`,520,574,{
   skillBonus:s=>s.mythos,successEffect:'dark-sea-land',
  });
 }
}

function startVoyage(s,boarded,hiding,{rollDie,log}) {
 s.location='darkSea';
 s.time=sailing;
 s.mealDebt=0;
 s.sleepDebt=0;
 s.fastingToday=false;
 s.sleep=8;
 s.sleptNight=sailing-DAY;
 s.darkSea={
  boarded,hiding,days:26+rollDie(6),day:1,used:false,landed:false,
  locks:{},interviews:{},shoggothSeen:false,
 };
 log(s,`The Dark Sea sailed for Antarctica on December 20. Passage will take ${s.darkSea.days} days.`);
}

function finishVoyage(s,log) {
 if(s.darkSea.landed) return;
 s.darkSea.day=s.darkSea.days;
 s.darkSea.landed=true;
 s.time=sailing+s.darkSea.days*DAY;
 s.sleptNight=s.time-DAY;
 log(s,'The Dark Sea reached Antarctica.');
}

export function darkSeaEnter(s,previousEntry,ctx) {
 if(s.location==='darkSeaGangplank'&&[500,501].includes(s.entry)) startVoyage(s,s.entry,null,ctx);
 if(s.location!=='darkSea'||!s.darkSea) return;
 if([510,511,520].includes(s.entry)) finishVoyage(s,ctx.log);
 if(s.entry===514||s.entry===522) {
  if(!s.darkSea.routes?.[s.entry]) {
   s.darkSea.routes={...s.darkSea.routes,[s.entry]:true};
   ctx.log(s,s.entry===514?'Studied the course chart. Gained 5 points in Navigate.':'Studied the planned routes. Gained 10 points in Navigate while in Antarctica.');
  }
 }
 if([466,578].includes(s.entry)&&previousEntry!==s.entry) {
  const calm=ctx.rollDie(100)<=s.sanity;
  const loss=ctx.rollDie(calm?6:20);
  s.sanity=Math.max(0,s.sanity-loss);
  ctx.log(s,`Lost ${loss} Sanity on seeing the creature.`);
  if(s.entry===466) s.darkSea.shoggothSeen=true;
 }
 if(s.entry===574||DS_ENDINGS.has(s.entry)) {
  s.phase='ending';
  if(s.entry!==433&&s.entry!==574) s.hp=0;
 }
}

function voyageArrival(s,{go,log},entry=520) {
 finishVoyage(s,log);
 go(s,entry);
}

export function darkSeaChoiceEffect(s,effect,ctx) {
 if(typeof effect!=='string'||!effect.startsWith('dark-sea-')) return false;
 const {go,log}=ctx;
 const action=effect.slice('dark-sea-'.length);
 if(action.startsWith('hide-')) {
  startVoyage(s,456,action.slice(5),ctx);
  go(s,456);
  return true;
 }
 if(action.startsWith('locker-')) {
  s.darkSea.used=true;
  const name=action.slice(7);
  go(s,name==='jeffries'?576:name==='jackson'?459:'dark-sea-no-discovery');
  return true;
 }
 switch(action) {
  case 'return':
   go(s,s.darkSea.boarded);
   return true;
  case 'next':
   if(s.darkSea.day===s.darkSea.days) voyageArrival(s,ctx);
   else {
    s.darkSea.day++;
    s.darkSea.used=false;
    for(const id of Object.keys(s.attempts)) {
     if(resetOnShipDay.has(DS_CHECKS[id]?.entry)) delete s.attempts[id];
    }
    log(s,`It is now ship day ${s.darkSea.day} of ${s.darkSea.days}.`);
   }
   return true;
  case 'land':
   if(s.darkSea.boarded===500&&!s.darkSea.landed&&s.entry!==462&&!s.darkSea.shoggothSeen) {
    go(s,[206,300,324].some(entry=>s.visited.includes(entry))?466:462);
   } else voyageArrival(s,ctx);
   return true;
  case 'arrive-caught':
   voyageArrival(s,ctx,511);
   return true;
  case 'dynamite':
   s.inventory.push('Dynamite');
   log(s,'Took dynamite from the ship’s armory.');
   return true;
  case 'armory-exit':
   go(s,'dark-sea-leave-cabin');
   return true;
 }
 return false;
}

export function darkSeaCheckEffect(s,effect,ctx) {
 if(typeof effect!=='string'||!effect.startsWith('dark-sea-')) return false;
 const action=effect.slice('dark-sea-'.length);
 if(action==='failed-bluff') {
  s.flags.darkSeaBluffFailed=true;
  ctx.go(s,490);
  return true;
 }
 if(action==='activity') {
  s.darkSea.used=true;
  return false;
 }
 if(action.startsWith('locked-')) {
  s.darkSea.used=true;
  s.darkSea.locks[action.slice(7)]=s.darkSea.day;
  return false;
 }
 if(action.startsWith('interview-')) {
  const role=action.slice(10);
  s.darkSea.used=true;
  s.darkSea.interviews[role]=(s.darkSea.interviews[role]||0)+1;
  return false;
 }
 return darkSeaChoiceEffect(s,effect,ctx);
}

export function darkSeaSkillBonus(s,skill) {
 if(skill!=='Navigate') return 0;
 return (s.darkSea?.routes?.[514]?5:0)+(s.darkSea?.landed&&s.darkSea.routes?.[522]?10:0);
}

const record=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);

export function validateDarkSea(s) {
 const v=s.darkSea;
 if(!['darkSea','antarctica'].includes(s.location)) return v===undefined;
 if(!record(v)||![456,500,501].includes(v.boarded)||!Array.isArray(s.visited)||!s.visited.includes(v.boarded)) return false;
 if(v.boarded===456?!Object.hasOwn(hidingPlaces,v.hiding):v.hiding!==null) return false;
 if(!Number.isInteger(v.days)||v.days<27||v.days>32||!Number.isInteger(v.day)||v.day<1||v.day>v.days) return false;
 if(['used','landed','shoggothSeen'].some(key=>typeof v[key]!=='boolean')) return false;
 const landfall=sailing+v.days*DAY;
 if(v.landed&&v.day!==v.days) return false;
 if(!v.landed&&s.time!==sailing) return false;
 if(v.landed&&s.time<landfall) return false;
 if(s.location==='antarctica'&&!v.landed) return false;
 if(!record(v.locks)||Object.entries(v.locks).some(([key,n])=>!/^[A-H]$/.test(key)||!Number.isInteger(n)||n<1||n>v.day)) return false;
 if(!record(v.interviews)||Object.entries(v.interviews).some(([key,n])=>!['captain','professor'].includes(key)||!Number.isInteger(n)||n<1||n>3)) return false;
 if(v.routes!==undefined&&(!record(v.routes)||Object.entries(v.routes).some(([key,val])=>!['514','522'].includes(key)||val!==true))) return false;
 if(s.location==='darkSea'&&[510,511,520,530,532,574].includes(s.entry)!==v.landed) return false;
 return true;
}
