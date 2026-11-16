import { HOUR, dayStart, hourOf, weekday } from './calendar.js';

const library = 'Al-Azhar University Library';
const firstFind = 'azharLibraryFirstFind';
const secondFind = 'azharLibrarySecondFind';
const arabicRead = 'azharLibraryArabicRead';
const arabicBook = 'Harrison’s English/Arabic Phrase Book';

export const AL_FLAGS = [firstFind, secondFind, arabicRead];

export function azharLibraryOpen(time, hours = 0) {
 const hour = hourOf(time);
 const end = time + hours * HOUR;
 const day = dayStart(time);
 return weekday(time) && (
  hour >= 7 && hour < 11 && end <= day + 11 * HOUR ||
  hour >= 15 && hour < 18 && end <= day + 18 * HOUR
 );
}

function scene(title, entry, page, ...paragraphs) {
 return {title, eyebrow:library, source:`Entry ${entry} · p. ${page}`, paragraphs, adapted:true};
}

const books = [
 {entry:218, page:42, shelf:253, title:'The Book of the Dead', clue:'azharBookOfTheDead',
  text:'A scholar’s annotation describes how mummies can be revived and controlled. The undead fear discovery, and they can do little to conceal their gray skin or stop it from flaking.'},
 {entry:267, page:50, shelf:253, title:'Alhazred and the Curse of Egypt', clue:'azharAlhazred',
  text:'The author blames Alhazred for reviving the ancient cult of Aten. Its members still perform rites across Egypt, venerating the evil beings that masquerade as Aten’s priests.'},
 {entry:262, page:47, shelf:253, title:'Mysterium', language:'Latin', clue:'azharMysterium',
  text:'An account of disasters describes snow falling in warm lands and grass growing where ice had been. Survivors abandoned much of their learning and tradition, and terrible new gods gained power.'},
 {entry:284, page:52, shelf:253, title:'The Lost Pyramid', language:'English', clue:'azharLostPyramid',
  text:'Akhenaten’s pyramid stands at Tell-el-Amarna, disguised as a small tomb for his household. The author believes the secret of his madness lies within. The book includes a sketch of the known tomb, but mentions no discovered hidden chambers.'},
 {entry:289, page:52, shelf:275, title:'The Pnakotic Manuscript', language:'Latin', clue:'azharPnakotic',
  text:'The manuscript tells of grave robbers who fled from strange creatures stalking the shadows of the tombs. The author wonders what such creatures eat underground.'},
 {entry:265, page:50, shelf:275, title:'Le Culte d’Aten', language:'French', clue:'azharCultOfAten',
  text:'Colonel F. Dupont traces the cult to Akhenaten and suggests that its practices helped bring about his downfall. Dupont recommends guarding key sites while dismissing the cult’s holy tomb at Tell-el-Amarna. The murder cases he describes remain open, and the killer left a strange calling card.'},
 {entry:243, page:45, shelf:275, title:'Die Goules', language:'German', clue:'azharDieGoules',
  text:'The book claims that revived mummies serve without feeling or compassion. According to its author, fire or removal of the tana leaf that sustains them can destroy them.'},
 {entry:264, page:50, shelf:275, title:'The Pharaoh’s Curse', language:'English', clue:'azharPharaohsCurse',
  text:'In this novel, otherworldly creatures chase the hero through twisting corridors. He takes hold of a magic amulet and receives protection from a god called the Ancient Master.'},
 {entry:251, page:46, shelf:275, title:'Breasted’s History of Egypt', language:'English', clue:'azharBreasted',
  text:'Breasted describes the grotesque figures in What Is in the Netherworld, engraved on the royal tombs of the Nineteenth and Twentieth Dynasties. He attributes them to priests whose ideas gained favor at court.'}
];

