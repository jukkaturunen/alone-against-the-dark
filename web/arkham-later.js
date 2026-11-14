function scene(title, eyebrow, source, paragraphs) {
 return {title, eyebrow, source, paragraphs, adapted:true};
}

export const LATER_SCENES = {
 143:scene('Fen has no news','The History Department','Entry 143 · p. 30',[
  'Dr. Fen shakes his head. He wishes he could help and suggests speaking with Dean Wilcox.'
 ]),
 147:scene('Signs of a hurried departure','Grunewald’s home','Entry 147 · p. 31',[
  'Grunewald’s room looks as though someone left in a hurry.'
 ]),
 172:scene('Rumors at Miskatonic','Arkham Advertiser','Entry 172 · p. 34',[
  'Tibor Gliere’s suicide has stunned Miskatonic University. Rumors are spreading about Professor Grunewald’s reported disappearance under suspicious circumstances.',
  'Dean Wilcox is upset and refuses to give an interview. His secretary confides that the Dean has no idea what is going on.'
 ]),
 197:scene('No word from the Dean','Dean Wilcox’s office','Entry 197 · p. 39',[
  'The Dean has had no word. He shakes his head. First Gliere, and now this.'
 ])
};

export const LATER_CHOICES = {
 143:[
  {id:'later-dean',label:'See Dean Wilcox',detail:'1 hour',target:197,duration:1},
  {id:'later-library',label:'Visit the library',detail:'Open 9 AM–9 PM · Monday to Saturday',target:145,duration:0}
 ],
 147:[
  {id:'home-return',label:'Finish looking around the room',detail:'No time passes',target:102,duration:0}
 ],
 172:[
  {id:'news-return',label:'Return to the newspaper',detail:'No time passes',target:60,duration:0}
 ],
 197:[
  {id:'later-university',label:'Return to the university',detail:'No time passes',target:82,duration:0}
 ]
};
