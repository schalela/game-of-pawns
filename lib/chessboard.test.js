import generateChessboard from './chessboard';

const fenRegex = /^[RBNQKPrbnqkp1-8/]+[ ]+[wb]+[ ]+[KQkq-]+[ ]+[abcdefge12345678-]+[ ]+[0-1]+[ ]+[0-1]$/;
const gridRegex = /^[RBNQKPrbnqkp.\n]+$/;

describe('generateChessboard', () => {
  describe('with FEN flag', () => {
    let fenString;
    beforeAll(() => {
      fenString = generateChessboard('fen');
    });

    it('should return a string in valid FEN', () => {
      expect(fenRegex.test(fenString)).toBe(true);
    });

    it('should end with w - - 0 1', () => {
      expect(fenString.endsWith('w - - 0 1')).toBe(true);
    })
  });

  describe('with grid flag', () => {
    let grid;
    beforeAll(() => {
      grid = generateChessboard('grid');
    });

    it('should have 8 rows', () => {
      const rows = grid.split('\n');
      expect(rows.length).toBe(8);
    });

    it('should have 8 columns', () => {
      const rows = grid.split('\n');
      rows.forEach(row => expect(row.length).toBe(8));
    });

    it('should contain valid chess pieces', () => {
      const isValid = gridRegex.test(grid);

      expect(isValid).toBe(true);
    })
  });

  describe('with no flag', () => {
    let result;
    beforeAll(() => {
      result = generateChessboard();
    });

    it('should return a string in valid FEN', () => {
      expect(fenRegex.test(result)).toBe(true);
    });
  });
})