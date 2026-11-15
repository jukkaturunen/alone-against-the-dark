import { HALF_HOUR, HOUR } from './calendar.js';

const site = 'The Lost Pyramid';
const chamberScuffle = 'pyramid-chamber-scuffle';
const chamberEscape = 'pyramid-chamber-escape';
const chamberLuck = 'pyramid-chamber-luck';
const collapse = 'pyramid-chamber-collapse';
const chamberEnding = 'pyramid-chamber-ending';
const madnessEnding = 'pyramid-sanity-ending';
const woundEnding = 'pyramid-injury-ending';
const shaftEnding = 'pyramid-shaft-ending';
const sacEnding = 'pyramid-basket-ending';
const wormEnding = 'pyramid-worm-ending';
const ghastEnding = 'pyramid-ghast-ending';
const mirrorGrip = 'pyramid-mirror-grip';
const mirrorIdentify = 'pyramid-mirror-identify';
const mirrorEnding = 'pyramid-mirror-ending';
const chamberRising = 'pyramid-chamber-rising';
const inscriptions = 'pyramid-inscriptions';
const falseClimbLuck = 'pyramid-knife-luck';
const climbAfterDodge = 'pyramid-flee-climb';
const ghastOpponents = [354,402,430];

export const PUZZLE_TILES = Object.fromEntries(
 Array.from('AJIKCNEDLHPBOMFG',(letter,index)=>[letter,{slot:index+1,image:`assets/amarna-pyramid/${letter.toLowerCase()}.webp`}])
);
export const PUZZLE_ENTRY_TILES = {
 158:['L'],224:['O'],303:['L'],305:['K'],307:['D'],308:['A'],309:['A'],310:['I'],313:['I'],
 323:['J'],327:['K'],328:['N'],329:['E'],333:['E'],345:['J','I','K'],348:['L'],353:['J','I','K'],
 354:['N'],358:['E'],367:['C'],368:['P','H'],369:['F'],373:['F'],382:['K'],388:['I','K'],391:['C'],
 393:['A'],395:['D'],398:['N'],399:['K'],401:['M'],405:['B'],406:['M'],409:['H'],
 412:['B'],415:['B'],416:['G'],417:['F'],418:['B'],419:['O'],423:['P'],425:['P'],426:['H'],
 435:['M'],438:['F'],440:['M'],441:['M'],442:['O']
};

