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
});

describe('printGridResult', () => {
  it('should return Grid string for a given board set', () => {
    const gridResult = printGridResult(mockedBoard);
    expect(gridResult).toBe(
      'rnbqkbnr\n' +
      'pppppppp\n' +
      '........\n' +
      '........\n' +
      '........\n' +
      '........\n' +
      'PPPPPPPP\n' +
      'RNBQKBNR'
    );
  });
})
