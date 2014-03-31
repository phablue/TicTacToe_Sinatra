(function() {
  var Computer = {
    chooseTheBestSpot: function(currentPlayer) {
      $.getJSON("/game/computer/").done(function(data) {
        var chosenSpot = $.parseJSON(data.computer_choice);
        Human.markChosenSpot(chosenSpot-1, currentPlayer);
      });
      UI.hideComputerMessage();
    }
  }
  window.Computer = Computer;
})();
