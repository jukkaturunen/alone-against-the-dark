import { BASE_SKILLS, CHECKS } from './data.js';

// The old format spans the prologue and the first playable day in Arkham.
// Keep the legacy IDs fixed as later entries and checks ship.
const VERSION = 2;
const START = Date.UTC(1931, 8, 1, 20);
const MORNING = Date.UTC(1931, 8, 2, 6);
const END_DAY = Date.UTC(1931, 8, 3);
const HOUR = 3600000;
const ENTRIES = {
 home:[13,102], bank:[3], newspaper:[60], university:[82,122,100,186,145,574], diner:[593], depot:[16], boston:[64],
 harding:[113,23,45,67,89,90,7,28,52,2,11,141,51,150,24,29,32,49,72,121,124,212,282,208,53,46,68,188]
};
const V1_CHECKS = ['news-library','news-spot','news-luck','library-use','library-spot'];
const V2_CHECKS = new Set([
 ...V1_CHECKS,'harding-persuade','window-stealth','door-locksmith','door-mechanical','door-strength','door-stealth',
 'room-A','room-B','room-C','room-D','corridor-stealth','room-astronomy','room-cryptography','room-mythos',
 'room-intelligence','room-luck','room-spot','room-exit','notes-intelligence','notes-language','notes-history',
 'notes-mythos','manuscript-spot','bookmark-spot'
]);
const V2_CLUES = new Set([
 'telegram','sailings','curator','mylonas','discovery','device','museum','myths',
 'starMap','manuscript','glyphNotes','glyphWords','glyphHistory','shoggoth','velikovsky','symbolMap',
 'historyBookmark','strangeDrawing','nameless'
]);
const VISITED = new Set(Object.values(ENTRIES).flat());
const CHARACTERISTICS = { STR:70, CON:50, SIZ:45, DEX:60, INT:70, APP:55, POW:55, EDU:93 };
function hour(s) { return new Date(s.time).getUTCHours(); }
function allocationTotal(a) { return Object.values(a).reduce((sum,n)=>sum+n,0); }
function validAllocation(a) {
 return plain(a)
  && Object.entries(a).every(([name,points])=>Object.hasOwn(BASE_SKILLS,name)&&num(points,0,99-BASE_SKILLS[name]))
  && allocationTotal(a)===150;
}
function skill(s,name) {
 if(name==='Luck') return s.luck;
 if(name==='Cthulhu Mythos') return s.mythos;
 if(Object.hasOwn(CHARACTERISTICS,name)) return CHARACTERISTICS[name];
 return (BASE_SKILLS[name]||0)+(s.allocation[name]||0);
}
function successLevel(roll,base,required=base) {
 if(roll===100||(required<50&&roll>=96)) return 'Fumble';
 if(roll===1) return 'Critical success';
 if(roll<=Math.floor(base/5)) return 'Extreme success';
 if(roll<=Math.floor(base/2)) return 'Hard success';
 if(roll<=base) return 'Regular success';
 return 'Failure';
}
function plain(x) {return x&&typeof x==='object'&&!Array.isArray(x);}
function num(x,min,max) {return Number.isInteger(x)&&x>=min&&x<=max;}
function str(x,max) {return typeof x==='string'&&x.length<=max;}
function validRoll(p,s,pending) {
 if(!plain(p)||!V2_CHECKS.has(p.id)) return false;
 const r=CHECKS[p.id];
 if(!num(p.roll,1,100)||!num(p.base,0,99)||p.skill!==r.skill||p.difficulty!==(r.difficulty||'Regular')||p.duration!==(r.duration??1)) return false;
 const required=r.difficulty==='Hard'?Math.floor(p.base/2):p.base;
 if(p.target!==required) return false;
 if(pending) {
  return s.entry===r.entry&&s.phase==='playing'&&p.base===skill(s,r.skill)
   &&p.level===successLevel(p.roll,p.base,p.target)&&s.time+(r.successDuration||0)*HOUR<END_DAY;
 }
 const success=p.level!=='Fumble'&&(p.adjusted===1||p.adjusted<=p.target);
 if(!num(p.adjusted,1,100)||!num(p.spent,0,50)||p.adjusted!==p.roll-p.spent) return false;
 if(p.level!==successLevel(p.adjusted,p.base,p.target)||p.success!==success) return false;
 if(p.spent&&(p.skill==='Luck'||successLevel(p.roll,p.base,p.target)==='Fumble'||p.adjusted===1)) return false;
 return p.clue===null||(V2_CLUES.has(p.clue)&&s.clues.includes(p.clue));
}
function validateV2(s) {
 if(!plain(s)||s.version!==VERSION||!str(s.id,100)||!s.id||!str(s.name,60)||!validAllocation(s.allocation)) return false;
 if(!num(s.time,START,END_DAY+8*HOUR)||s.time%HOUR!==0||!num(s.sleep,0,8)) return false;
 if(!num(s.hp,0,9)||!num(s.mythos,0,3)||!num(s.sanity,0,99-s.mythos)||!num(s.luck,0,50)) return false;
 if(!num(s.bank,0,2200)||!num(s.cash,0,2200)||s.bank+s.cash!==2200) return false;
 if(!Object.hasOwn(ENTRIES,s.location)||!['playing','complete','ending'].includes(s.phase)) return false;
 if(!Array.isArray(s.clues)||s.clues.length>V2_CLUES.size||!s.clues.every(c=>V2_CLUES.has(c))||new Set(s.clues).size!==s.clues.length) return false;
 if(!ENTRIES[s.location]?.includes(s.entry)||!plain(s.flags)) return false;
 const boolFlags=['telegramRead','ticketFunded','hardingRejected','doorOpen','windowQuiet','caughtOnEntry','bookSkimmed'];
 if(Object.entries(s.flags).some(([k,v])=>k==='endReason'?!['rest','boston','dayEnd'].includes(v):!boolFlags.includes(k)||typeof v!=='boolean')) return false;
 if(s.flags.caughtOnEntry&&![141,2,11,150].includes(s.entry)) return false;
 if(s.phase==='playing'&&(s.time>=END_DAY||s.location==='boston'||s.entry===574)) return false;
 if(s.phase==='complete') {
  const rest=s.flags.endReason==='rest'&&s.location==='home'&&s.entry===102;
  const boston=s.flags.endReason==='boston'&&s.entry===64;
  const dayEnd=s.flags.endReason==='dayEnd'&&hour(s)>=23;
  if(!rest&&!boston&&!dayEnd) return false;
 }
 if(s.phase==='ending'&&s.entry!==574) return false;
 if(!str(s.notes,20000)||!Array.isArray(s.inventory)||s.inventory.length>100||!s.inventory.every(i=>str(i,200))) return false;
 if(!Array.isArray(s.log)||s.log.length>2000||!s.log.every(l=>plain(l)&&num(l.time,START,s.time)&&str(l.text,500))) return false;
 if(!Array.isArray(s.meals)||s.meals.length>2||!s.meals.every(t=>num(t,MORNING,s.time)&&t%HOUR===0)) return false;
 if(s.meals.length===2&&s.meals[1]-s.meals[0]<6*HOUR) return false;
 if(!Array.isArray(s.visited)||s.visited.length>80||!s.visited.every(e=>VISITED.has(e))) return false;
 if(!plain(s.attempts)||!Object.entries(s.attempts).every(([id,n])=>V2_CHECKS.has(id)&&num(n,1,2000))) return false;
 if(s.pending!==null&&!validRoll(s.pending,s,true)) return false;
 if(s.lastRoll!==null&&!validRoll(s.lastRoll,s,false)) return false;
 return true;
}
export function readLegacySave(original) {
 const s=structuredClone(original);
 if(s?.version===1) {
  if([s.pending,s.lastRoll].some(roll=>roll&&!V1_CHECKS.includes(roll.id))) throw new Error('Invalid legacy dice record.');
  s.version=VERSION;
  s.mythos=0;
  for(const key of ['pending','lastRoll']) if(s[key]) {
   const p=s[key];
   p.base=p.target;
   p.difficulty='Regular';
   p.duration=1;
   if(key==='lastRoll') p.clue=p.success?CHECKS[p.id].clue:null;
  }
 }
 if(!validateV2(s)) throw new Error('This dossier could not be read safely. The original has not been changed.');
 return s;
}
