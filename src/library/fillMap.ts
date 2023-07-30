import { Bishop } from "class/Bishop";
import { King } from "class/King";
import { Knight } from "class/Knight";
import { Pawn } from "class/Pawn";
import { Queen } from "class/Queen";
import { Rook } from "class/Rook";

import type { GameMap } from "./GameMap";
export const fillMap = (map: GameMap) => {
  map.fill(null);

  for (let i = 0; i < 2; i++) {
    // Пешки
    for (let j = 0; j < 8; j++) {
      map[8 + i * 40 + j] = new Pawn(i, map);
    }

    // Ладьи
    for (let j = 0; j < 2; j++) {
      map[i * 56 + j * 7] = new Rook(i, map);
    }

    // Кони
    for (let j = 0; j < 2; j++) {
      map[i * 56 + j * 5 + 1] = new Knight(i, map);
    }

    // Слоны
    for (let j = 0; j < 2; j++) {
      map[i * 56 + j * 3 + 2] = new Bishop(i, map);
    }

    // Короли и Ферзи
    for (let j = 0; j < 2; j++) {
      map[i * 56 + j + 3] = new [Queen, King][j](i, map);
    }
  }
};