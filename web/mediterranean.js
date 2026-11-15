import { DAY, HOUR, dayStart } from './calendar.js';

export const MED_LOCATIONS = {
 athensRail:{name:'Athens Railway Station',entry:183,region:'athens',hours:[0,24],description:'A station restaurant and rail connections.'},
 athensHotel:{name:'Moderate Athens hotel',entry:101,region:'athens',hours:[0,24],description:'A room for your first night in Athens.'},
 athensHospital:{name:'Athens hospital',entry:585,region:'athens',hours:[0,24],description:'Recover health with a full day of care.'},
 athensVendors:{name:'Athens street food vendors',entry:586,region:'athens',hours:[0,24],description:'A quick meal at any hour.'},
 alexandriaStore:{name:'Alexandria Outfitters and Suppliers',entry:38,region:'alexandria',hours:[8,19],
  windows:[[8,12],[15,19]],hoursLabel:'8 AM–noon and 3–7 PM · Mon–Fri',description:'Pick up equipment and supplies.'},
 cairoHospital:{name:'Cairo hospital',entry:585,region:'cairo',hours:[0,24],description:'Recover health with a full day of care.'},
 cairoVendors:{name:'Cairo street food vendors',entry:586,region:'cairo',hours:[0,24],description:'A quick meal at any hour.'}
};

export const MED_ENTRIES = {
 athensRail:[183],athensHotel:[101],athensHospital:[585],athensVendors:[586,12],
 alexandriaStore:[38],cairoHospital:[585],cairoVendors:[586,12]
};

export const MED_SCENES = {
 101:{title:'A quiet room in Athens',eyebrow:'Moderate hotel',source:'Entry 101 · p. 25',adapted:true,
  paragraphs:['The hotel offers a clean room and a quiet first night.']},
 183:{title:'An onlooker at the station',eyebrow:'Athens Railway Station',source:'Entry 183 · p. 36',adapted:true,
  paragraphs:['The railway connects Athens to Cairo and Bremen. A man looks up from his newspaper and studies you intently. You can order a meal or head into the city.']}
};

const sailings = {
 athensHarbor:{to:'alexandriaHarbor',weekdays:[2,5]},
 alexandriaHarbor:{to:'athensHarbor',weekdays:[3,6]}
};

export function steamerOption(s) {
 const route=sailings[s.location];
 if(!route) return null;
 let departure=dayStart(s.time)+15*HOUR;
 while(departure<s.time||!route.weekdays.includes(new Date(departure).getUTCDay())) departure+=DAY;
 return {to:route.to,departure,arrival:departure+DAY};
}
