const tomb = 'Akhenaten’s pyramid';
const toolsMap = 'amarna-tools-map';

function scene(title,entry,page,...paragraphs) {
 return {title,eyebrow:tomb,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}

export const UPPER_SCENES = {
 338:scene('The first chamber',338,57,
  'A placard shows the plan of the four public chambers. Nearby, a sign in several languages explains that this room was used to bless the dead. The tomb is said to hold minor members and slaves of Akhenaten’s court.',
  'Passages branch to the left and right. The walls are covered in reliefs.'),
 312:scene('An uneasy presence',312,55,
  'You linger in the ceremonial chamber. Whatever presence you sense here, it hardly feels like a blessing.'),
 357:scene('An erased figure',357,60,
  'Sections of the reliefs have been chipped away. Someone seems to have removed the same figure from each panel.'),
 335:scene('The painted chamber',335,57,
  'The figures on the walls are oddly lifelike for a Dynastic Egyptian tomb. A passage leads farther in.'),
 364:scene('The art of Akhenaten’s court',364,60,
  'You recognize the style after all. It belongs to Akhenaten’s court, where artists broke with conventions that had stood for centuries. The changes helped turn the priesthood against the pharaoh.'),
 339:scene('The slaves’ chamber',339,58,
  'An empty sarcophagus stands in a corner. Placards describe Akhenaten’s break with the priesthood when he ordered the worship of Aten. They also mention the rumors that surrounded his court and his marriage to Nefertiti.',
  'Some scholars think the god Akhenaten actually served demanded human sacrifice. They point to the scenes carved on these walls.'),
 311:scene('Unaccounted-for space',311,55,
  'These few rooms seem too small for the pyramid above them. There must be more chambers somewhere.'),
 334:scene('A footprint in the sand',334,57,
  'You spot a single deep print in the sand. The tips look like claws. You can find no trail leading to or from it.'),
 356:scene('An unusual burial',356,60,
  'You recall that slaves were generally buried with their master. As you look around the chamber again, you wonder what it was actually used for.'),
 386:scene('A warning in the stone',386,63,
  'You make out a warning beneath the other markings. It tells visitors to flee this place or risk encountering something. Someone has chiseled away the name.'),
 381:scene('The tools chamber',381,62,
  'Tools from Akhenaten’s reign fill the room. A display on early Egyptian agriculture stands beside a map of the pyramid.'),
 445:scene('Tools for a different purpose',445,70,
  'A few of the implements remind you of objects associated with Druidic sacrifices. Whatever the purpose of these pieces, you would hesitate to call them farm tools.'),
 [toolsMap]:scene('The pyramid viewed from above',287,52,
  'The plan lays the four triangular faces flat. A single chamber is marked on one face.')
};

function clue(title,type,entry,text,visual={}) {
 return {title,type,source:UPPER_SCENES[entry].source,text,...visual};
}

export const UPPER_CLUES = {
 amarnaTemplePlan:clue('The pyramid’s temple plan','Tomb placard',338,
  'The entrance leads to the ceremonial chamber (338). The left passage leads through the painted chamber (335) to the slaves’ chamber (339). The right passage leads to the tools chamber (381).',{
   image:'assets/amarna-temple-plan.png',
   alt:'A floor plan of four rooms. A line from the entrance room leads through the painted room to the slaves’ chamber. Another line leads to the tools chamber.'
  }),
 amarnaErasedRelief:clue('The erased figure in Akhenaten’s tomb','Tomb observation',357,
  'The same figure in several wall reliefs appears to have been deliberately chipped away.'),
 amarnaHiddenChambers:clue('Unaccounted-for space in the tomb','Tomb observation',311,
  'The four public chambers occupy very little of the pyramid. There may be other rooms.'),
 amarnaClawedFootprint:clue('A clawed footprint','Tomb observation',334,
  'A deep print in the slaves’ chamber appears to have been made by a creature with claws.'),
 amarnaBurialCustom:clue('An unusual burial chamber','Tomb observation',356,
  'Slaves were generally buried with their master. The marked slaves’ chamber may have served a different purpose.'),
 amarnaCarvedWarning:clue('A damaged warning','Tomb inscription',386,
  'A carving in the slaves’ chamber warns visitors to flee. The name of whatever they might encounter has been chiseled away.'),
 amarnaSacrificialTools:clue('Curious implements','Tomb observation',445,
  'Several implements in the tools chamber resemble objects associated with Druidic sacrifices.'),
 amarnaVisitorMap:clue('The pyramid’s four faces','Tomb map',toolsMap,
  'The map displayed in the tools chamber shows a flattened view of the four faces of the pyramid.',{
   image:'assets/tell-el-amarna-map.png',
   alt:'Four triangular faces meet at the center of a square pyramid plan. A chamber is marked on the left face.'
  })
};

export const UPPER_ENTRY_CLUES = {
 338:'amarnaTemplePlan',357:'amarnaErasedRelief',311:'amarnaHiddenChambers',
 334:'amarnaClawedFootprint',356:'amarnaBurialCustom',386:'amarnaCarvedWarning',
 445:'amarnaSacrificialTools',[toolsMap]:'amarnaVisitorMap'
};

const choice=(id,label,target,options={})=>({id,label,target,duration:0,...options});
const first=choice('amarna-first-room','Return to the first chamber',338);
const left=choice('amarna-left-room','Take the passage to the painted chamber',335);
const right=choice('amarna-right-room','Take the passage to the tools chamber',381);
const outside=choice('amarna-exit','Go outside to the pyramid',360);
const slaves=choice('amarna-slaves-room','Continue to the slaves’ chamber',339);
const returnSlaves=choice('amarna-slaves-return','Return to the slaves’ chamber',339);
const returnTools=choice('amarna-tools-return','Return to the tools chamber',381);
const artCheck='amarna-art-history';

export const UPPER_CHOICES = {
 338:[left,right,outside],
 312:[first,left,right],
 357:[first,left,right],
 335:[{...slaves,when:s=>!!s.attempts[artCheck]},first],
 364:[slaves,first],
 339:[left,first,right,outside],
 311:[returnSlaves],
 334:[returnSlaves],
 356:[returnSlaves],
 386:[returnSlaves],
 381:[choice('amarna-read-tools-map','Examine the pyramid map',toolsMap),first],
 445:[returnTools],
 [toolsMap]:[returnTools]
};

const check=(entry,skill,label,successEntry,options={})=>({entry,skill,label,successEntry,duration:0,...options});
const slavesCheck=(id,skill,label,successEntry)=>
 [id,check(339,skill,label,successEntry,{when:s=>!s.attempts[id]})];

export const UPPER_CHECKS = {
 'amarna-occult':check(338,'Occult','Consider the atmosphere of the chamber',312,{daily:true}),
 'amarna-spot':check(338,'Spot Hidden','Inspect the reliefs',357,{daily:true}),
 [artCheck]:check(335,'History','Place the style of the wall paintings',364,{when:s=>!s.attempts[artCheck]}),
 ...Object.fromEntries([
  slavesCheck('amarna-slaves-space','Spot Hidden','Compare the rooms with the size of the pyramid',311),
  slavesCheck('amarna-slaves-tracks','Spot Hidden','Study the marks in the sand',334),
  slavesCheck('amarna-slaves-burial','History','Recall the burial customs of Akhenaten’s court',356),
  slavesCheck('amarna-slaves-writing','History','Decipher the worn markings',386)
 ]),
 'amarna-tools-anthropology':check(381,'Anthropology','Identify the uses of the implements',445,{daily:true})
};

export const UPPER_FLAGS = [];
export const UPPER_ENDINGS = new Set();
