const checkWin = require("./checkwin.js");


class ComputerPlayer {

  static getValidMoves(grid) {
    // includes all moves that are available
    let validMoves = [];

    for (let row = 0; row < grid.length; row++) {
      let column = grid[row];
      for (let col = 0; col < column.length; col++) {
        const currentPos = grid[row][col];
        if (currentPos === " ") {
          validMoves.push({"row": row, "col": col});
        }
      }
    }

    return validMoves;
  }

  static randomMove(grid) {
    const validMoves = this.getValidMoves(grid);

    // randomly generate a move
    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
  }

  static getWinningMoves(grid, symbol) {
    const validMoves = this.getValidMoves(grid);
    let newGrid = grid;

    for (let i = 0; i < validMoves.length; i++) {
      const row = validMoves[i].row;
      const col = validMoves[i].col;

      // check if potential move results in a win
      newGrid[row][col] = symbol;

      const cw = checkWin(newGrid);
      if (cw === symbol) {
        return validMoves[i];
      }

      // undo potential move
      newGrid[row][col] = " ";
    }

    return false;
  }

  static getSmartMove(grid, symbol) {

    let opposingSymbol;
    if (symbol === "X") {
      opposingSymbol = "O";
    } else {
      opposingSymbol = "X";
    }

    const winningMove = this.getWinningMoves(grid, symbol);
    // win if possible
    if (winningMove !== false) {
      return winningMove;
    }

    // block if needed
    const blockingMove = this.getWinningMoves(grid, opposingSymbol);
    if (blockingMove !== false) {
      return blockingMove;
    }

    // if no good smart move
    const randomMove = this.randomMove(grid);
    return randomMove;
  }

}



module.exports = ComputerPlayer;
