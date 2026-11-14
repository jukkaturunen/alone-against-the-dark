const newspaper = 'New York Sun';
export const NEWS_AVAILABILITY_ENTRY = 'ny-sun-search';

export const NEWS_LOCATIONS = {
 nySun:{name:'New York Sun Newspaper',entry:86,hours:[5,14],region:'newYork',
  description:'News of Gliere, the Karpathos Device, and the Antarctic expedition.'}
};

export const NEWS_ENTRIES = {
 nySun:[NEWS_AVAILABILITY_ENTRY,86,95,178,190,156]
};

function scene(title,source,...paragraphs) {
 return {title,eyebrow:newspaper,source,paragraphs,adapted:true};
}

export const NEWS_SCENES = {
 [NEWS_AVAILABILITY_ENTRY]:scene('A search for a copy','Location tables · Handouts p. 3',
  'The paper is normally available from 5 AM to 2 PM. Outside those hours, you might still find a copy with a little luck.'),
 86:scene('News from Athens and Bremerhaven','Entry 86 · p. 22',
  'The long-delayed Starkweather–Moore expedition expects to depart for Antarctica in late December. Bremerhaven, Germany, will be its final European port of call.',
  'Dr. Tibor Gliere of Miskatonic University has been arrested on suspicion of stealing an antiquity. Dean Wilcox tells the paper that Professor Louis Grunewald has gone to Athens to investigate on the university’s behalf.'),
 95:scene('A death in Athens','Entry 95 · p. 24',
  'The Sun reports that Professor Gliere died by suicide, shocking his colleagues at Miskatonic University. The university has received no word from Professor Grunewald.'),
 178:scene('The Karpathos Device reaches Cairo','Entry 178 · p. 35',
  'The Karpathos Device has reached Cairo for an extended exhibition. Amet Keh, the curator, is said to be delighted to have it on loan.'),
 190:scene('The device and its curator disappear','Entry 190 · p. 38',
  'Egyptian authorities are baffled by the disappearance of the Karpathos Device and Amet Keh. Pisistratos at the National Museum in Athens has declined to comment.'),
 156:scene('The expedition sails','Entry 156 · p. 32',
  'The dispatch from Bremerhaven is dated December 20. Crowds turned out in record cold to watch the Starkweather–Moore expedition depart under clear skies and on calm seas.')
};

function clipping(entry) {
 const {title,source,paragraphs}=NEWS_SCENES[entry];
 return {title,type:newspaper,source,text:paragraphs.join('\n\n')};
}

export const NEWS_CLUES = {
 sunFirstReports:clipping(86),
 sunGliere:clipping(95),
 sunCairoExhibition:clipping(178),
 sunMissingDevice:clipping(190),
 sunExpeditionDeparture:clipping(156)
};

export const NEWS_ENTRY_CLUES = {
 86:'sunFirstReports',95:'sunGliere',178:'sunCairoExhibition',190:'sunMissingDevice',
 156:'sunExpeditionDeparture'
};

export const NEWS_CHECKS = {
 'ny-sun-luck':{entry:NEWS_AVAILABILITY_ENTRY,skill:'Luck',label:'Look for a copy of the Sun',
  successEntry:86,duration:0,repeat:false}
};

function read(id,target,availableFrom) {
 return {id,label:'Read the next report',detail:'No time passes',target,duration:0,availableFrom};
}

export const NEWS_CHOICES = {
 86:[read('ny-sun-gliere',95,Date.UTC(1931,8,9))],
 95:[read('ny-sun-exhibition',178,Date.UTC(1931,9,16))],
 178:[read('ny-sun-disappearance',190,Date.UTC(1931,10,1))],
 190:[read('ny-sun-expedition',156,Date.UTC(1931,11,1))]
};
