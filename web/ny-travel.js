const region = 'newYork';
export const NY_TRAVEL_LOCATIONS = {
 pier:{name:'Pier 56 · Cunard Lines',entry:104,region,hours:[0,24],description:'Saturday sailings to Athens and Alexandria.'},
 nyStore:{name:'Empire General Merchandise Emporium',entry:38,region,hours:[8,19],lastWeekday:6,description:'Equipment and travel supplies.'},
 nyHospital:{name:'New York Hospital',entry:585,region,hours:[0,24],description:'Recover health with a full day of care.'},
 nyVendors:{name:'Street food vendors',entry:586,region,hours:[0,24],description:'A quick meal at any hour.'},
 nyTaxi:{name:'New York taxis',entry:56,region,hours:[0,24],description:'Hire a cab and choose a city destination.'},
 liner:{name:'Cunard liner',entry:187,region:'atSea',hours:[0,24],description:'The crossing to Europe.'}
};
export const NY_TRAVEL_ENTRIES = {
 pier:[104],nyStore:[38],nyHospital:[585],nyVendors:[586,12],nyTaxi:[56],liner:[187]
};

function scene(title,eyebrow,entry,page,paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}
export const NY_TRAVEL_SCENES = {
 104:scene('Saturday sailing','Pier 56',104,25,[
  'The Cunard representative tells you that a liner sails every Saturday at noon. It reaches Athens at noon nine days later and Alexandria at 1 PM the following day.',
  'Tickets include all meals. Until departure, you can make further preparations in the city.'
 ]),
 187:scene('Aboard the Cunard liner','Atlantic crossing',187,37,[
  'You board the liner. For the crossing, the adventure tracks days and shipboard activities instead of hours.',
  'Your dossier is saved at embarkation. Shipboard scenes will follow in a later release.'
 ]),
 56:scene('A cab in New York','New York City',56,18,[
  'Cabs are available for single trips or for the day. Choose where to go next from the New York locations.'
 ]),
 586:scene('A meal at the street stand','New York City',586,90,[
  'Small stands serve hot food throughout the city. Pick up something to eat and continue your investigation.'
 ]),
 12:scene('A sudden stomachache','New York City',12,11,[
  'The food seemed fine at the time. Now your stomach is churning. A Constitution check determines how quickly you recover.'
 ])
};

export const NY_TRAVEL_CHECKS = {
 'street-food-con':{entry:12,skill:'CON',label:'See if the sickness passes',duration:0,repeat:true,
  successEntry:586,failureEntry:586,failureDuration:3,failureDamage:1}
};
