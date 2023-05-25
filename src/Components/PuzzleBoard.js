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
    // todo: search row and column and if 0, move numbers.

    // 1. Find out if either column or row has zero
    // console.log('puzzleBoard', puzzleBoard);

    // Get all numbers in row
    const rowNumbers = puzzleBoard[rowIndex];
    //console.log('rowNumbers', rowNumbers);

    // Get all numbers in column
    const columnNumbers = puzzleBoard.map((numbersInEachRow) => {
      return numbersInEachRow[columnIndex];
    });
    //console.log('columnNumbers', columnNumbers);

    // 2. Find if there is a zero in row or column and find it's position
    let hasZeroInRow = rowNumbers.some((num) => {
      return num === 0;
    });
    // console.log('hasZeroInRow', hasZeroInRow);

    let hasZeroInCol = columnNumbers.some((num) => {
      return num === 0;
    });
    // console.log('hasZeroInCol', hasZeroInCol);

    // 3. Calculate buttons between clicked button and zero
    // If there is a zero in row, how many are between
    if (hasZeroInRow) {
      // Find the index of the selected number and the index of the zero (0)
      console.log('number', number);

      let selectedIndex = rowNumbers.indexOf(number);
      const zeroIndex = rowNumbers.indexOf(0);

      console.log('selectedIndex Row', selectedIndex);
      console.log('zeroIndex Row', zeroIndex);

      // Calculate the spaces/indexes between the selected number and the zero
      const spaces = Math.abs(selectedIndex - zeroIndex) - 1;
      console.log('spaces Row', spaces);

      if (selectedIndex < zeroIndex) {
        console.log('selectedIndex lower then zeroIndex');
      } else console.log('selectedIndex higher then zeroIndex');
    }

    if (hasZeroInCol) {
      const selectedIndex = columnNumbers.indexOf(number);
      const zeroIndex = columnNumbers.indexOf(0);

      console.log('selectedIndex Col', selectedIndex);
      console.log('zeroIndex Col', zeroIndex);

      const spaces = Math.abs(selectedIndex - zeroIndex) - 1;
      console.log('spaces Col', spaces);

      if (selectedIndex < zeroIndex) {
        console.log('selectedIndex lower then zeroIndex');
      } else console.log('selectedIndex higher then zeroIndex');
    }
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
