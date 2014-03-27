(function() {
  var Computer = {
    chooseTheBestSpot: function(currentPlayer) {
      $.getJSON("/game/").done(function(data) {
        var chosenSpot $.parseJSON(data.computer_choice);
      });
      console.log(chosenSpot)
      Human.markChosenSpot(GameBoard, chosenSpot-1, currentPlayer);
      UI.hideComputerMessage();
    }
  }
  window.Computer = Computer;
})();
