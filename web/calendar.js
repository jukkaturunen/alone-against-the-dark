import { startingHealth } from './investigators.js';

export const HOUR = 3600000;
export const HALF_HOUR = HOUR / 2;
export const DAY = 24 * HOUR;
export const MORNING = Date.UTC(1931, 8, 2, 6);
export const LATE_ARKHAM = Date.UTC(1931, 8, 9);

export function dayStart(time) { return Math.floor(time / DAY) * DAY; }
export function hourOf(time) { return new Date(time).getUTCHours(); }
export function weekday(time, last = 5) {
 const day = new Date(time).getUTCDay();
 return day >= 1 && day <= last;
}
export function nightStart(time) {
 return dayStart(time) - (hourOf(time) < 8 ? DAY : 0);
}
export function mealCount(state) {
 const today = dayStart(state.time);
 return state.meals.filter(time => time >= today).length;
}
export function mealTarget(state) { return 2 + state.mealDebt; }
export function canEat(state) {
 return mealCount(state) < mealTarget(state)
  && (!state.meals.length || state.time - state.meals.at(-1) >= 6 * HOUR);
}
export function sleepHours(state) { return 8 + state.sleepDebt; }

export function advanceCalendar(state, hours, onMidnight, log, sleeping = false, medicalCare = false) {
 const until = state.time + hours * HOUR;
 for (let time = state.time + HALF_HOUR; time <= until; time += HALF_HOUR) {
  const hour = hourOf(time);
  if (time === dayStart(time)) {
   const periods = mealCount(state);
   const overdue = periods < state.mealDebt;
   const deferred = Math.max(0, 2 - Math.max(0, periods - state.mealDebt));
   state.time = time;
   state.mealDebt = deferred;
   // An overdue meal or a substitute rest marks this as a fasting day.
   if (overdue && !state.fastingToday) {
    state.hp = Math.max(0, state.hp - 1);
    log(state, 'An overdue meal was missed. Lost 1 health from fasting.');
   } else if (!overdue && !state.fastingToday && !medicalCare) {
    state.hp = Math.min(startingHealth(state), state.hp + 1);
   }
   state.fastingToday = false;
   onMidnight(state);
  } else {
   state.time = time;
  }
  if (time % HOUR === 0 && hour === 8 && sleeping) state.sleptNight = dayStart(time) - DAY;
  if (time % HOUR === 0 && hour === 8 && time > MORNING && state.sleptNight !== dayStart(time) - DAY) {
   state.sleepDebt += 8;
   log(state, 'Missed a night’s sleep. The next sleep block needs eight more hours.');
  }
 }
}
