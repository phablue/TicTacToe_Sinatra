describe ("Test Computer", function() {
  describe ("Test markComputerChoice function", function() {
    var nextTurn;

    beforeEach (function() {
      nextTurn = spyOn(Game, "nextTurn");
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1> \
                    <table> \
                      <tr> <td id = "0"></td> <td id = "1"></td> <td id = "2"></td> </tr> \
                      <tr> <td id = "3"></td> <td id = "4"></td> <td id = "5"></td> </tr> \
                      <tr> <td id = "6"></td> <td id = "7"></td> <td id = "8"></td> </tr> \
                    </table>');
    });

    it ("Marks 'X' in the board when computer is 'X' and chosen spot is 3", function() {
      Computer.comp = "X";
      chosenSpot = { "computer_choice": 3 };
      Computer.markComputerChoice(chosenSpot);
      expect($("#jasmine-fixtures #2")).toHaveText("X");
      expect($("#Computer")).toBeHidden();
      expect(nextTurn).toHaveBeenCalled();
    });

    it ("Marks 'O' in the board when computer is 'O' and chosen spot is 9", function() {
      Computer.comp = "O";
      chosenSpot = { "computer_choice": 9 };
      Computer.markComputerChoice(chosenSpot);
      expect($("#jasmine-fixtures #8")).toHaveText("O");
      expect($("#Computer")).toBeHidden();
      expect(nextTurn).toHaveBeenCalled();
    });
  });

  describe ("Test chooseTheBestSpot function", function() {
    var currentPlayer = "O";
    beforeEach (function() {
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1> \
                    <table> \
                    <tr> <td id = "0">X</td> <td id = "1">O</td> <td id = "2">X</td> </tr> \
                    <tr> <td id = "3">O</td> <td id = "4"></td> <td id = "5"></td> </tr> \
                    <tr> <td id = "6">X</td> <td id = "7"></td> <td id = "8"></td> </tr> </table>');
    });

    it ("Marks the best spot", function() {
      var data = { "computer_choice": 8 };
      var getjson = spyOn($, "getJSON").and.returnValue({done: function(e) { e(data); }});
      Computer.chooseTheBestSpot(Game.playGame, currentPlayer);
      expect(Computer.comp).toBe("O");
      expect($("#jasmine-fixtures #7")).toHaveText("O");
    });
  });
});