const source = (entry,page) => `Entry ${entry} · p. ${page}`;
const scene = (title,entry,page,...paragraphs) => ({title,eyebrow:site,source:source(entry,page),paragraphs,adapted:true});
export const PUZZLE_SCENES = {
 382:scene('The hidden entrance',382,62,
  'The opening gives onto a narrow stone corridor descending into the pyramid. A strange odor rises from below. Faint streaks of moss give off the only light ahead.',
  'Your cross-section begins at the entrance in section K. As you discover the passages, the sections you find will fill in the diagram.'),
 377:scene('The smell at the entrance',377,62,'You recognize the scent of the chemicals used in mummification.'),
 399:scene('A shaft across the corridor',399,64,'The sloping corridor ends at a dark shaft. There are handholds in the near wall. Beyond the opening, steps lead up into the rock.'),
 352:scene('The last handhold',352,58,'The handholds stop before you reach the bottom. You can climb back or drop the rest of the way.'),
 332:scene('The lip of the pit',332,56,'The stairs begin across the opening. You will need to jump.'),
 305:scene('The stairs in section K',305,54,'The steps are large enough for creatures much taller than you. The drawings beside them show shambling creatures with hollow sockets and gaping mouths inflicting brutal rites on their captives.'),
 349:scene('Footprints in the sand',349,58,'Something has disturbed the sand on the steps. You are unlikely to be the first one down here.'),
 313:scene('A junction in section I',313,55,'A passage continues west and slopes downward. Stairs rise above it, and another set descends east.'),
 307:scene('Passages in section D',307,54,'A corridor leads west. In the other direction, a staircase drops away.'),
 395:scene('The foot of the shaft',395,64,'The walls offer no grip for a climb. The floor slopes down to the east, past another shaft and toward some steps.'),
 303:scene('The deep shaft in section L',303,54,'You stop where the steps are severed by a deep shaft. In the gloom beyond it you can just make out the other end of the passage.'),
 348:scene('The far side of the shaft',348,58,'The passage stops at solid stone. Across the gap, a creature steps into the moss-light carrying a basket. It watches, waiting.'),
 355:scene('The hooked rods',355,59,'A second ghast appears. They reach across the shaft with long rods and catch hold of you, dragging you toward the edge.'),
 158:scene('One clear shot',158,33,'The ghasts are hauling you toward the shaft. You have a moment to fire before the hooks pull you off balance.'),
 351:scene('Your rope snags',351,58,'The rope jerks out of your hands as you lower yourself. You reach for it before it can slip away.'),
 369:scene('The chamber below',369,60,'The shaft brings you into section F. A smell of fresh blood rises below you.'),
 373:scene('The bowl-shaped chamber',373,61,'You land knee-deep in something that moves. When you strike a match, a basket descends from above and a whisper tells you to fill it.'),
 308:scene('Handholds in section A',308,54,'The corridor stops at a shaft with notches in one side. The passage you came through leads back to the stairs.'),
 310:scene('The shaft in section I',310,55,'Below you, the notches give way to a staircase sloping west.'),
 393:scene('Stairs in section A',393,64,'The stairs rise to a corridor that runs west. An angled shaft rises further into the stone.'),
 400:scene('The angled shaft',400,65,'The sides are smooth enough to make the climb difficult.'),
 309:scene('Stone at the top',309,55,'The shaft ends in a solid, immovable block. You can slide back down to the stairs.'),
 371:scene('The slippery passage',371,60,'The stone tilts downward beneath your feet. You have an instant to catch hold.'),
 353:scene('The lower corridor',353,58,'Your fall ends on a stone floor. Inscriptions cover the walls, and the route ahead runs through sections J and I to a shaft with handholds in K.'),
 345:scene('A welcome to initiates',345,57,'The inscription welcomes the True Servants of Aten to the secret rites of the One God of Gods.'),
 366:scene('A chance to make a grapple',366,60,'The shaft disappears below. With rope and a knife, you might be able to catch a protrusion and regain your footing.'),
 323:scene('The stairs in section J',323,56,'The shaft with the notches continues upward. In the other direction, the passage goes down a set of steps.'),
 394:scene('A deeper shaft',394,64,'At the bottom of the stairs another shaft opens below you. You can use a rope, jump down, or go back.'),
 325:scene('A mosaic beside the rope',325,56,'As you lower yourself, the wall mosaic comes into view: creatures covered in boils descend on headless, stalk-like beings. A passage branches from the shaft.'),
 388:scene('The side passage',388,64,'You swing into the passage and follow it through section I to section K.'),
 327:scene('Notches in section K',327,56,'Notches in the wall of a descending shaft might support your weight.'),
 329:scene('The slope in section E',329,56,'You stand on a steep slope. You can descend carefully or try the climb back up.'),
 333:scene('A fall onto the slope',333,57,'You strike stone hard enough to lose your breath. Your equipment has fallen within reach.'),
 398:scene('The upper stairs in section N',398,64,'Stairs lead further down. To return to the corridor above, you will have to climb.'),
 328:scene('The bottom of the stairs',328,56,'East of you, a shaft has handholds cut into the wall. West, stairs lead back up.'),
 354:scene('An attack in the stairwell',354,58,'A red-eyed creature leaps down toward you, coughing and wheezing as it reaches out with its claws.'),
 358:scene('At the foot of the handholds',358,60,'You can ascend the shaft again or follow the corridor west.'),
 367:scene('The passage in section C',367,60,'The corridor ends at a shaft. You can go down or take the stairs back the way you came.'),
 392:scene('A sound below',392,64,'Something is moving in the dark below you.'),
 391:scene('Stairs below section C',391,64,'The staircase continues down, away from the long corridor.'),
 368:scene('The ornate stairs',368,60,'You cross section P into section H, where ornate stone steps continue down.'),
 446:scene('Something at your feet',446,70,'Pale worms wind around your ankles. Behind them, a mass of writhing flesh is advancing.'),
 443:scene('The descent beneath the slope',443,69,'There are features in the stone you can examine as you lower yourself.'),
 413:scene('Oversized handrails',413,67,'Stone handrails line the descent. Whatever used them was much larger than you.'),
 434:scene('The creature in the carving',434,69,'The carving depicts a shapeless mass of bubbles. Recognizable human limbs protrude from the shifting bulk.'),
 436:scene('An inscription on the descent',436,69,'The writing welcomes the servants of Ghatanothoa.'),
 406:scene('The west end of section M',406,66,'You slide down to a corridor and there seems to be no way back up. The passage runs east.'),
 439:scene('Soft limestone',439,69,'The limestone might be soft enough to cut handholds with a knife.'),
 420:scene('The eastward corridor',420,67,'The slope behind you leaves only one way forward.'),
 428:scene('The shallow shaft',428,68,'You can make out the floor of a short shaft. It looks shallow enough to drop into.'),
 347:scene('A possible hidden door',347,58,'You wonder whether a secret door might lie below.'),
 430:scene('A creature in the passage',430,68,'A long-legged creature clambers into view. Its features remind you of a starving human and its eyes are red.'),
 437:scene('Twelve fine grooves',437,69,'You find twelve thin grooves in the walls of the shaft. There is no door you can see, and you suddenly want to be out of it.'),
 441:scene('The break in section M',441,69,'A gap interrupts the passage. You can jump east toward another corridor or west toward a staircase.'),
 417:scene('Drops in section F',417,67,'Liquid drips on your head. You put up a hand and it comes away red. The passage runs east and west.'),
 416:scene('The corridor in section G',416,67,'The corridor has a way west and another way down.'),
 438:scene('A wall in section F',438,69,'The passage narrows to a wall at its west end. You can go back to section G or examine the stone.'),
 403:scene('The thin wall',403,65,'There might be open space behind this stone. You brace yourself to push.'),
 435:scene('Through the false wall',435,69,'Stone gives way and you step through into section M.'),
 440:scene('The wall in section M',440,69,'The corridor ends at a wall to the east. Toward the west, you can return to section O.'),
 401:scene('The passage beyond the wall',401,65,'The wall breaks. Beyond it, a corridor continues to the east.'),
 442:scene('The gap in section O',442,69,'Steps lead to a shaft. You can climb down or jump over it and head west. The eastern passage returns to section M.'),
 224:scene('The upper junction',224,42,'Darkness hides the far ends of the corridor. You can go east, go west, or descend the shaft.'),
 415:scene('The corridor in section B',415,67,'The passage runs west into section P and east toward the shaft in section O.'),
 423:scene('A glint across the shaft',423,67,'A narrow shaft cuts through the passage. Something glints across the gap. You can jump across, climb down, or go back east.'),
 425:scene('The silver mirror',425,68,'A small silver mirror rests face down in the dust. When you look into it, an impossible mass of tentacles and mouths appears in the glass.'),
 426:scene('The crypt in section H',426,68,'Alcoves for sarcophagi line the chamber. An image of the Earth turning on its axis is cut into the stone.'),
 409:scene('A vision of the turning Earth',409,66,'The world tilts. Waves engulf the coasts, the polar ice melts, and a permanent freeze grips the middle latitudes. What ends life for most of humanity makes room for other creatures.'),
 402:scene('Cut off in the crypt',402,65,'A ghast blocks the return route. You can fight it or try to evade it.'),
 419:scene('A corridor above a large chamber',419,67,'A shaft rises nearby. The walls are carved, and the western corridor overlooks a large chamber. To the east, the corridor continues into section M.'),
 404:scene('The climb above section O',404,65,'The shaft above is climbable, but it is a long way to fall.'),
 411:scene('The carved ceremonies',411,66,'The carvings show a tall man with bright eyes presiding over a ceremony. Nearby, strange long-legged creatures peer into sarcophagi. Mummies rise and join them.'),
 418:scene('The circular chamber',418,67,'From a dim landing you can see the Karpathos Device in the far wall of a circular chamber.'),
 405:scene('The ceremony',405,65,'Five gray figures stand with a short man under the torchlight. Others crouch in the shadows. The man speaks unfamiliar words, yet their meaning reaches you. The City of the Old Ones is to rise, and its servants expect to rule beside their master.'),
 [chamberRising]:scene('The silver top',405,65,
  'The man fits the Karpathos Device into an opening in the wall. Bands of colored light sweep across the room. A silver top hangs in mid-air while his body dissolves into a mass of living flesh. A voice in your head speaks of a pit of ice and a place where every direction is north.',
  'The creature takes the top and assumes the shape of a taller man. You catch two words as the chamber falls quiet: Starkweather-Moore.'),
 429:scene('Movement in the chamber',429,68,'Something is moving beside the wall. You can try to approach quietly enough to see it.'),
 412:scene('The empty recess',412,66,
  'Ghasts bring baskets of food to the mummies. The Karpathos Device remains in the wall beneath an open, empty recess.',
  'In the relief above it, snow falls upon a city of the Old Ones until the streets and their inhabitants disappear under ice. At the end of the relief, a silver top hangs above a globe tilted at an unfamiliar angle.'),
 431:scene('The chamber comes alive',431,68,'Shapes close in from the shadows. You turn toward the way out and find more of them on the steps.'),
 421:scene('Dust on the escape route',421,67,'A blast fills the chamber with dust. You get back to the entrance in the confusion.'),
 422:scene('Running for the opening',422,67,'You run for the steps as the mummies cut off the way back.'),
 407:scene('The figures close in',407,66,'The bullets leave the figures standing. Their hands close around you before you can get back to the corridor.'),
 [chamberScuffle]:scene('Pursued through the passages',405,65,'Footsteps echo behind you. The mummies are gaining as you retrace your way to the entrance.'),
 [chamberLuck]:scene('A hand reaches for you',405,65,'One of the pursuers is close enough to seize you. In the dark, all you have left is a chance.'),
 [chamberEscape]:scene('Quiet on the steps',405,65,'The way back to the entrance is still open.'),
 [chamberEnding]:scene('Caught beneath the pyramid',405,65,'The mummies haul you away from the stairs. You do not return from the depths.'),
 [collapse]:scene('The ceiling falls',405,65,'The chamber disappears behind a wall of falling stone. You make for the entrance.'),
 [shaftEnding]:scene('The panel shuts',437,69,'A stone panel seals the shaft. You hear metal move in all twelve grooves.'),
 [sacEnding]:scene('The basket descends',373,61,'The basket comes down again. The voice will keep demanding that you fill it, until the pile claims you too.'),
 [wormEnding]:scene('Beneath the mass',446,70,'The worms hold you fast. You are pulled under.'),
 [ghastEnding]:scene('The ghast strikes',304,54,'The ghast brings you down before you can escape.'),
 [mirrorGrip]:scene('The mirror holds your gaze',425,68,'The vision grips you. Your fingers are growing stiff around the silver frame.'),
 [mirrorIdentify]:scene('Putting the mirror down',425,68,'You look for a way to put the mirror down without meeting your reflection again.'),
 [mirrorEnding]:scene('Still alive in the dark',425,68,'The mirror still fills your sight. Your body will no longer answer you.'),
 [woundEnding]:scene('Too injured to go on',399,64,'Your injuries catch up with you before you can get to safety.'),
 [madnessEnding]:scene('Lost below the pyramid',425,68,'You lose your grasp of where you are. The dark closes in around you.'),
 [inscriptions]:scene('Details in the stone',443,69,'You gain a foothold on the descent and can look at the stonework as you pass.'),
 [falseClimbLuck]:scene('Falling with the knife',439,69,'One of the handholds crumbles. You fall with the knife still in hand.'),
 [climbAfterDodge]:scene('The wall above the pursuers',422,67,'You slip past the first of the pursuers and reach the handholds. You have just enough time to climb.')
};

