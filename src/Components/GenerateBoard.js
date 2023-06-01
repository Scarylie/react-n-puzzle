// Function to generate the board
export const GenerateBoard = (rows, columns) => {
  let getGameBoard = [];
  // divide the shuffles numbers into separate rows depending on what was specified
  const boardSize = rows * columns; // total number of squares
  const numbers = Array.from({ length: boardSize }, (_, index) => index); // gives an array of numbers depending on the total number of squares
  const shuffledNumbers = numbers.sort(() => 0.5 - Math.random()); // shuffle the nubers

  for (let i = 0; i < rows; i++) {
    const row = shuffledNumbers.slice(i * columns, (i + 1) * columns);
    getGameBoard.push(row);
  }
  return getGameBoard;
};
