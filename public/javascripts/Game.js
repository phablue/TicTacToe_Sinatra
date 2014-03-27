(function() {
  var input;
  var Game = {
    goFirst = null,

    changeCurrentPlayer: function(currentPlayer) {
      UI.currentPlayer = currentPlayer == "X" ? "O" : "X";
    },

    winner: function(currentPlayer) {
      if(UI.gameType === ".player") {
        return currentPlayer == "X" ? "Player" : "Computer";
      }
      return currentPlayer == "X" ? "Player 'X'" : "Player 'O'";
    },

    firstMove: function() {
      var input = UI.askFirstMove();
      if(input == "y" || input == "n") {
        UI.toggleDisplayedButton(".btn-restart", ".btn-new");

      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    checkGameOver: function(currentPlayer) {
      Game.changeCurrentPlayer(currentPlayer);
      if(GameRules.gameOver(GameBoard)) {
        UI.visualWhenGameOver(currentPlayer);
        return true;
      }
      return false;
    },

    humanChoice: function(chosenSpotID, callback) {
      if (Human.choiceSpot(chosenSpotID, UI.currentPlayer)) {
        UI.unbindClick("tr td");
        UI.hideHumanMessage();
        if (Game.checkGameOver(UI.currentPlayer) === false) {
          callback(Game.playGame);
        }
      }
      else {
        return;
      }
    },

    computerChoice: function(callback) {
      Computer.chooseTheBestSpot(UI.currentPlayer);
      if (Game.checkGameOver(UI.currentPlayer) === false) {
        callback(Game.playGame);
      }
    },

    playGame: function() {
      if (Game.goFirst === "y") {
        UI.humanPlay();
      }
      else if (Game.goFirst === "n") {
        Game.changeCurrentPlayer(Game.currentPlayer);
        UI.computerPlay();
      }
    }
  };
  window.Game = Game;
})();