const clue = (title,entry,text) => ({title,type:'Pyramid discovery',source:PUZZLE_SCENES[entry].source,text});
export const PUZZLE_CLUES = {
 amarnaMummification:clue('Chemicals at the hidden entrance',377,'The unusual odor in the corridor is from chemicals used for mummification.'),
 amarnaPyramidTraffic:clue('Tracks in the hidden pyramid',349,'The sand beside the steps in section K has been disturbed.'),
 amarnaAtenRites:clue('The One God of Gods',345,'The inscription welcomes the True Servants of Aten to the secret rites of the One God of Gods.'),
 amarnaGhatanothoa:clue('The servants of Ghatanothoa',436,'This inscription greets the servants of Ghatanothoa.'),
 amarnaAxialTilt:clue('The turning Earth',409,'The carved Earth prompted a vision of catastrophic changes to the planet’s axis and climate.'),
 amarnaOldOnesCity:clue('The city under the ice',412,'A relief shows an ancient city buried under ice and a silver top alongside a globe with an unfamiliar tilt. The Karpathos Device remains in the wall, below an empty recess.'),
 amarnaStarkweatherMoore:clue('Starkweather-Moore',chamberRising,'The Karpathos Device opened the chamber wall and a silver top emerged. The creature took the top. It spoke of a pit of ice where every direction is north, and you heard the name Starkweather-Moore.')
};
export const PUZZLE_ENTRY_CLUES = {
 377:'amarnaMummification',349:'amarnaPyramidTraffic',345:'amarnaAtenRites',436:'amarnaGhatanothoa',
 409:'amarnaAxialTilt',412:'amarnaOldOnesCity',[chamberRising]:'amarnaStarkweatherMoore'
};
export const PUZZLE_ENDINGS = new Set([407,chamberEnding,shaftEnding,sacEnding,wormEnding,ghastEnding,mirrorEnding,woundEnding,madnessEnding]);
export const PUZZLE_FLAGS = ['pyramidChamberSealed','pyramidMetStairGhast','pyramidSensedRites'];

