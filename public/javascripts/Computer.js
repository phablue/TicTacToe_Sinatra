(function() {
  var Computer = {
    comp: null,
    turn: null,

    chooseTheBestSpot: function(callback, currentPlayer) {
      this.comp = currentPlayer;
      this.turn = callback;
      $.getJSON("/game/computer/").done(Computer.markComputerChoice);
    },

    markComputerChoice: function(data) {
      var chosenSpot = data["computer_choice"];
      Human.markChosenSpot(chosenSpot-1, Computer.comp);
      UI.hideComputerMessage();
      Game.nextTurn(Computer.turn);
    }
  }
  window.Computer = Computer;
})();
