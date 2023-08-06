export function charWith(char: string, index: number) {
  return String.fromCharCode(char.charCodeAt(0) + index);
}