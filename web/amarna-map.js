import { PUZZLE_TILES, PUZZLE_ENTRY_TILES } from './amarna-puzzle.js';

export function discoveredSections(visited) {
 return new Set(visited.flatMap(entry=>PUZZLE_ENTRY_TILES[entry]||[]));
}

export function pyramidBoard(discovered) {
 const cells=[];
 for(let row=0;row<4;row++) {
  for(let index=0;index<=row*2;index++) {
   const slot=row*row+index+1;
   const letter=Object.keys(PUZZLE_TILES).find(letter=>PUZZLE_TILES[letter].slot===slot);
   const tile=discovered.has(letter)?PUZZLE_TILES[letter]:null;
   const coordinate=`--row:${row};--column:${3-row+index}`;
   const content=tile?`<img src="${tile.image}" alt="">`:`<span class="pyramid-label">${slot}</span>`;
   cells.push(`<div class="pyramid-cell${index%2?' down':''}${tile?' mapped':''}" style="${coordinate}" aria-hidden="true">${content}</div>`);
  }
 }
 return `<div class="pyramid-board" role="img" aria-label="${discovered.size} of 16 pyramid sections mapped">${cells.join('')}</div>`;
}
