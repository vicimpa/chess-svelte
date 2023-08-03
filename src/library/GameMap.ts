import { Bishop } from "class/Bishop";
import { King } from "class/King";
import { Knight } from "class/Knight";
import { Pawn } from "class/Pawn";
import { Queen } from "class/Queen";
import { Rook } from "class/Rook";

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

  appendFigures() {
    this.fill(null);

    for (let i = 0; i < 2; i++) {
      // Пешки
      for (let j = 0; j < 8; j++) {
        this[8 + i * 40 + j] = new Pawn(1 - i, this);
      }

      // Ладьи
      for (let j = 0; j < 2; j++) {
        this[i * 56 + j * 7] = new Rook(1 - i, this);
      }

      // Кони
      for (let j = 0; j < 2; j++) {
        this[i * 56 + j * 5 + 1] = new Knight(1 - i, this);
      }

      // Слоны
      for (let j = 0; j < 2; j++) {
        this[i * 56 + j * 3 + 2] = new Bishop(1 - i, this);
      }

      // Короли и Ферзи
      for (let j = 0; j < 2; j++) {
        this[i * 56 + j + 3] = new [Queen, King][j](1 - i, this);
      }
    }
  }
}