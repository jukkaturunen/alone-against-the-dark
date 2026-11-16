import { DAY, HOUR, dayStart } from './calendar.js';

const route='Athens–Cairo train';
const poison='cairo-train-poison';
const alone='cairo-train-first-aid';
const death='cairo-train-ending';

export const ET_LOCATIONS={
 cairoTrain:{name:route,entry:42,region:'cairoTrain',hours:[0,24],unavailable:true,
  description:'The three-day railway journey to Cairo.'}
};
function scene(entry,page,title,...paragraphs) {
 return {title,eyebrow:route,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}
export const ET_SCENES={
 42:scene(42,16,'Passage to Cairo','At noon the train pulls out of Athens. You can take a crowded seat or pay for a private suite with a basin and its own toilet.'),
 75:scene(75,21,'The rest of the journey','The train makes its connections through Istanbul and Damascus. Cairo lies at the end of the line.'),
 93:scene(93,23,'The private suite','The rhythm of the wheels has almost put you to sleep when something stirs in your compartment.'),
 97:scene(97,24,'Something under the covers','Asps slither along the floor. More have worked their way beneath the bedclothes. You have only a moment to move.'),
 129:scene(129,28,'An asp bite','The bite burns. Try to withstand the venom long enough to decide how to treat it.'),
 151:scene(151,31,'Out through the window','You fall from the train. If you can get to the next stop, there will be another train in a day.'),
 152:scene(152,31,'The door of the compartment','The snakes lie between you and the door. A quick leap or a dodge might get you out.'),
 427:scene(427,68,'The emergency cord','The carriage lurches. The motion throws an asp against you before the train can stop.'),
 [poison]:scene(129,28,'Call for a doctor','The venom is working. Call out and hope someone on the train knows how to treat the bite.'),
 [alone]:scene(129,28,'Treat the bite','Nobody answered. You will have to tend to the bite yourself.'),
 [death]:scene(129,28,'The train leaves you behind','Your strength gives out before you can reach Cairo.')
};
export const ET_ENTRIES={cairoTrain:Object.keys(ET_SCENES).map(key=>Number(key)||key)};
export const ET_ENDINGS=new Set([death]);
export const ET_FLAGS=['cairoTrainAlert'];

const choice=(id,label,target,extra={})=>({id:`cairo-train-${id}`,label,target,duration:0,...extra});
export const ET_CHOICES={
 183:[choice('board','Take the noon train to Cairo',42,{
  detail:'Daily at noon · three days',effect:'cairo-train-board',when:s=>s.time<=dayStart(s.time)+12*HOUR
 })],
 42:[choice('seat','Take a seat in the shared carriage',75),choice('suite','Take a private suite',93,{
  detail:'Continue to the first night',effect:'cairo-train-suite'
 })],
 75:[choice('arrive','Continue to Cairo',205,{effect:'cairo-train-arrive'})],
 97:[
  choice('pull-cord','Pull the emergency cord',427),choice('window','Leap out the window',151,{effect:'cairo-train-window'}),
  choice('door','Try to reach the door',152),choice('stay','Stay very still',death)
 ],
 151:[choice('next-train','Catch the next train',75,{effect:'cairo-train-delay',detail:'Wait 24 hours'})],
 427:[choice('check-bite','Look at the bite',129)]
};

const check=(entry,skill,label,successEntry,failureEntry,extra={})=>({entry,skill,label,successEntry,failureEntry,duration:0,...extra});
export const ET_CHECKS={
 'cairo-train-listen':check(93,'Listen','Listen in the dark',97,97,{successFlag:'cairoTrainAlert'}),
 'cairo-train-spot':check(93,'Spot Hidden','Look around the compartment',97,97,{successFlag:'cairoTrainAlert'}),
 'cairo-train-jump':check(152,'Jump','Jump over the snakes',75,129),
 'cairo-train-dodge':check(152,'Dodge','Dodge through the doorway',75,129),
 'cairo-train-con':check(129,'CON','Withstand the venom',75,poison,{difficulty:'Hard'}),
 'cairo-train-doctor':check(poison,'Luck','Call for help',75,alone,{successEffect:'cairo-train-doctor'}),
 'cairo-train-first-aid':check(alone,'First Aid','Treat the bite yourself',75,death,{successEffect:'cairo-train-treatment'})
};

function hurt(s,amount,target,{go,log}) {
 s.hp=Math.max(0,s.hp-amount);
 log(s,`Lost ${amount} health on the railway journey.`);
 go(s,s.hp?target:death);
}
export function cairoTrainEffect(s,effect,tools) {
 const {go,log,advance,advanceJourney,rollDie}=tools;
 switch(effect) {
  case 'cairo-train-board': {
   const departure=dayStart(s.time)+12*HOUR;
   advance(s,(departure-s.time)/HOUR);
   s.egyptTrain={departure,delayed:false};
   delete s.flags.cairoTrainAlert;
   s.location='cairoTrain';
   go(s,42);
   return true;
  }
  case 'cairo-train-suite':
   advanceJourney(s,12,'Travelled through the first evening in the private suite.');
   go(s,93);
   return true;
  case 'cairo-train-window': hurt(s,rollDie(6),151,tools);return true;
  case 'cairo-train-delay':
   s.egyptTrain.delayed=true;
   advanceJourney(s,24,'Waited a day for the next train.');
   go(s,75);
   return true;
  case 'cairo-train-doctor': {
   const rounds=rollDie(3);
   let damage=0;
   for(let i=0;i<rounds;i++) damage+=rollDie(4);
   hurt(s,damage,75,tools);
   return true;
  }
  case 'cairo-train-treatment': hurt(s,rollDie(4),75,tools);return true;
  case 'cairo-train-arrive': {
   const arrival=s.egyptTrain.departure+(s.egyptTrain.delayed?4:3)*DAY;
   advanceJourney(s,(arrival-s.time)/HOUR,'Finished the railway journey to Cairo.');
   delete s.egyptTrain;
   delete s.flags.cairoTrainAlert;
   s.location='cairoRail';
   go(s,205);
   log(s,'Arrived at Cairo Rail Station.');
   return true;
  }
  default: return false;
 }
}

export function cairoTrainEnter(s) {
 if(s.location==='cairoTrain'&&ET_ENDINGS.has(s.entry)) {
  s.phase='ending';
  s.hp=0;
 }
}
export function validateCairoTrain(s) {
 const trip=s.egyptTrain;
 if(s.location!=='cairoTrain') return trip===undefined&&!s.flags.cairoTrainAlert;
 if(!trip||!Number.isInteger(trip.departure)||trip.departure!==dayStart(trip.departure)+12*HOUR||typeof trip.delayed!=='boolean') return false;
 return s.time>=trip.departure&&s.time<=trip.departure+(trip.delayed?4:3)*DAY;
}
