import generateBoard from './generateBoard';
import { printFENResult, printGridResult } from './printers';

export default mode => {
  const board = generateBoard();

  if (mode === 'grid') {
    return printGridResult(board);
  }

  return printFENResult(board);
};