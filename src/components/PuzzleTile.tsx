import { motion } from 'motion/react';
import { Tile } from '../types';
import { GRID_SIZE } from '../utils/gameLogic';

interface PuzzleTileProps {
  tile: Tile;
  imageUrl: string;
  onClick: () => void;
  isEmpty: boolean;
}

export default function PuzzleTile({ tile, imageUrl, onClick, isEmpty }: PuzzleTileProps) {
  if (isEmpty) return <div className="w-full h-full bg-slate-100/10 rounded-lg border-2 border-dashed border-slate-700/50" />;

  const size = 100 / GRID_SIZE;
  const xOffset = (tile.id % GRID_SIZE) * (100 / (GRID_SIZE - 1));
  const yOffset = Math.floor(tile.id / GRID_SIZE) * (100 / (GRID_SIZE - 1));

  return (
    <motion.button
      layout
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative w-full h-full overflow-hidden rounded-lg shadow-xl border border-white/10 cursor-pointer group"
    >
      <div
        className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-300"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
          backgroundPosition: `${(tile.id % GRID_SIZE) * (100 / (GRID_SIZE - 1))}% ${Math.floor(tile.id / GRID_SIZE) * (100 / (GRID_SIZE - 1))}%`,
        }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white/20">
        {tile.id + 1}
      </div>
    </motion.button>
  );
}
