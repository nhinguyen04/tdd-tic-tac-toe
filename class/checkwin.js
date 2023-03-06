function checkWin(grid) {
  const fullGrid = checkFullGrid(grid);

    // Return 'T' if the game is a tie
    if (fullGrid) {
      return "T";
    }

    // Return 'X' if player X wins
    const horizontalWin = checkHorizontal(grid);
    const verticalWin = checkVertical(grid);
    const diagonalWin = checkDiagonal(grid);

    if(horizontalWin === "X" || verticalWin === "X" || diagonalWin === "X") {
      return "X";
    }

    // Return 'O' if player O wins
    if(horizontalWin === "O" || verticalWin === "O" || diagonalWin === "O") {
      return "O";
    }

    // Return false if the game has not ended
    if (!fullGrid) {
      return false;
    }
  }

function checkFullGrid(grid) {
    let full = true;

    for (let row = 0; row < grid.length; row++) {
      let column = grid[row];
      for (let col = 0; col < column.length; col++) {
        if (grid[row][col] === " ") {
          full = false;
        }
      }
    }

    return full;
  }

function checkHorizontal(grid) {
    for (let row = 0; row < grid.length; row++) {
      const checkWin = allEqual(grid[row]);

      if (checkWin && grid[row][0] === "X") {
        // if X wins, return "X"
        return "X"
      } else if (checkWin && grid[row][0] === "O") {
        // if O wins, return "O"
        return "O";
      }
    }

    // no win
    return false;
  }

function checkVertical(grid) {
    const getColumn = (array, col) => array.map((row) => row[col]);


    for (let col = 0; col < grid.length; col++) {
      const checkWin = allEqual(getColumn(grid, col));

      if (checkWin && grid[0][col] === "X") {
        // if X wins, return "X"
        return "X"
      } else if (checkWin && grid[0][col] === "O") {
        // if O wins, return "O"
        return "O";
      }
    }

    // no win
    return false;
  }

function checkDiagonal(grid) {
    // grid[row][col]
    // brute force
    if (grid[1][1] === "X") {
      const scenarioOne = grid[0][0] === "X" && grid[2][2] === "X";
      const scenarioTwo = grid[2][0] === "X" && grid[0][2] === "X";
      if (scenarioOne || scenarioTwo) {
        return "X";
      }
    } else if (grid[1][1] === "O") {
      const scenarioOne = grid[0][0] === "O" && grid[2][2] === "O";
      const scenarioTwo = grid[2][0] === "O" && grid[0][2] === "O";

      if (scenarioOne || scenarioTwo) {
        return "O";
      }
    } else {
      return false;
    }
  }

function allEqual(array) {
    return array.every((value) => value === array[0]);
}


module.exports = checkWin;