const has = item=>s=>s.inventory.includes(item);
const rope = has('Rope');
const knife = s=>s.inventory.includes('Hunting knife');
const gun = has('Revolver');
const dynamite = has('Dynamite');
const nodens = s=>s.sanity>0&&['Amulet of Nodens','Amulet of Nodens (charged)'].some(item=>s.inventory.includes(item));
const choice = (id,label,target,other={})=>({id:`pyramid-${id}`,label,target,duration:0,...other});
const move = (id,label,target)=>choice(id,label,target,{duration:0.5});
const retreat = move('surface','Climb back to the opening',382);
const towardEntrance = move('back-to-slope','Retrace your steps to the entrance',399);
const chamberDate = s=>s.time<Date.UTC(1931,10,21);

export const PUZZLE_CHOICES = {
 382:[move('descend','Descend the sloping passage',399),
  choice('supplies','Go back to the village for supplies',324,{duration:1,when:s=>!has('Flashlight')(s)}),
  choice('emerge','Leave the pyramid',360)],
 377:[choice('odor-return','Return to the entrance',382)],
 399:[choice('pit-cross','Approach the stairs across the shaft',332),move('handholds','Climb down the handholds',352),retreat],
 352:[move('handholds-back','Climb back up',399),move('handholds-drop','Drop to the bottom',307)],
 305:[move('stairs-up','Continue up the stairs',313)],
 349:[choice('tracks-back','Continue reading the wall',305)],
 313:[move('junction-west','Take the passage west',371),move('junction-up','Climb the stairs',393),move('junction-east','Take the stairs down east',399)],
 307:[move('d-west','Take the west corridor',395),move('d-down','Take the stairs down',303)],
 395:[move('d-east','Go down the east corridor',303)],
 303:[move('shaft-back','Climb back to section D',307),choice('shaft-rope','Lower yourself on your rope',351,{when:rope})],
 348:[move('wait-at-shaft','Stay and watch the creature',355),move('dead-end-down','Try to climb down the shaft',369)],
 355:[choice('hooks-fire','Reach for your revolver',158,{when:gun}),choice('hooks-fall','Try to pull away from the hooks',369,{effect:'hook-fall',when:s=>!gun(s)})],
 369:[move('bowl-descent','Move into the chamber below',373)],
 373:[choice('bowl-amulet','Use the Amulet of Nodens',324,{when:nodens}),choice('bowl-fill','Fill the basket',sacEnding,{when:s=>!nodens(s)}),
  choice('bowl-refuse','Refuse to fill the basket',sacEnding,{effect:'refuse-basket',when:s=>!nodens(s)})],
 308:[move('a-down','Climb down the handholds',310),move('a-back','Return to the stairs',393)],
 310:[move('i-down','Follow the stairs west',323),move('i-up','Climb the shaft',308)],
 393:[move('a-corridor','Follow the western corridor',308),move('a-shaft','Investigate the angled shaft',400),move('a-junction','Go back down the stairs',313)],
 400:[move('slanted-back','Return to the stairs',393)],
 309:[move('slide-back','Slide back down',393)],
 353:[choice('translate-j','Read the inscriptions',345,{when:s=>(s.allocation['Language (Hieroglyphics)']||0)+50>1})],
 345:[choice('translation-back','Continue to the shaft',353)],
 366:[move('grapple-down','Climb down using the handholds',395)],
 323:[move('j-up','Go up the notched shaft',308),move('j-down','Follow the stairs down',394)],
 394:[move('j-back','Go back up the stairs',323),choice('j-rope','Lower yourself into the shaft on your rope',325,{when:rope})],
 325:[move('mosaic-back','Return up the rope',394),move('mosaic-side','Swing into the side passage',388),move('mosaic-down','Continue down the rope',398)],
 388:[move('side-forward','Follow the passage to section K',327)],
 327:[move('k-back','Climb back to section J',323)],
 329:[move('slope-down','Descend the slope carefully',443)],
 333:[choice('fall-continue','Gather your gear and stand',329)],
 398:[move('n-down','Follow the stairs down',328)],
 328:[move('n-east','Climb down the handholds east',358),move('n-west','Return up the stairs',398)],
 358:[move('e-up','Climb the shaft',328),move('e-west','Follow the passage west',367)],
 367:[move('c-down','Descend the shaft',391),move('c-back','Go back down the stairs',358)],
 392:[choice('listen-back','Step back from the shaft',367)],
 391:[move('c-stairs','Follow the stairs down',368),move('c-up','Climb back up to the corridor',367)],
 368:[move('h-ornate','Continue down the ornate steps',446),move('h-back','Return to the staircase',391)],
  [inscriptions]:[move('markings-down','Finish descending',441)],
 413:[move('rail-down','Use the handrails to continue down',441)],
 434:[move('sculpture-down','Continue past the sculpture',441)],
 436:[move('writing-down','Continue past the inscription',441)],
 406:[move('m-follow','Follow the corridor east',420)],
 439:[move('limestone-east','Follow the corridor east',420)],
 420:[move('continue-east','Continue east',428)],
 428:[move('shaft-drop','Drop into the shallow shaft',437),move('shaft-watch','Stand back and watch for movement',430)],
 347:[choice('door-back','Look down into the shaft again',428)],
 417:[move('blood-east','Head east',416),move('blood-west','Head west',441)],
 416:[move('g-down','Follow the passage down',438),move('g-west','Head west',417)],
 438:[move('f-back','Return to section G',416)],
 403:[move('thin-wall-back','Go back along the corridor',438)],
 435:[move('break-onward','Go through the opening',440)],
 440:[move('m-west','Return toward section O',419)],
 401:[move('opening-east','Follow the corridor east',416),move('opening-west','Return toward section O',419)],
 442:[move('o-shaft','Climb down the shaft',419),move('o-jump','Jump over the shaft to the west',224),move('o-east','Go east to section M',441)],
 224:[move('upper-west','Go west',415),move('upper-east','Go east',442),move('upper-down','Climb down the shaft',419)],
 415:[move('b-west','Go west to section P',423),move('b-east','Take the eastern corridor',224)],
 423:[move('p-down','Climb down the shaft',426),move('p-east','Go east',415),move('p-glint','Cross the shaft to inspect the glint',425)],
 426:[choice('crypt-leave','Climb up to the corridor',423,{duration:0.5,effect:'crypt-leave'})],
 409:[choice('vision-return','Step away from the carving',426)],
 419:[choice('o-carving','Look closely at the carvings',411),move('o-climb','Approach the shaft',404),
  move('o-chamber','Approach the chamber to the west',418),move('o-corridor','Follow the corridor east',440)],
 404:[move('long-climb-back','Return to the corridor',419)],
 411:[choice('carvings-back','Return to the corridor',419)],
 418:[choice('watch-chamber','Descend quietly and watch',405,{when:s=>chamberDate(s)&&!s.flags.pyramidChamberSealed}),
  choice('approach-chamber','Try to get closer',429,{when:s=>!chamberDate(s)&&!s.flags.pyramidChamberSealed}),
  move('chamber-back','Return to the corridor',419)],
  [chamberEscape]:[towardEntrance],
  [collapse]:[towardEntrance],
  421:[towardEntrance],
  431:[choice('attack-fire','Fire at the figures',407,{when:gun}),choice('attack-flee','Run for the entrance',422),
  choice('attack-dynamite','Throw the dynamite',421,{effect:'consume-dynamite',when:dynamite})]
};

