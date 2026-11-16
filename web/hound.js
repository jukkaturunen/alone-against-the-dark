import { DAY } from './calendar.js';
import { hasOldOne } from './lost-city.js';

const lastChance='hound-last-chance';
const death='hound-ending';
const amulets=new Set(['Amulet of Nodens','Amulet of Nodens (charged)']);
const capableTrial=s=>s.inventory.find(item=>amulets.has(item));
const scene=(title,...paragraphs)=>({title,eyebrow:'The pursuing creature',source:'Entry 306 · p. 54',paragraphs,adapted:true});
export const HOUND_SCENES={
 306:scene('The hound has found you','A hound-like creature emerges. Its gaze is the one you saw in the mirror at Fuzira.'),
 [lastChance]:scene('A moment to act','The hound draws closer. A weapon will do little against it.'),
 [death]:scene('The last thing in the mirror','The hound reaches you before you can get clear.')
};
export const HOUND_ENTRIES=[306,lastChance,death];
export const HOUND_ENDINGS=new Set([death]);
export const HOUND_CHECKS={
 'hound-sanity':{entry:306,skill:'Sanity',label:'Steady yourself at the sight of the hound',duration:0,repeat:true,
  successEffect:'hound-sanity-pass',failureEffect:'hound-sanity-fail'}
};
export const HOUND_CHOICES={
 [lastChance]:[
  {id:'hound-use-nodens',label:'Call for help with the Amulet of Nodens',duration:0,effect:'hound-use-nodens',when:s=>Boolean(capableTrial(s))},
  {id:'hound-face-it',label:'Face the hound',duration:0,target:death,when:s=>!capableTrial(s)}
 ]
};

export function scheduleHound(s,{rollDie,log}) {
 const days=rollDie(10)+rollDie(10);
 const due=s.time+days*DAY;
 if(s.hound===undefined||due<s.hound.due) {
  s.hound={due};
  log(s,`The hound will find you in ${days} days.`);
 }
}
export function startHound(s,{go}) {
 s.hound.origin=s.entry;
 go(s,306);
}
export function houndEnter(s) {
 if(s.entry===death) {
  s.phase='ending';
  s.hp=0;
 }
}
function driveAway(s,{go,rollDie,log}) {
 const origin=s.hound.origin;
 delete s.hound;
 const gain=Math.min(99-s.mythos-s.sanity,rollDie(10));
 s.sanity+=gain;
 log(s,`The hound is driven off. Recovered ${gain} Sanity.`);
 go(s,origin);
}
export function houndEffect(s,effect,tools) {
 const {go,rollDie,log}=tools;
 switch(effect) {
  case 'hound-sanity-pass':
  case 'hound-sanity-fail': {
   const loss=Math.min(s.sanity,rollDie(effect==='hound-sanity-pass'?3:20));
   s.sanity-=loss;
   log(s,`The hound costs you ${loss} Sanity.`);
   if(!s.sanity) go(s,death);
   else if(hasOldOne(s)) {
    log(s,'The Old One intercepts the hound.');
    driveAway(s,tools);
   } else go(s,lastChance);
   return true;
  }
  case 'hound-use-nodens': {
   const item=capableTrial(s);
   s.inventory.splice(s.inventory.indexOf(item),1);
   driveAway(s,tools);
   return true;
  }
  default: return false;
 }
}
