(function() {
  var Game = {
    goFirst: null,

    changeCurrentPlayer: function(currentPlayer) {
      UI.currentPlayer = currentPlayer == "X" ? "O" : "X";
    },

    winner: function(currentPlayer) {
      if(UI.gameType === ".player") {
        return UI.winner;
      }
      return currentPlayer == "X" ? "Player 'X'" : "Player 'O'";
    },

    firstMove: function() {
      var input = UI.askFirstMove();
      if(input == "y" || input == "n") {
        UI.toggleDisplayedButtons(".btn-restart", ".btn-new");
        this.goFirst = input;
      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    checkGameOver: function(currentPlayer) {
      this.changeCurrentPlayer(currentPlayer);
      $.getJSON("/game/gamerules/").done(function(data) {
        if(data["game_over"]) {
          UI.visualWhenGameOver(currentPlayer);
        }
      });
      return false;
    },

    nextTurn: function(callback) {
      if (Game.checkGameOver(UI.currentPlayer) === false) {
        callback(Game.playGame);
      }
    },

    humanChoice: function(chosenSpotID, callback) {
      if (Human.choiceSpot(chosenSpotID, UI.currentPlayer)) {
        UI.winner = "Player";
        UI.unbindClick("tr td");
        Game.nextTurn(callback);
      }
      else {
        return;
      }
    },

    computerChoice: function(callback) {
      UI.winner = "Computer";
      Computer.chooseTheBestSpot(callback, UI.currentPlayer);
    },

    playGame: function() {
      if(UI.gameType === ".player") {
        if (Game.goFirst === "y") {
          UI.humanPlay();
        }
        else if (Game.goFirst === "n") {
          Game.changeCurrentPlayer(UI.currentPlayer);
          UI.computerPlay();
        }
      }
      else { 
        if (Game.goFirst !== "y") {
          Game.changeCurrentPlayer(UI.currentPlayer);
        }
        UI.humanPlay();
      }
    }
  };
  window.Game = Game;
})();
