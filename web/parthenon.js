const parthenon = 'The Parthenon';
const secondGrapple = 'parthenon-grapple';
const grappleEnding = 'parthenon-grapple-ending';
const quietVisit = 'parthenon-quiet';
const firstGrappleSource = 'Entry 27 · p. 14';

export const PAR_RING = 'Gold ring with a flaming star';
export const PAR_LOCATIONS = {
 athensParthenon:{name:parthenon,entry:194,region:'athens',hours:[0,24],description:'Visit the temple above Athens.'}
};
export const PAR_ENTRIES = {athensParthenon:[194,14,18,19,27,secondGrapple,31,grappleEnding,33,quietVisit]};
export const PAR_LOCKED_ENTRIES = new Set([194,14,18,19,27,secondGrapple,33]);
export const PAR_ENDINGS = new Set([31,grappleEnding]);
export const PAR_FLAGS = [];

function scene(title,source,...paragraphs) {
 return {title,eyebrow:parthenon,source,paragraphs,adapted:true};
}

export const PAR_SCENES = {
 194:scene('A scream at the temple','Entry 194 · p. 38',
  'The last sunlight catches the columns as you cross the broken stones into the inner court. You are thinking about Gliere’s death when a scream cuts through the silence. You strain to hear where it came from, but the court has fallen quiet again.'),
 14:scene('Footsteps in the dark','Entry 14 · p. 12',
  'You crouch in the shadows. Slow steps scrape over the stones from several directions. You can’t see the figures’ faces, but the way they move reminds you of the dead. One turns toward you.'),
 18:scene('A stone underfoot','Entry 18 · p. 13',
  'You slip past the first of the searching figures. Then a loose stone skitters across the court. Every head turns toward the sound. The fence is close enough to reach if you move now.'),
 19:scene('A careless whistle','Entry 19 · p. 13',
  'You whistle and amble toward the way out. Figures step from the shadows on either side of you. As they move to cut you off, you see a chance to get over the fence.'),
 27:scene('A hand closes on you',firstGrappleSource,
  'A figure catches hold of you. Its grip tightens as the others close in.'),
 [secondGrapple]:scene('A second grip',firstGrappleSource,
  'Before you can pull free, a second figure seizes you. You have one last chance to wrench yourself loose.'),
 31:scene('Hollow eyes in the dark','Entry 31 · p. 14',
  'The figures close in and seize you. The last thing you see is a face with hollow eyes. Your investigation ends on the hill.'),
 [grappleEnding]:scene('Overwhelmed',firstGrappleSource,
  'A third figure catches you before you can escape. Your screams carry across the court. Your investigation ends on the hill.'),
 33:scene('The man on the road','Entry 33 · pp. 14–15',
  'You run downhill and nearly collide with a white-haired man leaning on a cane. You try to warn him. He answers in English and tells you the stars are keeping the creatures bound to the hill tonight.',
  'He says one of those creatures killed Gliere. While in prison, Gliere had warned that returning the Karpathos Device to its home would end life as we know it. The old man urges you to find the Device in Egypt and either give it back to the sea or destroy it.',
  'He presses a heavy gold ring into your hand. A five-pointed star with a flame at its center is engraved on it. He tells you to use it against the dead brought back to life. When you look up, he has gone. At the foot of the hill, you find a cab to a hotel.'),
 [quietVisit]:scene('An empty court','Entries 194 and 33 · adapted return visit',
  'The court is quiet when you return. You can still make out the road where the old man gave you the ring.')
};

export const PAR_CLUES = {
 parthenonWarning:{
  title:'The warning on the road',
  type:'Athens lead',
  source:PAR_SCENES[33].source,
  text:'The old man says a creature killed Gliere. Gliere warned that if the Karpathos Device returned to its home, life as we know it would end. Find the Device in Egypt and return it to the sea or destroy it. The gold ring is for use against the dead brought back to life.'
 }
};
export const PAR_ENTRY_CLUES = {33:'parthenonWarning'};

const choice = (id,label,target) => ({id,label,target,duration:0});
export const PAR_CHOICES = {
 194:[
  choice('parthenon-hide','Hide in the shadows',14),
  choice('parthenon-sneak','Sneak away',18),
  choice('parthenon-stroll','Stroll away casually',19)
 ],
 14:[
  choice('parthenon-run','Make a run for it',27),
  choice('parthenon-talk','Stand up and try to bluff',31)
 ],
 33:[{...choice('parthenon-rest','Take a cab to the hotel and sleep',101),destination:'athensHotel'}]
};

const check = (entry,skill,label,failureEntry) => ({entry,skill,label,successEntry:33,failureEntry,duration:0});
export const PAR_CHECKS = {
 'parthenon-sneak-climb':check(18,'Climb','Climb over the fence',27),
 'parthenon-stroll-climb':check(19,'Climb','Climb over the fence',31),
 'parthenon-break-grip':check(27,'STR','Break the figure’s grip',secondGrapple),
 'parthenon-break-both':{
  ...check(secondGrapple,'STR','Break free of both figures',grappleEnding),
  difficulty:'Extreme'
 }
};
