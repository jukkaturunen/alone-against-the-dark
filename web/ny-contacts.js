import { hourOf, weekday } from './calendar.js';

const consulate = 'Greek Consulate';
const bookseller = 'E.S. Wilentz Booksellers';
const city = 'newYork';
const bookLimit = 3;

export const CONTACT_LOCATIONS = {
 greekConsulate:{
  name:consulate,entry:30,hours:[9,18],hoursLabel:'9 AM–noon and 2–6 PM · Mon–Fri',region:city,
  description:'Ask where to follow up on Gliere’s case in Athens.'
 },
 wilentz:{
  name:bookseller,entry:54,hours:[10,18],hoursLabel:'10 AM–6 PM · Mon–Sat',region:city,
  description:'Browse phrase books and travel accounts. Your suitcase has room for three books.'
 }
};

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const CONTACT_SCENES = {
 30:scene('A contact in Athens',consulate,30,14,
  'The consulate directs you to the Athens Bureau of Investigation, where Corporal Ilionas has handled Gliere’s case.',
  'When you ask about the National Museum and its collection, they hand you a tourist brochure that tells you little. They also warn you, with a smile, about Athens cab drivers.'),
 54:scene('Three floors of books',bookseller,54,18,
  'Phrase books and accounts of distant expeditions catch your eye. Your suitcase has room for three of these books.')
};

export const CONTACT_ENTRIES = {greekConsulate:[30],wilentz:[54]};

export const CONTACT_CLUES = {
 consulateIlionas:{
  title:'The consulate confirms the Athens contact',type:'Consulate interview',
  source:CONTACT_SCENES[30].source,
  text:'The Greek Consulate confirms that Corporal Ilionas handled Gliere’s case. They advise visiting the Athens Bureau of Investigation on arrival.'
 }
};

export const CONTACT_ENTRY_CLUES = {30:'consulateIlionas'};
export const CONTACT_CHECKS = {};

function book(id,label,item) {
 return {id:`wilentz-buy-${id}`,label:`Buy ${label}`,target:54,detail:'Add to carried possessions',duration:0,item};
}

export const CONTACT_CHOICES = {
 54:[
  book('greek','the English/Greek phrase book','Harrison’s English/Greek Phrase Book'),
  book('arabic','the English/Arabic phrase book','Harrison’s English/Arabic Phrase Book'),
  book('german','the English/German phrase book','Basel’s English/German Phrase Book'),
  book('worst-journey','The Worst Journey in the World','Cherry-Gerrard’s The Worst Journey in the World'),
  book('antarctic','With Lake in the Antarctic','Douglas Planchon’s With Lake in the Antarctic'),
  book('south-america','Guide to South America','Planchon’s Guide to South America')
 ]
};

export function contactOpen(location,time) {
 const hour = hourOf(time);
 if(location==='greekConsulate') return weekday(time) && (hour>=9 && hour<12 || hour>=14 && hour<18);
 if(location==='wilentz') return weekday(time,6) && hour>=10 && hour<18;
 return false;
}

export function contactChoiceStatus(s,choice) {
 if(!contactOpen(s.location,s.time)) return {disabled:true,detail:'The bookstore is closed'};
 if(s.inventory.includes(choice.item)) return {disabled:true,detail:'Already carried'};
 const books = CONTACT_CHOICES[54].filter(book => s.inventory.includes(book.item)).length;
 if(books>=bookLimit) return {disabled:true,detail:'Your suitcase already holds three books'};
 if(s.inventory.length>=100) return {disabled:true,detail:'Inventory full'};
 return {disabled:false,detail:choice.detail};
}
