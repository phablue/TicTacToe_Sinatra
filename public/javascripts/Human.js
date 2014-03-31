(function() {
  var Human = {
    choiceSpot: function(chosenSpotId, currentPlayer) {
      if (this.checkChosenSpotAvailable(chosenSpotId)) {
        this.markChosenSpot(chosenSpotId, currentPlayer);
        UI.setBoard(chosenSpotId+1, currentPlayer);
        return true;
      }
      else {
        UI.spotErrorMessage();
        return false;
      }
    },

    markChosenSpot: function(chosenSpotId, currentPlayer) {
      UI.setTextContents(chosenSpotId, currentPlayer);
    },

    checkChosenSpotAvailable: function(chosenSpotId) {
      return UI.getTextContents(chosenSpotId) == ""
    }
  };
  window.Human = Human;
})();
