// src/App.tsx
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { GameStatusDisplay } from './components/GameStatus';

function App() {
  const { gameState, restart, changeBoardSize } = useGame(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2">2048</h1>
          <p className="text-white text-lg opacity-90">
            Join the numbers and get to the <strong>2048 tile!</strong>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Left Side - Game Board */}
          <div className="flex-shrink-0">
            <GameBoard gameState={gameState} />
          </div>

          {/* Right Side - Controls and Status */}
          <div className="space-y-6">
            <GameStatusDisplay
              score={gameState.score}
              status={gameState.status}
              onRestart={() => restart(gameState.boardSize)}
            />
            
            <GameControls
              onRestart={() => restart(gameState.boardSize)}
              onSizeChange={changeBoardSize}
              currentSize={gameState.boardSize}
            />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden mt-8">
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <div></div>
            <button
              onClick={() => {/* Implement mobile swipe up */}}
              className="bg-white bg-opacity-20 p-4 rounded-lg text-white font-bold"
            >
              ↑
            </button>
            <div></div>
            
            <button
              onClick={() => {/* Implement mobile swipe left */}}
              className="bg-white bg-opacity-20 p-4 rounded-lg text-white font-bold"
            >
              ←
            </button>
            <div></div>
            <button
              onClick={() => {/* Implement mobile swipe right */}}
              className="bg-white bg-opacity-20 p-4 rounded-lg text-white font-bold"
            >
              →
            </button>
            
            <div></div>
            <button
              onClick={() => {/* Implement mobile swipe down */}}
              className="bg-white bg-opacity-20 p-4 rounded-lg text-white font-bold"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;