import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tile, GameState } from '../types';
import { GRID_SIZE, TILE_COUNT, createInitialTiles, shuffleTiles, canMove, checkWin } from '../utils/gameLogic';
import PuzzleTile from './PuzzleTile';
import { Trophy, RefreshCw, Timer, Hash } from 'lucide-react';

export default function PuzzleGrid() {
  const [gameState, setGameState] = useState<GameState>({
    tiles: createInitialTiles(),
    moves: 0,
    isWon: false,
    time: 0,
    isStarted: false,
  });

  // Use the generated image path
  const imageUrl = "/src/assets/images/puzzle_background_1781051631906.png";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.isStarted && !gameState.isWon) {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isStarted, gameState.isWon]);

  const handleTileClick = (index: number) => {
    if (gameState.isWon) return;

    const emptyIndex = gameState.tiles.findIndex(t => t.id === TILE_COUNT - 1);
    if (canMove(index, emptyIndex)) {
      const newTiles = [...gameState.tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];

      const isWon = checkWin(newTiles);
      setGameState(prev => ({
        ...prev,
        tiles: newTiles,
        moves: prev.moves + 1,
        isWon,
        isStarted: true,
      }));
    }
  };

  const handleReset = () => {
    setGameState({
      tiles: shuffleTiles(createInitialTiles()),
      moves: 0,
      isWon: false,
      time: 0,
      isStarted: false,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-4">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Timer size={14} />
            <span>Waktu</span>
          </div>
          <span className="text-2xl font-mono font-bold text-white uppercase tracking-wider">
            {formatTime(gameState.time)}
          </span>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Hash size={14} />
            <span>Langkah</span>
          </div>
          <span className="text-2xl font-mono font-bold text-white lowercase tracking-widest leading-none">
             {gameState.moves}
          </span>
        </div>
        <button
          onClick={handleReset}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl p-4 border border-white/10 transition-all flex flex-col items-center justify-center group active:scale-95"
        >
          <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-xs font-semibold mt-1 uppercase tracking-tighter">Reset</span>
        </button>
      </div>

      {/* Game Board */}
      <div className="relative aspect-square w-full bg-slate-900/80 rounded-3xl p-4 shadow-2xl border-4 border-slate-800">
        <div 
          className="grid gap-2 h-full w-full"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {gameState.tiles.map((tile, index) => (
            <PuzzleTile
              key={tile.id}
              tile={tile}
              imageUrl={imageUrl}
              onClick={() => handleTileClick(index)}
              isEmpty={tile.id === TILE_COUNT - 1 && !gameState.isWon}
            />
          ))}
        </div>

        {/* Win Overlay */}
        <AnimatePresence>
          {gameState.isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-blue-900/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-8 z-10"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Trophy size={80} className="text-yellow-400 mb-4 animate-bounce" />
              </motion.div>
              <h2 className="text-4xl font-black text-white mb-2 tracking-tight">LUAR BIASA!</h2>
              <p className="text-blue-100 mb-6 text-lg">
                Kamu menyelesaikan puzzle DiTz Store dalam <strong>{gameState.moves}</strong> langkah!
              </p>
              <button
                onClick={handleReset}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold px-8 py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-yellow-400/20"
              >
                Main Lagi
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Instructions */}
      <div className="bg-slate-800/30 rounded-xl p-4 text-slate-400 text-sm text-center border border-white/5">
        <p>Klik ubin di sebelah kotak kosong untuk menggesernya. Susun gambar hingga sempurna!</p>
      </div>
    </div>
  );
}
