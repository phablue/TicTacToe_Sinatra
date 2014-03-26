(function() {
  var UI = {
    currentPlayer: null,

    inputErrorMessage: function() {
      alert("You have to choose 'y' or 'n'.");
    },

    showHumanMessage: function() {
      $("#Human").show();
    },

    hideHumanMessage: function() {
      $("#Human").hide();
    },

    setTextContents: function(elementID, TextContents) {
      $("#" + elementID).text(TextContents);
    },

    getTextContents: function(elementID) {
      return $("#" + elementID).text()
    },

    askFirstMove: function() {
      return prompt("Do you require the first move? (y/n)");
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
        callback(e.target.id);//, UI.computerPlay);
      });
    },

    clickButton: function(button, callback) {
      $(button).click(function(e) {
        if (button == ".player") {
          return UI.choiceMark();
        }
        else if (button == "#Xmark" || button == "#Omark") {
          UI.currentPlayer = e.target.id
          $.post("/game/choice_mark/", UI.getTextContents(e.target.id));
          UI.toggleDisplayedButtons(".playerMark", ".game");
        }
        e.stopPropagation();
        callback();
      });
    },

    humanChoice: function(chosenSpotID, callback) {

    },

    humanPlay: function() {
      UI.showHumanMessage();
      UI.clickSpot(UI.humanChoice);
    },

    playGame: function() {
      // computer vs human
    },

    firstMove: function() {
      var input = this.askFirstMove();
      if(input == "y" || input == "n") {
        this.toggleDisplayedButtons(".btn-restart", ".btn-new");
      }
      else {
        this.inputErrorMessage();
        this.firstMove();
      }
    },    

    gameStart: function() {
      UI.firstMove();
      UI.playGame();
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
