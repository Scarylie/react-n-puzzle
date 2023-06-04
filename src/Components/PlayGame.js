import React, { useState, useEffect } from 'react';
import { GenerateBoard } from './GenerateBoard';
import {
  WinnerWrapper,
  GameWrapper,
  ShuffleWrapper,
  NumberBox,
  Button,
  EmptyButton,
  ShuffleButton,
} from '../Styles/Styles';

// Function to play the game
const PlayGame = ({ rows, columns }) => {
  const [puzzleBoard, setPuzzleBoard] = useState(GenerateBoard(rows, columns));
  const [zeroIndex, setZeroIndex] = useState([0, 0]);
  const [isFinished, setIsFinished] = useState(false);

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

    // Make the puzzleboard into one array, remove last digit that will be a zero when finished
    const flatArray = puzzleBoard.flat().slice(0, -1);

    // Check if puzzleBoard is in ascending order
    const numbersInOrder = (array) => {
      // Make the puzzle board into one array

      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
          return false;
        }
      }
      setIsFinished(true);
      return true;
    };
    numbersInOrder(flatArray);
  }, [puzzleBoard]);

  const Square = ({ number }) => {
    // display square content: numbers or empty for the 0
    return <NumberBox>{number !== 0 ? number : ''}</NumberBox>;
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
    setPuzzleBoard(GenerateBoard(rows, columns));
  };

  const onPlayAgain = () => {
    setIsFinished(false);
  };

  return isFinished ? (
    <WinnerWrapper>
      <h2>Congratulations, you won!</h2>
      <ShuffleButton type="submit" onClick={onPlayAgain}>
        Play again
      </ShuffleButton>
    </WinnerWrapper>
  ) : (
    <div>
      <GameWrapper>
        {puzzleBoard.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((number, columnIndex) =>
              number !== 0 ? (
                <Button
                  type="button"
                  key={number}
                  aria-label={number}
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
      </GameWrapper>
      <ShuffleWrapper>
        <ShuffleButton type="submit" onClick={onShuffleNumbers}>
          Shuffle
        </ShuffleButton>
      </ShuffleWrapper>
    </div>
  );
};

export default PlayGame;
