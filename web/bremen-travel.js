import { dayStart, DAY, HOUR } from './calendar.js';

export const BR_TRAVEL_LOCATIONS = {
 cairoAirport:{name:'Cairo Airport',entry:196,region:'cairo',hours:[0,24],description:'Daily flights to Bremen and Athens.'},
 athensAirport:{name:'Athens Airport',entry:181,region:'athens',hours:[0,24],description:'Airport access and a charter pilot.'},
 bremenStore:{name:'Geschaft Krankhausen',entry:38,region:'bremen',hours:[7,17],lastWeekday:6,description:'General equipment and supplies.'},
 bremenHospital:{name:'Bremen Hospital',entry:585,region:'bremen',hours:[0,24],description:'Recover health with a full day of care.'},
 cairoTaxis:{name:'Cairo taxis',entry:103,region:'cairo',hours:[0,24],description:'Choose a destination in Cairo.'}
};
export const BR_TRAVEL_ENTRIES = {cairoAirport:[196],athensAirport:[181,57,92],cairoTaxis:[103],bremenStore:[38],bremenHospital:[585]};
function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const BR_TRAVEL_SCENES = {
 196:scene('The Cairo airfield','Cairo Airport',196,39,'British troops stand near the airfield. The daily flight to Bremen leaves at 9 AM and arrives at 5 PM. A flight to Athens leaves at 3 PM and arrives at 6 PM.'),
 181:scene('Three aircraft at the airstrip','Athens Airport',181,36,'Three planes sit beside the airstrip. Jacques Risee, the pilot of an old mail plane, is waiting in the bar.'),
 57:scene('Jacques Risee','Athens Airport',57,18,'The pilot is trying to interest wealthy Greeks in flying. He offers to take you somewhere in his mail plane.'),
 92:scene('An open-cockpit charter','Athens Airport',92,23,'Jacques can fly to Cairo or Bremen. He needs to take off before noon so he can finish the trip in daylight.'),
 103:scene('Cabs on the main streets','Cairo',103,25,'The cabs range from newer Packards to patched-up Fords. Choose where to go next.')
};

const choice=(id,label,target,extra={})=>({id,label,target,duration:0,...extra});
const beforeNoon=s=>s.time<dayStart(s.time)+12*HOUR;
export const BR_TRAVEL_CHOICES = {
 181:[choice('athens-see-jacques','Speak to Jacques Risee',57)],
 57:[choice('athens-charter-inquire','Ask about a charter',92),choice('athens-airport-return','Return to the terminal',181)],
 92:[
  choice('athens-charter-cairo','Charter a flight to Cairo',196,{destination:'cairoAirport',journey:3,when:beforeNoon,detail:'3 hours · depart before noon'}),
  choice('athens-charter-bremen','Charter a flight to Bremen',450,{destination:'bremenAirport',journey:8,when:beforeNoon,detail:'8 hours · depart before noon'}),
  choice('athens-airport-return','Return to the terminal',181)
 ],
 196:[choice('cairo-airport-cab','Go to the taxi stand',103,{destination:'cairoTaxis'})]
};

const journeys = {
 athensHarbor:[{mode:'ship',to:'bremenHarbor',hour:16,hours:120,days:[2,6]}],
 alexandriaHarbor:[{mode:'ship',to:'bremenHarbor',hour:16,hours:144,days:[1,5]}],
 athensRail:[{mode:'train',to:'bremenHarbor',hour:9,hours:72}],
 cairoAirport:[{mode:'plane',to:'bremenAirport',hour:9,hours:8},{mode:'plane',to:'athensAirport',hour:15,hours:3}]
};

export function bremenConnections(state) {
 return (journeys[state.location]||[]).map(route=>{
  let departure=dayStart(state.time)+route.hour*HOUR;
  while(departure<state.time||route.days&&!route.days.includes(new Date(departure).getUTCDay())) departure+=DAY;
  return {...route,id:`connection-${route.to}`,departure};
 });
}
