import React from 'react';
import styled from 'styled-components';

export const PuzzleBoard = ({ rows, columns }) => {
  const boardSize = rows * columns; // total number of squares
  const numbers = Array.from({ length: boardSize }, (_, index) => index); // gives an array of numbers depending on the total number of squares
  const shuffledNumbers = numbers.sort(() => 0.5 - Math.random()); // shuffle the nubers

  const gameBoard = [];
  // divide the shuffles numbers into separate rows depending on what was specified
  for (let i = 0; i < rows; i++) {
    const row = shuffledNumbers.slice(i * columns, (i + 1) * columns);
    gameBoard.push(row);
  }
  console.log('gameBoard', gameBoard);

  const Square = ({ number }) => {
    // display square content: numbers or empty for the 0
    return <div className="square">{number !== 0 ? number : ''}</div>;
  };

  // const findZeroPosition = () => {
  //   let zeroPosition = { rowIndex: -1, columnIndex: -1 };

  //   gameBoard.forEach((row, rowIndex) => {
  //     row.forEach((number, columnIndex) => {
  //       if (number === 0) {
  //         zeroPosition = { rowIndex, columnIndex };
  //       }
  //     });
  //   });

  //   return zeroPosition;
  // };

  // const zeroPosition = findZeroPosition();
  // console.log('Zero position:', zeroPosition);

  const handleClick = (rowIndex, columnIndex, number) => {
    console.log('index', { rowIndex, columnIndex });
    console.log('clicked number', number);
    console.log('clicked number is 0', number === 0);

    // todo: search row and column and if 0, move numbers.
    // 1. Find out if either column or row has zero

    // 2. Find position of 0
    // 3. Calculate buttons between clicked button and zero
    // 4. Replace clicked button with zero and increase index with one for calculated buttons
  };

  return (
    <div className="game-board">
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((number, columnIndex) =>
            number !== 0 ? (
              <Button
                type="button"
                key={columnIndex}
                onClick={() => handleClick(rowIndex, columnIndex, number)}
                number={number}>
                <Square key={columnIndex} number={number} />
              </Button>
            ) : (
              <EmptyButton>''</EmptyButton>
            )
          )}
        </div>
      ))}
    </div>
  );
};

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: pink;
  border-radius: 10px;
`;

const EmptyButton = styled(Button)`
  visibility: hidden;
`;
