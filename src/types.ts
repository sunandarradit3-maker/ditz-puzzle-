export type Tile = {
  id: number;
  currentPosition: number;
  correctPosition: number;
};

export type GameState = {
  tiles: Tile[];
  moves: number;
  isWon: boolean;
  time: number;
  isStarted: boolean;
};
