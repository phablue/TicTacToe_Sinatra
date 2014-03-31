(function() {
  var Computer = {
    chosenSpot: null,

    chooseTheBestSpot: function(currentPlayer) {
      $.getJSON("/game/computer/").done(function(data) {
        Computer.chosenSpot = $.parseJSON(data.computer_choice);
      });
      console.log(this.chosenSpot)
      Human.markChosenSpot(GameBoard, this.chosenSpot-1, currentPlayer);
      UI.hideComputerMessage();
    }
  }
  window.Computer = Computer;
})();
