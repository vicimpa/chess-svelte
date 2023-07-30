import type { Figure } from "./Figure";

export type TVec = [x: number, y: number];

export class GameMap extends Array<Figure | null> {
  constructor() {
    super(64);
  }

  posToVec(n: number): TVec {
    return [n % 8 | 0, n / 8 | 0];
  }

  vecToPos(x: number, y: number) {
    return y * 8 + x;
  }
}