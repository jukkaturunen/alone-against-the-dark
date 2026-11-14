import assert from 'node:assert/strict';
import { test } from 'node:test';
import { performService } from '../web/arkham-services.js';
import { advanceCalendar, DAY, HOUR, MORNING } from '../web/calendar.js';
import { act, newGame, travel, validateSave, actions } from '../web/engine.js';
import { SUGGESTED } from '../web/data.js';

function morning() {
 const original = newGame('services-test', 'Arkham services', SUGGESTED);
 return act(act(original, 'telegram'), 'begin');
}

test('the general store observes opening hours and records unique purchases in the dossier', () => {
 const original = morning();
 assert.throws(() => travel(original, 'store'), /closed/);
 const store = travel(act(original, 'wait'), 'store');
 assert.equal(store.entry, 38);
 assert.equal(store.time, MORNING + 2 * HOUR);

 const equipped = act(store, 'buy-rope');
 assert(equipped.inventory.includes('Rope'));
 assert(!store.inventory.includes('Rope'));
 assert.equal(equipped.cash, store.cash);
 assert.equal(equipped.time, store.time);
 assert.throws(() => act(equipped, 'buy-rope'), /not available/);
 assert(validateSave(equipped));

 let closed = equipped;
 for (let i = 0; i < 9; i++) closed = act(closed, 'wait');
 assert.throws(() => act(closed, 'buy-flashlight'), /not available/);
});

test('hospital treatment uses two d3s on successful Luck, then heals once each additional day', () => {
 const original = morning();
 original.time = Date.UTC(1931, 8, 6, 11, 30);
 original.hp = 2;
 const patient = travel(original, 'hospital');
 assert.equal(patient.entry, 585);
 const result = [];
 const log = (s, text) => { s.log.push({ time: s.time, text }); };
 const advance = (s, hours, sleeping, medicalCare) => advanceCalendar(s, hours, () => {}, log, sleeping, medicalCare);
 const context = { advance, log, rollFn: () => 50, rollD3: () => { result.push(3); return 3; } };

 assert(performService(patient, 'hospital-treatment', context));
 assert.equal(patient.hp, 8);
 assert.equal(patient.time, original.time + HOUR + DAY);
 assert.deepEqual(result, [3, 3]);
 assert(patient.log.some(entry => entry.text.includes('Recovery: 2D3 rolled 3 + 3')));
 assert(patient.meals.length > 2);
 assert.equal(patient.sleep, 8);
 assert(validateSave(patient));

 const recovered = act(patient, 'hospital-treatment', () => { throw new Error('No additional Luck roll'); });
 assert.equal(recovered.hp, 9);
 assert.equal(recovered.time, patient.time + DAY);
 assert(actions(recovered).find(action => action.id === 'hospital-treatment').disabled);
 assert(validateSave(recovered));
 const discharged = travel(recovered, 'home');
 assert(!Object.hasOwn(discharged.flags, 'hospitalTreated'));
 assert(validateSave(discharged));
});

test('unsuccessful hospital Luck rolls use one d3 and treatment cannot exceed original health', () => {
 const original = morning();
 original.hp = 8;
 const patient = travel(original, 'hospital');
 const treated = act(patient, 'hospital-treatment', () => 100);
 assert.equal(treated.hp, 9);
 assert.equal(treated.luck, original.luck);
 assert(treated.log.some(entry => entry.text.includes('Recovery: 1D3 rolled')));
 assert(validateSave(treated));
});
