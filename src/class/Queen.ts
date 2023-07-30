import { Figure } from "library/Figure";

export class Queen extends Figure {
  chars = '♕♛';

  positions(): number[] {
    return this.calcPositions([
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ], undefined, 8);
  }
}