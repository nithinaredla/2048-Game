// src/types/game.ts
export type Board = number[][];

export type GameStatus = 'playing' | 'won' | 'lost';

export type Direction = 'left' | 'right' | 'up' | 'down';

export type GameState = {
  board: Board;
  score: number;
  status: GameStatus;
  boardSize: number;
};

export type MoveResult = {
  board: Board;
  moved: boolean;
  scoreDelta: number;
};