import { Figure } from "library/Figure";

export class Bishop extends Figure {
  chars = '♗♝';

  positions(): number[] {
    const out: number[] = [];
    const pairs = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ];

    if (this.position === -1)
      return out;

    const [X, Y] = this.posToVec();

    for (const [a, b] of pairs) {
      for (let i = 1; i < 8; i++) {
        const x = X + a * i, y = Y + b * i;
        const pos = this.vecToPos(x, y);
        const fig = this.map[pos];

        if (x < 0 || x > 7) break;
        if (y < 0 || y > 7) break;

        if (!this.map[pos] || fig?.isOtherPlayer(this))
          out.push(pos);

        if (this.map[pos]) break;
      }
    }

    return out;
  }
}