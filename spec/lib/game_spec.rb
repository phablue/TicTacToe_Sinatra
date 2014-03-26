require "spec_helper"
require "stringio"

describe Game do
  context "Show" do
    before(:each) {
      @output = StringIO.new
      @writer = Writer.new(@output)
      @game = Game.new(nil, @writer)
    }

    it "a welcome message" do
      @writer.should_receive(:print_out).with(@game.welcome_msg)
      @game.show_msg(@game.welcome_msg)
    end

    it "a win message for user" do
      @writer.should_receive(:print_out).with(@game.user_win_msg)
      @game.show_msg(@game.user_win_msg)
    end

    it "a win message for computer" do
      @writer.should_receive(:print_out).with(@game.computer_win_msg)
      @game.show_msg(@game.computer_win_msg)
    end

    it "a tie message" do
      @writer.should_receive(:print_out).with(@game.tie_msg)
      @game.show_msg(@game.tie_msg)
    end

    it "a gameover message" do
      @writer.should_receive(:print_out).with(@game.gameover_msg)
      @game.show_msg(@game.gameover_msg)
    end

    it "a asking message" do
      @writer.should_receive(:print_out).with(@game.ask_yes_no)
      @game.show_msg(@game.ask_yes_no)
    end

    it "a error message" do
      @writer.should_receive(:print_out).with(@game.err_msg)
      @game.show_msg(@game.err_msg)
    end

    context "End of game messages." do
      it "Show user win message if user win" do
        @game.board.spots = [
                              "X", "2", "3",
                              "X", "O", "O",
                              "X", "8", "9"
                            ]
        @game.should_receive(:show_msg).with(@game.user_win_msg)
        @game.end_of_game_msg("X")
      end

      it "Show computer win message If computer win" do
        @game.board.spots = [
                              "X", "O", "O",
                              "X", "O", "X",
                              "O", "X", "9"
                            ]
        @game.should_receive(:show_msg).with(@game.computer_win_msg)
        @game.end_of_game_msg("O")
      end

      it "Show tie message if game tie" do
        @game.board.spots = [
                              "X", "O", "X",
                              "X", "O", "O",
                              "O", "X", "X"
                            ]
        @game.should_receive(:show_msg).with(@game.tie_msg)
        @game.end_of_game_msg("X")
      end
    end
  end

  context "Player change" do
    before(:each) {
      @game = Game.new(nil, nil)
    }
    it "to user if current player is computer" do
      @game.change_player("O").should == "X"
    end

    it "to computer if current player is user" do
      @game.change_player("X").should == "O"
    end
  end

  it "Gets user input" do
    @input = StringIO.new "y"
    @reader = Reader.new(@input)
    @game = Game.new(@reader, nil)
    @game.input.should == "y"
  end

  context "Play first" do
    before(:each) {
      @game = Game.new(@reader, nil)
    }
    it "Asking" do
      expect {@game.go_first}.to include{@game.ask_yes_no}
      @game.ask_yes_no
    end

    it "if answer is yes" do
      answer = "y"
      expect {@game.go_first}.to be{"X"}
    end

    it "if answer is no" do
      answer = "n"
      expect {@game.go_first}.to be{"O"}
    end

    it "Show error message if mistake to type" do
      answer = "1"
      expect {@game.go_first}.to include{@game.err_msg}
    end

    it "Call if mistake to type" do
      answer = "1"
      @game.should_receive(:go_first)
      @game.go_first
    end
  end
end