const check = (entry,skill,label,successEntry,failureEntry,other={})=>({entry,skill,label,successEntry,failureEntry,duration:0,...other});
const result = (kind,properties={})=>({kind,...properties});
const damage = (sides,target)=>result('damage',{sides,target});
const sanity = (target,loss)=>result('sanity',{target,loss});
const halfHour = {duration:0.5};
const sanityReady = (s,id)=>Boolean(s.attempts[`pyramid-${id}`]);
const ritesReady = s=>s.flags.pyramidSensedRites===true;
const ghastReady = s=>s.pyramid?.ghastReady===true;
const wormPull = (entry,label,failed,penaltyDice)=>check(entry,'STR',label,391,failed,{penaltyDice,bonusDie:knife});
const wormTight = 'pyramid-worm-tight';
const wormLast = 'pyramid-worm-last';
const slipperyClimb = 'pyramid-slippery-climb';
Object.assign(PUZZLE_SCENES,{
 [wormTight]:scene('The worms tighten their grip',446,70,'The mass closes across your legs. You have less room to pull free.'),
 [wormLast]:scene('Almost under',446,70,'The worms have nearly pulled you off your feet. There is one more chance to wrench loose.'),
 [slipperyClimb]:scene('Holding on to the stone',371,60,'You catch hold of the wall. The stone is still slick, but the path back is within reach.')
});

