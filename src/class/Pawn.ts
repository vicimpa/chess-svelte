import { Figure } from "library/Figure";

export class Pawn extends Figure {
  chars = '♙♟';

  positions(): number[] {
    const out: number[] = [];

    if (this.position === -1)
      return out;

    const [x, y] = this.posToVec();

    for (let i = 1; i <= (y === 1 ? 2 : 1); i++) {
      const pos = this.vecToPos(x, y + i);

      if (this.map[pos])
        break;

      out.push(pos);
    }

    for (let i = -1; i < 2; i += 2) {
      const pos = this.vecToPos(x + i, y + 1);
      const fig = this.map[pos];

      if (fig?.isOtherPlayer(this))
        out.push(pos);
    }

    return out;
  }
}