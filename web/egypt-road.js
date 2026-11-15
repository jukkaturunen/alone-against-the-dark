import { hourOf } from './calendar.js';

export const ROAD_LOCATIONS = {
 amarna:{name:'Tell-el-Amarna',entry:324,region:'amarna',hours:[0,24],description:'The village below Akhenaten’s pyramid.'},
 kyonas:{name:'Motorship Kyonas',entry:160,region:'athens',hours:[0,24],description:'Charter a ship to Alexandria.'}
};
export const ROAD_ENTRIES = {
 amarna:[324,360,390,376,338,312,357,444,448,584],
 kyonas:[160,78]
};
export const MARKET_ROAD_ENTRIES = [384,320];

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}
const market='Fuzira Marketplace';
const village='Tell-el-Amarna';
const tomb='Akhenaten’s pyramid';
const ship='Motorship Kyonas';
export const ROAD_SCENES = {
 384:scene('Travel from Cairo',market,384,63,'You can rent a car to reach Tell-el-Amarna. The caravan to Quattarra is planned for a later release.'),
 320:scene('The road upriver',market,320,55,'A late Nile flood has closed the railway and passenger service. By car, the rough trip takes two days each way.'),
 324:scene('The village beneath the pyramid',village,324,56,'Dust sweeps along the road. Beyond the village, a well-worn path leads toward a small pyramid. You can visit the entrance by day or stop at the inn.'),
 360:scene('At the pyramid',tomb,360,60,'The old pyramid is smaller than the monuments at Giza. The visitor entrance is on the western side.'),
 390:scene('The western entrance',tomb,390,64,'Visitors pass through a small, dusty opening in the western face.'),
 376:scene('The attendant at the tomb',tomb,376,62,'An attendant collects a small admission fee. A multilingual sign identifies this as a tomb of Akhenaten’s court.'),
 338:scene('The first chamber',tomb,338,57,'A sign explains that this room was used to bless the dead. The tomb holds lesser members of Akhenaten’s court.','You can examine this chamber. The passages deeper into the tomb are planned for a later release.'),
 312:scene('An uneasy presence',tomb,312,55,'Whatever presence you sense in the room, it hardly feels like a blessing.'),
 357:scene('An erased figure',tomb,357,60,'Sections of the relief have been chipped away, as though someone meant to remove the same figure in each panel.'),
 444:scene('The village inn',village,444,70,'The proprietors are aloof. You can order a meal or spend the night in your rental car.'),
 448:scene('A night in the rental car',village,448,70,'You wake cold and stiff. You can go back to the pyramid or make the two-day drive to Cairo.'),
 584:scene('A poor meal',village,584,89,'The inn serves a skimpy, overpriced meal. You finish it and return to your plans.'),
 160:scene('A ship for hire',ship,160,32,'Captain Miko Rduka can take you to Alexandria. He needs a day to load and crew his ship, and the crossing takes two more days.'),
 78:scene('Christos offers to come along',ship,78,21,'Christos reminds you that he speaks Arabic and offers to accompany you to Egypt.')
};
export const ROAD_CLUES = {
 amarnaErasedRelief:{title:'The erased figure in Akhenaten’s tomb',type:'Tomb observation',source:ROAD_SCENES[357].source,
  text:'The same figure in several wall reliefs appears to have been deliberately chipped away.'}
};
export const ROAD_ENTRY_CLUES={357:'amarnaErasedRelief'};
const choice=(id,label,target,misc={})=>({id,label,target,duration:0,...misc});
const pyramidOpen=s=>hourOf(s.time)>=10&&hourOf(s.time)<18;
const pyramid=choice('amarna-pyramid','Inspect the pyramid',360,{when:pyramidOpen});
const toVillage=choice('amarna-village','Return to the village',324);
const room=choice('amarna-first-room','Return to the first chamber',338);
export const ROAD_CHOICES = {
 384:[choice('amarna-rental','Ask about renting a car',320),choice('amarna-market-return','Return to the market',134)],
 320:[choice('amarna-drive','Drive to Tell-el-Amarna',324,{destination:'amarna',journey:48,detail:'48 hours · food and stops included'}),choice('amarna-market-return','Return to the market',134)],
 324:[pyramid,choice('amarna-inn','Visit the inn',444)],
 360:[choice('amarna-tomb-entrance','Go to the western entrance',390,{when:pyramidOpen}),toVillage],
 390:[choice('amarna-admission','Approach the attendant',376,{when:pyramidOpen}),pyramid,toVillage],
 376:[choice('amarna-enter','Pay admission and enter the tomb',338,{when:pyramidOpen}),pyramid,toVillage],
 338:[choice('amarna-exit','Leave the first chamber',390)],
 312:[room],
 357:[room],
 444:[pyramid,toVillage],
 448:[pyramid,toVillage,choice('amarna-return-cairo','Drive back to Cairo',205,{destination:'cairoRail',journey:48,detail:'48 hours · food and stops included'})],
 584:[choice('amarna-return-inn','Return to the inn',444)],
 160:[
  choice('kyonas-christos','Speak with Christos about the voyage',78,{when:s=>s.flags.athensChristos&&!s.visited.includes(78)}),
  choice('kyonas-hire','Hire the Kyonas for Alexandria',195,{destination:'alexandriaHarbor',journey:72,detail:'24 hours to prepare · 48 hours at sea'})
 ],
 78:[choice('kyonas-take-christos','Take Christos with you',160),choice('kyonas-part-with-christos','Say goodbye to Christos',160,{clearFlag:'athensChristos'})]
};
export const ROAD_CHECKS = {
 'amarna-occult':{entry:338,skill:'Occult',label:'Consider the atmosphere of the chamber',duration:0,successEntry:312,daily:true},
 'amarna-spot':{entry:338,skill:'Spot Hidden',label:'Inspect the reliefs',duration:0,successEntry:357,daily:true}
};
