describe ("Test Game", function() {
  describe ("Test winner function", function() {
    describe("when human vs. computer", function() {
      beforeEach(function() {
        UI.gameType = ".player";
        currentPlayer = null
      });

      it ("Return Player if human win", function() {
        UI.winner = "Player"
        expect(Game.winner(currentPlayer)).toBe("Player");
      });

      it ("Return Computer if computer win 'O'", function() {
        UI.winner = "Computer"
        expect(Game.winner(currentPlayer)).toBe("Computer");
      });
    });

    describe("when human vs. human", function() {
      beforeEach(function() {
        UI.gameType = ".players";
        currentPlayer = null
      });

      it ("Return Player 'O' if current player is 'X'", function() {
        UI.currentPlayer = "X"
        expect(Game.winner(currentPlayer)).toBe("Player 'O'");
      });

      it ("Return Player 'X' if current player is 'O'", function() {
        UI.currentPlayer = "O"
        expect(Game.winner(currentPlayer)).toBe("Player 'X'");
      });
    });
  });

  describe ("Teste firstMove function", function() {
    var input;
    var toggleDisplayedButtons;

    beforeEach(function() {
      UI.currentPlayer = "";
      toggleDisplayedButtons = spyOn(UI, "toggleDisplayedButtons");
    });

    it ("If input is 'y', will call toggleDisplayedButtons() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("y");
      input = askFirstMove;
      Game.firstMove();
      expect(toggleDisplayedButtons).toHaveBeenCalled();
      expect(Game.goFirst).toBe("y");
    });

    it ("If input is 'n', will call toggleDisplayedButtons() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("n");
      input = askFirstMove;
      Game.firstMove();
      expect(toggleDisplayedButtons).toHaveBeenCalled();
      expect(Game.goFirst).toBe("n");
    });
  });

  describe ("Test nextTurn function", function() {
    // need to figure out json.done test
    var visualWhenGameOver;
    var computerPlay;

    beforeEach (function() {
      visualWhenGameOver = spyOn(UI, "visualWhenGameOver");
      computerPlay = spyOn(UI, "computerPlay");
    });

    describe ("Call UI message functions", function() {
      it ("call visualWhenGameOver function, if the Game over.", function() {
        var data = { "game_over": true};
        var getjson = spyOn($, "getJSON").and.returnValue({done: function(e) { e(data); }});
        Game.nextTurn(UI.computerPlay);
        expect(visualWhenGameOver).toHaveBeenCalled();
      });

      it ("call callback function, if the Game over.", function() {
        var data = { "game_over": false};
        var getjson = spyOn($, "getJSON").and.returnValue({done: function(e) { e(data); }});
        Game.nextTurn(UI.computerPlay);
        expect(computerPlay).toHaveBeenCalled();
      });
    });
  });

  describe ("Test play function", function() {
    var humanPlay;
    var computerPlay;

    beforeEach(function() {
      humanPlay = spyOn(UI, "humanPlay");
      computerPlay = spyOn(UI, "computerPlay");
    });

    describe("when human vs. computer", function() {
      beforeEach(function() {
        UI.gameType = ".player";
      });

      it ("call humanplay if goFirst is 'y'", function() {
        Game.goFirst = "y";
        Game.playGame();
        expect(humanPlay).toHaveBeenCalled();
      });

      it ("call computerPlay if goFirst is 'n'", function() {
        Game.goFirst = "n";
        Game.playGame();
        expect(computerPlay).toHaveBeenCalled();
      });
    });

    describe("when human vs. human", function() {
      beforeEach(function() {
        UI.gameType = ".players";
      });

      it ("call humanplay", function() {
        Game.playGame();
        expect(humanPlay).toHaveBeenCalled();
      });
    });
  });
});
