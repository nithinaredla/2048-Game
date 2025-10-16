// src/components/GameStatus.tsx
import React from 'react';
import type { GameStatus } from '../types/game';

interface GameStatusDisplayProps {
  score: number;
  status: GameStatus;
  onRestart: () => void;
}

export const GameStatusDisplay: React.FC<GameStatusDisplayProps> = ({
  score,
  status,
  onRestart,
}) => {
  return (
    <div className="text-center space-y-4">
      <div className="bg-blue-500 text-white rounded-lg p-4 shadow-lg">
        <div className="text-sm font-semibold">SCORE</div>
        <div className="text-3xl font-bold">{score}</div>
      </div>
      
      {status === 'won' && (
        <div className="bg-green-500 text-white rounded-lg p-4 shadow-lg">
          <div className="text-xl font-bold">You Win! 🎉</div>
          <button
            onClick={onRestart}
            className="mt-2 px-4 py-2 bg-white text-green-500 rounded-lg 
                       font-semibold hover:bg-gray-100 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
      
      {status === 'lost' && (
        <div className="bg-red-500 text-white rounded-lg p-4 shadow-lg">
          <div className="text-xl font-bold">Game Over! 😔</div>
          <button
            onClick={onRestart}
            className="mt-2 px-4 py-2 bg-white text-red-500 rounded-lg 
                       font-semibold hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};