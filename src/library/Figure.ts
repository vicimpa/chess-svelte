import type { GameMap, TVec } from "./GameMap";

export class Figure {
  #map!: GameMap;
  player!: number;
  chars: string = '  ';

  constructor(player: number, map: GameMap) {
    this.player = player;
    this.#map = map;
  }

  get map() { return this.#map; }
  get position() { return this.#map?.indexOf(this) ?? -1; }
  get char() { return this.chars[this.player] ?? ''; }

  positions(): number[] {
    const { map } = this;
    const index = map.indexOf(this);

    if (index < 0)
      return [];

    return [];
  }

  calcPositions(move: TVec[], eat = move, repeat = 1) {
    const out: number[] = [];

    if (this.position === -1) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          const pos = this.vecToPos(x, y);
          if (!this.map[pos])
            out.push(pos);
        }
      }

      return out;
    }

    const [X, Y] = this.posToVec();

    for (const pair of new Set([...move, ...eat])) {
      const [a, b] = pair;
      const hasEat = eat.includes(pair);
      const hasMove = move.includes(pair);

      for (let i = 1; i <= repeat; i++) {
        const x = X + a * i, y = Y + b * i;
        const pos = this.vecToPos(x, y);
        const fig = this.map[pos];
        if (x < 0 || x > 7) break;
        if (y < 0 || y > 7) break;

        if (fig) {
          if (fig.isOtherPlayer(this) && hasEat)
            out.push(pos);
          break;
        } else if (hasMove) {
          out.push(pos);
        }
      }
    }

    return out;
  }

  posToVec(n: number = this.position) {
    const { map, player } = this;
    const pos = map.posToVec(n);
    if (player) pos[1] = 7 - pos[1];
    return pos;
  }

  vecToPos(x: number, y: number) {
    const { map, player } = this;
    if (player) y = 7 - y;
    return map.vecToPos(x, y);
  }

  isOtherPlayer(fig?: Figure) {
    return fig?.player === +!this.player;
  }
}
