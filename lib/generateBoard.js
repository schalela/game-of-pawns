import { pickPieceFromSet, generateCoords, fixCoords } from './utils';

const isKing = piece => !!piece && piece.toLowerCase() === 'k';
const isPawn = piece => !!piece && piece.toLowerCase() === 'p';
const spaceIsNotEmpty = space => space !== '.';
const nextSquare = square => square === 7 ? 0 : square + 1;
const prevSquare = square => square === 0 ? 7 : square - 1;

export const countPiecesInBoard = (board, piece) => board.reduce((piecesInBoard, row) => {
  return piecesInBoard + row.reduce((piecesInRow, cell) => {
    return piecesInRow += cell === piece ? 1 : 0;
  }, 0);
}, 0);

export const placePieceOnTheBoard = (board, coords, piece) => {
  const result = Array.from(board);
  const fixedCoords = positionIsInvalid(board, coords, piece) ? fixCoords(coords) : coords;
  const { rank, column } = fixedCoords;

  const space = result[rank][column];

  if (spaceIsNotEmpty(space)) {
    const newCoords = generateCoords();
    return placePieceOnTheBoard(result, newCoords, piece);
  }

  result[rank][column] = piece;

  return result;
}

export const kingIsInAdjacentSpace = (board, { rank, column }) => {
  const left = board[rank][prevSquare(column)];
  const right = board[rank][nextSquare(column)];
  const bottom = board[nextSquare(rank)][column];
  const top = board[prevSquare(rank)][column];

  return isKing(left) || isKing(right) || isKing(top) || isKing(bottom);
};

export const positionIsInvalid = (board, coords, piece) => {
  const { rank } = coords;

  if (isKing(piece)) {
    return kingIsInAdjacentSpace(board, coords);
  }

  if (isPawn(piece)) {
    return (rank === 0 || rank === 7);
  }

  return false;
}

export const addKingsToBoard = board => {
  let resultBoard = Array.from(board);
  resultBoard = countPiecesInBoard(resultBoard, 'K') === 0 ?
    placePieceOnTheBoard(resultBoard, generateCoords(), 'K') : resultBoard;
  resultBoard = countPiecesInBoard(resultBoard, 'k') === 0 ?
    placePieceOnTheBoard(resultBoard, generateCoords(), 'k') : resultBoard;
  return resultBoard;
};

export default () => {
  const emptyBoard = [...Array(8)].map(() => Array(8).fill('.'));
  const pieceSet = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'r', 'q', 'b', 'b', 'n', 'n', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'R', 'R', 'Q', 'B', 'B', 'N', 'N'];
  const gameSize = Math.floor(Math.random() * pieceSet.length);
  const boardWithKings = addKingsToBoard(emptyBoard);
  const fillTheBoard = () => {
    let filledBoard = Array.from(boardWithKings);
    let remainingPieces = Array.from(pieceSet);

    for (let i = 0; i < gameSize; i++) {
      const [newPiece, remainingPieceSet] = pickPieceFromSet(remainingPieces);
      remainingPieces = Array.from(remainingPieceSet);
      filledBoard = placePieceOnTheBoard(filledBoard, generateCoords(), newPiece);
    }

    return filledBoard;
  };

  return fillTheBoard();
};