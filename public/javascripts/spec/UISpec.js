describe ("Test UI", function () {
  describe ("Test Computer Message", function() {
    var callback = function(){};
    beforeEach (function() {
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1>');
    });

    it ("Hides computer message", function() {
      UI.hideComputerMessage();
      expect($("#Computer")).toBeHidden();
    });

    it ("Show computer message", function() {
      UI.showComputerMessage(callback);
      expect($("#Computer")).toBeVisible();
    });

    it ("Call computerChoice function after show computer message", function() {
      var computerChoice = spyOn(Game, "computerChoice");
      UI.showComputerMessage(Game.computerChoice);
      expect(computerChoice).toHaveBeenCalled();
    });
  });

  describe ("Test Human Message", function() {
    beforeEach (function() {
      setFixtures(' <h1 id = "Human">Click a spot you want.</h1> ');
    });

    it ("Hides human message", function() {
      UI.hideHumanMessage();
      expect($("#Human")).toBeHidden();
    });

    it ("Shows human message", function() {
      UI.showHumanMessage();
      expect($("#Human")).toBeVisible();
    });

    describe ("Change Message", function() {
      it ("message is 'Click a spot you want.' when game type is human vs. computer", function() {
        UI.gameType = ".player";
        UI.changeHumanMessage();
        expect($("#Human").text()).toEqual("Click a spot you want.");
      });

      it ("message is 'Player 'X' click a spot you want' when game type is human vs. human", function() {
        UI.gameType = ".players";
        UI.currentPlayer = "X"
        UI.changeHumanMessage();
        expect($("#Human").text()).toEqual("Player '" + UI.currentPlayer + "' click a spot you want.");
      });
    });
  });

  describe ("Test click", function() {
    var choiceMark;
    var gameMenu;
    var gameStart;
    var computerPlay;
    var humanPlay;
    var humanChoice;
    var unbindClick;
    var resetGame;
    var computerChoice;
    var clickspot;
    var clickbutton;

    beforeEach(function() {
      choiceMark = spyOn(UI, "choiceMark");
      gameMenu = spyOn(UI, "gameMenu");
      gameStart = spyOn(UI, "gameStart");
      computerPlay = spyOn(UI, "computerPlay");
      humanPlay = spyOn(UI, "humanPlay");
      humanChoice = spyOn(Game, "humanChoice");
      unbindClick = spyOn(UI, "unbindClick");
      resetGame = spyOn(UI, "resetGame").and.callThrough();
      computerChoice = spyOn(Game, "computerChoice");
      clickspot = spyOnEvent('tr td', 'click');
      clickbutton = spyOnEvent('button', 'click');
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <div class = "menu"> \
                      <button type = "button" class = "player">1 Player</button><br> \
                      <button type = "button" class = "players">2 Players</button> \
                    </div> \
                    <div class = "playerMark"> \
                      <p>Choice a mark you want.</p> \
                      <button type = "button" id = "Xmark">X</button> \
                      <button type = "button" id = "Omark">O</button> \
                    </div> \
                    <div class = "game"> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> \
                    <table> <td id = "0">X</td><td id = "1">O</td><td id = "2"></td></table> \
                    </div>');
    });

    describe ("Test clickSpot function", function() {
      describe ("when gameType is human vs. computer", function() {
        it("call computerPlay when td click", function() {
          UI.gameType = ".player";
          UI.clickSpot(Game.humanChoice);
          $("tr td").click();
          expect(humanChoice).toHaveBeenCalled();
        });
      });

      describe ("when gameType is human vs. human", function() {
        it("call humanPlay when td click", function() {
          UI.gameType = ".players";
          UI.clickSpot(Game.humanChoice);
          $("tr td").click();
          expect(humanChoice).toHaveBeenCalled();
        });
      });
    });

    describe ("Test clickButton function", function() {
      var ajaxget;
      beforeEach (function() {
        ajaxget = spyOn($, "get");
      });

      describe ("When player or players button clicks", function() {
        it ("call choiceMark function and gametype is .player When player button clicks", function() {
          UI.clickButton(".player");
          $(".player").click();
          expect(choiceMark).toHaveBeenCalled();
          expect(UI.gameType).toBe(".player");
        });

        it ("call choiceMark function and gametype is .players When players button clicks", function() {
          UI.clickButton(".players");
          $(".players").click();
          expect(choiceMark).toHaveBeenCalled();
          expect(UI.gameType).toBe(".players");
        });
      });

      describe ("When mark buttons click", function() {
        it ("hide plaryMark buttons", function() {
          UI.clickButton("#Xmark", UI.gameStart);
          $("#Xmark").click();
          expect($(".playerMark")).toBeHidden();
        });

        it ("show game", function() {
          UI.clickButton("#Xmark", UI.gameStart);
          $("#Xmark").click();
          expect($(".game")).toBeVisible();
        });

        it ("currentPlayer is 'X' When Xmark button clicks", function() {
          UI.clickButton("#Xmark", UI.gameStart);
          $("#Xmark").click();
          expect($(".playerMark")).toBeHidden();
          expect(UI.currentPlayer).toBe("X");
        });

        it ("currentPlayer is 'O' When Omark button clicks", function() {
          UI.clickButton("#Omark", UI.gameStart);
          $("#Omark").click();
          expect($(".playerMark")).toBeHidden();
          expect(UI.currentPlayer).toBe("O");
        });
      });

      it("call gameMenu function when start button click", function() {
        UI.clickButton(".btn-start", UI.gameMenu);
        $(".btn-start").click();
        expect(gameMenu).toHaveBeenCalled();
      });

      describe ("When new button click", function() {
        it("Hide game", function() {
          UI.clickButton(".btn-new", UI.gameMenu);
          $(".btn-new").click();
          expect($(".game")).toBeHidden();
        });

        it("Unbind buttons and td", function() {
          UI.clickButton(".btn-new", UI.gameMenu);
          $(".btn-new").click();
          expect(clickbutton).not.toHaveBeenTriggered();
          expect(clickspot).not.toHaveBeenTriggered();
        });

        it("Reset game", function() {
          UI.clickButton(".btn-new", UI.gameMenu);
          $(".btn-new").click();
          expect(resetGame).toHaveBeenCalled();
          expect(ajaxget).toHaveBeenCalledWith("/resetgame/");
          expect($("tr td")).toBeEmpty();
        });

        it("Call gameMenu function", function() {
          UI.clickButton(".btn-new", UI.gameMenu);
          $(".btn-new").click();
          expect(gameMenu).toHaveBeenCalled();
        });
      });

      describe ("When restart button click", function() {
        it("Hide game buttons", function() {
          UI.clickButton(".btn-restart", UI.gameMenu);
          $(".btn-restart").click();
          expect($(".game")).toBeHidden();
        });

        it("Unbind buttons", function() {
          UI.clickButton(".btn-restart", UI.gameMenu);
          $(".btn-restart").click();
          expect(clickbutton).not.toHaveBeenTriggered();
        });

        it("Reset Game", function() {
          UI.clickButton(".btn-restart", UI.gameMenu);
          $(".btn-restart").click();
          expect(resetGame).toHaveBeenCalled();
          expect(ajaxget).toHaveBeenCalledWith("/resetgame/");
        });

        it("Call gameMenu function", function() {
          UI.clickButton(".btn-restart", UI.gameMenu);
          $(".btn-restart").click();
          expect(gameMenu).toHaveBeenCalled();
        });
      });
    });
  });

  describe ("Test unbindClick function", function() {
    it("tr td unbind", function() {
      var click = spyOnEvent('tr td', 'click');
      setFixtures('<table> <td id = "0"></td><td id = "0"></td></table>');
      UI.unbindClick("tr td");
      expect(click).not.toHaveBeenTriggered();
    });
  });

  describe ("Test removeText function", function() {
    it("tr td empty after event running", function() {
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      UI.removeText("tr td");
      expect($("tr td")).toBeEmpty();
    });
  });

  describe ("Test getTextContents function", function() {
    it("get text contents in element", function() {
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      expect(UI.getTextContents("0")).toBe("O");
    });
  });

  describe ("Test setTextContents funciton", function() {
    it("set 'X' in td after event running", function() {
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      UI.setTextContents("2", "X");
      expect($("#2")).toHaveText("X");
    });
  });

  describe ("Test alert events", function() {
    var winner = "Player1";
    var alert;

    beforeEach (function() {
      alert = spyOn(window, "alert");
    });

    it ("Pops up a spot Error Message", function() {
      UI.spotErrorMessage();
      expect(alert).toHaveBeenCalledWith("That is not an available spot.\nPlease choose a different spot.");
    });

    it ("Pops up a win Message", function() {
      UI.winMessage(winner);
      expect(alert).toHaveBeenCalledWith("Congratulations.\n"+ winner +" win!!");
    });

    it ("Pops up a tie Message", function() {
      UI.tieMessage();
      expect(alert).toHaveBeenCalledWith("Game is tied.\nGame Over.");
    });

    it ("Pops up a inputError Message", function() {
      UI.inputErrorMessage();
      expect(alert).toHaveBeenCalledWith("You have to choose 'y' or 'n'.");
    });
  });

  describe ("Test prompt events", function() {
    var prompt;
    var chooesnPlayer;
    it ("Pops up a message to ask about choosen player", function() {
      prompt = spyOn(window, "prompt").and.returnValue("y");
      chooesnPlayer = UI.askFirstMove();
      UI.askFirstMove();
      expect(prompt).toHaveBeenCalledWith("Do you require the first move? (y/n)");
      expect(chooesnPlayer).toEqual("y");
    });
  });

  describe ("Test Displaing Button", function() {
    var unbind;
    beforeEach (function() {
      unbind = spyOn($.fn, "unbind");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> ');
    });

    it ("Hides start Button and unbind events, Show new Button", function() {
      UI.toggleDisplayedButtons(".btn-start", ".btn-new");
      expect($(".btn-start")).toBeHidden();
      expect(unbind).toHaveBeenCalled();
      expect($(".btn-start")).not.toHandle("click");
      expect($(".btn-new")).toBeVisible();
    });

    it ("Hides restart and new Button", function() {
      UI.hideButtons(".btn-restart", ".btn-new");
      expect($(".btn-new")).toBeHidden();
      expect($(".btn-restart")).toBeHidden();
    });
  });

  describe ("Test visualAfterGameOver function", function() {
    var toggleDisplayedButtons;
    var restartGame;
    var unbind;
    var click;

    beforeEach (function() {
      toggleDisplayedButtons = spyOn(UI, "toggleDisplayedButtons");
      restartGame = spyOn(UI, "restartGame");
      unbind = spyOn($.fn, "unbind");
      click = spyOnEvent('tr td', 'click');
    });

    it ("Test call function after game over", function() {
      UI.visualAfterGameOver();
      expect(unbind).toHaveBeenCalled();
      expect(click).not.toHaveBeenTriggered();
      expect(toggleDisplayedButtons).toHaveBeenCalled();
      expect(restartGame).toHaveBeenCalled();
    });
  });

  describe ("Test visualWhenGameOver function", function() {
    // need to figure about done test
    var winMessage;
    var tieMessage;
    var visualAfterGameOver;

    beforeEach (function() {
      winMessage = spyOn(UI, "winMessage");
      tieMessage = spyOn(UI, "tieMessage");
      visualAfterGameOver = spyOn(UI, "visualAfterGameOver");
    });

    describe ("Message pops up when GameOver", function() {
      xit ("Pops up for win and click event doesn't work,if the Game win.", function() {
        UI.visualWhenGameOver("X");
        expect(winMessage).toHaveBeenCalled();
        expect(visualAfterGameOver).toHaveBeenCalled();
      });

      xit ("Pops up for tie and click event doesn't work,if the Game tie.", function() {
        UI.visualWhenGameOver("X");
        expect(tieMessage).toHaveBeenCalled();
        expect(visualAfterGameOver).toHaveBeenCalled();
      });

      xit ("Not Pops up any message and click event works,if the Game is not won or tied.", function() {
        UI.visualWhenGameOver("X");
        expect(winMessage).not.toHaveBeenCalled();
        expect(tieMessage).not.toHaveBeenCalled();
        expect(visualAfterGameOver).not.toHaveBeenCalled();
      });
    });
  });
  
  describe ("Test gameStart function", function() {
    var ajaxget;
    var firstMove;
    var newGame;
    var play;

    it ("Call other function", function() {
      ajaxget = spyOn($, 'get');
      firstMove = spyOn(Game, "firstMove");
      newGame = spyOn(UI, "newGame");
      UI.gameStart();
      expect(ajaxget).toHaveBeenCalledWith('/game/');
      expect(firstMove).toHaveBeenCalled();
      expect(newGame).toHaveBeenCalled();
    });

    it ("if goFirst is not y or n, goback to firstMove", function() {
      firstMove = spyOn(Game, "firstMove").and.returnValue("i");
      play = spyOn(Game, "playGame");
      UI.gameStart();
      expect(firstMove).toHaveBeenCalled();
    });

    it ("if goFirst is null, goback to firstMove", function() {
      firstMove = spyOn(Game, "firstMove").and.returnValue(null);
      play = spyOn(Game, "playGame");
      UI.gameStart();
      expect(firstMove).toHaveBeenCalled();
    });

    it ("if goFirst is '', goback to firstMove", function() {
      firstMove = spyOn(Game, "firstMove").and.returnValue("");
      play = spyOn(Game, "playGame");
      UI.gameStart();
      expect(firstMove).toHaveBeenCalled();
    });

    it ("if goFirst is y call play", function() {
      firstMove = spyOn(Game, "firstMove").and.returnValue("y");
      play = spyOn(Game, "playGame");
      UI.gameStart();
      expect(play).toHaveBeenCalled();
    });

    it ("if goFirst is n call play", function() {
      firstMove = spyOn(Game, "firstMove").and.returnValue("n");
      play = spyOn(Game, "playGame");
      UI.gameStart();
      expect(play).toHaveBeenCalled();
    });
  });

  describe ("Test gameMain function", function() {
    var hideButtons;
    var gameMenu;

    beforeEach(function () {
      hideButtons = spyOn(UI, "hideButtons").and.callThrough();
      gameMenu = spyOn(UI, "gameMenu");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <div class = "menu"> \
                      <button type = "button" class = "player">1 Player</button><br> \
                      <button type = "button" class = "players">2 Players</button> \
                    </div> \
                    <div class = "playerMark"> \
                      <button type = "button" id = "Xmark">X</button> \
                      <button type = "button" id = "Omark">O</button> \
                    </div> \
                    <div class = "game"> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <table> <td id = "0"></td><td id = "1"></td><td id = "2"></td></table> \
                    </div>');
    });

    it ("hide menu, game, mark buttons", function() {
      UI.gameMain();
      expect(hideButtons).toHaveBeenCalledWith(".menu", ".playerMark", ".game");
      expect($(".menu")).toBeHidden();
      expect($(".game")).toBeHidden();
      expect($(".playerMark")).toBeHidden();
    });

    it ("call gameMain function when click statGame button", function() {
      UI.gameMain();
      $(".btn-start").click();
      expect(gameMenu).toHaveBeenCalled();
    });
  });

  describe ("Test resetGame function", function() {
    it ("reset Gameabord and tr td", function() {
      var ajaxget = spyOn($, 'get');
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      UI.resetGame();
      expect(ajaxget).toHaveBeenCalledWith("/resetgame/");
      expect($("tr td")).toBeEmpty();
    });
  });

  describe ("Test newGame function", function() {
    it ("when new button click call resetGame() and gameMenu", function() {
      var ajaxget = spyOn($, 'get');
      var gameMenu = spyOn(UI, "gameMenu");
      var resetGame = spyOn(UI, "resetGame").and.callThrough();
      setFixtures(' <button type="button" class = "btn-new">New Game</button> \
                    <table> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></table>');
      UI.newGame();
      $(".btn-new").click();
      expect(gameMenu).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
      expect(ajaxget).toHaveBeenCalledWith("/resetgame/");
      expect($("tr td")).toBeEmpty();
    });

    it ("unbind new button and td after clicked new button", function() {
      var buttonclick = spyOnEvent('.btn-new', 'click');
      var spotclick = spyOnEvent('tr td', 'click');
      UI.newGame();
      $(".btn-new").click();
      expect(buttonclick).not.toHaveBeenTriggered();
      expect(spotclick).not.toHaveBeenTriggered();
    });
  });

  describe ("Test restartGame function", function() {
    var resetGame;
    var choiceMark;
    var gameMenu;
    var clickbutton;
    var ajaxget;

    beforeEach(function() {
      ajaxget = spyOn($, 'get');
      clickbutton = spyOnEvent('button', 'click');
      resetGame = spyOn(UI, "resetGame").and.callThrough();
      gameMenu = spyOn(UI, "gameMenu");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <div class = "menu"> \
                      <button type = "button" class = "player">1 Player</button><br> \
                      <button type = "button" class = "players">2 Players</button> \
                    </div> \
                    <div class = "playerMark"> \
                      <p>Choice a mark you want.</p> \
                      <button type = "button" id = "Xmark">X</button> \
                      <button type = "button" id = "Omark">O</button> \
                    </div> \
                    <div class = "game"> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> \
                    <table> <td id = "0">X</td><td id = "1">O</td><td id = "2"></td></table> \
                    </div>');
    });

    it ("Reset Game when restart button click", function() {
      UI.restartGame();
      $(".btn-restart").click();
      expect(resetGame).toHaveBeenCalled();
      expect($("tr td")).toBeEmpty();
      expect(ajaxget).toHaveBeenCalledWith("/resetgame/");
    });

    it("Hide game buttons", function() {
      UI.restartGame();
      $(".btn-restart").click();
      expect($(".game")).toBeHidden();
    });

    it("Unbind buttons", function() {
      UI.restartGame();
      $(".btn-restart").click();
      expect(clickbutton).not.toHaveBeenTriggered();
    });

    it("Call gameMenu function", function() {
      UI.restartGame();
      $(".btn-restart").click();
      expect(gameMenu).toHaveBeenCalled();
    });
  });

  describe ("Test humanPlay function", function() {
    var showHumanMessage;
    var changeHumanMessage;
    var computerPlay;
    var click;

    beforeEach(function() {
      showHumanMessage = spyOn(UI, "showHumanMessage");
      changeHumanMessage = spyOn(UI, "changeHumanMessage");
      computerPlay = spyOn(UI, "computerPlay");
      click = spyOnEvent('tr td', 'click');
      setFixtures(' <h1 id = "Human">Click a spot you want.</h1> \
                    <table> <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr>  </table>');
    });

    it ("Shows message for human player after humanPlay running", function() {
      UI.humanPlay();
      expect(showHumanMessage).toHaveBeenCalled();
    });

    it ("cant click and hide human message after human choice a spot", function() {
      UI.humanPlay();
      $("#0").click();
      expect(click).not.toHaveBeenTriggered();
      expect(changeHumanMessage).toHaveBeenCalled();
    });

    describe ("when human vs.computer", function() {
       // need to test getJson. done
      beforeEach(function() {
        UI.gameType = ".player";
      });

      xit ("call computerPlay if not game over", function() {
        UI.humanPlay();
        $("#0").click();
        expect(computerPlay).toHaveBeenCalledWith(Game.playGame);
      })

      xit ("tr td stop to click if game over", function() {
        setFixtures('<table> <td id = "0">X</td></table>');
        UI.humanPlay();
        $("#2").click();
        expect($("tr td")).not.toHaveBeenTriggered();
        expect(computerPlay).not.toHaveBeenCalledWith(Game.playGame);
      })
    });

    describe ("when human vs. human", function() {
      var humanPlay
      beforeEach(function() {
        UI.gameType = ".players";
        humanPlay = spyOn(UI, "humanPlay");
      });

      it ("call humanPlay if not game over", function() {
        UI.humanPlay();
        $("#0").click();
        expect(humanPlay).toHaveBeenCalled();
      });

      it ("tr td stop to click if game over", function() {
        setFixtures('<table> <td id = "0">X</td></table>');
        UI.humanPlay();
        $("#2").click();
        expect($("tr td")).not.toHaveBeenTriggered();
      });
    });
  });

  describe ("Test computerPlay function", function() {
    // need to test getJson. done
    var humanPlay;
    var click;

    beforeEach(function() {
      click = spyOnEvent('tr td', 'click');
      humanPlay = spyOn(UI, "humanPlay");
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1> \
                    <table> <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr>  </table>');
    });

    xit ("call humanPlay if not game over", function() {
      UI.computerPlay();
      expect(humanPlay).toHaveBeenCalled();
    });

    xit ("tr td stop to click if game over", function() {
      setFixtures('<table> <td id = "0">X</td> <td id = "2">X</td></tr> </table>');
      UI.computerPlay();
      expect($("tr td")).not.toHaveBeenTriggered();
    });
  });
});
