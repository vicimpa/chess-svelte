import type { GameMap, TVec } from "./GameMap";

export class Figure {
  #map!: GameMap;
  #player: number;

  chars: string = '  ';

  constructor(player: number, map: GameMap) {
    this.#player = player;
    this.#map = map;
  }

  get map() { return this.#map; }
  get player() { return this.#player; }
  get position() { return this.#map?.indexOf(this) ?? -1; }
  get char() { return this.chars[this.#player] ?? ''; }

  positions(): number[] {
    const { map } = this;
    const index = map.indexOf(this);

    if (index < 0)
      return [];

    return [];
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