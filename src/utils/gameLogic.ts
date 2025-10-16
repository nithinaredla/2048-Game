// src/utils/gameLogic.ts
import type { Board, Direction, MoveResult } from '../types/game';

/** create empty board */
export function makeEmptyBoard(size: number): Board {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
}

/** 90% 2, 10% 4 */
export function randomTileValue(): number {
  return Math.random() < 0.9 ? 2 : 4;
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.slice());
}

export function getEmptyCells(board: Board): [number, number][] {
  const empties: [number, number][] = [];
  board.forEach((row, r) => row.forEach((v, c) => v === 0 && empties.push([r, c])));
  return empties;
}

/** add one random tile (pure apart from randomness) */
export function addRandomTile(board: Board): Board {
  const b = cloneBoard(board);
  const empties = getEmptyCells(b);
  if (empties.length === 0) return b;
  const idx = Math.floor(Math.random() * empties.length);
  const [r, c] = empties[idx];
  b[r][c] = randomTileValue();
  return b;
}

/** init with two tiles */
export function initBoard(size: number): Board {
  let b = makeEmptyBoard(size);
  b = addRandomTile(b);
  b = addRandomTile(b);
  return b;
}

/** slide and merge one row to the left; returns resulting row and score gained */
function slideAndMergeRow(row: number[]): { row: number[]; scoreDelta: number } {
  const compact = row.filter((x) => x !== 0);
  const merged: number[] = [];
  let scoreDelta = 0;
  
  for (let i = 0; i < compact.length; i++) {
    if (i + 1 < compact.length && compact[i] === compact[i + 1]) {
      const val = compact[i] * 2;
      merged.push(val);
      scoreDelta += val;
      i++; // skip next
    } else {
      merged.push(compact[i]);
    }
  }
  
  while (merged.length < row.length) merged.push(0);
  return { row: merged, scoreDelta };
}

/** slide left for whole board */
export function slideLeft(board: Board): MoveResult {
  const n = board.length;
  let moved = false;
  let scoreDelta = 0;
  const newBoard = makeEmptyBoard(n);
  
  for (let r = 0; r < n; r++) {
    const { row: newRow, scoreDelta: sd } = slideAndMergeRow(board[r]);
    newBoard[r] = newRow;
    if (!moved && newRow.some((v, i) => v !== board[r][i])) moved = true;
    scoreDelta += sd;
  }
  
  return { board: newBoard, moved, scoreDelta };
}

/** rotate board 90deg counter-clockwise */
export function rotateLeft(board: Board): Board {
  const n = board.length;
  const out = makeEmptyBoard(n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      out[n - 1 - c][r] = board[r][c];
    }
  }
  return out;
}

/** rotate board 90deg clockwise */
export function rotateRight(board: Board): Board {
  const n = board.length;
  const out = makeEmptyBoard(n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      out[c][n - 1 - r] = board[r][c];
    }
  }
  return out;
}

/**
 * unified move function reusing slideLeft via rotation
 *
 * Mapping (after fix):
 * - left  => slideLeft directly
 * - up    => rotateLeft  once, slideLeft, rotateRight once
 * - right => rotateRight twice, slideLeft, rotateRight twice
 * - down  => rotateRight once, slideLeft, rotateLeft once
 */
export function move(
  board: Board,
  direction: Direction
): MoveResult {
  let b = cloneBoard(board);
  let rotatedBack: (board: Board) => Board = (x) => x;

  if (direction === 'left') {
    // no rotation
    rotatedBack = (x) => x;
  } else if (direction === 'up') {
    // rotate counter-clockwise so columns become rows in the correct order
    b = rotateLeft(b);
    rotatedBack = rotateRight;
  } else if (direction === 'right') {
    // rotate 180
    b = rotateRight(rotateRight(b));
    rotatedBack = (x) => rotateRight(rotateRight(x));
  } else if (direction === 'down') {
    // rotate clockwise so bottom becomes left in correct order
    b = rotateRight(b);
    rotatedBack = rotateLeft;
  }

  const res = slideLeft(b);
  let newBoard = res.board;
  // rotate back using the selected rotatedBack function
  newBoard = rotatedBack(newBoard);

  return { board: newBoard, moved: res.moved, scoreDelta: res.scoreDelta };
}

/** check win (2048 tile exists) */
export function has2048(board: Board): boolean {
  return board.some((row) => row.some((v) => v === 2048));
}

/** check if any move is possible */
export function canMove(board: Board): boolean {
  const n = board.length;
  if (getEmptyCells(board).length > 0) return true;
  
  // horizontal merges
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n - 1; c++) {
      if (board[r][c] === board[r][c + 1]) return true;
    }
  }
  
  // vertical merges
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < n - 1; r++) {
      if (board[r][c] === board[r + 1][c]) return true;
    }
  }
  
  return false;
}