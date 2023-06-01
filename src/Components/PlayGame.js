import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GenerateBoard } from './GenerateBoard';

// Function to play the game
export const PlayGame = ({ rows, columns }) => {
  const [puzzleBoard, setPuzzleBoard] = useState(GenerateBoard(rows, columns));
  const [zeroIndex, setZeroIndex] = useState([0, 0]);

  useEffect(() => {
    // Find coordinated of zero
    const findZeroIndex = () => {
      let zero;
      puzzleBoard.forEach((row, rowIndex) => {
        const columnIndex = row.indexOf(0);
        if (columnIndex !== -1) {
          zero = [rowIndex, columnIndex];
        }
      });
      return zero;
    };
    const zeroCoordinates = findZeroIndex();
    setZeroIndex(zeroCoordinates);
  }, [puzzleBoard]);

  const Square = ({ number }) => {
    // display square content: numbers or empty for the 0
    return <div className="square">{number !== 0 ? number : ''}</div>;
  };

  const handleClick = (rowIndex, columnIndex, number) => {
    // make a copy of the state
    let currentBoard = [...puzzleBoard];

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

      // Split the row into new arrays to isolate zero, numbers to be moved, number to not be moved
      if (selectedIndex < zeroIndex[1]) {
        const zero = rowNumbers.slice(zeroIndex[1], zeroIndex[1] + 1);
        const numbersToMove = rowNumbers.slice(selectedIndex, zeroIndex[1]);
        const numbersNotToMoveAboveZero = rowNumbers.slice(zeroIndex[1] + 1);
        const lowerThenSelected = rowNumbers.slice(0, selectedIndex);

        // Merge arrays
        const newRowNumbers = lowerThenSelected.concat(
          zero,
          numbersToMove,
          numbersNotToMoveAboveZero
        );

        // Update the state with new row
        currentBoard[rowIndex] = newRowNumbers;
        setPuzzleBoard(currentBoard);
      } else {
        const zero = rowNumbers.slice(zeroIndex[1], 1 + zeroIndex[1]);
        const numbersToMove = rowNumbers.slice(
          zeroIndex[1] + 1,
          selectedIndex + 1
        );
        const numNotToMoveBelowZero = rowNumbers.slice(0, zeroIndex[1]);
        const higherThenSelected = rowNumbers.slice(selectedIndex + 1);

        // Merge arrays
        let newRowNumbers = numNotToMoveBelowZero.concat(
          numbersToMove,
          zero,
          higherThenSelected
        );
        // Update the state with new row
        currentBoard[rowIndex] = newRowNumbers;
        setPuzzleBoard(currentBoard);
      }
    } else if (hasZeroInCol) {
      const selectedIndex = columnNumbers.indexOf(number);

      if (selectedIndex < zeroIndex[0]) {
        const zero = columnNumbers.slice(zeroIndex[0], zeroIndex[0] + 1);
        const numbersToMove = columnNumbers.slice(selectedIndex, zeroIndex[0]);

        const numbersNotToMoveAboveZero = columnNumbers.slice(zeroIndex[0] + 1);
        const lowerThenSelected = columnNumbers.slice(0, selectedIndex);

        // Merge arrays
        const newColNumbers = lowerThenSelected.concat(
          zero,
          numbersToMove,
          numbersNotToMoveAboveZero
        );
        // Iterate over the rows of the nested array
        for (let i = 0; i < currentBoard.length; i++) {
          // Iterate over the elements within each row
          for (let j = 0; j < currentBoard[i].length; j++) {
            // Check if the current index is zeroIndex
            if (j === zeroIndex[1]) {
              // Change the value to the corresponding value from the new array
              currentBoard[i][j] = newColNumbers[i];
            }
            setPuzzleBoard(currentBoard);
          }
        }
      } else {
        const zero = columnNumbers.slice(zeroIndex[0], 1 + zeroIndex[0]);
        const numbersToMove = columnNumbers.slice(
          zeroIndex[0] + 1,
          selectedIndex + 1
        );
        const numNotToMoveBelowZero = columnNumbers.slice(0, zeroIndex[0]);
        const higherThenSelected = columnNumbers.slice(selectedIndex + 1);

        // Merge arrays
        const newColNumbers = numNotToMoveBelowZero.concat(
          numbersToMove,
          zero,
          higherThenSelected
        );
        // Iterate over the rows of the nested array
        for (let i = 0; i < currentBoard.length; i++) {
          // Iterate over the elements within each row
          for (let j = 0; j < currentBoard[i].length; j++) {
            // Check if the current index is zeroIndex
            if (j === zeroIndex[1]) {
              // Change the value to the corresponding value from the new array
              currentBoard[i][j] = newColNumbers[i];
            }
            setPuzzleBoard(currentBoard);
          }
        }
      }
    }
  };

  const onShuffleNumbers = () => {
    window.location.reload(false);
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
              <EmptyButton key={number}>''</EmptyButton>
            )
          )}
        </div>
      ))}
      <ShuffleButton type="submit" onClick={onShuffleNumbers}>
        Shuffle
      </ShuffleButton>
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

const ShuffleButton = styled.button`
  padding: 5px;
  margin: 1px;
  background-color: white;
  border-radius: 10px;
`;
