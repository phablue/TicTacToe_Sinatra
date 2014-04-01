(function() {
  var Computer = {
    comp: null,

    chooseTheBestSpot: function(currentPlayer) {
      this.comp = currentPlayer;
      $.getJSON("/game/computer/").done(Computer.markComputerChoice);
    },

    markComputerChoice: function(data) {
      var chosenSpot = data["computer_choice"];
      Human.markChosenSpot(chosenSpot-1, Computer.comp);
      UI.hideComputerMessage();
    }
  }
  window.Computer = Computer;
})();
