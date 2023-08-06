import { charWith } from "./charWith";

export const indexToName = (i: number): [x: string, y: string] => (
  [
    charWith('A', i % 8),
    charWith('1', i / 8 | 0)
  ]
);