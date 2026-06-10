import { Tile } from '../types';

export const GRID_SIZE = 3; // 3x3 grid
export const TILE_COUNT = GRID_SIZE * GRID_SIZE;

export const createInitialTiles = (): Tile[] => {
  return Array.from({ length: TILE_COUNT }, (_, i) => ({
    id: i,
    currentPosition: i,
    correctPosition: i,
  }));
};

export const shuffleTiles = (tiles: Tile[]): Tile[] => {
  const shuffled = [...tiles];
  // Standard Fisher-Yates shuffle might produce unsolvable state for 15-puzzle.
  // For simplicity and guaranteed solvability, we usually perform random valid moves.
  // But for a 3x3, most people just shuffle. 
  // To ensure solvability: inversion count check.
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Basic inversion count check for 3x3 (solvable if parity of inversions matches)
  if (!isSolvable(shuffled)) {
    // If not solvable, swap two non-empty tiles
    const firstTwo = shuffled.filter(t => t.id !== TILE_COUNT - 1).slice(0, 2);
    const idx1 = shuffled.findIndex(t => t.id === firstTwo[0].id);
    const idx2 = shuffled.findIndex(t => t.id === firstTwo[1].id);
    [shuffled[idx1], shuffled[idx2]] = [shuffled[idx2], shuffled[idx1]];
  }

  return shuffled.map((tile, index) => ({ ...tile, currentPosition: index }));
};

const isSolvable = (tiles: Tile[]): boolean => {
  let inversions = 0;
  const flat = tiles.map(t => t.id).filter(id => id !== TILE_COUNT - 1);
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
};

export const canMove = (index: number, emptyIndex: number): boolean => {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
  const emptyCol = emptyIndex % GRID_SIZE;

  return (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  );
};

export const checkWin = (tiles: Tile[]): boolean => {
  return tiles.every((tile, index) => tile.id === index);
};
