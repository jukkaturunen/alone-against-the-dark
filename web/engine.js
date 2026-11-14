import { BASE_SKILLS, CLUES, LOCATIONS, RESEARCH } from './data.js';
export const VERSION=1;
export const START=Date.UTC(1931,8,1,20);
export const MORNING=Date.UTC(1931,8,2,6);
export const END_DAY=Date.UTC(1931,8,3);
const HOUR=3600000;
export function hour(s){return new Date(s.time).getUTCHours();}
export function clock(time){return new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'UTC'}).format(time);}
export function date(time){return new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(time);}
export function allocationTotal(allocation){return Object.values(allocation).reduce((a,b)=>a+b,0);}
export function validAllocation(a){return a && typeof a==='object' && !Array.isArray(a) && Object.entries(a).every(([key,value])=>Object.hasOwn(BASE_SKILLS,key)&&Number.isInteger(value)&&value>=0&&value+BASE_SKILLS[key]<=99)&&allocationTotal(a)===150;}
export function newGame(id,name,allocation){
 if(!validAllocation(allocation))throw new Error('Assign exactly 150 points. Skills may not exceed 99%.');
 return {version:VERSION,id,name:name.trim().slice(0,60)||'An Arkham investigation',time:START,entry:13,location:'home',phase:'playing',allocation:{...allocation},hp:9,sanity:55,luck:50,bank:2200,cash:0,inventory:['Passport','Packed clothes and sundries'],clues:[],flags:{},attempts:{},meals:[],sleep:0,pending:null,lastRoll:null,notes:'',log:[{time:START,text:'The investigation begins at Grunewald’s home.'}],visited:[13]};
}
export function skill(s,name){return name==='Luck'?s.luck:(BASE_SKILLS[name]||0)+(s.allocation[name]||0);}
export function successLevel(roll,target){if(roll===100||(target<50&&roll>=96))return 'Fumble';if(roll===1)return 'Critical success';if(roll<=Math.floor(target/5))return 'Extreme success';if(roll<=Math.floor(target/2))return 'Hard success';if(roll<=target)return 'Regular success';return 'Failure';}
export function d100(){const values=new Uint32Array(1);const ceiling=Math.floor(2**32/100)*100;do{globalThis.crypto.getRandomValues(values);}while(values[0]>=ceiling);return values[0]%100+1;}
function log(s,text){s.log.push({time:s.time,text});}
function go(s,entry){s.entry=entry;if(!s.visited.includes(entry))s.visited.push(entry);}
function unlock(s,id){if(!s.clues.includes(id)){s.clues.push(id);log(s,`Collected: ${CLUES[id].title}.`);}}
function advance(s,hours){s.time+=hours*HOUR;}
function withinDay(s,hours){return s.time+hours*HOUR<END_DAY;}
export function isOpen(location,time){const h=new Date(time).getUTCHours(),day=new Date(time).getUTCDay();if(location==='home'||location==='depot'||location==='boston')return true;const [open,close]=location==='university'?[8,21]:LOCATIONS[location].hours;return day>=1&&day<=5&&h>=open&&h<close;}
export function canEat(s){return s.meals.length<2 && (!s.meals.length||s.time-s.meals.at(-1)>=6*HOUR);}
export function actions(s){
 if(s.phase!=='playing'||s.pending)return [];
 const a=[];const add=(id,label,detail='',disabled=false)=>a.push({id,label,detail,disabled});
 if(s.entry===13){if(!s.flags.telegramRead)add('telegram','Read the telegram','A message from Athens');else add('begin','Reply, pack, and turn in','Continue to 2 September · 6 AM');return a;}
 if(s.location==='home'&&s.entry===102){add('eat','Prepare a meal','1 hour · meals must be at least 6 hours apart',!canEat(s));add('phone-sailings','Telephone for sailing schedules','Arkham Advertiser · 1 hour',!isOpen('newspaper',s.time));add('phone-curator','Telephone for news of Athens','Arkham Advertiser · 1 hour',!isOpen('newspaper',s.time));add('rest','Turn in for the night','8 hours · ends this opening',hour(s)<20);}
 if(s.entry===3)add('withdraw',s.bank?'Withdraw travel funds':'Funds withdrawn',s.bank?`Withdraw $${s.bank.toLocaleString('en-US')}`:'Your money is now carried cash',s.bank===0||!isOpen('bank',s.time));
 if(s.entry===60){add('sailings','Ask about ocean liners','1 hour · shipping information',!isOpen('newspaper',s.time));add('curator','Ask for news of Athens','1 hour · current news',!isOpen('newspaper',s.time));}
 if([60,145].includes(s.entry))for(const [id,r]of Object.entries(RESEARCH)){if(r.entry!==s.entry)continue;const close=s.entry===145?21:17;const used=!r.repeat&&s.attempts[id];const found=s.clues.includes(r.clue);add(id,`Research with ${r.skill}`,`${skill(s,r.skill)}% · 1 hour${used?' · tried today':found?' · evidence already found':''}`,!!used||found||hour(s)<(s.entry===145?9:8)||hour(s)+1>close);}
 if(s.entry===82){add('library','Visit the library','Open 9 AM–9 PM · no additional travel hour',hour(s)<9||hour(s)>=21);add('fen','Speak with Dr. Fen','1 hour',hour(s)<8||hour(s)+1>17);add('dean','See Dean Wilcox','1 hour',hour(s)<8||hour(s)+1>17);}
 if(s.entry===122){add('dean','Speak with the Dean','1 hour',hour(s)+1>17);add('university','Return to the university','No time passes');}
 if(s.entry===100){add('resign','Threaten to resign','Stand by your decision to help Gliere');add('abandon','Let Gliere fend for himself','Ends this investigation');}
 if(s.entry===186||s.entry===145)add('university','Return to the university','No time passes');
 if(s.entry===593)add('eat','Order a meal','1 hour · meals must be at least 6 hours apart',!canEat(s)||hour(s)+1>17||hour(s)<6);
 if(s.entry===16){for(const departure of [9,12,17])if(hour(s)<=departure)add(`train-${departure}`,`Take the ${clock(Date.UTC(1931,8,2,departure))} train`,`Arrive Boston ${clock(Date.UTC(1931,8,2,departure+1))} · ends this opening`);}
 if(hour(s)>=23&&s.location!=='home'&&s.entry!==100)add('finish-opening','Pause at the end of the day','Later days are coming next');
 if(s.entry!==100){add('wait','Wait one hour','The clock advances',!withinDay(s,1));}
 return a;
}
export function travelOptions(s){return Object.entries(LOCATIONS).filter(([id])=>id!=='boston').map(([id,l])=>({id,...l,open:isOpen(id,s.time+HOUR),disabled:l.unavailable||id===s.location||s.entry===13||s.entry===100||!!s.pending||s.phase!=='playing'||!withinDay(s,1)}));}
export function act(original,id,rollFn=d100){
 const s=structuredClone(original);
 if(!actions(s).some(a=>a.id===id&&!a.disabled))throw new Error('That action is not available now.');
 if(id==='telegram'){unlock(s,'telegram');s.flags.telegramRead=true;return s;}
 if(id==='begin'){s.time=MORNING;s.sleep=8;go(s,102);log(s,'Replied to Gliere and Ernest Holt, packed, and slept. Awake on 2 September.');return s;}
 if(id==='finish-opening'){s.phase='complete';s.flags.endReason='dayEnd';log(s,'Reached the end of the playable day. Progress preserved for the next chapter.');return s;}
 if(id==='rest'){advance(s,8);s.sleep=8;s.phase='complete';s.flags.endReason='rest';log(s,'Slept for eight hours. The playable opening is complete.');return s;}
 if(id==='abandon'){go(s,574);s.phase='ending';log(s,'Abandoned the journey. The investigation ends.');return s;}
 if(id.startsWith('train-')){const departure=Number(id.split('-')[1]);s.time=Date.UTC(1931,8,2,departure+1);s.location='boston';go(s,64);s.phase='complete';s.flags.endReason='boston';log(s,'Took the train to Boston. The playable opening is complete.');return s;}
 const duration=['eat','fen','dean','wait','sailings','curator','phone-sailings','phone-curator'].includes(id)||Object.hasOwn(RESEARCH,id)?1:0;
 if(!withinDay(s,duration))throw new Error('This opening covers 2 September. Return home and turn in to finish.');
 if(id==='eat'){s.meals.push(s.time);advance(s,1);log(s,'Ate a meal.');return s;}
 if(id==='withdraw'){s.cash+=s.bank;s.bank=0;log(s,'Withdrew $2,200 in travel funds.');return s;}
 if(id==='wait'){advance(s,1);log(s,'Waited one hour.');return s;}
 if(['phone-sailings','sailings','phone-curator','curator'].includes(id)){advance(s,1);unlock(s,id.includes('sailings')?'sailings':'curator');return s;}
 if(id==='library'){go(s,145);return s;}
 if(id==='university'){go(s,82);return s;}
 if(id==='fen'||id==='dean'){advance(s,1);go(s,id==='fen'?122:100);log(s,id==='fen'?'Spoke with Dr. Fen.':'Asked Dean Wilcox for leave.');return s;}
 if(id==='resign'){go(s,186);s.flags.ticketFunded=true;log(s,'The university agreed to pay for a round-trip ticket.');return s;}
 if(Object.hasOwn(RESEARCH,id)){
 const r=RESEARCH[id],target=skill(s,r.skill),roll=rollFn();if(!Number.isInteger(roll)||roll<1||roll>100)throw new Error('Invalid dice result.');
 advance(s,1);s.attempts[id]=(s.attempts[id]||0)+1;s.pending={id,roll,target,skill:r.skill,level:successLevel(roll,target)};log(s,`${r.skill}: rolled ${roll} against ${target} (${s.pending.level}).`);return s;
 }
 return s;
}
export function luckCost(s){const p=s.pending;if(!p||p.skill==='Luck'||p.level==='Fumble'||p.roll<=p.target)return null;const cost=p.roll-p.target;return cost<=s.luck?cost:null;}
export function resolveRoll(original,spend=false){
 const s=structuredClone(original),p=s.pending;if(!p)throw new Error('No roll to resolve.');
 const cost=spend?luckCost(s):0;if(spend&&cost===null)throw new Error('Luck cannot alter this roll.');
 if(spend){s.luck-=cost;log(s,`Spent ${cost} Luck. ${s.luck} Luck remains.`);}
 const adjusted=p.roll-cost,level=successLevel(adjusted,p.target),success=level!=='Failure'&&level!=='Fumble';
 if(success)unlock(s,RESEARCH[p.id].clue);else log(s,'Research revealed no useful evidence.');
 s.lastRoll={...p,adjusted,level,spent:cost,success};s.pending=null;return s;
}
export function travel(original,destination){
 const option=travelOptions(original).find(l=>l.id===destination);if(!option||option.disabled)throw new Error('That destination is not available.');if(!option.open)throw new Error('That location will be closed when you arrive.');
 const s=structuredClone(original);advance(s,1);s.location=destination;go(s,LOCATIONS[destination].entry);log(s,`Travelled to ${LOCATIONS[destination].name}.`);return s;
}
export function validateSave(s){
 const plain=x=>x&&typeof x==='object'&&!Array.isArray(x);const num=(x,min,max)=>Number.isInteger(x)&&x>=min&&x<=max;const str=(x,max)=>typeof x==='string'&&x.length<=max;
 if(!plain(s)||s.version!==VERSION||!str(s.id,100)||!s.id||!str(s.name,60)||!validAllocation(s.allocation))return false;
 if(!num(s.time,START,END_DAY+8*HOUR)||s.time%HOUR!==0||!num(s.hp,0,9)||!num(s.sanity,0,99)||!num(s.luck,0,50)||!num(s.bank,0,2200)||!num(s.cash,0,2200)||s.bank+s.cash!==2200||!num(s.sleep,0,8))return false;
 if(!Object.hasOwn(LOCATIONS,s.location)||!['playing','complete','ending'].includes(s.phase)||!Array.isArray(s.clues)||s.clues.length>8||!s.clues.every(c=>Object.hasOwn(CLUES,c))||new Set(s.clues).size!==s.clues.length)return false;
 const entries={home:[13,102],bank:[3],newspaper:[60],university:[82,122,100,186,145,574],diner:[593],depot:[16],boston:[64]};
 if(!entries[s.location]?.includes(s.entry)||!plain(s.flags)||Object.keys(s.flags).some(k=>!['telegramRead','ticketFunded','endReason'].includes(k)))return false;
 if(s.flags.telegramRead!==undefined&&typeof s.flags.telegramRead!=='boolean'||s.flags.ticketFunded!==undefined&&typeof s.flags.ticketFunded!=='boolean')return false;
 if(s.flags.endReason!==undefined&&!['rest','boston','dayEnd'].includes(s.flags.endReason))return false;
 if(s.phase==='playing'&&(s.time>=END_DAY||s.location==='boston'||s.entry===574))return false;
 if(s.phase==='complete'&&!((s.flags.endReason==='rest'&&s.location==='home'&&s.entry===102)||(s.flags.endReason==='boston'&&s.entry===64)||(s.flags.endReason==='dayEnd'&&hour(s)>=23)))return false;
 if(s.phase==='ending'&&s.entry!==574)return false;
 if(!str(s.notes,20000)||!Array.isArray(s.inventory)||s.inventory.length>100||!s.inventory.every(i=>str(i,200))||!Array.isArray(s.log)||s.log.length>2000||!s.log.every(l=>plain(l)&&num(l.time,START,s.time)&&str(l.text,500)))return false;
 if(!Array.isArray(s.meals)||s.meals.length>2||!s.meals.every(t=>num(t,MORNING,s.time)&&t%HOUR===0)||s.meals.length===2&&s.meals[1]-s.meals[0]<6*HOUR)return false;
 if(!Array.isArray(s.visited)||s.visited.length>30||!s.visited.every(e=>Object.values(entries).flat().includes(e))||!plain(s.attempts)||!Object.entries(s.attempts).every(([id,n])=>Object.hasOwn(RESEARCH,id)&&num(n,1,24)))return false;
 if(s.pending){const p=s.pending,r=RESEARCH[p.id];if(!plain(p)||!r||s.entry!==r.entry||s.phase!=='playing'||!num(p.roll,1,100)||p.target!==skill(s,r.skill)||p.skill!==r.skill||p.level!==successLevel(p.roll,p.target))return false;}
 if(s.lastRoll){const p=s.lastRoll;if(!plain(p)||!Object.hasOwn(RESEARCH,p.id)||!num(p.roll,1,100)||!num(p.target,0,99)||!num(p.adjusted,1,100)||!num(p.spent,0,50)||p.adjusted!==p.roll-p.spent||typeof p.success!=='boolean'||!str(p.level,30)||!str(p.skill,100))return false;}
 return true;
}
