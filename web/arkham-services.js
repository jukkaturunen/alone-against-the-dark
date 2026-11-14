import { DAY, HOUR, canEat, dayStart, sleepHours } from './calendar.js';

const MAX_HP = 9;
const GOODS = {
 'buy-flashlight': 'Flashlight',
 'buy-rope': 'Rope',
 'buy-compass': 'Compass',
 'buy-bandages': 'Gauze bandages',
 'buy-knife': 'Hunting knife',
 'buy-revolver': 'Revolver'
};

export const SERVICES_SCENES = {
 38: {
  title: 'Supplies for the journey', eyebrow: 'General Store', source: 'Entry 38 · p. 16; equipment rules · p. 7', adapted: true,
  paragraphs: ['The general store stocks ordinary travel supplies, a hunting knife, and a handgun.',
   'Choose what you can reasonably carry and afford. The adventure lets you record routine purchases without tracking their cost.']
 },
 585: {
  title: 'A day in the ward', eyebrow: 'Hospital', source: 'Entry 585 · p. 89', adapted: true,
  paragraphs: ['The hospital is always open. On the first day of treatment, a successful Luck roll restores 2D3 health. On a failure, you regain 1D3.',
   'Each further day of treatment restores one health point, up to your starting total. Each day in the ward takes 24 hours.']
 }
};

export function serviceActions(s, isOpen) {
 if (s.entry === 38) {
  const open = isOpen(s.location, s.time);
  return Object.entries(GOODS).map(([id, item]) => {
   const carried = s.inventory.includes(item);
   return {
    id, label: `Buy ${item.toLowerCase()}`, disabled: !open || carried || s.inventory.length >= 100,
    detail: carried ? 'Already carried' : !open ? 'The store is closed' : s.inventory.length >= 100 ? 'Inventory full' : 'Add to carried possessions'
   };
  });
 }
 if (s.entry !== 585) return [];
 const treated = s.flags.hospitalTreated;
 return [{
  id: 'hospital-treatment', label: treated ? 'Stay another day' : 'Receive treatment', disabled: s.hp >= MAX_HP,
  detail: s.hp >= MAX_HP ? 'Health is already full' : treated ? '24 hours · regain 1 health' : `24 hours · Luck ${s.luck}% · regain 1D3 or 2D3 health`
 }];
}

function d3() {
 const value = new Uint8Array(1);
 do { globalThis.crypto.getRandomValues(value); } while (value[0] === 255);
 return value[0] % 3 + 1;
}

function stayInHospital(s, advance, log) {
 const discharge = s.time + DAY;
 const today = dayStart(s.time);
 const nextMorning = today + (s.time < today + 8 * HOUR ? 8 : 32) * HOUR;
 const night = dayStart(nextMorning) - DAY;
 const sleep = s.sleptNight === night ? 0 : Math.min(24, sleepHours(s));
 const bedtime = Math.max(s.time, nextMorning - sleep * HOUR);
 while (s.time < discharge) {
  if (sleep && s.time === bedtime) {
   s.sleptNight = night;
   s.sleep = sleep;
   s.sleepDebt -= sleep - 8;
   advance(s, sleep, true, true);
   log(s, `Slept for ${sleep} continuous hours in the hospital.`);
   continue;
  }
  const nextEvent = s.time < bedtime && sleep ? bedtime : discharge;
  if (s.time + HOUR <= nextEvent && canEat(s)) {
   s.meals.push(s.time);
   advance(s, 1, false, true);
   log(s, 'Ate a hospital meal.');
  } else {
   advance(s, Math.min(1, (nextEvent - s.time) / HOUR), false, true);
  }
 }
}

export function performService(s, id, {advance, log, rollFn, rollD3 = d3}) {
 if (s.entry === 38 && Object.hasOwn(GOODS, id)) {
  s.inventory.push(GOODS[id]);
  log(s, `Bought ${GOODS[id].toLowerCase()} at the general store.`);
  return true;
 }
 if (s.entry !== 585 || id !== 'hospital-treatment') return false;

 let recovery = 1;
 if (!s.flags.hospitalTreated) {
  const roll = rollFn();
  if (!Number.isInteger(roll) || roll < 1 || roll > 100) throw new Error('Invalid dice result.');
  const success = roll <= s.luck || roll === 1;
  const dice = success ? [rollD3(), rollD3()] : [rollD3()];
  if (dice.some(n => !Number.isInteger(n) || n < 1 || n > 3)) throw new Error('Invalid dice result.');
  recovery = dice.reduce((sum, n) => sum + n, 0);
  log(s, `Hospital Luck: rolled ${roll} against ${s.luck} (${success ? 'success' : 'failure'}). Recovery: ${dice.length}D3 rolled ${dice.join(' + ')}.`);
 }
 stayInHospital(s, advance, log);
 const gained = Math.min(recovery, MAX_HP - s.hp);
 s.hp += gained;
 s.flags.hospitalTreated = true;
 log(s, `Completed a day of hospital treatment and regained ${gained} health.`);
 return true;
}
