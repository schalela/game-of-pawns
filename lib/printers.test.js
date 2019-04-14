import { printFENResult, printGridResult } from './printers';

const mockedBoard =
  [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']];

describe('printFENResult', () => {
  it('should return FEN string for a given board set', () => {
    const fenResult = printFENResult(mockedBoard);
    expect(fenResult).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1');
  });

  // it('should have only one king of each colour', () => {
  //   const numberOfWhiteKings = fenString.match(/K/).length;
  //   const numberOfBlackKings = fenString.match(/k/).length;

  //   expect(numberOfWhiteKings).toBe(1);
  //   expect(numberOfBlackKings).toBe(1);
  // });

  // it('should not have pawns in the 1st or 8th rank', () => {
  //   const board = fenString.split(' ')[0];
  //   const firstRank = board.split('/')[0];
  //   const eightRank = board.split('/')[7];
  //   const numberOfPawnsInFirstRank = (firstRank.match(/[Pp]/) || []).length;
  //   const numberOfPawnsInEightRank = (eightRank.match(/[Pp]/) || []).length;

  //   expect(numberOfPawnsInFirstRank).toBe(0);
  //   expect(numberOfPawnsInEightRank).toBe(0);
  // });

  // it('should not contain more than 8 pawns for each colour', () => {
  //   const numberOfWhitePawns = (fenString.match(/P/g) || []).length;
  //   const numberOfBlackPawns = (fenString.match(/p/g) || []).length;

  //   expect(numberOfWhitePawns).toBeLessThan(9);
  //   expect(numberOfBlackPawns).toBeLessThan(9);
  // });
});

describe('printGridResult', () => {
  it('should return Grid string for a given board set', () => {
    const gridResult = printGridResult(mockedBoard);
    expect(gridResult).toBe('rnbqkbnr\n' +
      'pppppppp\n' +
      '........\n' +
      '........\n' +
      '........\n' +
      '........\n' +
      'PPPPPPPP\n' +
      'RNBQKBNR');
  });
})
