import React, { useState, useEffect } from 'react';
import Board from '../components/board';
import Square from '../components/square';
import generateBoard from '../lib/generateBoard';
import { printFENResult } from '../lib/printers';

const toggleColor = color => color = color === 'white' ? 'black' : 'white';

const Page = ({ initialBoard }) => {
  const [board, setBoard] = useState(initialBoard);
  useEffect(() => {
    setTimeout(() => setBoard(generateBoard()), 10000)
  }, [board]);

  let color = 'white';
  return (
    <>
      <img width={150} src='/static/TW-Pride-logo.png' />
      <p>[SHOKUNIN 2019] Game of Pawns</p>
      <Board board={board}>
        {board.map((row, i) => {
          color = toggleColor(color);
          return row.map((cell, j) => {
            color = toggleColor(color);
            return <Square key={`${i}${j}`} color={color} piece={cell} />
          })
        })}
      </Board>
      <p>{printFENResult(board)}</p>
    </>
  );
};

Page.getInitialProps = async ({ req }) => {
  if (req) {
    const initialBoard = generateBoard();
    return { initialBoard };
  }
}

export default Page;
