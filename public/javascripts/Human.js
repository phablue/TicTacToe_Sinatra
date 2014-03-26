(function() {
  var Human = {
    choiceSpot: function(chosenSpotId, currentPlayer) {
      if (this.checkChosenSpotAvailable(chosenSpotId)) {
        this.markChosenSpot(chosenSpotId, currentPlayer);
        return true;
      }
      else {
        UI.spotErrorMessage();
        return false;
      }
    },

    markChosenSpot: function(chosenSpotId, currentPlayer) {
      UI.setTextContents(chosenSpotId, currentPlayer);
      $.post("/game/chosen_spot/", chosenSpotId);
    },

    checkChosenSpotAvailable: function(chosenSpotId) {
      return UI.getTextContents(chosenSpotId) == ""
    }
  };
  window.Human = Human;
})();
