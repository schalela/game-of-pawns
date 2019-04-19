import printBoard from './lib/chessboard';
import chalk from 'chalk';
import figlet from 'figlet';

const print = (text) => {
  console.log(chalk.bgBlackBright.white(text));
};

const title = () => {
  console.log(chalk.blue(figlet.textSync('ThoughtWorks')));
  console.log(chalk.magenta('[SHOKUNIN 2019] April Challenge: Game of Pawns'));
  console.log(chalk.magenta('**********************************************'));
};

const args = process.argv.slice(2);
const mode = args[0].substr(2);
const board = printBoard(mode);

title();
print(board);