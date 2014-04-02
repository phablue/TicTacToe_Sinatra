(function() {
  var Computer = {
    comp: null,
    callback: null,

    chooseTheBestSpot: function(callback, currentPlayer) {
      this.comp = currentPlayer;
      this.callback = callback;
      $.getJSON("/game/computer/").done(Computer.markComputerChoice);
    },

    markComputerChoice: function(data) {
      var chosenSpot = data["computer_choice"];
      Human.markChosenSpot(chosenSpot-1, Computer.comp);
      UI.hideComputerMessage();
      Game.nextTurn(Computer.callback);
    }
  }
  window.Computer = Computer;
})();
