// src/hooks/useGame.ts
import { useState, useCallback, useEffect } from 'react';
import type { GameState, Direction, GameStatus } from '../types/game';
import { initBoard, move, addRandomTile, has2048, canMove } from '../utils/gameLogic';

export const useGame = (initialBoardSize: number = 4) => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: initBoard(initialBoardSize),
    score: 0,
    status: 'playing' as GameStatus,
    boardSize: initialBoardSize,
  }));

  const makeMove = useCallback((direction: Direction) => {
    setGameState(current => {
      if (current.status !== 'playing') return current;

      const moveResult = move(current.board, direction);
      
      if (!moveResult.moved) {
        return current;
      }

      const newBoard = addRandomTile(moveResult.board);
      const newScore = current.score + moveResult.scoreDelta;
      
      let newStatus: GameStatus = current.status;
      
      if (has2048(newBoard)) {
        newStatus = 'won';
      } else if (!canMove(newBoard)) {
        newStatus = 'lost';
      }

      return {
        board: newBoard,
        score: newScore,
        status: newStatus,
        boardSize: current.boardSize,
      };
    });
  }, []);

  const restart = useCallback((boardSize: number = gameState.boardSize) => {
    setGameState({
      board: initBoard(boardSize),
      score: 0,
      status: 'playing' as GameStatus,
      boardSize,
    });
  }, [gameState.boardSize]);

  const changeBoardSize = useCallback((newSize: number) => {
    restart(newSize);
  }, [restart]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.status !== 'playing') return;

      const directionMap: { [key: string]: Direction } = {
        'ArrowUp': 'up',
        'ArrowDown': 'down', 
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        's': 'down',
        'a': 'left',
        'd': 'right',
      };

      const direction = directionMap[event.key];
      if (direction) {
        event.preventDefault();
        makeMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [makeMove, gameState.status]);

  return {
    gameState,
    move: makeMove,
    restart,
    changeBoardSize,
  };
};