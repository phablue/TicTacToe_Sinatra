require "spec_helper"
require "stringio"

describe Human do
	let(:board) {GameBoard.new}

	context "Show message" do
		before(:each) {
			@output = StringIO.new
			@writer = Writer.new(@output)
			@human = Human.new(nil, @writer)
		}

		it "when user turn" do
			@writer.should_receive(:print_out).with(@human.move_msg)
			@human.ask_move
		end

		it "when raise error" do
			@writer.should_receive(:print_out).with(@human.err_msg)
			@human.raise_error
		end
	end

	it "Gets user input" do
		@input = StringIO.new "1"
		@reader = Reader.new(@input)
		@human = Human.new(@reader, nil)
		@human.user_input.should == "1"
	end

	context "Check answer is available." do
		before(:each) {
			@output = StringIO.new
			@writer = Writer.new(@output)
			@human = Human.new(nil, @writer)
			board.spots  = [
											 "1", "X", "3",
											 "4", "X", "6",
											 "O", "O", "9"
											]
			@user = "X"
			@answer = "2"
		}

		it "Show message" do
			expect {@human.check_available(board, @user, @answer)}.to include{@human.err_msg}
		end

		it "Call choose_spot method if spot is unavailable" do
			@human.should_receive(:choose_spot)
			@human.check_available(board, @user, @answer)
		end
	end

	context "Check answer is available." do
		before(:each) {
			@human = Human.new(nil,nil)
			board.spots  = [
											 "1", "X", "3",
											 "4", "X", "6",
											 "O", "O", "9"
											]
			@user = "X"
			@answer = "1"
		}

		it "Marks if spot is available" do
			expect {@human.check_available(board, @user, @answer)}.to change {board.spots[0]}.to("X")
		end

		it "Call unavailable_spot method If spot is unavailable" do
			@answer = "2"
			@human.should_receive(:unavailable_spot)
			@human.check_available(board, @user, @answer)
		end
	end
end
