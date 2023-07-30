import { Figure } from "library/Figure";

import type { TVec } from "library/GameMap";

export class Pawn extends Figure {
  chars = '♙♟';

  positions(): number[] {
    const move: TVec[] = [
      [0, 1]
    ];

    if (this.posToVec()[1] === 1)
      move.push([0, 2]);

    return this.calcPositions(move, [
      [-1, 1],
      [1, 1]
    ]);
  }
}