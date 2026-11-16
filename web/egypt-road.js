import { DAY, HOUR, dayStart, hourOf } from './calendar.js';

export const ROAD_LOCATIONS = {
 amarna:{name:'Tell-el-Amarna',entry:324,region:'amarna',hours:[0,24],description:'The village below Akhenaten’s pyramid.'},
 kyonas:{name:'Motorship Kyonas',entry:160,region:'athens',hours:[0,24],description:'Charter a ship to Alexandria.'}
};
export const ROAD_ENTRIES = {
 amarna:[321,324,360,361,390,376,338,312,357,444,448,584,588,589],
 kyonas:[160,78]
};
export const MARKET_ROAD_ENTRIES = [384,320,108];
export const ROAD_FLAGS = ['amarnaRentalWithGuide','amarnaRentalMissing'];

function scene(title,eyebrow,entry,page,...paragraphs) {
 return {title,eyebrow,source:`Entry ${entry} · p. ${page}`,paragraphs,adapted:true};
}
const market='Fuzira Marketplace';
const village='Tell-el-Amarna';
const river='The Nile road';
const tomb='Akhenaten’s pyramid';
const ship='Motorship Kyonas';
export const ROAD_SCENES = {
 384:scene('Travel from Cairo',market,384,63,'You can rent a car to reach Tell-el-Amarna or join a caravan heading for the Quattarra Depression.'),
 320:scene('The road upriver',market,320,55,'A late Nile flood has closed the railway and passenger service. By car, the rough trip takes two days each way.'),
 108:scene('A driver who speaks English',market,108,25,'The rental office offers you a battered black Peugeot and a young Egyptian driver who can translate. He speaks some English, but takes little interest in your mission.'),
 321:scene('Abandoned on the Nile road',river,321,56,'On the second morning you wake to find the driver and the Peugeot gone. Your gear lies where he unloaded it. You can try to cross the flooded Nile or follow the tire tracks back toward a village.'),
 324:scene('The village beneath the pyramid',village,324,56,'Dust sweeps along the road. Beyond the village, a well-worn path leads toward a small pyramid. You can visit the entrance by day or stop at the inn.'),
 360:scene('At the pyramid',tomb,360,60,'The old pyramid is smaller than the monuments at Giza. The visitor entrance is on the western side.'),
 361:scene('The driver and car are gone',village,361,60,'The spot where you left the Peugeot is empty. You can look for a ride with a caravan or find somewhere to spend the night.'),
 390:scene('The western entrance',tomb,390,64,'Visitors pass through a small, dusty opening in the western face.'),
 376:scene('The attendant at the tomb',tomb,376,62,'An attendant collects a small admission fee. A multilingual sign identifies this as a tomb of Akhenaten’s court.'),
 444:scene('The village inn',village,444,70,'The proprietors are aloof. They serve meals and rent rooms.'),
 448:scene('A night in the rental car',village,448,70,'You wake cold and stiff. You can go back to the pyramid or make the two-day drive to Cairo.'),
 584:scene('A poor meal',village,584,89,'The inn serves a skimpy, overpriced meal. You finish it and return to your plans.'),
 588:scene('The flooded Nile',river,588,90,'The current carries branches and debris. When you spot crocodiles in the floodwater, you turn back toward the village.'),
 589:scene('The tire tracks in the sand',river,589,90,'You follow the Peugeot’s tracks across the sand. A strong wind rises from the south and starts to obscure the trail.'),
 160:scene('A ship for hire',ship,160,32,'Captain Miko Rduka can take you to Alexandria. He needs a day to load and crew his ship, and the crossing takes two more days.'),
 78:scene('Christos offers to come along',ship,78,21,'Christos reminds you that he speaks Arabic and offers to accompany you to Egypt.')
};
const choice=(id,label,target,misc={})=>({id,label,target,duration:0,...misc});
const pyramidOpen=s=>hourOf(s.time)>=10&&hourOf(s.time)<18;
const pyramid=choice('amarna-pyramid','Inspect the pyramid',360,{when:pyramidOpen});
const toVillage=choice('amarna-village','Return to the village',324);
const toInn=choice('amarna-inn','Visit the inn',444);
const toRoad=choice('amarna-return-rental','Return to the rental office',320);
const followTracks=choice('amarna-follow-tracks','Follow the tracks toward the village',589);
export const roadHasCar=s=>!s.flags.amarnaRentalMissing;
export const ROAD_CHOICES = {
 384:[choice('amarna-rental','Ask about renting a car',320),choice('amarna-market-return','Return to the market',134)],
 320:[
  choice('amarna-drive','Drive to Tell-el-Amarna',324,{destination:'amarna',journey:48,detail:'48 hours · food and stops included',effect:'amarna-self-drive'}),
  choice('amarna-ask-guide','Ask for a driver who can translate',108),
  choice('amarna-market-return','Return to the market',134)
 ],
 108:[choice('amarna-drive-with-guide','Set out with the driver',324,{effect:'amarna-guided-drive',detail:'48 hours if you reach Tell-el-Amarna'}),toRoad],
 321:[choice('amarna-try-river','Try to cross the Nile',588),followTracks],
 324:[pyramid,toInn,choice('amarna-leave-car-with-guide','Leave the car with the driver and go into the village',361,{
  when:s=>s.flags.amarnaRentalWithGuide&&roadHasCar(s),clearFlag:'amarnaRentalWithGuide',flag:'amarnaRentalMissing'
 })],
 361:[toInn,choice('amarna-missing-car-desert','Sleep in the desert',319,{sleep:true}),toVillage],
 360:[choice('amarna-tomb-entrance','Go to the western entrance',390,{when:pyramidOpen}),toVillage],
 390:[choice('amarna-admission','Approach the attendant',376,{when:pyramidOpen}),pyramid,toVillage],
 376:[choice('amarna-enter','Pay admission and enter the tomb',338,{when:pyramidOpen}),pyramid,toVillage],
 444:[pyramid,toVillage],
 448:[pyramid,toVillage,choice('amarna-return-cairo','Drive back to Cairo',205,{
  destination:'cairoRail',journey:48,detail:'48 hours · food and stops included',clearFlag:'amarnaRentalWithGuide',when:roadHasCar
 })],
 584:[choice('amarna-return-inn','Return to the inn',444)],
 588:[followTracks],
 589:[choice('amarna-walk-into-desert','Keep walking through the blowing sand',94)],
 160:[
  choice('kyonas-christos','Speak with Christos about the voyage',78,{when:s=>s.flags.athensChristos&&!s.visited.includes(78)}),
  choice('kyonas-hire','Hire the Kyonas for Alexandria',195,{destination:'alexandriaHarbor',journey:72,detail:'24 hours to prepare · 48 hours at sea'})
 ],
 78:[choice('kyonas-take-christos','Take Christos with you',160),choice('kyonas-part-with-christos','Say goodbye to Christos',160,{clearFlag:'athensChristos'})]
};

