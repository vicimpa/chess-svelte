import { Figure } from "library/Figure";

export class Knight extends Figure {
  chars = '♘♞';

  positions(): number[] {
    return this.calcPositions([
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
      [-2, -1],
      [-2, 1]
    ]);
  }
}