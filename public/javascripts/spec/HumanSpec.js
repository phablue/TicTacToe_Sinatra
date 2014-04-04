describe ("Test Human", function() {
  var currentPlayer;
  var e;

  describe("Sets value of selected elements", function() {
    beforeEach(function() {
      e = jQuery.Event("click");
      setFixtures(' <table> <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr> </table>');
    });

    it ("td #0 and board[0] value changes to 'X' and current player changes to 'O'", function() {
      currentPlayer = "X";
      expect ($("tr td")).toBeEmpty();
      jQuery("#0").trigger(e);
      Human.choiceSpot(e.target.id, currentPlayer);
      expect ($("#0")).toHaveText("X");
      // test ruby change
    });

    it ("td #2 and board[2] value changes to 'O' and current player changes to 'X'", function() {
      currentPlayer = "O";
      expect ($("#2")).toBeEmpty();
      jQuery("#2").trigger(e);
      Human.choiceSpot(e.target.id, currentPlayer);
      expect ($("#2")).toHaveText("O");
      // test ruby change
    });

    it ("Can't set of a choosen spot", function() {
      var errorMessage = spyOn(UI, "spotErrorMessage");
      currentPlayer = "O";
      jQuery("#1").trigger(e);
      Human.choiceSpot(e.target.id, currentPlayer);
      expect (errorMessage).toHaveBeenCalled();
    });

    it ("return false if a choice spot has value", function() {
      expect (Human.checkChosenSpotAvailable(1)).toBeFalsy();
    });

    it ("return true if a choice spot doesnt have value", function() {
      expect (Human.checkChosenSpotAvailable(0)).toBeTruthy();
    });
  });
});