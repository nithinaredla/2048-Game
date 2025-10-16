// src/components/GameControls.tsx
import React from 'react';

interface GameControlsProps {
  onRestart: () => void;
  onSizeChange: (size: number) => void;
  currentSize: number;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onRestart,
  onSizeChange,
  currentSize,
}) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex gap-2">
        {[3, 4, 5, 6].map(size => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentSize === size
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {size}x{size}
          </button>
        ))}
      </div>
      
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold 
                   hover:bg-green-600 transition-colors shadow-md"
      >
        New Game
      </button>
      
      <div className="text-sm text-gray-600">
        <p>Use arrow keys or WASD to move tiles</p>
        <p>Combine tiles to reach 2048!</p>
      </div>
    </div>
  );
};