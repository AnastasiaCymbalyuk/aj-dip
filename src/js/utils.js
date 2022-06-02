import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

export function calcTileType(index, boardSize) {
  const i = index + 1;
  if (i === 1) return 'top-left';
  if (i <= boardSize - 1) return 'top';
  if (i === boardSize) return 'top-right';
  if ((i - 1) % boardSize === 0 && i < boardSize * (boardSize - 1) + 1) return 'left';
  if (i % boardSize === 0 && i < boardSize ** 2) return 'right';
  if (i === boardSize * (boardSize - 1) + 1) return 'bottom-left';
  if (i > boardSize * (boardSize - 1) + 1 && i < boardSize ** 2) return 'bottom';
  if (i === boardSize ** 2) return 'bottom-right';
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }
  if (health < 50) {
    return 'normal';
  }
  return 'high';
}

export function getPlayerType() {
  return [Swordsman, Bowman, Magician];
}

export function getPlayerTypeName() {
  return ['swordsman', 'bowman', 'magician'];
}

export function getEnemyType() {
  return [Daemon, Undead, Vampire];
}

export function getEnemyTypeName() {
  return ['daemon', 'undead', 'vampire'];
}

export function convertCoordinates(index) {
  return {
    x: index % 8,
    y: ((index - (index % 8)) / 8),
  };
}