const checks = {
 odor:check(382,'History','Identify the smell',377,382,{when:s=>!s.attempts['pyramid-odor']}),
 'pit-jump':check(332,'Jump','Jump the shaft',305,307,{...halfHour,failureEffect:damage(3,307)}),
 'rites-sanity':check(305,'Sanity','Take in the drawings',305,305,{
  when:s=>!ritesReady(s),successEffect:result('rites-sanity'),failureEffect:result('rites-sanity',{loss:[1,3]})
 }),
 tracks:check(305,'Spot Hidden','Look for signs of traffic',349,305,{when:s=>ritesReady(s)&&!s.attempts['pyramid-tracks']}),
 'deep-jump':check(303,'Jump','Leap to the far side',348,369,{...halfHour,failureEffect:damage(4,369)}),
 'deep-drop':check(303,'Jump','Jump down the shaft',369,369,{...halfHour,when:s=>!rope(s),failureEffect:damage(4,369)}),
 'rope-grip':check(351,'STR','Hold on to the rope',303,373,{...halfHour}),
 'ledge-sanity':check(348,'Sanity','Look at the creature',348,348,{when:s=>!sanityReady(s,'ledge-sanity'),failureEffect:sanity(348,[1,6])}),
 'hook-shot':check(158,'Firearms (Handgun)','Fire at the nearest creature',303,369,{
  when:gun,successEffect:result('hook-shot'),failureEffect:damage(4,369)
 }),
 'bowl-sanity':check(373,'Sanity','Face what is in the chamber',373,373,{
  when:s=>!sanityReady(s,'bowl-sanity'),successEffect:sanity(373,1),failureEffect:sanity(373,[1,3])
 }),
 'slanted-climb':check(400,'Climb','Climb to the top',309,400,{...halfHour,failureEffect:damage(3,400)}),
 'slippery-dex':check(371,'DEX','Catch hold before you slip',slipperyClimb,353,{failureEffect:damage(3,353)}),
 'slippery-climb':check(slipperyClimb,'Climb','Climb back to the junction',313,353,{...halfHour,failureEffect:damage(3,353)}),
 'lower-shaft':check(353,'INT','Look for a way to secure the descent',366,395,{...halfHour}),
 grapple:check(366,'Throw','Try an improvised grapple',353,395,{...halfHour,when:s=>rope(s)&&knife(s),failureEffect:damage(3,395)}),
 'j-jump':check(394,'Jump','Jump down into the shaft',398,398,{...halfHour,failureEffect:damage(3,398)}),
 'climb-notches':check(327,'Climb','Climb down the handholds',329,333,{...halfHour,failureEffect:damage(3,333)}),
 'slope-up':check(329,'Climb','Climb back up the slope',327,443,{...halfHour}),
 'n-climb':check(398,'Climb','Climb up to the upper corridor',394,398,{...halfHour}),
 'stair-sanity':check(354,'Sanity','Face the creature on the steps',354,354,{
  when:s=>!ghastReady(s),successEffect:result('ghast-ready'),failureEffect:result('ghast-ready',{loss:[1,6]})
 }),
 'shaft-listen':check(367,'Listen','Listen near the shaft',392,367,{when:s=>!sanityReady(s,'shaft-listen')}),
 'worm-dodge':check(446,'Dodge','Leap back from the worms',391,'pyramid-worm-first'),
 'worm-first':wormPull('pyramid-worm-first','Pull free',wormTight,0),
 'worm-tight':wormPull(wormTight,'Wrench your legs free',wormLast,1),
 'worm-last':wormPull(wormLast,'Make one last attempt to break free',wormEnding,2),
 'slope-grip':check(443,'STR','Hold on as you descend',inscriptions,406,{...halfHour}),
 'carving-mythos':check(inscriptions,'Cthulhu Mythos','Consider the monstrous carving',434,441),
 'carving-history':check(inscriptions,'History','Look for the meaning of the inscription',436,441),
 'carving-spot':check(inscriptions,'Spot Hidden','Look for details along the descent',413,441),
 'm-int':check(406,'INT','Look for a way back up',439,420),
 'limestone-climb':check(439,'STR','Cut handholds and climb',441,falseClimbLuck,{...halfHour,when:knife}),
 'knife-luck':check(falseClimbLuck,'Luck','Try to keep your grip on the knife',406,406,{failureEffect:result('break-knife',{target:406})}),
 'shaft-int':check(428,'INT','Look for signs of a hidden passage',347,428,{when:s=>!sanityReady(s,'shaft-int')}),
 'watch-sanity':check(430,'Sanity','Face the creature',430,430,{
  when:s=>!ghastReady(s),successEffect:result('ghast-ready'),failureEffect:result('ghast-ready',{loss:[1,6]})
 }),
 'escape-shaft-jump':check(437,'Jump','Jump out of the shaft',428,shaftEnding),
 'escape-shaft-climb':check(437,'Climb','Climb out of the shaft',428,shaftEnding),
 'm-jump-east':check(441,'Jump','Jump east across the gap',417,406,halfHour),
 'm-jump-west':check(441,'Jump','Jump west across the gap',442,406,halfHour),
 'f-wall-int':check(438,'INT','Examine the stonework',403,438,{...halfHour,when:s=>!sanityReady(s,'f-wall-int')}),
 'f-wall-str':check(403,'STR','Push on the wall',435,403,halfHour),
 'm-wall-str':check(440,'STR','Try to break through the wall',401,440,halfHour),
 'mirror-sanity':check(425,'Sanity','Face the reflection',mirrorGrip,423,{
  successEffect:result('mirror-sanity',{loss:[1,10]}),failureEffect:sanity(423,[1,100])
 }),
 'mirror-will':check(mirrorGrip,'POW','Fight the mirror’s pull',mirrorIdentify,mirrorIdentify,{
  failureEffect:result('mirror-will')
 }),
 'mirror-know':check(mirrorIdentify,'EDU','Work out how to put the mirror down',423,mirrorGrip),
 'mirror-mythos':check(mirrorIdentify,'Cthulhu Mythos','Recall occult uses of mirrors',423,mirrorGrip),
 'crypt-astronomy':check(426,'Science (Astronomy)','Study the orientation of the Earth',409,426,{...halfHour,when:s=>!sanityReady(s,'crypt-astronomy')}),
 'crypt-sanity':check(402,'Sanity','Face the creature in the crypt',402,402,{
  when:s=>!ghastReady(s),successEffect:result('ghast-ready'),failureEffect:result('ghast-ready',{loss:[1,6]})
 }),
 'crypt-dodge':check(402,'Dodge','Evade the creature',423,402,{when:ghastReady,failureEffect:result('ghast-turn')}),
 'o-climb':check(404,'Climb','Climb up the shaft',224,404,{...halfHour,failureEffect:damage(3,404)}),
 'ceremony-sanity':check(405,'Sanity','Take in the ceremony',chamberRising,chamberRising,{
  successEffect:sanity(chamberRising,1),failureEffect:sanity(chamberRising,[1,6])
 }),
 'rising-sanity':check(chamberRising,'Sanity','Hold your nerve',chamberEscape,chamberScuffle,{
  successEffect:sanity(chamberEscape,[1,6]),failureEffect:result('pursuit',{loss:[1,20]})
 }),
 'late-approach':check(429,'Stealth','Approach quietly',412,431),
 'late-sanity':check(412,'Sanity','Face the scene in the chamber',412,412,{
  when:s=>!s.pyramid?.observedLateChamber,
  successEffect:result('late-sanity',{loss:1}),failureEffect:result('late-sanity',{loss:[1,6]})
 }),
 'late-escape':check(412,'Stealth','Slip away before anything notices you',399,chamberScuffle,{
  when:s=>s.pyramid?.observedLateChamber===true,failureEffect:result('pursuit')
 }),
 'flee-dodge':check(422,'Dodge','Dodge the grasping hands',climbAfterDodge,chamberEnding),
 'flee-climb':check(climbAfterDodge,'Climb','Climb to the opening',399,chamberEnding),
 'pursuit-dodge':check(chamberScuffle,'Dodge','Evade a pursuer',chamberScuffle,chamberLuck,{successEffect:result('pursuit-pass')}),
 'pursuit-fight':check(chamberScuffle,'Fighting (Brawl)','Fight off a pursuer',chamberScuffle,chamberLuck,{successEffect:result('pursuit-pass')}),
 'pursuit-luck':check(chamberLuck,'Luck','Try to pull free',399,chamberEnding)
};
PUZZLE_SCENES['pyramid-worm-first']=scene('The mass reaches you',446,70,'The worms have wrapped around your ankles. You try to pull out of their grasp.');

