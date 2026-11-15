// Investigator handouts, booklet pp. 5–8. Skill values override the common defaults.
export const INVESTIGATORS = {
 grunewald:{
  key:'grunewald', name:'Louis Grunewald', occupation:'Professor', residence:'Arkham', age:53, initials:'LG',
  description:'A professor at Miskatonic University receives an urgent telegram from a friend in Athens.',
  characteristics:{STR:70, CON:50, SIZ:45, DEX:60, INT:70, APP:55, POW:55, EDU:93},
  hp:9, sanity:55, luck:50, funds:2200,
  skills:{
   'Credit Rating':35, 'History':45, 'Language (German)':90, 'Language (English)':60,
   'Language (Latin)':45, 'Language (Nordic)':40, 'Language (Hieroglyphics)':50,
   'Library Use':60, 'Persuade':40, 'Psychology':30, 'Science (Cryptography)':40
  },
  suggested:{'Library Use':20, 'Spot Hidden':30, 'Listen':20, 'Persuade':20, 'Stealth':20, 'Dodge':20, 'Language (Greek)':20},
  inventory:['Passport', 'Packed clothes and sundries'],
  page:5, entry:13, location:'home'
 },
 holt:{
  key:'holt', name:'Ernest Holt', occupation:'Industrialist', residence:'New York City', age:62, initials:'EH',
  description:'A New York industrialist sets out to find his friend after Grunewald’s telegrams stop.',
  characteristics:{STR:45, CON:35, SIZ:80, DEX:55, INT:80, APP:60, POW:50, EDU:65},
  hp:11, sanity:50, luck:55, funds:35000,
  skills:{
   'Accounting':25, 'Credit Rating':50, 'Dodge':30, 'Firearms (Handgun)':40, 'Intimidate':50,
   'Language (English)':65, 'Language (German)':25, 'Law':20, 'Listen':30, 'Persuade':40,
   'Psychology':30, 'Spot Hidden':50, 'Throw':30
  },
  suggested:{'Firearms (Handgun)':30, 'Library Use':30, 'Persuade':20, 'Spot Hidden':20, 'Listen':20, 'Dodge':30},
  inventory:['Passport', 'Packed clothes and sundries', 'Revolver', '12-gauge shotgun'],
  page:6, entry:36, location:'holtApartment'
 },
 lau:{
  key:'lau', name:'Lydia Lau', occupation:'Reporter, New York Sun', residence:'New York City', age:23, initials:'LL',
  description:'A New York Sun reporter follows the disappearances of Holt and her former professor.',
  characteristics:{STR:55, CON:60, SIZ:45, DEX:65, INT:70, APP:65, POW:60, EDU:70},
  hp:10, sanity:60, luck:60, funds:700,
  skills:{
   'Art/Craft (Copy Writing)':65, 'Credit Rating':20, 'Dodge':30, 'Fast Talk':45, 'History':40,
   'Language (English)':70, 'Language (Hieroglyphics)':20, 'Listen':35, 'Psychology':40,
   'Science (Cryptography)':20, 'Spot Hidden':60, 'Stealth':50
  },
  suggested:{'Library Use':35, 'Firearms (Handgun)':30, 'Fast Talk':20, 'Spot Hidden':15, 'Listen':20, 'Dodge':30},
  inventory:['Passport', 'Packed clothes and sundries', 'Revolver'],
  page:7, entry:37, location:'lauApartment'
 },
 wilson:{
  key:'wilson', name:'Devon Wilson', occupation:'Sailor, US Navy', residence:'Norfolk, VA', age:28, initials:'DW',
  description:'An officer on leave from the USS Rochester goes ashore to search for Lydia Lau.',
  characteristics:{STR:70, CON:60, SIZ:70, DEX:60, INT:65, APP:50, POW:80, EDU:85},
  hp:13, sanity:80, luck:55, funds:2500,
  skills:{
   'Credit Rating':30, 'Dodge':30, 'First Aid':40, 'Language (English)':85, 'Language (German)':20,
   'Mechanical Repair':35, 'Navigate':60, 'Pilot (Boat)':60, 'Science (Cryptography)':10,
   'Survival (Sea)':40, 'Survival (Desert)':30, 'Swim':45
  },
  suggested:{'Firearms (Handgun)':35, 'Spot Hidden':30, 'Listen':20, 'Dodge':25, 'Library Use':25, 'First Aid':15},
  inventory:['Passport', 'Packed clothes and sundries', 'Revolver', '.30-06 rifle', 'Photograph of Lydia Lau'],
  page:8, entry:554, location:'rochester'
 }
};

