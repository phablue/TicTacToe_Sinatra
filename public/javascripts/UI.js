(function() {
  var UI = {
    gameType: null,
    currentPlayer: null,

    unbindClick: function(element) {
      $(element).unbind("click");
    },

    visualAfterGameOver: function() {
      this.unbindClick("tr td");
      this.toggleDisplayedButtons(".btn-new", ".btn-restart");
      this.hideComputerMessage();
      this.hideHumanMessage();
      this.restartGame();
    },

    visualWhenGameOver: function(currentPlayer) {
      if(GameRules.gameWin(GameBoard)) {
        this.winMessage(Game.winner(currentPlayer));
        this.visualAfterGameOver();
      }
      else if(GameRules.gameTie(GameBoard)) {
        this.tieMessage();
        this.visualAfterGameOver();
      }
    },

    showComputerMessage: function(callback) {
      $("#Computer").show("fast", function() {
        callback(UI.humanPlay);
      });
    },

    hideComputerMessage: function() {
      $("#Computer").hide();
    },

    showHumanMessage: function() {
      $("#Human").show();
    },

    hideHumanMessage: function() {
      $("#Human").hide();
    },

    changeHumanMessage: function() {
      if (UI.gameType === ".player") {
        UI.setTextContents("Human", "Click a spot you want.");
      }
      else {
        UI.setTextContents("Human", "Player '" + Game.currentPlayer + "' click a spot you want.");
      }
    },

    winMessage: function(winner) {
      alert("Congratulations.\n"+ winner +" win!!");
    },

    tieMessage: function() {
      alert("Game is tied.\nGame Over.");
    },

    spotErrorMessage: function() {
      alert("That is not an available spot.\nPlease choose a different spot.");
    },

    inputErrorMessage: function() {
      alert("You have to choose 'y' or 'n'.");
    },

    askFirstMove: function() {
      return prompt("Do you require the first move? (y/n)");
    },

    removeText: function(element) {
      $(element).empty();
    },

    setTextContents: function(elementID, TextContents) {
      $("#" + elementID).text(TextContents);
      $.post("/game/chosen_spot/", elementID);
    },

    getTextContents: function(elementID) {
      return $("#" + elementID).text()
    },

    toggleDisplayedButtons: function(hidebutton, showbutton) {
      $(hidebutton).hide();
      $(hidebutton).unbind();
      $(showbutton).show()
    },

    hideButtons: function(button1, button2, button3) {
      $(button1).hide();
      $(button2).hide();
      $(button3).hide();
    },

    clickSpot: function(callback) {
      $("tr td").click(function(e) {
        if (UI.gameType === ".player") {
          callback(e.target.id, UI.computerPlay);
        }
        else {
          callback(e.target.id, UI.humanPlay);
        }
      });
    },

    clickButton: function(button, callback) {
      $(button).click(function(e) {
        if (button == ".player" || button == ".players") {
          UI.gameType = button;
          return UI.choiceMark();
        }
        else if (button == "#Xmark" || button == "#Omark") {
          UI.currentPlayer = UI.getTextContents(e.target.id);
          $.post("/game/choice_mark/", UI.getTextContents(e.target.id));
          UI.toggleDisplayedButtons".playerMark", ".game");
        }
        else if (button == ".btn-new") {
          UI.hideButtons(".game")
          UI.unbindClick("button");
          UI.unbindClick("tr td");
          UI.resetGame();
        }
        else if (button == ".btn-restart") {
          UI.hideButtons(".game")
          UI.unbindClick("button");
          UI.resetGame();
        }
        e.stopPropagation();
        callback();
      });
    },

    gameOver: function() {
      console.log( $.get("/game/:gameOver"))
    },

    humanPlay: function() {
      UI.showHumanMessage();
      UI.clickSpot(Game.humanChoice);
    },

    computerPlay: function() {
      UI.showComputerMessage(Game.computerChoice);
    },

    gameStart: function() {
      Game.firstMove();
      Game.playGame();
    },

    choiceMark: function() {
      UI.toggleDisplayedButtons(".menu", ".playerMark");
      UI.clickButton("#Xmark", UI.gameStart);
      UI.clickButton("#Omark", UI.gameStart);
    },

    gameMenu: function() {
      UI.toggleDisplayedButtons(".btn-start", ".menu");
      UI.clickButton(".player");
    },

    gameMain: function() {
      this.hideButtons(".menu", ".playerMark", ".game");
      UI.clickButton(".btn-start", UI.gameMenu);
    }
  }
  window.UI = UI;
})();
