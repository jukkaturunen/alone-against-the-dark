import { DS_LOCATIONS, DS_SCENES, DS_CLUES, DS_CHECKS } from './dark-sea.js';
import { AP_SCENES, AP_CLUES, AP_CHECKS } from './antarctic-approach.js';
import { LC_SCENES, LC_CLUES, LC_CHECKS } from './lost-city.js';
import { BR_LOCATIONS, BR_SCENES, BR_CLUES, BR_CHECKS } from './bremen.js';
import { BR_TRAVEL_LOCATIONS, BR_TRAVEL_SCENES } from './bremen-travel.js';
import { PUZZLE_SCENES, PUZZLE_CLUES, PUZZLE_CHECKS } from './amarna-puzzle.js';
import { UPPER_SCENES, UPPER_CLUES, UPPER_CHECKS } from './amarna-upper.js';
import { EXTERIOR_SCENES, EXTERIOR_CHECKS } from './amarna-exterior.js';
import { CITY_LOCATIONS, CITY_SCENES, CITY_CLUES, CITY_CHECKS } from './cairo-city.js';
import { ROAD_LOCATIONS, ROAD_SCENES } from './egypt-road.js';
import { PAR_LOCATIONS, PAR_SCENES, PAR_CLUES, PAR_CHECKS } from './parthenon.js';
import { CM_LOCATIONS, CM_SCENES, CM_CLUES, CM_CHECKS } from './cairo-museum.js';
import { AM_LOCATIONS, AM_SCENES, AM_CLUES, AM_CHECKS } from './athens-museum.js';
import { CAFE_LOCATIONS, CAFE_SCENES, CAFE_CLUES, CAFE_CHECKS } from './athens-cafe.js';
import { CASE_LOCATIONS, CASE_SCENES, CASE_CLUES, CASE_CHECKS } from './athens-case.js';
import { EGYPT_LOCATIONS, EGYPT_SCENES, EGYPT_CLUES, EGYPT_CHECKS } from './alexandria-route.js';
import { MED_LOCATIONS, MED_SCENES } from './mediterranean.js';
import { COMBAT_SCENES, COMBAT_CHECKS } from './liner-combat.js';
import { LINER_SCENES, LINER_ARRIVALS } from './liner.js';
import { EARLY_SCENES, EARLY_CLUES, EARLY_CHECKS } from './liner-early.js';
import { LATE_SCENES, LATE_CLUES, LATE_CHECKS } from './liner-late.js';
import { CONTACT_LOCATIONS, CONTACT_SCENES, CONTACT_CLUES } from './ny-contacts.js';
import { NEWS_LOCATIONS, NEWS_SCENES, NEWS_CLUES, NEWS_CHECKS } from './ny-news.js';
import { NY_TRAVEL_LOCATIONS, NY_TRAVEL_SCENES, NY_TRAVEL_CHECKS } from './ny-travel.js';
import { NYC_SCENES, NYC_LOCATIONS, NYC_CLUES, NYC_CHECKS } from './new-york.js';
import { SERVICES_SCENES } from './arkham-services.js';
import { LATER_SCENES } from './arkham-later.js';
import { HARDING_SCENES, HARDING_CLUES, HARDING_CHECKS } from './harding.js';
// Verified against the user's PDFs. Printed page references, not PDF page offsets.
export const SOURCE = { adventure: 'Alone Against the Dark (2017/2020)', rules: 'Call of Cthulhu Keeper Rulebook, 7th edition' };
export const BASE_SKILLS = {
 'Accounting':5,'Anthropology':1,'Appraise':5,'Archaeology':1,'Art/Craft (Photography)':5,'Charm':15,'Climb':20,'Credit Rating':35,'Disguise':5,'Dodge':30,'Drive Auto':20,'Electrical Repair':10,'Fast Talk':5,'Fighting (Brawl)':25,'Firearms (Handgun)':20,'Firearms (Rifle/Shotgun)':25,'First Aid':30,'History':45,'Intimidate':15,'Jump':20,'Language (German)':90,'Language (English)':60,'Language (Latin)':45,'Language (Nordic)':40,'Language (Hieroglyphics)':50,'Language (Greek)':1,'Language (French)':1,'Language (Arabic)':1,'Law':5,'Library Use':60,'Listen':20,'Locksmith':1,'Mechanical Repair':10,'Medicine':1,'Natural World':10,'Navigate':10,'Occult':5,'Operate Heavy Machinery':1,'Persuade':40,'Pilot (Aircraft)':1,'Psychoanalysis':1,'Psychology':30,'Ride':5,'Science (Astronomy)':1,'Science (Cryptography)':40,'Sleight of Hand':10,'Spot Hidden':25,'Stealth':20,'Survival (Desert)':10,'Swim':20,'Throw':20,'Track':10
};
export const SUGGESTED = {'Library Use':20,'Spot Hidden':30,'Listen':20,'Persuade':20,'Stealth':20,'Dodge':20,'Language (Greek)':20};
export const LOCATIONS = {
 home:{name:"Grunewald’s home",entry:102,hours:[0,24],description:'A quiet place to eat, rest, and make telephone calls.'},
 bank:{name:'First National Bank',entry:3,hours:[9,15],description:'Withdraw travel funds from your account.'},
 newspaper:{name:'Arkham Advertiser',entry:60,hours:[8,17],description:'News, shipping schedules, and back-issue files.'},
 university:{name:'Miskatonic University',entry:82,hours:[8,17],description:'The History Department, Dean Wilcox, and the library.'},
 diner:{name:'Bee’s Diner',entry:593,hours:[6,17],description:'Breakfast, lunch, and dinner.'},
 depot:{name:'Arkham Depot',entry:16,hours:[0,24],description:'Trains to Boston: 9 AM, noon, and 5 PM.'},
 harding:{name:'Harding House',entry:113,hours:[8,20],description:'Mrs. Harding keeps Gliere’s room here. Visit by day, or approach quietly at night.'},
 store:{name:'General Store',entry:38,hours:[8,17],description:'Pick up equipment and supplies.'},
 hospital:{name:'Hospital',entry:585,hours:[0,24],description:'Recover health with a full day of care.'},
 boston:{name:'Boston Railway Station',entry:64,hours:[0,24],description:'Connections to Arkham and New York.',region:'boston'},
 ...NYC_LOCATIONS,
 ...CONTACT_LOCATIONS,
 ...NEWS_LOCATIONS,
 ...NY_TRAVEL_LOCATIONS,
 ...LINER_ARRIVALS,
 ...MED_LOCATIONS,
 ...EGYPT_LOCATIONS,
 ...CASE_LOCATIONS,
 ...CAFE_LOCATIONS,
 ...AM_LOCATIONS,
 ...CM_LOCATIONS,
 ...ROAD_LOCATIONS,
 ...PAR_LOCATIONS,
 ...CITY_LOCATIONS,
 ...BR_TRAVEL_LOCATIONS,
 ...BR_LOCATIONS,
 ...DS_LOCATIONS,
 antarctica:{name:'Antarctica Base Camp',entry:520,region:'antarctica',hours:[0,24],description:'The Starkweather–Moore expedition camp.'}
};
export const CLUES = {
 ...HARDING_CLUES,
 ...NYC_CLUES,
 ...EGYPT_CLUES,
 ...CASE_CLUES,
 ...CAFE_CLUES,
 ...AM_CLUES,
 ...CM_CLUES,
 ...UPPER_CLUES,
 ...PUZZLE_CLUES,
 ...BR_CLUES,
 ...DS_CLUES,
 ...AP_CLUES,
 ...LC_CLUES,
 ...PAR_CLUES,
 ...CITY_CLUES,
 ...EARLY_CLUES,
 ...LATE_CLUES,
 ...CONTACT_CLUES,
 ...NEWS_CLUES,
 telegram:{title:'A telegram from Gliere',type:'Telegram · Dark 1',source:'Entry 13 · p. 12',text:'ATHENS, GREECE 9/1/31 via Kingspoint Station\n\nIN JAIL FOR ANTIQUITY THEFT — STOP — NEED HELP — STOP — CAN YOU COME STOP URGENT — STOP — SEE CORPORAL ILIONAS ATHENS BUREAU OF INVESTIGATION.\n\nGLIERE'},
 sailings:{title:'Cunard sailing schedule',type:'Travel information',source:'Entry 136 · p. 29',text:'A Cunard liner departs Pier 56 in New York City every Saturday for Athens and Alexandria, with intermediate stops. The trip takes nine days to Athens and one more to Alexandria.'},
 curator:{title:'A new curator in Athens',type:'Arkham Advertiser · 20 July 1931',source:'Entry 80 · p. 21',text:'In a gala ceremony, Zeno Pisistratos was installed as curator of the National Museum of Archaeology at Athens today. Pisistratos, an expert in Greek and Egyptian antiquities, is said to be interested in arranging exchange-exhibits with other important world museums.'},
 mylonas:{title:'The death of Aristotle Mylonas',type:'Arkham Advertiser · 1 July 1931',source:'Entry 48 · pp. 17–18',text:'Aristotle Mylonas, Director of the National Museum of Archaeology in Athens, died today in a bizarre automobile accident. His car, apparently going much too fast, spun through the railing of a stone bridge across the Illissus River. This internationally known scholar, largely responsible for the protection of many Greek national treasures, will be sorely missed. A reclusive man, Mylonas was unmarried and without other family. He declared always that his beloved Greece was both mother and father to him.'},
 discovery:{title:'The Karpathos discovery',type:'Arkham Advertiser · 8 June 1900',source:'Entry 125 · p. 27',text:'Greek sponge divers have recovered a puzzling device off the island of Karpathos, a small island between Crete and Turkey. The device is a mechanism believed to be thousands of years old, yet bright and untarnished, as though made yesterday. Scientists have declined comment on the metal from which the device is made. Archaeological experts from the National Museum have taken possession of the oddity for further study.'},
 device:{title:'An ancient mechanism',type:'Archaeological report',source:'Entry 168 · p. 34',text:'The archaeological team at the National Museum in Athens have reported on the Karpathos Device, noting the inexplicable markings on its surfaces and the complex network of gears and linkages. The team has established that the Device is at least 2,000 years old, although some suggest it might hold a more ancient date. The report implies an ancient level of technical achievement previously undreamt of by scholars.\n\nCryptic Greek inscriptions were found on the outside edges of some gears, while some interior sections were marked with unusual Egyptian hieroglyphics. The team makes no guess about the function of the Device.'},
 museum:{title:'A closely guarded collection',type:'Great Museums of the Modern World',source:'Entry 25 · p. 14',text:'Aristotle Mylonas, while collecting an undeniably-tremendous treasure house of Greek art, has been reluctant to loan or even to show some of the National Museum’s most interesting treasures. The Karpathos Device, for example, has not been displayed for years. Its loan to other museums is, according to Mylonas, unthinkable.'},
 myths:{title:'The destruction myths',type:'T. Gliere · The Destruction Myths',source:'Entry 70 · p. 20',text:'The myth of the cataclysm, or the upheaval, is one of the oldest tales and is found in nearly every culture. These imagined events occurred, according to some Nordic myths, three or four thousand years ago. Other legends, notably those told by the Shikastra sect of Tibet, date the world changing disaster to as recently as 850 BC.'}
};
export const CHECKS = {
 ...HARDING_CHECKS,
 ...NYC_CHECKS,
 ...EGYPT_CHECKS,
 ...CASE_CHECKS,
 ...CAFE_CHECKS,
 ...AM_CHECKS,
 ...CM_CHECKS,
 ...UPPER_CHECKS,
 ...PUZZLE_CHECKS,
 ...BR_CHECKS,
 ...DS_CHECKS,
 ...AP_CHECKS,
 ...LC_CHECKS,
 ...EXTERIOR_CHECKS,
 ...PAR_CHECKS,
 ...CITY_CHECKS,
 ...COMBAT_CHECKS,
 ...EARLY_CHECKS,
 ...LATE_CHECKS,
 ...NY_TRAVEL_CHECKS,
 ...NEWS_CHECKS,
 'news-library':{entry:60,skill:'Library Use',clue:'mylonas',target:48,repeat:false,daily:true},
 'news-spot':{entry:60,skill:'Spot Hidden',clue:'discovery',target:125,repeat:false,daily:true},
 'news-luck':{entry:60,skill:'Luck',clue:'device',target:168,repeat:false,daily:true},
 'library-use':{entry:145,skill:'Library Use',clue:'museum',target:25,repeat:true},
 'library-spot':{entry:145,skill:'Spot Hidden',clue:'myths',target:70,repeat:true}
};
export const SCENES = {
 ...HARDING_SCENES,
 ...LATER_SCENES,
 ...NYC_SCENES,
 ...NY_TRAVEL_SCENES,
 ...LINER_SCENES,
 ...MED_SCENES,
 ...EGYPT_SCENES,
 ...CASE_SCENES,
 ...CAFE_SCENES,
 ...AM_SCENES,
 ...CM_SCENES,
 ...ROAD_SCENES,
 ...UPPER_SCENES,
 ...PUZZLE_SCENES,
 ...EXTERIOR_SCENES,
 ...PAR_SCENES,
 ...CITY_SCENES,
 ...BR_TRAVEL_SCENES,
 ...BR_SCENES,
 ...DS_SCENES,
 ...AP_SCENES,
 ...LC_SCENES,
 ...COMBAT_SCENES,
 ...EARLY_SCENES,
 ...LATE_SCENES,
 ...CONTACT_SCENES,
 ...NEWS_SCENES,
 ...SERVICES_SCENES,
 13:{title:'A telegram at dusk',eyebrow:'The first of September, 1931',source:'Entry 13 · pp. 11–12',paragraphs:[
 'For you, Professor Louis Grunewald, this first day of September 1931 has been tiring and uncomfortable. Light mist has covered Arkham for most of the day. You held two uninspired undergraduate classes at Miskatonic University, and you met with the new chairman of the literature Department, a giddy Technocrat.',
 'You survey your desk and see that a stack of papers to grade has already formed. You’re enjoying your second pipe of the evening, and putting off grading papers, when the doorbell rings. To your surprise, it’s a telegraphic messenger.',
 '“It arrived at Kingspoint Head station not more than an hour ago,” the boy says.',
 'You sign for it, and slip a dime into the youngster’s hand. “Oh, thank you, sir!” You open the envelope and scan the contents.'
 ]},
 102:{title:'Before the journey',eyebrow:'Grunewald’s home',source:'Entry 102 · p. 25',paragraphs:['Your passport is in order; your clothes and sundries are packed. Gliere needs your help in Athens. There is still time to prepare before leaving Arkham.','At home, you can rest, eat, and telephone for local information. Your next destination is yours to choose.'],adapted:true},
 3:{title:'Travel funds',eyebrow:'Arkham First National Bank',source:'Entry 3 · p. 10',paragraphs:['Deposits and withdrawals are possible between 9 AM and 3 PM, Monday to Friday. Your account is here, and you can withdraw up to the cash amount on your investigator sheet.']},
 60:{title:'The morning papers',eyebrow:'Arkham Advertiser',source:'Entry 60 · p. 19',paragraphs:['The newspaper can provide scheduled sailings of ocean liners and news of Athens. Its back-issue files may hold something more.','Each hour of browsing gives you one research attempt. Each of the three approaches can be tried once today.'],adapted:true},
 82:{title:'Familiar corridors',eyebrow:'Miskatonic University',source:'Entry 82 · p. 22',paragraphs:['You can visit the university library, see Dr. Martin Fen, Chairman of the History Department, or speak with the Dean.','The library is open from 9 AM to 9 PM, Monday to Saturday.'],adapted:true},
 122:{title:'Dr. Martin Fen',eyebrow:'The History Department',source:'Entry 122 · p. 27',paragraphs:['His eyes narrow when he hears your news. “Gliere in jail? And you want to go rescue him? You’d best talk to Dean Wilcox.”']},
 100:{title:'A leave of absence',eyebrow:'Dean Wilcox’s office',source:'Entry 100 · p. 24',paragraphs:['The Dean shakes his head. “Out of the question, Grunewald. I already have that young dolt Perkins covering for Gliere. And now you want to leave? Not a chance, sir.”','Does the Dean leave you no choice?']},
 186:{title:'An abrupt change of heart',eyebrow:'Dean Wilcox’s office',source:'Entry 186 · p. 38',paragraphs:['“Oh. Resign? Ahem. My dear fellow, I apologize! I should have recognized how serious you were. Go! Save poor Gliere’s hide. I know you’ll do it speedily and judiciously. The University will certainly pay for your round-trip ticket.”','As you leave, you hear footsteps move quickly away from the door. But when you look out, the hallway is empty.']},
 145:{title:'Among the stacks',eyebrow:'Miskatonic University library',source:'Entry 145 · p. 30',paragraphs:['For each hour at Miskatonic’s library, attempt a Library Use or Spot Hidden roll. You may continue researching while the library is open, return to the university, or leave for another Arkham location.'],adapted:true},
 593:{title:'A place at the counter',eyebrow:'Bee’s Diner',source:'Entry 593 · p. 90',paragraphs:['Open from 6 AM to 5 PM, you can get breakfast, lunch, and dinner here. When you’ve had your fill, go to any Arkham location.']},
 16:{title:'The Boston train',eyebrow:'Arkham Depot',source:'Entry 16 · p. 13',paragraphs:['Trains to Boston leave at 9 AM, noon, and 5 PM. The trip takes one hour. You may wait for your train, or leave for another Arkham location.']},
 574:{title:'The world turns',eyebrow:'The end',source:'Entry 574 · p. 87',paragraphs:['You have failed. Coastlines flood, storms sweep the continents, and melting polar ice fuels the devastation. Scientists claim that the Earth has somehow shifted on its axis. Within days, much of the world of humankind is destroyed.','The City of the Old Ones has a new master, and the whole world pays for your failure.'],adapted:true}
};
