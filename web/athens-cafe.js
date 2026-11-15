const cafe='Piosotos Café';
const flat='Hawkes’s apartment';
export const CAFE_LOCATIONS = {
 athensCafe:{name:cafe,entry:20,region:'athens',hours:[6,26],hoursLabel:'6 AM–2 AM daily',description:'Talk to sailors, card players, and an Englishman with news of Gliere.'},
 athensSun:{name:'New York Sun · European edition',entry:65,region:'athens',hours:[0,24],description:'Read dispatches from Egypt, America, and Germany.'}
};
export const CAFE_ENTRIES = {athensCafe:[20,35,79,112,105,107,581,'hawkes-escape','hawkes-ending'],athensSun:[65,95,178,190,156]};

function scene(title,eyebrow,source,...paragraphs) {
 return {title,eyebrow,source,paragraphs,adapted:true};
}
export const CAFE_SCENES = {
 20:scene('Smoke and voices',cafe,'Entry 20 · p. 12','Sailors laugh and argue at the bar. A group plays cards at the back. An Englishman sits alone at a table.'),
 35:scene('Richard Hawkes',cafe,'Entry 35 · p. 15','Hawkes tells you he met Gliere and knows something about the theft. He offers to show you what he has at his apartment. If you decline, he suggests the Parthenon at sunset.'),
 79:scene('The scholar’s apartment',flat,'Entry 79 · p. 21','The little apartment is filled with books and rich smells. Take a moment to look and listen.'),
 112:scene('Something behind the curtain',flat,'Entry 112 · pp. 26–27','Something about the chair and the curtained corner unsettles you. What have you noticed?'),
 'hawkes-escape':scene('Out the door',flat,'Entry 112 · pp. 26–27','You dodge a hand reaching out from behind the curtain. The door is open and you get away.'),
 'hawkes-ending':scene('Caught in the apartment',flat,'Entry 112 · pp. 26–27','Hawkes springs his trap, and his silent companion emerges from behind the curtain. Your investigation ends here.'),
 105:scene('Talk at the bar',cafe,'Entry 105 · p. 25','The sailors talk about a curse that is leaving Greece. They say the ocean-going motorship Kyonas is available for hire.'),
 107:scene('Gliere’s name at the card table',cafe,'Entry 107 · p. 25','You make out Gliere’s name and a word like “strangled.” Then the men stop talking and look up at you.'),
 581:scene('A winning streak',cafe,'Entry 581 · p. 89','You join the fishermen’s card game. Your luck holds and you leave with $35 in winnings.'),
 65:scene('Dispatches from abroad','New York Sun','Entry 65 · p. 19','Cairo awaits the Karpathos Device on loan from Athens. Gliere’s casket has left for New York aboard the Urania, and Arkham has scheduled a memorial. The Dark Sea is heading to Bremen for final preparations before the Antarctic expedition.')
};

const clue=(entry,title)=>({title,type:'Athens lead',source:CAFE_SCENES[entry].source,text:CAFE_SCENES[entry].paragraphs.join('\n\n')});
export const CAFE_CLUES = {
 athensSunDispatch:clue(65,'Dispatches on Gliere and the expedition'),
 athensSailors:clue(105,'The sailors and the Kyonas'),
 athensCardTable:clue(107,'What the fishermen said')
};
export const CAFE_ENTRY_CLUES={65:'athensSunDispatch',105:'athensSailors',107:'athensCardTable'};
export const CAFE_FLAGS=['hawkesOccult','hawkesChair','hawkesBreathing','hawkesAlert','hawkesDeclined','athensWhistWon'];
const observe=[
 ['hawkes-edu','EDU','Consider the furnishings'],
 ['hawkes-mythos','Cthulhu Mythos','Recognize the books','hawkesOccult'],
 ['hawkes-occult','Occult','Examine the occult titles','hawkesOccult'],
 ['hawkes-spot','Spot Hidden','Look at the chair','hawkesChair'],
 ['hawkes-listen','Listen','Listen behind the curtain','hawkesBreathing']
];
const check=(entry,skill,label,extra={})=>({entry,skill,label,duration:0,...extra});
export const CAFE_CHECKS = {
 'athens-sailors-greek':check(20,'Language (Greek)','Speak to the sailors in Greek',{successEntry:105,daily:true,when:s=>!s.flags.athensChristos}),
 'athens-cards-greek':check(20,'Language (Greek)','Speak to the card players in Greek',{successEntry:107,daily:true,when:s=>!s.flags.athensChristos}),
 ...Object.fromEntries(observe.map(([id,skill,label,successFlag])=>[id,check(79,skill,label,{successFlag})])),
 'hawkes-int':check(112,'INT','Put the observations together',{
  when:s=>!s.flags.hawkesAlert,successFlag:'hawkesAlert',failureEntry:'hawkes-ending',
  skillBonus:s=>10*['hawkesOccult','hawkesChair','hawkesBreathing'].filter(flag=>s.flags[flag]).length
 }),
 'hawkes-dodge':check(112,'Dodge','Dodge through the doorway',{when:s=>s.flags.hawkesAlert,successEntry:'hawkes-escape',failureEntry:'hawkes-ending'})
};
const choice=(id,label,target,extra={})=>({id,label,target,duration:0,...extra});
const back=choice('cafe-return','Return to the café',20);
export const CAFE_CHOICES = {
 20:[
  choice('cafe-hawkes','Approach the Englishman',35,{when:s=>!s.visited.includes(79)&&!s.flags.hawkesDeclined}),
  choice('cafe-sailors','Speak to the sailors with Christos',105,{when:s=>s.flags.athensChristos}),
  choice('cafe-cards','Speak to the card players with Christos',107,{when:s=>s.flags.athensChristos})
 ],
 35:[choice('cafe-accept','Go to Hawkes’s apartment',79),choice('cafe-decline','Decline the invitation',20,{flag:'hawkesDeclined'})],
 79:[choice('hawkes-interpret','Consider what you noticed',112,{when:s=>observe.every(([id])=>s.attempts[id])})],
 105:[back],
 107:[back,choice('cafe-whist','Join the card game',581,{when:s=>!s.flags.athensWhistWon,flag:'athensWhistWon',duration:0.5,cash:35,detail:'Play a hand of whist'})],
 581:[back],
 'hawkes-escape':[back],
 65:[choice('athens-sun-later','Read the later report on Gliere',95,{when:s=>s.time>=Date.UTC(1931,8,16)})]
};