const caravanCheck=entry=>({
 entry,skill:'Luck',label:'Look for a caravan to Cairo',duration:0,daily:true,successEntry:341
});
export const ROAD_CHECKS = {
 'amarna-caravan-village':caravanCheck(361),
 'amarna-caravan-desert':caravanCheck(319)
};

export function roadChoiceEffect(s,effect,{rollDie,go,log,advanceJourney}) {
 if(effect==='amarna-self-drive') {
  delete s.flags.amarnaRentalWithGuide;
  delete s.flags.amarnaRentalMissing;
  go(s,324);
  return true;
 }
 if(effect!=='amarna-guided-drive') return false;

 const roll=rollDie(10);
 log(s,`Rolled ${roll} on 1D10 for the drive to Tell-el-Amarna.`);
 s.location='amarna';
 if(roll<=3) {
  delete s.flags.amarnaRentalWithGuide;
  s.flags.amarnaRentalMissing=true;
  const secondMorning=dayStart(s.time)+DAY+8*HOUR;
  advanceJourney(s,(secondMorning-s.time)/HOUR);
  go(s,321);
 } else {
  delete s.flags.amarnaRentalMissing;
  s.flags.amarnaRentalWithGuide=true;
  advanceJourney(s,48);
  go(s,324);
 }
 return true;
}
