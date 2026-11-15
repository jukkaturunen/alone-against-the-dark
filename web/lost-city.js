import { INVESTIGATORS, ORDER } from './investigators.js';

const city='City of the Old Ones';
const roseAmulet='Rose-colored amulet';
const nodensAmulets=['Amulet of Nodens','Amulet of Nodens (charged)'];

function scene(title,entry,page,...paragraphs) {
 return {title,eyebrow:city,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const LC_SCENES={
 410:scene('The amulet answers',410,66,
  'At your touch, a barrel-shaped creature materializes in the sanctuary. A distorted starfish opens where its head ought to be. It advances.'),
 432:scene('An unlikely ally',432,68,
  'You tell the creature about the stolen Karpathos Device and what will happen if the Earth turns. It listens. After a long silence, it offers protection against ordinary attackers and passage to any place you name. Its power has limits, and it warns you against shoggoths and gods.'),
 543:scene('The City of the Old Ones',543,82,
  'Jeffries disappears west between the towers. Your boot fits inside one of the prints you saw in the snow, with room to spare.',
  'In the wall beside you, a mosaic shows creatures with tentacles gathered in conversation. Smaller figures play at their feet. For a moment you recognize a scene from any city street.'),
 545:scene('The servants turn',545,83,
  'In the temple mosaic, the creatures that built the city fall under a tide of their former servants. A few seem to rise into the stars. You find yourself wondering how many escaped.'),
 546:scene('A pit in the street',546,83,
  'A wide pit interrupts the road. Its sides are steep, though there are enough seams in the stone to climb into it.'),
 547:scene('Tracks in the ice',547,83,
  'Something has disturbed the ice on the street. A mosaic shows the barrel-shaped figures leading gelatinous masses by their sides. The scene could be a procession of workers or cattle.'),
 548:scene('The builders descend',548,83,
  'An immense mosaic follows you around the corner. Specks descend from the stars, growing into barrels with clusters of tentacles. In the final panel they lay out the city.'),
 549:scene('The war mosaic',549,84,
  'Something moves to the west. You barely make out the scene on the wall as you pass it. The servants have grown larger and more grotesque. They turn on their masters, and an army has come to meet them.'),
 551:scene('Flight to the sea',551,84,
  'You reach an avenue between cyclopean buildings. On one wall, the city’s builders flee into the sea with their tentacles flailing. The wind gives voice to their panic.'),
 552:scene('Beside the domed building',552,84,
  'Through a break in the snow you see a figure run into the alley beside the dome, heading south. Its gait is wrong for Jeffries.'),
 553:scene('The temple path',553,84,
  'A long path leads to a building shaped like a temple. There is an open doorway, with the edge of a mosaic just inside.'),
 555:scene('Eight passages',555,84,
  'A hundred feet below the street, the air is warmer. A faint light reaches an intersection where eight corridors lead in the directions of the compass. The still air smells of rot.'),
 556:scene('A wider shaft',556,85,
  'The north passage brings you to the lip of a second pit. It is much larger than the one you climbed down.'),
 557:scene('Citizens frozen in place',557,85,
  'The city’s former citizens stand frozen in the corridor. You recognize the proportions of the creatures in the mosaics as you pass close enough to touch one.'),
 558:scene('Figures beneath the ice',558,85,
  'The barrel-shaped creatures lie in ranks below thick ice. You pass them and turn a corner, only to find your own footprints on the floor.'),
 559:scene('An ancient rockfall',559,85,
  'A ruin of stone bars the way. Ice has set the fallen blocks in place. Your tracks lead back to the intersection.'),
 560:scene('The figure in the alley',560,85,
  'The figure runs south, then turns a corner. You catch a glimpse of movement toward the northeast. Beside you, a frieze shows two species at war with a savagery you have never seen depicted.'),
 562:scene('Devices behind the rubble',562,85,
  'Your flashlight picks out strange instruments past a partial collapse. There is just enough room to crawl through. A few loose slabs carry the weight of the ceiling.'),
 563:scene('Machinery on ice',563,85,
  'Beyond the ice you see the outlines of machines you cannot identify. Your light reaches them, but your tools will never cut through in time. You mark where you found them.'),
 564:scene('A sound in the passage',564,86,
  'A sound comes from beyond the bend. You follow it until this passage joins a broader corridor.'),
 565:scene('What Jeffries becomes',565,86,
  'At the center of the cavern, Jeffries approaches a pedestal and calls out a name. Ghatanothoa. His skin shrivels in ripples. As it falls away, eyes open across the mass beneath it.'),
 566:scene('The creature has the Top',566,86,
  'A mass of bubbles and eyes crouches at a pedestal in the vaulted cavern. A slimy appendage turns the crystal Top. You can still reach it from here.'),
 567:scene('The Top clicks into place',567,86,
  'The creature lowers the Top into the pedestal. You hear a click, then a series of whistles that sound like laughter. It is too late to stop the ritual with dynamite.'),
 568:scene('The rose-colored amulet',568,86,
  'At the end of the path is a small sanctuary. A smooth depression in the stone is just wide enough for the rose-colored amulet.'),
 569:scene('The crystal shatters',569,86,
  'The blast reduces the Top to splinters. As the roof gives way, your limbs stiffen from a last glimpse of Ghatanothoa. Somehow you stumble out of the cavern and reach the Dornier.',
  'Back in New England, the doctors call it Dementia Antarctica. After your release, you say little about the city. You know what went to pieces beneath the ice and what would have happened if it had spun.'),
 570:scene('The open slab',570,86,
  'A massive slab has been moved aside. The pictures around it show ice coming down on the city as the old inhabitants flee. Some figures freeze where they stand. The opening leads down into darkness.'),
 571:scene('The Top is destroyed',571,88,
  'The creatures you called engage the shoggoths. Many fall, but one reaches the pedestal and breaks the Top before the ritual can turn the world.',
  'You slip away in the fighting and make it back to the Dornier. Back in New England, the doctors call it Dementia Antarctica. After your release, you keep what happened in the cavern to yourself.'),
 572:scene('A battle beneath the city',572,88,
  'The amulet burns in your hand. Creatures appear one after another. A shrill call brings living masses pouring out of the corridors. Their battle closes around the pedestal.'),
 573:scene('Ghatanothoa turns',573,88,
  'You face a mass of waving limbs and mouths. Ghatanothoa turns toward you, and your muscles harden. The shoggoths are already closing in.'),
 575:scene('The works of the city',575,88,
  'The mosaics on these buildings show the sciences of the city’s rulers and the labor of the formless servants. A narrow path branches away between two buildings.'),
 580:scene('Down into the cavern',580,89,
  'The descent is too steep to walk. To get down quietly you must lower yourself over the rim, then jump the final gap.'),
 592:scene('The world outlives you',592,90,
  'The amulet brings allies into the cavern. The fighting destroys the Top and brings the roof down over you. In the last moments before it falls, you see the crystal break.'),
 'lost-city-amulet-dodge':scene('The Old One approaches',410,66,
  'The creature has closed half the distance between you. You have room for one quick move toward the door.'),
 'lost-city-descent-luck':scene('A quiet landing',580,89,
  'You land quietly at the bottom. You can hear something moving in the cavern ahead.'),
 'lost-city-descent-know':scene('The last approach',580,89,
  'You study the shape of the passage and try to work out the shortest way into the chamber.'),
 'lost-city-find-cover':scene('A pillar within reach',565,86,
  'A stone pillar stands close enough to shield you. You have a moment to duck behind it.'),
 'lost-city-vision-covered':scene('A glimpse from cover',565,86,
  'In the instant before you are fully behind the pillar, you see something taking shape over the pedestal. Ghatanothoa has answered Jeffries.'),
 'lost-city-vision-open':scene('The god in the cavern',565,86,
  'You are still in the open when Ghatanothoa appears above the pedestal. Your eyes fix on the mass of openings, limbs, and shifting organs.'),
 'lost-city-exposed':scene('Your limbs begin to stiffen',565,86,
  'In Ghatanothoa’s sight, you feel your muscles begin to lock. You strain to keep moving.'),
 'lost-city-retry-cover':scene('Another chance at cover',565,86,
  'The pillar is still close. Each moment you spend under the god’s gaze makes the next step harder.'),
 'lost-city-behind-pillar':scene('Behind the pillar',565,86,
  'The stone shields you from the god’s gaze. You have a chance to interfere before the Top begins to spin.'),
 'lost-city-at-the-pedestal':scene('Close enough to act',566,86,
  'The creature is still examining the Top. There is time to act before it sets the crystal in place.'),
 'lost-city-throw-missed':scene('The blast misses',566,86,
  'The shock runs through the cavern. When the debris clears, you see the crystal is still whole.'),
 'lost-city-too-late':scene('The ritual is in motion',567,86,
  'The Top is already seated. The pedestal begins to hum.'),
 'lost-city-last-chance':scene('One last movement',573,88,
  'Your legs will no longer move. Your hand is still free for a moment as the creatures close around you.'),
 'lost-city-sealed':scene('The corridor collapses',562,85,
  'You crawl past the fallen stone and hear a chuckle behind you. Jeffries brings down the passage before you can get back to it. Much later, the ground moves beneath you. You never learn what caused it.'),
 'lost-city-petrified':scene('Petrified in the cavern',565,86,
  'Under the god’s gaze, the last movement goes out of your body. You stand like stone while the creature tends the Top.'),
 'lost-city-engulfed':scene('The shoggoths reach you',573,88,
  'You can no longer move. The creatures sweep over you, and under the noise you can still hear the crystal turn.'),
 'lost-city-madness':scene('Lost beneath the ice',565,86,
  'The sight breaks your hold on the world. The cavern and the reason you entered it slip from your mind as the ritual continues.'),
};

export const LC_VICTORIES=new Set([569,571,592]);
export const LC_ENDINGS=new Set([
 ...LC_VICTORIES,'lost-city-sealed','lost-city-petrified','lost-city-engulfed','lost-city-madness',
]);
export const LC_FLAGS=['lostCityDescentLuck'];

export const LC_CLUES={
 lostCityMap:{
  title:'Map of the City of the Old Ones',type:'Route sketch',source:'Entry 543 · p. 83',
  text:'The drawing shows the streets around the city entrance. Follow the paths described at each stop.',
  image:'assets/lost-city-map.png',alt:'A schematic of the streets, temples, and walled lanes near the entrance to the City of the Old Ones.',
 },
 lostCityPassages:{
  title:'Map of the eight-way intersection',type:'Route sketch',source:'Entry 555 · p. 85',
  text:'Eight corridors radiate from the intersection. The passage to the southwest leads toward the sound in entry 564, as listed in the text.',
  image:'assets/lost-city-passages.png',alt:'A compass layout showing eight corridors branching from the underground intersection.',
 },
 lostCityAlly:{
  title:'The Old One’s offer',type:'Expedition observation',source:LC_SCENES[432].source,
  text:'The being offers protection from ordinary attackers and can carry you through space. Even it cannot defend you against a shoggoth or a god.',
 },
 lostCityDevices:{
  title:'Machinery under the ice',type:'Expedition observation',source:LC_SCENES[563].source,
  text:'Strange scientific apparatus lies beneath the ice at the northwest end of the underground intersection.',
 },
};

export const LC_ENTRY_CLUES={432:'lostCityAlly',543:'lostCityMap',555:'lostCityPassages',563:'lostCityDevices'};

function choice(id,label,target,extra={}) {
 return {id:`lost-city-${id}`,label,target,duration:0,...extra};
}

function check(entry,skill,label,successEntry,failureEntry,extra={}) {
 return {entry,skill,label,successEntry,failureEntry,duration:0,...extra};
}

const passages=[
 ['north','North',556],['northeast','Northeast',557],['east','East',558],['southeast','Southeast',559],
 ['south','South',559],['southwest','Southwest',564],['west','West',562],['northwest','Northwest',563],
];

const hasDynamite=s=>s.inventory.includes('Dynamite');
const hasRose=s=>s.inventory.includes(roseAmulet);
const hasNodens=s=>nodensAmulets.some(item=>s.inventory.includes(item));
const hasAmulet=s=>hasRose(s)||hasNodens(s);
const amuletChoice=(id,label,target,when,item)=>choice(id,label,target,{
 when,effect:{type:'lost-city-amulet',item,target},
});
const abandonRitual=choice('abandon-ritual','Retreat from the cavern',574);
const useRoseEarly=amuletChoice('use-rose-before-spin','Call for aid with the rose-colored amulet',571,hasRose,roseAmulet);

export const LC_CHOICES={
 432:[choice('leave-new-ally','Return to the street',549)],
 543:[choice('city-streets','Look at the streets',547),choice('city-north','Head north',551),choice('city-buildings','Look at the buildings',575)],
 545:[choice('leave-temple','Return to the temple path',553)],
 546:[choice('descend-street-pit','Climb down into the pit',555),choice('leave-pit','Return to the streets',547),choice('pit-west','Go west',548)],
 547:[choice('carry-on','Continue along the road',546)],
 548:[choice('west-mosaics','Look for more mosaics',547),choice('west-streets','Explore the streets',546),choice('west-north','Head north',551)],
 549:[choice('war-west','Follow the movement west',552),choice('war-south','Go south',551)],
 551:[choice('avenue-streets','Wander the streets',548),choice('avenue-west','Head west',549)],
 552:[choice('dome-south','Follow the figure south',560),choice('dome-east','Head east',549)],
 553:[choice('enter-temple','Look inside the temple',545),choice('back-to-buildings','Continue past the temple',575)],
 555:[
  ...passages.map(([id,label,target])=>choice(`passage-${id}`,label,target)),
  choice('random-passage','Roll 1D8 for a direction',null,{effect:{type:'lost-city-random-passage'}}),
 ],
 556:[choice('approach-shaft','Approach the lower opening',570)],
 559:[choice('leave-rockfall','Return to the intersection',555)],
 560:[choice('trail-figure','Follow the figure',570),choice('leave-alley','Return to the domed building',552)],
 562:[choice('crawl-to-devices','Crawl through to the instruments','lost-city-sealed'),choice('leave-devices','Leave the instruments and continue',559)],
 563:[choice('leave-ice-machines','Return to the intersection',555)],
 564:[choice('follow-sound','Follow the sound into the next passage',562)],
 568:[
  choice('touch-rose-amulet','Touch the rose-colored amulet',410,{when:s=>!s.visited.includes(410)}),
  choice('sanctuary-west','Go west',549),choice('leave-sanctuary','Return to the buildings',575),
 ],
 570:[choice('enter-lower-opening','Look down into the opening',580)],
 572:[choice('get-clear-of-battle','Move away from the fighting',571)],
 575:[choice('other-mosaics','Look at the other mosaics',549),choice('follow-sanctuary-path','Follow the narrow path',568),choice('search-buildings','Search around the buildings',553)],
 'lost-city-behind-pillar':[
  choice('throw-from-cover','Throw dynamite at the creature',569,{when:hasDynamite,effect:{type:'lost-city-dynamite',target:569}}),
  useRoseEarly,
  amuletChoice('use-nodens-from-cover','Call for aid with the Amulet of Nodens',571,hasNodens),
  choice('leave-cover','Try to reach the pedestal without those tools',573),
 ],
 'lost-city-at-the-pedestal':[useRoseEarly,{...abandonRitual,when:s=>!hasDynamite(s)&&!hasRose(s)}],
 'lost-city-throw-missed':[useRoseEarly,{...abandonRitual,when:s=>!hasRose(s)}],
 'lost-city-too-late':[
  amuletChoice('use-rose-during-ritual','Use the rose-colored amulet',572,hasRose,roseAmulet),
  amuletChoice('use-nodens-during-ritual','Use the Amulet of Nodens',572,hasNodens),
  {...abandonRitual,when:s=>!hasAmulet(s)},
 ],
 'lost-city-last-chance':[
  amuletChoice('use-rose-before-paralysis','Touch the rose-colored amulet',592,hasRose,roseAmulet),
  choice('caught-by-shoggoths','Face the approaching creatures','lost-city-engulfed',{when:s=>!hasRose(s)}),
 ],
};

function sanity(entry,label,onSuccess,onFailure,target,extra={}) {
 const result=dice=>({type:'lost-city-sanity',dice,target});
 return check(entry,'Sanity',label,target,target,{
  successEffect:result(onSuccess),failureEffect:result(onFailure),...extra,
 });
}

export const LC_CHECKS={
 'lost-city-notice-tracks':check(547,'Spot Hidden','Look for a trail in the ice',560,546,{
  when:s=>!s.attempts['lost-city-notice-tracks'],
 }),
 'lost-city-frozen-citizens':sanity(557,'Steady yourself as you pass the frozen figures',0,6,555,{repeat:true}),
 'lost-city-beneath-ice':sanity(558,'Steady yourself at the sight beneath the ice',0,6,555,{repeat:true}),
 'lost-city-old-one-sanity':sanity(410,'Take in what the amulet has summoned',0,6,'lost-city-amulet-dodge'),
 'lost-city-old-one-dodge':check('lost-city-amulet-dodge','Dodge','Dodge past the creature',568,432),
 'lost-city-quiet-descent':check(580,'Climb','Climb and jump down quietly','lost-city-descent-luck',573,{combinedSkill:'Jump'}),
 'lost-city-descent-luck':check('lost-city-descent-luck','Luck','See whether the creature’s attention is elsewhere','lost-city-descent-know','lost-city-descent-know',{successFlag:'lostCityDescentLuck'}),
 'lost-city-descent-know':check('lost-city-descent-know','EDU','Work out the best approach to the chamber',565,566,{
  successEffect:{type:'lost-city-approach',know:true},
  failureEffect:{type:'lost-city-approach',know:false},
 }),
 'lost-city-jeffries-sanity':sanity(565,'Endure the sight of Jeffries changing',6,20,'lost-city-find-cover'),
 'lost-city-cover-luck':check('lost-city-find-cover','Luck','Duck behind the pillar','lost-city-vision-covered','lost-city-vision-open'),
 'lost-city-covered-sanity':sanity('lost-city-vision-covered','Face the sight of Ghatanothoa',10,100,'lost-city-behind-pillar'),
 'lost-city-open-sanity':sanity('lost-city-vision-open','Face the sight of Ghatanothoa',10,100,'lost-city-exposed'),
 'lost-city-exposure-con':check('lost-city-exposed','CON','Fight the creeping paralysis','lost-city-retry-cover','lost-city-retry-cover',{
  repeat:true,failureEffect:{type:'lost-city-paralysis'},
 }),
 'lost-city-retry-cover-luck':check('lost-city-retry-cover','Luck','Try again to reach the pillar','lost-city-behind-pillar','lost-city-exposed',{repeat:true}),
 'lost-city-early-sanity':sanity(566,'Endure the sight of the creature',6,20,'lost-city-at-the-pedestal'),
 'lost-city-pedestal-throw':check('lost-city-at-the-pedestal','Throw','Throw dynamite at the creature',569,'lost-city-throw-missed',{
  when:hasDynamite,
  successEffect:{type:'lost-city-dynamite',target:569},
  failureEffect:{type:'lost-city-dynamite',target:'lost-city-throw-missed'},
 }),
 'lost-city-late-sanity':sanity(567,'Endure the sight of the creature setting the Top',6,20,'lost-city-too-late'),
 'lost-city-final-sanity':sanity(573,'Face Ghatanothoa at close range',10,100,'lost-city-last-chance'),
};

function removeItem(s,item) {
 const index=s.inventory.indexOf(item);
 if(index>=0) s.inventory.splice(index,1);
}

export function lostCityDexPenalty(s,skill) {
 return skill==='DEX'?(s.lostCityDexLoss||0):0;
}

function loseDex(s,{rollDie,log}) {
 const amount=rollDie(10)+rollDie(10)+rollDie(10);
 const previous=s.lostCityDexLoss||0;
 s.lostCityDexLoss=Math.min(originalDex(s),previous+amount);
 log(s,`Ghatanothoa’s gaze cost you ${s.lostCityDexLoss-previous} DEX.`);
 return s.lostCityDexLoss;
}

function originalDex(s) {
 return INVESTIGATORS[s.investigator??ORDER[0]].characteristics.DEX;
}

export function lostCityEnter(s,previousEntry,ctx) {
 if(s.entry===410&&!s.inventory.includes(roseAmulet)) {
  s.inventory.push(roseAmulet);
  ctx.log(s,'Took the rose-colored amulet from the sanctuary.');
 }
 if(s.entry===580&&previousEntry===570&&s.flags.antarcticJones) {
  ctx.log(s,'Paddy Jones stops at the rim. You go on alone.');
 }
 if(s.entry===569&&previousEntry!==569) loseDex(s,ctx);
}

export function lostCityChoiceEffect(s,effect,{go,rollDie,log}) {
 switch(effect?.type) {
  case 'lost-city-random-passage': {
   const direction=rollDie(8);
   const [,heading,target]=passages[direction-1];
   log(s,`The intersection roll was ${direction}. You head ${heading.toLowerCase()}.`);
   go(s,target);
   return true;
  }
  case 'lost-city-amulet': {
   const item=effect.item||nodensAmulets.find(name=>s.inventory.includes(name));
   removeItem(s,item);
   log(s,`Used the ${item}. It vanished as the summoned creatures appeared.`);
   go(s,effect.target);
   return true;
  }
  case 'lost-city-dynamite':
   removeItem(s,'Dynamite');
   log(s,'Used your dynamite at the pedestal.');
   go(s,effect.target);
   return true;
  default: return false;
 }
}

export function lostCityCheckEffect(s,effect,ctx) {
 const {go,rollDie,log}=ctx;
 switch(effect?.type) {
  case 'lost-city-sanity': {
   const loss=Math.min(s.sanity,effect.dice?rollDie(effect.dice):0);
   s.sanity-=loss;
   log(s,`Lost ${loss} Sanity.`);
   go(s,s.sanity===0?'lost-city-madness':effect.target);
   return true;
  }
  case 'lost-city-approach': {
   const failures=Number(!s.flags.lostCityDescentLuck)+Number(!effect.know);
   go(s,[565,566,567][failures]);
   return true;
  }
  case 'lost-city-paralysis':
   go(s,loseDex(s,ctx)===originalDex(s)?'lost-city-petrified':'lost-city-retry-cover');
   return true;
  default: return lostCityChoiceEffect(s,effect,ctx);
 }
}

export function validateLostCity(s) {
 const loss=s.lostCityDexLoss;
 if(loss===undefined) return s.entry!=='lost-city-petrified'&&s.entry!==569;
 const maxLoss=originalDex(s);
 if(s.location!=='antarctica'||!Number.isInteger(loss)||loss<3||loss>maxLoss) return false;
 if(s.entry==='lost-city-petrified') return loss===maxLoss;
 return loss<maxLoss||s.entry===569;
}
