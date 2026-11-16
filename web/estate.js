import { INVESTIGATORS, ORDER } from './investigators.js';

const privateSites = {
 'hawkes-ending':{entry:112,location:'athensCafe',name:'Hawkes’s apartment'},
 'pyramid-basket-ending':{entry:373,location:'amarna',name:'the bowl chamber'},
 'pyramid-worm-ending':{entry:446,location:'amarna',name:'the ornate stairs'},
 'pyramid-shaft-ending':{entry:437,location:'amarna',name:'the shallow shaft'},
 'pyramid-mirror-ending':{entry:425,location:'amarna',name:'the mirror passage'},
 'pyramid-chamber-ending':{entry:418,location:'amarna',name:'the ritual chamber'},
 407:{entry:431,location:'amarna',name:'the ritual chamber'},
};
const personalItems = new Set(['Passport','Packed clothes and sundries']);

export function estateFrom(s) {
 const site=Object.hasOwn(privateSites,s.entry)?privateSites[s.entry]:null;
 if(!site||s.location!==site.location||s.phase!=='ending') return null;
 const items=[...new Set(s.inventory)].filter(item=>!personalItems.has(item));
 return items.length?{investigator:s.investigator,ending:s.entry,items}:null;
}

export function estateLocation(record) {
 return privateSites[record.ending].name;
}

function possessionsAt(s,predecessor,ending) {
 const site=privateSites[ending];
 if(s.location!==site.location||s.entry!==site.entry) return null;
 return s.estates?.find(record=>record.investigator===predecessor&&record.ending===ending)??null;
}

export const ESTATE_CHECKS = {};
for(const [endingKey,site] of Object.entries(privateSites)) {
 const ending=Number(endingKey)||endingKey;
 for(const predecessor of ORDER.slice(0,-1)) {
  ESTATE_CHECKS[`recover-${predecessor}-${ending}`]={
   entry:site.entry,skill:'Luck',duration:0,repeat:true,
   label:`Look for ${INVESTIGATORS[predecessor].name}’s possessions`,
   recoveryFor:predecessor,recoveryEnding:ending,
   when:s=>Boolean(possessionsAt(s,predecessor,ending)),
  };
 }
}

export function resolveEstate(s,check,success,log) {
 if(!check.recoveryFor) return false;
 const record=possessionsAt(s,check.recoveryFor,check.recoveryEnding);
 if(!record) throw new Error('Those possessions are no longer available.');
 const name=INVESTIGATORS[record.investigator].name;
 if(success) {
  const added=record.items.filter(item=>!s.inventory.includes(item));
  s.inventory.push(...added);
  log(s,added.length?`Recovered ${name}’s possessions.`:`Found ${name}’s possessions. You already carry the same equipment.`);
 } else {
  log(s,`You couldn’t recover ${name}’s possessions. They are now lost.`);
 }
 s.estates=s.estates.filter(item=>item!==record);
 if(!s.estates.length) delete s.estates;
 return true;
}

export function estateFits(s,check) {
 const record=possessionsAt(s,check.recoveryFor,check.recoveryEnding);
 return Boolean(record&&s.inventory.length+record.items.filter(item=>!s.inventory.includes(item)).length<=100);
}

export function validateEstates(s) {
 if(s.estates===undefined) return true;
 if(!Array.isArray(s.estates)||!s.estates.length||s.estates.length>=ORDER.length) return false;
 const active=ORDER.indexOf(s.investigator);
 const predecessors=new Set();
 for(const record of s.estates) {
  if(!record||typeof record!=='object'||!Object.hasOwn(privateSites,record.ending)) return false;
  const index=ORDER.indexOf(record.investigator);
  if(index<0||index>=active||predecessors.has(record.investigator)) return false;
  predecessors.add(record.investigator);
  if(!Array.isArray(record.items)||!record.items.length||record.items.length>100||new Set(record.items).size!==record.items.length) return false;
  if(record.items.some(item=>typeof item!=='string'||item.length>200||personalItems.has(item))) return false;
 }
 return true;
}
