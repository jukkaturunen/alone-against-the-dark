const city = 'newYork';
const library = 'New York Public Library';

export const NYC_LOCATIONS = {
 grandCentral:{name:'Grand Central Station',entry:146,hours:[0,24],region:city,description:'Trains to Boston and a restaurant open around the clock.'},
 nyLibrary:{name:library,entry:74,hours:[9,21],region:city,description:'Research up to two topics per visit, any day of the week.'},
 nyHotel:{name:'Hotel with Room Service',entry:583,hours:[0,24],region:city,description:'A room for the night and 24-hour room service.'}
};

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const NYC_SCENES = {
 64:scene('Connections in Boston','Boston Railway Station',64,19,
  'The New York trains leave at 10 AM and 4 PM. They reach Grand Central Station at 5 PM and 10 PM, respectively.',
  'For Arkham, take the 10 AM, 1 PM, or 6 PM train. Each takes an hour. If you miss the last train, friends in Boston can put you up for the night.'),
 146:scene('Grand Central Station','New York City',146,31,
  'From Grand Central, you can go into the city or eat at the station restaurant.',
  'Trains back to Boston leave daily at 8 AM and 6 PM. They arrive at 3 PM and 12:30 AM, respectively.'),
 583:scene('A room for the night','New York City',583,89,
  'The room is warm, spacious, and clean. Once you’ve rested, the city is yours to explore.'),
 74:scene('Books brought to your table',library,74,21,
  'The librarians will bring you books on the subject you request. They can handle two topics per visit, each requiring two hours to study.',
  'The library is open from 9 AM to 9 PM daily. You can leave and come back for another visit.'),
 116:scene('An Egyptian origin',library,116,26,
  'Some scholars believe the Karpathos Device was made in Egypt and subsequently stolen. It may have been one of the devices associated with the pyramids of Aten.'),
 110:scene('Chambers inside solid stone',library,110,25,
  'Some of the devices were said to open hidden chambers in tombs. The chambers were supposedly inside stretches of seemingly solid rock. No intact device or hidden chamber has been found.'),
 85:scene('Baedeker’s Guide to Egypt',library,85,22,
  'A guidebook describes bustling markets and modern hotels alongside the monuments of antiquity. It also cautions visitors to avoid the mysterious cult of Aten in Cairo and Alexandria.'),
 161:scene('Directions to Fuzira',library,161,33,
  'You find directions to the Fuzira Marketplace. It is said to be a place where anything can be lost or gained, even a soul.'),
 63:scene('The treasures of Greece',library,63,19,
  'Greece has a long, complicated history. Its citizens take pride in their independence and fiercely guard the artifacts of their past.'),
 25:scene('A closely guarded collection',library,25,14,
  'Aristotle Mylonas, director of the National Museum in Athens, has kept the Karpathos Device out of public view for years. He considers a loan to another museum unthinkable.'),
 41:scene('Four volumes on the occult',library,41,16,
  'The librarians bring four books. Each can be examined with the appropriate Language roll. If you can read a book, allow another two hours to study it.'),
 62:scene('Die Mythe',library,62,19,
  'Many northern myths describe the world growing colder after the fall of the gods. One of the illustrations catches your attention.'),
 117:scene('An enchanted symbol',library,117,26,
  'You find an engraving of a symbol said to be enchanted. It seems important enough to copy into your notes.'),
 84:scene('Cultes des Goules',library,84,22,
  'A chapter recounts an incident among French Legionnaires in North Africa. Outpost guards were found strangled with flakes of dead, scaly skin on their throats.'),
 140:scene('Liber Ivonis',library,140,30,
  'The book speaks of the Lost City of the Old Ones, of treasures buried in ice, and of the shoggoths that condemned them to lie there until one more turn of Aten’s Top.',
  'Hieroglyphics in the text may yield another clue.'),
 157:scene('The Top of Aten',library,157,32,
  'The Top of Aten is said to be a magical relic from the age of Akhenaten. Some accounts blame it for the Old Kingdom’s fall. Others claim its makers were ancient powers that Akhenaten later worshiped.'),
 159:scene('Marvels of the Spirit World',library,159,32,
  'There are tales of the spirits of the pharaohs haunting the pyramids. A few witnesses claim they have seen the spirits themselves.'),
 182:scene('The sign of the cult of Aten',library,182,36,
  'You find the sign of the Egyptian death cult of Aten. It looks familiar.'),
 138:scene('Other subjects',library,138,30,
  'Three other subjects catch your eye. Each takes two hours and counts toward the same two topics the librarians can fetch this visit.'),
 163:scene('Dementia Antarctica',library,163,33,
  'The rescue party from Lake’s expedition returned from Antarctica babbling about subterranean horrors and lost cities. The survivors spent months in sanitariums. Some specialists blame isolation, cold, and poor diet.'),
 184:scene('Another expedition to the ice',library,184,36,
  'The Starkweather–Moore expedition will retrace the path of the ill-fated Lake–Douglas party. Its departure from Bremerhaven is planned for December.'),
 119:scene('Old One-Eyed Reilly',library,119,27,
  'In Micronesia, visitors wrote of islanders who feared an angry god rising from the sea. British sailors gave the figure depicted in the islands’ idols the name Old One-Eyed Reilly.'),
 88:scene('Omens in Germany',library,88,23,
  'Avant-garde circles have fallen out of favor. The occult is fashionable among younger politicians, who read the omens as promising a bright future for Germany.')
};

