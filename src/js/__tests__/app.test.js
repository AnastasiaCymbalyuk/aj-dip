import Character from '../Character';
import GameController from '../GameController';
import Daemon from '../characters/Daemon';
import Bowman from '../characters/Bowman';
import Undead from '../characters/Undead';
import GameStateService from '../GameStateService';
import { calcTileType } from '../utils';

test('ошибка при создании new Character', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character(1, 'Magician');
  }).toThrowError('объект базового класса не может быть создан');
});

test('создание персонажа', () => {
  expect(new Bowman(1)).toEqual({
    level: 1,
    attack: 25,
    defence: 25,
    health: 50,
    type: 'bowman',
    movement: 2,
    attackRange: 2,
  });
});

const gameController = new GameController();
gameController.gameState.playerTurn = true;
gameController.gameState.from({ character: new Bowman(1), position: 0 });
gameController.gameState.from({ character: new Bowman(1), position: 15 });
gameController.gameState.from({ character: new Daemon(1), position: 1 });
gameController.gameState.from({ character: new Daemon(1), position: 4 });
gameController.currentIndex = gameController.gameState.chars[0].position;

test('игрок может перейти', () => {
  expect(gameController.canIDo(2, 'go'))
    .toBe(true);
});

test('игрок не может перейти', () => {
  expect(gameController.canIDo(3, 'go'))
    .toBe(false);
});

test('игрок может aтаковать', () => {
  expect(gameController.canIDo(1, 'attack'))
    .toBe(true);
});

test('игрок не может aтаковать', () => {
  expect(gameController.canIDo(4, 'attack'))
    .toBe(false);
});

test('попытка выбора персонажа из чужой команды', () => {
  gameController.currentIndex = null;
  gameController.onCellClick(1);
  expect(gameController.currentIndex)
    .toBe(null);
});

jest.mock('../GameStateService');
beforeEach(() => {
  jest.resetAllMocks();
});

const stateService = new GameStateService();

test('успешная загрузка', () => {
  expect(stateService.load())
    .toBe(undefined);
});

test('Check load', () => {
  const expected = { score: 10, record: 10, level: 1 };
  stateService.load.mockReturnValue(expected);
  const recived = stateService.load();
  expect(recived).toBe(expected);
});

test('Вывод информации о персонаже', () => {
  const char = new Undead(4);
  const str = `🎖 ${char.level} ⚔ ${char.attack} 🛡 ${char.defence} ❤ ${char.health}`;
  expect(str).toBe('🎖 4 ⚔ 40 🛡 10 ❤ 50');
});

test('top-left, boardSize=8', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});

test('top, boardSize=8', () => {
  expect(calcTileType(2, 8)).toBe('top');
});

test('top-right, boardSize=7', () => {
  expect(calcTileType(7, 8)).toBe('top-right');
});

test('left, boardSize=8', () => {
  expect(calcTileType(8, 8)).toBe('left');
});

test('right, boardSize=8', () => {
  expect(calcTileType(15, 8)).toBe('right');
});

test('bottom-left, boardSize=8', () => {
  expect(calcTileType(56, 8)).toBe('bottom-left');
});

test('bottom, boardSize=8', () => {
  expect(calcTileType(58, 8)).toBe('bottom');
});

test('bottom-right, boardSize=8', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test('center, boardSize=8', () => {
  expect(calcTileType(35, 8)).toBe('center');
});
