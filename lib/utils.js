export const pickPieceFromSet = pieceSet => {
  const i = Math.floor(Math.random() * pieceSet.length);
  const pickedPiece = pieceSet[i];
  pieceSet.splice(i, 1);
  return [pickedPiece, pieceSet];
};

export const generateCoords = () => {
  return {
    rank: Math.floor(Math.random() * Math.floor(8)),
    column: Math.floor(Math.random() * Math.floor(8))
  }
};

export const fixCoords = coords => {
  const { rank, column } = coords;
  return { rank: rank >= 5 ? 1 : rank + 2, column: column >= 6 ? 0 : column + 2 };
}
