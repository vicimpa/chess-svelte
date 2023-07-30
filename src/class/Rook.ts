import { Figure } from "library/Figure";

export class Rook extends Figure {
  chars = '♖♜';

  positions(): number[] {
    return this.calcPositions([
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ], undefined, 8);
  }
}