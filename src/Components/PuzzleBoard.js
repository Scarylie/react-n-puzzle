import React, { useState } from 'react';
import styled from 'styled-components';

// Function to generate the board
const getGameBoard = (rows, columns) => {
  let gameBoard = [];
  // divide the shuffles numbers into separate rows depending on what was specified
  const boardSize = rows * columns; // total number of squares
  const numbers = Array.from({ length: boardSize }, (_, index) => index); // gives an array of numbers depending on the total number of squares
  const shuffledNumbers = numbers.sort(() => 0.5 - Math.random()); // shuffle the nubers

  for (let i = 0; i < rows; i++) {
    const row = shuffledNumbers.slice(i * columns, (i + 1) * columns);
    gameBoard.push(row);
  }
  return gameBoard;
};

// Function to play the game
export const PuzzleBoard = ({ rows, columns }) => {
  const [puzzleBoard, setPuzzleBoard] = useState(getGameBoard(rows, columns));

  // console.log('getGameBoard', getGameBoard);

  const Square = ({ number }) => {
    // display square content: numbers or empty for the 0
    return <div className="square">{number !== 0 ? number : ''}</div>;
  };

  const handleClick = (rowIndex, columnIndex, number) => {
    // console.log('index', { rowIndex, columnIndex });
    // console.log('clicked number', number);
    // console.log('clicked number is 0', number === 0);

    // todo: search row and column and if 0, move numbers.

    // 1. Find out if either column or row has zero
    console.log('puzzleBoard', puzzleBoard);
    // Get all numbers in row
    const rowNumbers = puzzleBoard[rowIndex];
    console.log('rowNumbers', rowNumbers);
    // Get all numbers in column
    const columnNumbers = puzzleBoard.map((numbersInEachRow) => {
      return numbersInEachRow[columnIndex];
    });
    console.log('columnNumbers', columnNumbers);

    // 2. Find if there is a zero in row or column and find it's position
    const hasZeroInRow = rowNumbers.filter((num) => {
      return num === 0;
    });
    console.log('hasZeroInRow', hasZeroInRow);

    const hasZeroInCol = columnNumbers.filter((num) => {
      return num === 0;
    });
    console.log('hasZeroInCol', hasZeroInCol);

    // 3. Calculate buttons between clicked button and zero
    // 4. Replace clicked button with zero and increase index with one for calculated buttons
  };

  // const findZeroPosition = () => {
  //   let zeroPosition = { rowIndex: -1, columnIndex: -1 };

  //   getGameBoard.forEach((row, rowIndex) => {
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

  return (
    <div className="game-board">
      {puzzleBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((number, columnIndex) =>
            number !== 0 ? (
              <Button
                type="button"
                key={number}
                onClick={() => handleClick(rowIndex, columnIndex, number)}
                number={number}>
                <Square number={number} />
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
