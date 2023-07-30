import { Figure } from "library/Figure";

export class Knight extends Figure {
  chars = '♘♞';

  positions(): number[] {
    const out: number[] = [];

    if (this.position === -1)
      return out;

    const [X, Y] = this.posToVec();
    const pairs = [[1, 2], [2, 1]];

    for (let x = -1; x < 2; x += 2) {
      for (let y = -1; y < 2; y += 2) {
        for (const [a, b] of pairs) {
          const pos = this.vecToPos(X + x * a, Y + y * b);
          if (!this.map[pos])
            out.push(pos);
        }
      }
    }

    return out;
  }
}