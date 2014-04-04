describe ("Test Computer", function() {
  describe ("Test mark Chosen spot", function() {
    beforeEach (function() {
      setFixtures('<table> \
                    <tr> <td id = "0"></td> <td id = "1"></td> <td id = "2"></td> </tr> \
                    <tr> <td id = "3"></td> <td id = "4"></td> <td id = "5"></td> </tr> \
                    <tr> <td id = "6"></td> <td id = "7"></td> <td id = "8"></td> </tr> \
                  </table>');
    });

    // should test about getJson

    it ("Marks a currentPlayer 'X' in the board When chosen spot is 3", function() {
      Computer.comp = "X";
      chosenSpot = 3;
      Computer.markComputerChoice(3);
      expect($("#jasmine-fixtures #2")).toHaveText("X");
    });

    it ("Marks a currentPlayer 'O' in the board When chosen spot is 9", function() {
      Computer.comp = "O";
      chosenSpot = 9;
      Computer.markComputerChoice(9);
      expect($("#jasmine-fixtures #8")).toHaveText("O");
    });
  });

  describe ("Computer choose the best spot", function() {
    var currentPlayer = "O";

    beforeEach (function() {
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1> \
                    <table> \
                    <tr> <td id = "0">X</td> <td id = "1">O</td> <td id = "2">X</td> </tr> \
                    <tr> <td id = "3">O</td> <td id = "4"></td> <td id = "5"></td> </tr> \
                    <tr> <td id = "6">X</td> <td id = "7"></td> <td id = "8"></td> </tr> </table>');
    });

    //test about getJson

    it ("Hide Computer Message function", function() {
      Computer.chooseTheBestSpot(currentPlayer);
      expect($("#Computer")).toBeHidden();
    });

    it ("Marks the best spot", function() {
      expect($("#8")).toBeEmpty();
      Computer.chooseTheBestSpot(null, currentPlayer);
      expect($("#jasmine-fixtures *8")).toHaveText("O");
    });
  });
});
