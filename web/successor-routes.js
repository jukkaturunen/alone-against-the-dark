const holtApartment = 'Ernest Holt’s apartment';
const grunewaldHome = 'Grunewald’s home';
const holtVisit = 'lau-visits-holt';

export const SR_LOCATIONS = {
 holtApartmentVisit:{
  name:holtApartment,entry:holtVisit,region:'newYork',hours:[0,24],investigator:'lau',
  description:'Follow up on Holt’s disappearance.'
 }
};

export const SR_ENTRIES = {
 holtApartmentVisit:[holtVisit],
 home:[120,165,5]
};

export function successorHomeEntry(s) {
 return (s.investigator??'grunewald')==='grunewald'?102:120;
}

function scene(title,eyebrow,source,...paragraphs) {
 return {title,eyebrow,source,paragraphs,adapted:true};
}

export const SR_SCENES = {
 [holtVisit]:scene('No word from Holt',holtApartment,'Entry 36 · p. 15 · Location tables · p. 93',
  'You stop by Holt’s apartment to follow up on his disappearance. The visit leaves you with no new lead.'),
 120:scene('A ransacked study',grunewaldHome,'Entry 120 · p. 27',
  'The back door stands ajar. You let yourself in and catch a foul smell. A car pulls away out front. At the window, you glimpse a long black sedan disappearing around the corner.',
  'The rest of the house looks undisturbed. In Grunewald’s study, books and papers are scattered everywhere.'),
 165:scene('The papers turn up little',grunewaldHome,'Entry 165 · p. 33',
  'An hour of sorting through a professor’s papers turns up nothing unusual. A more careful search will take another hour.'),
 5:scene('Flakes in the study',grunewaldHome,'Entry 5 · p. 10',
  'You discover dry, translucent flakes among the scattered papers. They look like shed skin. You can’t tell who or what left them behind.')
};

export const SR_CLUES = {
 grunewaldSkin:{
  title:'Shed skin in Grunewald’s study',type:'Physical evidence',source:SR_SCENES[5].source,
  text:'Dry, translucent flakes resembling skin were left in Grunewald’s ransacked study. A long black sedan pulled away from the house as you entered.'
 }
};

export const SR_ENTRY_CLUES = {5:'grunewaldSkin'};

export const SR_CHOICES = {
 120:[{id:'search-grunewald-study',label:'Search Grunewald’s study',detail:'1 hour',target:165,duration:1}]
};

export const SR_CHECKS = {
 'grunewald-study-spot':{
  entry:165,skill:'Spot Hidden',label:'Search the study more carefully',duration:1,
  successEntry:5,daily:true
 }
};
