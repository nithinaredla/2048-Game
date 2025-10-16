// src/components/GameBoard.tsx
import React from 'react';
import type { GameState } from '../types/game';
import { Tile } from './Tile';

interface GameBoardProps {
  gameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const { boardSize, board } = gameState;
  
  return (
    <div className="relative bg-amber-200 rounded-lg p-2 shadow-lg">
      <div
        className="grid gap-2 relative"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 5rem)`,
          gridTemplateRows: `repeat(${boardSize}, 5rem)`,
        }}
      >
        {/* Empty cells */}
        {Array.from({ length: boardSize * boardSize }).map((_, index) => (
          <div
            key={index}
            className="bg-amber-100 rounded-lg shadow-inner"
          />
        ))}
        
        {/* Tiles */}
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}-${value}`}
              value={value}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
};