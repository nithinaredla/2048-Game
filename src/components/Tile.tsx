// src/components/Tile.tsx
import React from 'react';

interface TileProps {
  value: number;
  row: number;
  col: number;
}

const getTileColor = (value: number): string => {
  const colors: { [key: number]: string } = {
    2: 'bg-amber-50',
    4: 'bg-amber-100',
    8: 'bg-orange-200',
    16: 'bg-orange-300',
    32: 'bg-orange-400',
    64: 'bg-orange-500 text-white',
    128: 'bg-yellow-300',
    256: 'bg-yellow-400',
    512: 'bg-yellow-500 text-white',
    1024: 'bg-amber-500 text-white',
    2048: 'bg-red-500 text-white',
  };
  
  return colors[value] || 'bg-gray-800 text-white';
};

const getFontSize = (value: number): string => {
  if (value < 100) return 'text-3xl';
  if (value < 1000) return 'text-2xl';
  return 'text-xl';
};

export const Tile: React.FC<TileProps> = ({ value, row, col }) => {
  if (value === 0) return null;

  return (
    <div
      className={`
        absolute w-20 h-20 rounded-lg flex items-center justify-center font-bold
        transition-all duration-150 ease-in-out
        ${getTileColor(value)} ${getFontSize(value)}
        shadow-md
      `}
      style={{
        transform: `translate(${col * 88}px, ${row * 88}px)`,
      }}
    >
      {value}
    </div>
  );
};