export const AL_SCENES = {
 215:scene(library,215,42,
  'Scholars in flowing robes pass beneath stairs that twist toward the upper floors. The library opens on weekdays from 7 to 11 AM and 3 to 6 PM. Each search takes one hour.'),
 253:scene('The first books',253,46,
  'You find two texts in Arabic. You can try reading them directly, or use an English/Arabic phrase book to work through them. If you fail, you can try again on another day.',
  'Two more volumes catch your eye. Set aside two hours to study Mysterium in Latin or The Lost Pyramid in English.'),
 275:scene('Five more books',275,51,
  'Your search turns up five more volumes. Each takes an hour to read in its original language. A student translator can read with you if you have arranged for one with Professor Khargeh.'),
 ...Object.fromEntries(books.map(({entry,page,title,text})=>[entry,scene(title,entry,page,text)]))
};

export const AL_ENTRIES = [215,253,275,...books.map(book=>book.entry)];

export const AL_CLUES = Object.fromEntries(books.map(({entry,title,clue,text})=>[
 clue,{title,type:'Library research',source:AL_SCENES[entry].source,text}
]));

export const AL_ENTRY_CLUES = Object.fromEntries(books.map(({entry,clue})=>[entry,clue]));

function check(entry, skill, label, successEntry, duration, options) {
 return {entry, skill, label, successEntry, duration, ...options};
}

const arabicChecks = ['azhar-read-arabic','azhar-read-arabic-edu'];
const canReadArabic = s => azharLibraryOpen(s.time) && !s.flags[arabicRead] &&
 arabicChecks.every(id=>!s.attempts[id]);

function languageCheck(book) {
 const {entry, shelf, title, language, clue} = book;
 const skill = `Language (${language})`;
 const duration = shelf === 253 ? 2 : 1;
 const available = s => azharLibraryOpen(s.time,duration) && !s.clues.includes(clue);
 return [`azhar-read-${entry}`,check(shelf,skill,`Read ${title}`,entry,duration,{
  when:available, daily:shelf===253, repeat:shelf===275
 })];
}

export const AL_CHECKS = {
 'azhar-search-first':check(215,'Library Use','Search the library',253,1,{
  when:s=>azharLibraryOpen(s.time,1)&&!s.flags[firstFind],repeat:true,successFlag:firstFind
 }),
 'azhar-search-second':check(215,'Library Use','Search for more books',275,1,{
  when:s=>azharLibraryOpen(s.time,1)&&s.flags[firstFind]&&!s.flags[secondFind],
  repeat:true,successFlag:secondFind
 }),
 [arabicChecks[0]]:check(253,'Language (Arabic)','Decipher the Arabic books',253,0,{
  when:canReadArabic,daily:true,successFlag:arabicRead
 }),
 [arabicChecks[1]]:check(253,'EDU','Work through the Arabic books with your phrase book',253,0,{
  when:s=>canReadArabic(s)&&s.inventory.includes(arabicBook),daily:true,successFlag:arabicRead
 }),
 ...Object.fromEntries(books.filter(book=>book.language).map(languageCheck))
};

function choice(id,label,target,when) {
 return {id,label,target,when,duration:0,detail:'No time passes'};
}

const campus = choice('azhar-return-campus','Return to the university entrance',149);
const stacks = choice('azhar-return-library','Return to the library',215);
const read = book => choice(`azhar-open-${book.entry}`,`Read ${book.title}`,book.entry,
 s=>book.language ? s.clues.includes(book.clue) : s.flags[arabicRead]);

export const AL_CHOICES = {
 215:[
  choice('azhar-first-books','Return to the first books',253,s=>s.flags[firstFind]),
  choice('azhar-more-books','Return to the five additional books',275,s=>s.flags[secondFind]),
  campus
 ],
 253:[...books.filter(book=>book.shelf===253).map(read),stacks,campus],
 275:[...books.filter(book=>book.shelf===275).map(read),stacks],
 ...Object.fromEntries(books.map(book=>[book.entry,[
  choice(`azhar-return-books-${book.entry}`,'Return to the books',book.shelf)
 ]]))
};