for(const entry of ghastOpponents) {
 for(const attack of [
  {id:'brawl',skill:'Fighting (Brawl)',label:'Fight the creature at close range',sides:3,when:ghastReady},
  {id:'knife',skill:'Fighting (Brawl)',label:'Fight with your knife',sides:6,when:s=>ghastReady(s)&&knife(s)},
  {id:'gun',skill:'Firearms (Handgun)',label:'Fire your revolver',sides:10,when:s=>ghastReady(s)&&gun(s)}
 ]) {
  checks[`ghast-${entry}-${attack.id}`]=check(entry,attack.skill,attack.label,entry,entry,{
   when:attack.when,successEffect:result('ghast-turn',{sides:attack.sides}),failureEffect:result('ghast-turn')
  });
 }
}
for(const entry of [chamberRising,chamberEscape,412]) {
 checks[`dynamite-${entry}`]=check(entry,'Throw','Try to bring down the chamber ceiling',collapse,chamberScuffle,{
  when:s=>dynamite(s)&&(entry!==412||s.pyramid?.observedLateChamber===true),
  successEffect:result('collapse'),failureEffect:result('pursuit',{consumeDynamite:true})
 });
}
checks['dynamite-pursuit']=check(chamberScuffle,'Throw','Try to bring down the chamber ceiling',collapse,chamberScuffle,{
 when:dynamite,successEffect:result('collapse'),failureEffect:result('pursuit',{consumeDynamite:true})
});
export const PUZZLE_CHECKS = Object.fromEntries(Object.entries(checks).map(([id,check])=>[`pyramid-${id}`,check]));

for(const [entry,id] of [[348,'ledge-sanity'],[373,'bowl-sanity']]) {
 for(const action of PUZZLE_CHOICES[entry]) {
  const eligible=action.when;
  action.when=s=>sanityReady(s,id)&&(!eligible||eligible(s));
 }
}
for(const action of PUZZLE_CHOICES[305]) action.when=ritesReady;

function puzzleState(s) { return s.pyramid??={}; }
function takeDamage(s,amount,log) {
 s.hp=Math.max(0,s.hp-amount);
 log(s,`Lost ${amount} health in the pyramid.`);
}
function loseSanity(s,loss,rollDie,log) {
 const amount=Array.isArray(loss)?Array.from({length:loss[0]},()=>rollDie(loss[1])).reduce((sum,n)=>sum+n,0):loss;
 s.sanity=Math.max(0,s.sanity-amount);
 log(s,`Lost ${amount} Sanity in the pyramid.`);
 return amount;
}
function discard(s,item) {
 const index=s.inventory.indexOf(item);
 if(index!==-1) s.inventory.splice(index,1);
}
function finishHazard(s,target,go) {
 go(s,s.sanity===0?madnessEnding:s.hp===0?woundEnding:target);
}
function ghastTurn(s,sides,rollDie,go,log) {
 const state=puzzleState(s);
 if(sides) {
  const damage=Math.max(0,rollDie(sides)-3);
  state.ghastDamage+=damage;
  log(s,`Your attack dealt ${damage} damage after armor.`);
 }
 const [,required,next]=s.entry===354?[354,12,328]:s.entry===402?[402,5,423]:[430,5,442];
 if(state.ghastDamage>=required) {
  if(s.entry===354) s.flags.pyramidMetStairGhast=true;
  go(s,next);
  return;
 }
 for(let i=0;i<2;i++) {
  if(rollDie(100)>45) continue;
  const damage=rollDie(6)+rollDie(6)+rollDie(6);
  takeDamage(s,damage,log);
  if(s.hp===0) {go(s,ghastEnding);return;}
  if(s.entry===430&&damage>=6) {go(s,437);return;}
 }
}
export function puzzleCheckEffect(s,effect,{rollDie,go,log}) {
 if(!effect?.kind) return false;
 const {kind,target,loss,sides}=effect;
 switch(kind) {
  case 'damage':
   takeDamage(s,rollDie(sides),log);
   finishHazard(s,target,go);
   break;
  case 'sanity':
   loseSanity(s,loss,rollDie,log);
   finishHazard(s,target,go);
   break;
  case 'rites-sanity':
   if(loss) loseSanity(s,loss,rollDie,log);
   s.flags.pyramidSensedRites=true;
   finishHazard(s,305,go);
   break;
  case 'late-sanity':
   loseSanity(s,loss,rollDie,log);
   puzzleState(s).observedLateChamber=true;
   finishHazard(s,412,go);
   break;
  case 'hook-shot': {
   const damage=rollDie(10)-3;
   log(s,`The shot dealt ${Math.max(0,damage)} damage after armor.`);
   if(damage<=0) takeDamage(s,rollDie(4),log);
   finishHazard(s,damage>0?303:369,go);
   break;
  }
  case 'break-knife':
   discard(s,'Hunting knife');
   log(s,'Your knife broke in the fall.');
   go(s,target);
   break;
  case 'ghast-ready':
   if(loss) loseSanity(s,loss,rollDie,log);
   if(s.sanity===0) {go(s,madnessEnding);break;}
   puzzleState(s).ghastReady=true;
   if(!gun(s)&&!knife(s)) ghastTurn(s,0,rollDie,go,log);
   break;
  case 'ghast-turn':
   ghastTurn(s,sides,rollDie,go,log);
   break;
  case 'mirror-sanity': {
   const amount=loseSanity(s,loss,rollDie,log);
   finishHazard(s,amount>=5&&rollDie(100)<=70?423:mirrorGrip,go);
   break;
  }
  case 'mirror-will': {
   const state=puzzleState(s);
   state.dexPenalty=(state.dexPenalty??0)+10;
   log(s,'The mirror drained 10 Dexterity.');
   go(s,state.dexPenalty>=60?mirrorEnding:mirrorIdentify);
   break;
  }
  case 'pursuit': {
   if(effect.consumeDynamite) discard(s,'Dynamite');
   if(loss) loseSanity(s,loss,rollDie,log);
   if(s.sanity===0) {go(s,madnessEnding);break;}
   const state=puzzleState(s);
   state.pursuit=rollDie(6);
   log(s,`${state.pursuit} ${state.pursuit===1?'mummy follows':'mummies follow'} you.`);
   go(s,chamberScuffle);
   break;
  }
  case 'pursuit-pass':
   if(--s.pyramid.pursuit===0) go(s,399);
   break;
  case 'collapse':
   discard(s,'Dynamite');
   s.flags.pyramidChamberSealed=true;
   go(s,collapse);
   break;
  default:
   return false;
 }
 return true;
}

