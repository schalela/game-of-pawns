const isEmptySpace = cell => cell === '.';
const isNumber = value => !isNaN(value);
const deleteLastCharacter = str => str.slice(0, -1);
const addTailToResult = str => `${str} w - - 0 1`;
const reduceRow = (row, mode) => row.reduce(rowReducer(mode), '');
const reduceBoard = (board, mode) => board.reduce(boardReducer(mode), '');

const rowReducer = mode => {
  return (result, col) => {
    if (mode === 'grid' || !isEmptySpace(col)) {
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

export const printFENResult = boardArray => {
  return addTailToResult(reduceBoard(boardArray, 'fen'));
};

export const printGridResult = boardArray => {
  return reduceBoard(boardArray, 'grid');
};