export const NYC_ENTRIES = {
 grandCentral:[146],
 nyLibrary:[74,116,110,85,161,63,25,41,62,117,84,140,157,159,182,138,163,184,119,88],
 nyHotel:[583]
};

function clue(title,type,entry,text,illustration={}) {
 return {title,type,source:NYC_SCENES[entry].source,text,...illustration};
}

export const NYC_CLUES = {
 karpathosOrigin:clue('The device may be Egyptian','Archaeological research',116,
  'Some scholars trace the Karpathos Device to Egypt. The device may have been stolen and may belong to the group of artifacts associated with the pyramids of Aten.'),
 hiddenChambers:clue('Chambers inside solid stone','Archaeological research',110,
  'The devices were said to open hidden tomb chambers in stretches of seemingly solid rock. Neither an intact device nor a chamber has been found.'),
 atenCult:clue('A warning about the cult of Aten','Baedeker’s Guide to Egypt',85,
  'The guide warns visitors to avoid the cult of Aten, a mysterious group in Cairo and Alexandria.'),
 fuziraDirections:clue('The Fuzira Marketplace','Travel notes',161,
  'You record directions to the Fuzira Marketplace, which is also called the place where souls are bartered.'),
 northernWinter:clue('Winter after the fall of the gods','Die Mythe',62,
  'In the northern myths, the world grows colder after the fall of the gods.'),
 enchantedSign:clue('An engraving said to be enchanted','Die Mythe',117,
  'You copy an engraving of a supposedly enchanted symbol from Die Mythe.',{
   source:'Entry 117 · pp. 26–27',image:'assets/enchanted-sign.png',
   alt:'An uneven, angular line engraved inside the outline of a triangle.'
  }),
 legionnaires:clue('The North African outpost','Cultes des Goules',84,
  'French Legionnaires at a North African outpost were found strangled. Flakes of dry, scaly skin clung to their throats.'),
 lostCity:clue('The city buried in ice','Liber Ivonis',140,
  'The Old Ones’ lost city and treasures lie buried in the ice, awaiting another turn of Aten’s Top. The passage names the shoggoths.'),
 atenTop:clue('The Top of Aten','Liber Ivonis · Translation notes',157,
  'The Top of Aten is associated with Akhenaten. Some scholars link it to the Old Kingdom’s collapse and claim that Akhenaten worshiped the powers that created it.'),
 atenSign:clue('The mark of the cult of Aten','Marvels of the Spirit World',182,
  'You recognize the sign of Aten’s cult as a shape you may have encountered before.',{
   image:'assets/aten-sign.png',
   alt:'Four hollow triangles meet at their tips to form a cross. A small X sits inside the right-hand triangle.'
  }),
 polarMadness:clue('Dementia Antarctica','Polar studies',163,
  'The party sent to rescue Lake’s expedition spoke afterward of lost cities and subterranean horrors. The survivors spent months in sanitariums.'),
 polarExpedition:clue('The Starkweather–Moore expedition','Polar studies',184,
  'The party intends to retrace Lake and Douglas’s route and plans to sail in December from Bremerhaven.'),
 pacificIdols:clue('Old One-Eyed Reilly','Pacific studies',119,
  'Sailors used the name for a figure seen in Micronesian idols. Residents feared an angry god rising from the sea.'),
 germanOmens:clue('Occult fashion in Germany','German studies',88,
  'Young politicians consult readings and portents which, they say, promise a bright future for Germany.')
};

