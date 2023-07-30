import { Figure } from "library/Figure";

export class Bishop extends Figure {
  chars = '♗♝';

  positions(): number[] {
    return this.calcPositions([
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ], undefined, 8);
  }
}