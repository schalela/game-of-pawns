import { pickPieceFromSet, generateCoords, fixCoords } from './utils';

describe('pickPieceFromSet', () => {
  it('should pick a piece and remove it from the array', () => {
    const pieceSet = ['a', 'b', 'c'];
    const [pickedPiece, newSet] = pickPieceFromSet(pieceSet);
    switch (pickedPiece) {
      case 'a':
        expect(newSet).toEqual(['b', 'c']);
        break;
      case 'b':
        expect(newSet).toEqual(['a', 'c']);
        break;
      case 'c':
        expect(newSet).toEqual(['a', 'b']);
        break;
      default:
        throw new Error();
    };
  })
});

describe('generateCoords', () => {
  it('should generate coordinates inside the board', () => {
    const coordinates = generateCoords();
    expect(coordinates.rank).toBeGreaterThanOrEqual(0);
    expect(coordinates.rank).toBeLessThanOrEqual(7);
    expect(coordinates.column).toBeGreaterThanOrEqual(0);
    expect(coordinates.column).toBeLessThanOrEqual(7);
  })
});

describe('fixCoords', () => {
  it('should return coordinates 2 squares right and 2 squares down if coords are over the 5th rank and before the 6th column', () => {
    const coords = { rank: 3, column: 3 };
    const { rank, column } = fixCoords(coords);
    expect(rank).toBe(5);
    expect(column).toBe(5);
  });

  it('should return coordinates in 1st rank and 2 squares right if coords are below the 5th rank and before the 6th column', () => {
    const coords = { rank: 6, column: 3 };
    const { rank, column } = fixCoords(coords);
    expect(rank).toBe(1);
    expect(column).toBe(5);
  });

  it('should return coordinates in 2nd rank and 1th column if coords are below the 5th rank and after the 6th column', () => {
    const coords = { rank: 6, column: 6 };
    const { rank, column } = fixCoords(coords);
    expect(rank).toBe(1);
    expect(column).toBe(0);
  });
})