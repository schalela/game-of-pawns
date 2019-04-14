const isEmptySpace = cell => cell === '.';
const isNumber = value => !isNaN(value);
const deleteLastCharacter = str => str.slice(0, -1);
const addTailToResult = str => `${str} w - - 0 1`;
const rowReducer = mode => {
  return (result, col) => {
    if (!isEmptySpace(col) || mode === 'grid') {
      return `${result}${col}`;
    }

    const lastChar = result[result.length - 1];
    if (isNumber(lastChar)) {
      const newRow = deleteLastCharacter(result);
      return `${newRow}${parseInt(lastChar) + 1}`;
    }
    return `${result}1`;
  };
};
const reduceRow = (row, mode) => row.reduce(rowReducer(mode), '');
const boardReducer = mode => {
  return (result, row, index, array) => {
    const isLastIteration = index === array.length - 1;
    const trailingSlash = !isLastIteration ? '/' : '';
    const lineReturn = !isLastIteration ? '\n' : '';
    const rowSuffix = mode === 'grid' ? lineReturn : trailingSlash;
    const sanitisedRow = reduceRow(row, mode);

    return `${result}${sanitisedRow}${rowSuffix}`;
  };
};
const reduceBoard = (board, mode) => board.reduce(boardReducer(mode), '');

export const printFENResult = boardArray => {
  return addTailToResult(reduceBoard(boardArray, 'fen'));
};

export const printGridResult = boardArray => {
  return reduceBoard(boardArray, 'grid');
}