export const COMMON_SKILLS = {
 'Accounting':5,'Anthropology':1,'Appraise':5,'Archaeology':1,'Art/Craft (Photography)':5,'Charm':15,'Climb':20,'Credit Rating':0,'Disguise':5,'Dodge':30,'Drive Auto':20,'Electrical Repair':10,'Fast Talk':5,'Fighting (Brawl)':25,'Firearms (Handgun)':20,'Firearms (Rifle/Shotgun)':25,'First Aid':30,'History':5,'Intimidate':15,'Jump':20,'Language (German)':1,'Language (English)':1,'Language (Latin)':1,'Language (Nordic)':1,'Language (Hieroglyphics)':1,'Language (Greek)':1,'Language (French)':1,'Language (Arabic)':1,'Law':5,'Library Use':20,'Listen':20,'Locksmith':1,'Mechanical Repair':10,'Medicine':1,'Natural World':10,'Navigate':10,'Occult':5,'Operate Heavy Machinery':1,'Persuade':10,'Pilot (Aircraft)':1,'Psychoanalysis':1,'Psychology':10,'Ride':5,'Science (Astronomy)':1,'Science (Cryptography)':1,'Sleight of Hand':10,'Spot Hidden':25,'Stealth':20,'Survival (Desert)':10,'Survival (Sea)':10,'Swim':20,'Throw':20,'Track':10
};

export const ORDER = ['grunewald', 'holt', 'lau', 'wilson'];

export function startingHealth(s) {
 return INVESTIGATORS[s.investigator??ORDER[0]].hp;
}

export function trainedSkill(s, name) {
 const {skills}=INVESTIGATORS[s.investigator??ORDER[0]];
 return (skills[name]??COMMON_SKILLS[name]??0)+(s.allocation[name]||0);
}

export const SUCCESSOR_LOCATIONS = {
 holtApartment:{name:'Ernest Holt’s apartment', entry:36, region:'newYork', hours:[0,24], description:'Holt makes his preparations here before leaving New York.'},
 lauApartment:{name:'Lydia Lau’s apartment', entry:37, region:'newYork', hours:[0,24], description:'Lau readies her belongings before following the story.'},
 rochester:{name:'USS Rochester', entry:554, region:'rochester', hours:[0,24], description:'Wilson starts his leave here, with the cruiser at anchor.'}
};

export const SUCCESSOR_SCENES = {
 36:{title:'Seventy-two hours of silence', eyebrow:SUCCESSOR_LOCATIONS.holtApartment.name, source:'Entry 36 · p. 15', adapted:true, paragraphs:[
  'Grunewald’s telegrams stopped three days ago. Your inquiries have brought no answers, and what he told you makes you think this is a matter to handle in person. You leave instructions for your staff and arrange the visas. Jenkins can have your bags ready well before the liner sails.',
  'You telephone Lydia Lau at the New York Sun. She has heard nothing from Grunewald either. You ask her to hold the story for a few days, though neither of you sounds convinced there is an ordinary explanation. In the morning, you can make your next stop in New York.'
 ]},
 37:{title:'A story worth following', eyebrow:SUCCESSOR_LOCATIONS.lauApartment.name, source:'Entry 37 · p. 16', adapted:true, paragraphs:[
  'The editors have agreed to let you follow the story. Gliere is dead, Grunewald is missing, and it has been three days since anyone heard from Holt. You pack the revolver a vice-squad officer gave you. There is time to shop or do some research before a liner sails, and you might even get to Arkham.',
  'You wire Devon Wilson aboard the USS Rochester to tell him where you are going and promise to keep in touch. In the morning, you can make your next stop in New York.'
 ]},
 // Entry 554 calls her Nora. The investigator sheets and entry 37 identify her as Lydia Lau.
 554:{title:'Seven days without a telegram', eyebrow:SUCCESSOR_LOCATIONS.rochester.name, source:'Entry 554 · p. 84', adapted:true, paragraphs:[
  'The Rochester is at anchor and you have a month’s leave. Lydia’s telegrams stopped seven days ago while you were still at sea. With Gliere dead and both Grunewald and Holt missing, you decide to find her yourself. You pack her photograph and your service revolver.',
  'Choose the port where the Rochester is anchored. You can pick up supplies and continue your search ashore.'
 ]}
};
