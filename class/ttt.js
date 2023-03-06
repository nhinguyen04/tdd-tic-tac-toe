const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./computer-player");
const checkWin = require("./checkwin.js");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // commands
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('c', 'set move and play with computer', TTT.setAI.bind(this));

    // places a move at cursor's position
    Screen.addCommand('space', 'set a move at cursor location', TTT.setMove.bind(this));
    Screen.render();
    Screen.printCommands();
  }

  static setMove() {
    delete Screen.commands['c'];
    Screen.render();
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);


    // alternate turns
    this._alternateTurns();

    // check winner
    TTT.checkWinner();


  }

  static setAI() {
    delete Screen.commands['space'];
    Screen.render();
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

    // alternate turns
    this._alternateTurns();

    // AI turn
    const move = ComputerPlayer.getSmartMove(Screen.grid, this.playerTurn);
    Screen.setGrid(move.row, move.col, this.playerTurn);

    this._alternateTurns();

    // check winner
    TTT.checkWinner();

  }

  _alternateTurns() {
    if (this.playerTurn === "O") {
      this.playerTurn = "X";
    } else {
      this.playerTurn = "O";
    }
  }

  static checkWinner() {
    const winner = checkWin(Screen.grid);
    if (!winner) {
      Screen.render();
      Screen.printCommands();
    } else {
      TTT.endGame(winner);
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}


module.exports = TTT;