export function puzzleChoiceEffect(s,effect,{rollDie,go,log}) {
 switch(effect) {
  case 'hook-fall':
   takeDamage(s,rollDie(4),log);
   finishHazard(s,369,go);
   return true;
  case 'refuse-basket':
   takeDamage(s,rollDie(4),log);
   loseSanity(s,1,rollDie,log);
   finishHazard(s,sacEnding,go);
   return true;
  case 'crypt-leave': {
   const hours=Math.floor((s.time-(s.pyramid?.enteredAt??s.time))/HOUR);
   go(s,rollDie(100)<=hours*5?402:423);
   return true;
  }
  case 'consume-dynamite':
   discard(s,'Dynamite');
   return false;
  default:
   return false;
 }
}

export function puzzleEnter(s,previousEntry,{go}) {
 const current=s.entry;
 if(current===399&&previousEntry===382 || current===373&&previousEntry===447) puzzleState(s).enteredAt=s.time;
 if(current===328 && !s.flags.pyramidMetStairGhast && s.time-(s.pyramid?.enteredAt??s.time)>5*HOUR) {
  go(s,354);
  return;
 }
 if(!s.pyramid&&ghastOpponents.includes(current)) puzzleState(s);
 if(!s.pyramid) return;
 const state=s.pyramid;
 if(current!==412) delete state.observedLateChamber;
 if(current===382||current===324) {
  delete state.enteredAt;
  delete s.flags.pyramidMetStairGhast;
 }
 if(current!==chamberScuffle) delete state.pursuit;
 if(ghastOpponents.includes(current)) {
  if(current!==previousEntry) {
   state.ghastDamage=0;
   state.ghastReady=false;
  }
 } else {
  delete state.ghastDamage;
  delete state.ghastReady;
 }
 if(!Object.keys(state).length) delete s.pyramid;
}

export function puzzleSkillPenalty(s,skill) {
 return skill==='DEX'?(s.pyramid?.dexPenalty||0):0;
}

export function validatePuzzle(s) {
 const state=s.pyramid;
 if(state===undefined) return !ghastOpponents.includes(s.entry)&&s.entry!==chamberScuffle;
 if(!state||typeof state!=='object'||Array.isArray(state)) return false;
 if(state.enteredAt!==undefined&&(!Number.isInteger(state.enteredAt)||state.enteredAt<Date.UTC(1931,8,1)||state.enteredAt>s.time||state.enteredAt%HALF_HOUR!==0||s.location!=='amarna')) return false;
 if(state.dexPenalty!==undefined&&(!Number.isInteger(state.dexPenalty)||state.dexPenalty<10||state.dexPenalty>60||state.dexPenalty%10!==0)) return false;
 if(state.observedLateChamber!==undefined&&(s.entry!==412||state.observedLateChamber!==true)) return false;
 if(s.entry===chamberScuffle) {
  if(!Number.isInteger(state.pursuit)||state.pursuit<1||state.pursuit>6) return false;
 } else if(state.pursuit!==undefined) return false;
 if(ghastOpponents.includes(s.entry)) {
  if(!Number.isInteger(state.ghastDamage)||state.ghastDamage<0||state.ghastDamage>=12||typeof state.ghastReady!=='boolean') return false;
 } else if(state.ghastDamage!==undefined||state.ghastReady!==undefined) return false;
 return Object.keys(state).every(key=>['enteredAt','dexPenalty','observedLateChamber','pursuit','ghastDamage','ghastReady'].includes(key));
}