export const NYC_ENTRY_CLUES = {
 25:'museum',116:'karpathosOrigin',110:'hiddenChambers',85:'atenCult',161:'fuziraDirections',
 62:'northernWinter',117:'enchantedSign',84:'legionnaires',140:'lostCity',157:'atenTop',
 182:'atenSign',163:'polarMadness',184:'polarExpedition',119:'pacificIdols',88:'germanOmens'
};

function check(entry,skill,label,successEntry,failureEntry,options={}) {
 return {entry,skill,label,successEntry,failureEntry,duration:0,repeat:true,...options};
}

function readBook(skill,label,successEntry) {
 return check(41,`Language (${skill})`,label,successEntry,undefined,{successDuration:2});
}

export const NYC_CHECKS = {
 'ny-archaeology-history':check(116,'History','Consider the archaeological evidence',110,74),
 'ny-archaeology-edu':check(116,'EDU','Draw on your education',110,74,{difficulty:'Hard'}),
 'ny-egyptology-library':check(85,'Library Use','Look for travel information',161,74),
 'ny-greece-edu':check(63,'EDU','Recall the Greek collections',25,74),
 'ny-occult-german':readBook('German','Read Die Mythe',62),
 'ny-occult-french':readBook('French','Read Cultes des Goules',84),
 'ny-occult-latin':readBook('Latin','Read Liber Ivonis',140),
 'ny-occult-english':readBook('English','Read Marvels of the Spirit World',159),
 'ny-occult-symbol':check(62,'Luck','Examine the illustration',117,74),
 'ny-occult-translate':check(140,'Language (Hieroglyphics)','Decipher the hieroglyphics',157),
 'ny-occult-spot':check(159,'Spot Hidden','Look closely at the illustrations',182),
 'ny-polar-luck':check(163,'Luck','Look for news of another expedition',184,138)
};

function topic(id,label,target) {
 return {id,label,target,detail:'2 hours · 1 topic',duration:2,topic:true};
}

function link(id,label,target) {
 return {id,label,target,detail:'No time passes',duration:0};
}

const back = link('ny-library-return','Return to the main reading room',74);
const books = link('ny-occult-return','Continue looking through the occult books',41);
const others = link('ny-topics-return','Return to the other subjects',138);

export const NYC_CHOICES = {
 74:[
  topic('ny-study-archaeology','Study archaeology',116),
  topic('ny-study-egyptology','Study Egyptology',85),
  topic('ny-study-greece','Study Greece',63),
  topic('ny-study-occult','Study the occult',41),
  link('ny-other-topics','Browse other subjects',138)
 ],
 138:[
  topic('ny-study-polar','Study Antarctica',163),
  topic('ny-study-pacific','Study Pacific islands',119),
  topic('ny-study-germany','Study Germany',88),
  back
 ],
 25:[back],
 110:[back],
 161:[back],
 41:[back],
 117:[books,back],
 84:[books,back],
 140:[books,back],
 157:[books,back],
 159:[books,back],
 182:[books,back],
 184:[others,back],
 119:[others,back],
 88:[others,back]
};
