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
  console.log('puzzleBoard', puzzleBoard);

  // console.log('getGameBoard', getGameBoard);

  const Square = ({ number }) => {
    // display square content: numbers or empty for the 0
    return <div className="square">{number !== 0 ? number : ''}</div>;
  };

  const handleClick = (rowIndex, columnIndex, number) => {
    console.log('Selected number', number);

    // Get all numbers in row
    let rowNumbers = puzzleBoard[rowIndex];

    // Get all numbers in column
    let columnNumbers = puzzleBoard.map((numbersInEachRow) => {
      return numbersInEachRow[columnIndex];
    });

    // Find if there is a zero in row or column and find it's position
    let hasZeroInRow = rowNumbers.some((num) => {
      return num === 0;
    });
    let hasZeroInCol = columnNumbers.some((num) => {
      return num === 0;
    });

    // If zero is in row, move order of numbers
    if (hasZeroInRow) {
      // Find the index of the selected number and the index of the zero (0)
      let selectedIndex = rowNumbers.indexOf(number);
      const zeroIndex = rowNumbers.indexOf(0);

      // Split the row into new arrays to isolate zero, numbers to be moved, number to not be moved
      const moveZeroPosition = () => {
        if (selectedIndex < zeroIndex) {
          const zero = rowNumbers.slice(zeroIndex, zeroIndex + 1);
          const numbersToMove = rowNumbers.slice(selectedIndex, zeroIndex);
          const numbersNotToMoveAboveZero = rowNumbers.slice(zeroIndex + 1);
          const lowerThenSelected = rowNumbers.slice(0, selectedIndex);

          // Merge arrays
          const newRowNumbers = lowerThenSelected.concat(
            zero,
            numbersToMove,
            numbersNotToMoveAboveZero
          );

          console.log('newRowNumbers', newRowNumbers);
        } else {
          const zero = rowNumbers.slice(zeroIndex, 1 + zeroIndex);
          const numbersToMove = rowNumbers.slice(
            zeroIndex + 1,
            selectedIndex + 1
          );
          const numNotToMoveBelowZero = rowNumbers.slice(0, zeroIndex);
          const higherThenSelected = rowNumbers.slice(selectedIndex + 1);

          // Merge arrays
          const newRowNumbers = numNotToMoveBelowZero.concat(
            numbersToMove,
            zero,
            higherThenSelected
          );
          console.log('newRowNumbers', newRowNumbers);
        }
      };

      moveZeroPosition();
    }

    if (hasZeroInCol) {
      const selectedIndex = columnNumbers.indexOf(number);
      const zeroIndex = columnNumbers.indexOf(0);

      console.log('selectedIndex Col', selectedIndex);
      console.log('zeroIndex Col', zeroIndex);

      if (selectedIndex < zeroIndex) {
        const zero = columnNumbers.slice(zeroIndex, zeroIndex + 1);
        const numbersToMove = columnNumbers.slice(selectedIndex, zeroIndex);
        const numbersNotToMoveAboveZero = columnNumbers.slice(zeroIndex + 1);
        const lowerThenSelected = columnNumbers.slice(0, selectedIndex);

        // Merge arrays
        const newColNumbers = lowerThenSelected.concat(
          zero,
          numbersToMove,
          numbersNotToMoveAboveZero
        );

        console.log('newColNumbers', newColNumbers);
      } else {
        const zero = columnNumbers.slice(zeroIndex, 1 + zeroIndex);
        const numbersToMove = columnNumbers.slice(
          zeroIndex + 1,
          selectedIndex + 1
        );
        const numNotToMoveBelowZero = columnNumbers.slice(0, zeroIndex);
        const higherThenSelected = columnNumbers.slice(selectedIndex + 1);

        // Merge arrays
        const newColNumbers = numNotToMoveBelowZero.concat(
          numbersToMove,
          zero,
          higherThenSelected
        );
        console.log('newColNumbers', newColNumbers);
      }
    }
  };

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
  margin: 1px;
  background-color: pink;
  border-radius: 10px;
`;

const EmptyButton = styled(Button)`
  visibility: hidden;
`;
