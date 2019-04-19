import generateBoard, { placePieceOnTheBoard, kingIsInAdjacentSpace, positionIsInvalid, addKingsToBoard, countPiecesInBoard } from './generateBoard';



describe('generateBoard', () => {
  let board;
  beforeEach(() => {
    board = generateBoard();
  });

  it('should generate a 8X8 matrix', () => {
    expect(board.length).toBe(8);
    board.forEach(row => expect(row.length).toBe(8));
  });

  it('should have only one king of each colour', () => {
    const numberOfWhiteKings = countPiecesInBoard(board, 'K');
    const numberOfBlackKings = countPiecesInBoard(board, 'k');

    expect(numberOfWhiteKings).toBe(1);
    expect(numberOfBlackKings).toBe(1);
  });

  it('should not have pawns in the 1st or 8th rank', () => {
    const firstRank = board[0];
    const eightRank = board[7];
    const numberOfPawnsInFirstRank = firstRank.some(piece => piece.match(/[Pp]/));
    const numberOfPawnsInEightRank = eightRank.some(piece => piece.match(/[Pp]/));

    expect(numberOfPawnsInFirstRank).toBe(false);
    expect(numberOfPawnsInEightRank).toBe(false);
  });

  it('should not contain more than 8 pawns for each colour', () => {
    const numberOfWhitePawns = countPiecesInBoard(board, 'P');
    const numberOfBlackPawns = countPiecesInBoard(board, 'p');

    expect(numberOfWhitePawns).toBeLessThan(9);
    expect(numberOfBlackPawns).toBeLessThan(9);
  });
});

describe('countPiecesInBoard', () => {
  it('should return the number of pieces of a type in the board', () => {
    const mockedBoard =
      [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']];

    const numberOfWhiteKnights = countPiecesInBoard(mockedBoard, 'N');
    const numberOfBlackQueens = countPiecesInBoard(mockedBoard, 'q');
    const numberOfWhitePawns = countPiecesInBoard(mockedBoard, 'P');
    expect(numberOfWhiteKnights).toBe(2);
    expect(numberOfBlackQueens).toBe(1);
    expect(numberOfWhitePawns).toBe(8);
  })
});

describe('placePieceOnTheBoard', () => {
  let initialBoard;
  beforeEach(() => {
    initialBoard =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'k', 'r', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'b'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'N', 'K', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'Q']];
  })
  it('should return a new board with the piece if the space is empty', () => {
    const coordinate = { rank: 3, column: 5 };
    const piece = 'P';

    const expectedBoard =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'k', 'r', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', 'P', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'b'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'N', 'K', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'Q']];

    const result = placePieceOnTheBoard(initialBoard, coordinate, piece);
    expect(result).toEqual(expectedBoard);
  });

  it('should place the piece at least two squares apart if the piece is a king and any of the adjacent spaces is a king', () => {
    const coordinate = { rank: 6, column: 5 };
    const piece = 'k';
    const expectedBoard =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'k', 'r', '.', '.', '.', '.', 'k'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'b'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'N', 'K', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'Q']];

    const result = placePieceOnTheBoard(initialBoard, coordinate, piece);
    expect(result).toEqual(expectedBoard);
  });

  it('should not put pawns in the 1st rank', () => {
    const coordinate = { rank: 0, column: 4 };
    const piece = 'p';
    const expectedBoard =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'k', 'r', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', 'p', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'b'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'N', 'K', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'Q']];
    const result = placePieceOnTheBoard(initialBoard, coordinate, piece);
    expect(result).toEqual(expectedBoard);
  });

  it('should not put pawns in the 8th rank', () => {
    const coordinate = { rank: 7, column: 1 };
    const piece = 'p';
    const expectedBoard =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'k', 'r', 'p', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'b'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'N', 'K', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', 'Q']];
    const result = placePieceOnTheBoard(initialBoard, coordinate, piece);
    expect(result).toEqual(expectedBoard);
  });
});

describe('kingIsInAdjacentSpace', () => {
  let board;
  beforeEach(() => {
    board =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'k', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']];
  });

  it('should return true if there is a king on the left', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 5, column: 5 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king on the right', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 5, column: 3 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king below', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 4, column: 4 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king above', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 6, column: 4 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king on the top left', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 6, column: 5 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king on the top right', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 6, column: 3 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king on the bottom right', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 4, column: 5 });
    expect(result).toBe(true);
  });

  it('should return true if there is a king on the bottom left', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 4, column: 3 });
    expect(result).toBe(true);
  });

  it('should return false if there is no king around', () => {
    const result = kingIsInAdjacentSpace(board, { rank: 3, column: 3 });
    expect(result).toBe(false);
  });
});

describe('positionIsInvalid', () => {
  let board;
  beforeEach(() => {
    board =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'k', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']];
  });

  it('should return true if the piece is a king and there is an adjacent king', () => {
    const result = positionIsInvalid(board, { rank: 5, column: 3 }, 'K');
    expect(result).toBe(true);
  });

  it('should return false if it is a king and there is no adjacent king', () => {
    const result = positionIsInvalid(board, { rank: 1, column: 1 }, 'K');
    expect(result).toBe(false);
  });

  it('should return true if the piece is a pawn in the first rank', () => {
    const result = positionIsInvalid(board, { rank: 0, column: 1 }, 'p');
    expect(result).toBe(true);
  });

  it('should return true if the piece is a pawn in the last rank', () => {
    const result = positionIsInvalid(board, { rank: 7, column: 1 }, 'p');
    expect(result).toBe(true);
  });

  it('should return false if the piece is a pawn in the any other rank', () => {
    const result = positionIsInvalid(board, { rank: 4, column: 1 }, 'p');
    expect(result).toBe(false);
  });

  it('should return false if the piece is any other piece', () => {
    const result = positionIsInvalid(board, { rank: 0, column: 1 }, 'q');
    expect(result).toBe(false);
  });
});

describe('addKingsToBoard', () => {
  it('should add a white king and a black king to an empty board', () => {
    const board =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', ',', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']];

    const result = addKingsToBoard(board);
    const numberOfBlackKings = countPiecesInBoard(result, 'k');
    const numberOfWhiteKings = countPiecesInBoard(result, 'K');
    expect(numberOfBlackKings).toBe(1);
    expect(numberOfWhiteKings).toBe(1);
  });

  it('should not add a white king if there is one already', () => {
    const board =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'K', '.', '.', '.', '.'],
      ['.', '.', '.', '.', ',', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']];

    const result = addKingsToBoard(board);
    const numberOfBlackKings = countPiecesInBoard(result, 'k');
    const numberOfWhiteKings = countPiecesInBoard(result, 'K');
    expect(numberOfBlackKings).toBe(1);
    expect(numberOfWhiteKings).toBe(1);
  });

  it('should not add a black king if there is one already', () => {
    const board =
      [['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'k', '.', '.', '.', '.'],
      ['.', '.', '.', '.', ',', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']];

    const result = addKingsToBoard(board);
    const numberOfBlackKings = countPiecesInBoard(result, 'k');
    const numberOfWhiteKings = countPiecesInBoard(result, 'K');
    expect(numberOfBlackKings).toBe(1);
    expect(numberOfWhiteKings).toBe(1);
  });
});