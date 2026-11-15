const ship = 'Cunard liner';

function scene(title, eyebrow, entry, page, ...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const EARLY_SCENES = {
 73:scene('A tour of the liner',ship,73,21,
  'The tour takes you past the public rooms and out onto the deck. Amid the other passengers, two figures catch your attention.'),
 109:scene('The first Monday at sea',ship,109,25,
  'Passengers settle into the routine of the crossing. The decks and cocktail lounge are both popular places to pass the time.'),
 126:scene('The ship’s diversions',ship,126,28,
  'There is a film in the cinema, and the liner has shops and a library. All three are a short walk from your cabin.'),
 167:scene('A knock at the cabin door','Your stateroom',167,33,
  'A steward asks if he can make up your cabin. You can let him in or ask him to come back later.'),
 8:scene('The steward takes his leave','Your stateroom',8,11,
  'The steward promises to return later. His footsteps fade down the corridor, leaving you alone in your cabin.'),
 47:scene('A delivery of fresh towels','Your stateroom',47,17,
  'An unfamiliar steward comes in with a stack of fresh towels. Something about his arrival makes you uneasy.'),
 91:scene('A glint beneath the jacket','Your stateroom',91,23,
  'You catch a flash of metal beneath his jacket. The doorway is still in reach if you can get past him.'),
 9:scene('The steward blocks the way','Your stateroom',9,11,
  'You place the man’s accent just as he shifts nearer to the door. His posture is openly threatening.'),
 10:scene('The steward attacks','Your stateroom',10,11,
  'The steward draws a knife and moves toward you. If you are carrying a weapon, you have a moment to bring it to hand.'),
 106:scene('The knife strikes the wall','Aboard the Cunard liner',106,25,
  'The man lunges and his knife catches in the wall. While he works it loose, you have time to reach for a weapon or make a break for safety.'),
 69:scene('Two strangers on deck','The promenade',69,20,
  'A tall passenger in a hooded robe stands with a small, sharp-faced companion. The shorter man looks directly at you. Their attention leaves you ill at ease.'),
 83:scene('The two men again','Public rooms',83,22,
  'You glimpse the hooded man and his companion again. You try to place where you saw them before.'),
 115:scene('A question for the purser','The purser’s office',115,26,
  'The purser thinks the two passengers are Egyptian. He asks whether they’ve been giving you trouble, then returns to his work.'),
 111:scene('A morning picture','The cinema',111,26,
  'The ship is showing Alfred Hitchcock’s Murder! The theater is almost empty when you take your seat.'),
 137:scene('Footsteps in the cinema','The cinema',137,30,
  'You hear two people come down the row and take seats directly behind you. There is time to leave if you move quickly.'),
 'ship-cinema-grabbed':scene('An attack in the dark','The cinema',137,30,
  'Someone behind you seizes you. You have only a few moments to break free before you lose consciousness.'),
 'ship-cinema-escaped':scene('Out of the cinema','Aboard the Cunard liner',137,30,
  'You get clear of the theater. Nobody follows you, and a search turns up no trace of the people who attacked you.'),
 'ship-cinema-death':scene('The last picture','The cinema',137,30,
  'Your strength gives out in the darkened cinema. The investigation ends here.'),
 133:scene('Gloves in the ship’s shop','The shops',133,28,
  'The liner’s shops sell everything from jewelry and sporting goods to books. You stop to look at a pair of gloves.'),
 61:scene('Flakes on the counter','The shops',61,19,
  'You notice dry flakes of skin near the gloves. As you look up, a tall figure and his shorter companion are staring straight at you. You leave the shop.'),
};

function clue(title, entry, text) {
 return {title,type:'Shipboard observation',source:EARLY_SCENES[entry].source,text};
}

export const EARLY_CLUES = {
 linerPassengers:clue('Two strangers on the liner',69,
  'A tall, hooded passenger and a slight, sharp-faced companion watched you from the promenade.'),
 linerPurser:clue('The purser’s account of the two passengers',115,
  'The purser thinks the two men you saw on the promenade are Egyptian. He asked whether they had been causing trouble.'),
 linerSkin:clue('Flakes of skin in the ship’s shop',61,
  'There were dry flakes of skin by the gloves. A tall man and a shorter companion stared at you from the shop.')
};

export const EARLY_ENTRY_CLUES = {69:'linerPassengers',115:'linerPurser',61:'linerSkin'};

function check(entry,skill,label,successEntry,failureEntry,extra={}) {
 return {entry,skill,label,successEntry,failureEntry,duration:0,...extra};
}

export const EARLY_CHECKS = {
 'ship-tour-spot':check(73,'Spot Hidden','Look more closely',69,187),
 'ship-steward-spot':check(47,'Spot Hidden','Look at the steward’s jacket',91,10),
 'ship-steward-anthropology':check(47,'Anthropology','Try to place the steward',9,10),
 'ship-steward-luck':check(47,'Luck','Read the moment',106,10),
 'ship-steward-dodge':check(91,'Dodge','Slip past the steward',187,10,{successAdvanceDay:true}),
 'ship-door-dodge':check(9,'Dodge','Dash through the doorway',187,10,{successAdvanceDay:true}),
 'ship-men-int':check(83,'INT','Place the two men',115,187,{failureAdvanceDay:true}),
 'ship-cinema-listen':check(111,'Listen','Listen in the dark',137,'ship-cinema-grabbed',
  {failureAttemptsDice:[1,6]}),
 'ship-cinema-dex':check(137,'DEX','Leave before they can reach you',187,'ship-cinema-grabbed',
  {successAdvanceDay:true,failureAttemptsDice:[1,6]}),
 'ship-cinema-str':check('ship-cinema-grabbed','STR','Break free','ship-cinema-escaped','ship-cinema-grabbed',
  {difficulty:'Hard',repeat:true,attemptCap:true,exhaustedEntry:'ship-cinema-death'}),
 'ship-shopping-spot':check(133,'Spot Hidden','Examine the display',61,187),
};

function choice(id,label,target,advanceDay=false) {
 return {id:`ship-${id}`,label,target,duration:0,advanceDay};
}

export const EARLY_CHOICES = {
 167:[choice('dismiss-steward','Ask the steward to return later',8), choice('admit-steward','Let the steward in',47)],
 8:[choice('leave-cabin','Continue to the next day',187,true)],
 91:[choice('confront-steward','Confront the steward',10)],
 69:[choice('leave-promenade','Continue to the next day',187,true)],
 115:[choice('leave-purser','Continue to the next day',187,true)],
 61:[choice('leave-shop','Return to the activity table',187)],
 'ship-cinema-escaped':[choice('leave-cinema','Return to the activity table',187)],
};

export const EARLY_REDIRECTS = {
 83:s=>s.visited.includes(69)?null:69,
 167:s=>s.visited.includes(167)?{target:187,advanceDay:true}:null,
};

export const EARLY_ENDINGS = ['ship-cinema-death'];

export const EARLY_RULES = [
 {day:1,slot:'am',activities:['room'],entry:167},
 {day:1,slot:'pm',activities:['room'],entry:167},
 {day:1,slot:'pm',activities:['tour'],entry:73},
 {day:1,slot:'night',activities:['room'],entry:167},
 {day:2,slot:'am',activities:['stroll'],entry:83},
 {day:2,slot:'pm',activities:['rest-deck'],entry:83},
 {day:2,slot:'night',activities:['cocktails'],entry:83},
 {day:3,slot:'am',activities:['cinema'],entry:111},
 {day:3,slot:'pm',activities:['shopping'],entry:133},
 {day:3,slot:'night',activities:['library'],entry:155},
];
