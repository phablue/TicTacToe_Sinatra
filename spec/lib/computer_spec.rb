require "spec_helper"

describe Computer do
	let(:board) {GameBoard.new}
	let(:computer) {Computer.new()}

	context "Gets point" do
		it "if game win" do
			board.spots = [
										 "O", "2", "3",
										 "O", "X", "6",
										 "O", "X", "X"
										 ]
			computer.get_point(board, 6).should < 0
		end

		it "if game tie" do
			board.spots = [
										 "O", "X", "X",
										 "X", "O", "O",
										 "O", "X", "X"
										 ]
			computer.get_point(board, 9).should == 0
		end
	end

	context "Changes a player" do
		it "is 'X' if current_player is 'O'" do
			computer.change_player("O").should == "X"
		end

		it "is 'O' if current_player is 'X'" do
			computer.change_player("X").should == "O"
		end
	end

	context "Computer chooses easy way for win" do
		it "in a row" do
			board.spots = [
										 "X", "X", "3",
										 "4", "X", "6",
										 "O", "O", "9"
										 ]
			computer.minimax(board, "O").last.should == "9"
		end

		it "in a column" do
			board.spots = [
										 "O", "2", "3",
										 "4", "X", "6",
										 "O", "X", "X"
										 ]
			computer.minimax(board, "O").last.should == "4"
		end

		it "in a diagonal" do
			board.spots = [
										 "X", "X", "O",
										 "4", "O", "6",
										 "7", "8", "X"
										 ]
			computer.minimax(board, "O").last.should == "7"
		end
	end

	context "Computer chooses to block a spot for win" do
		it "in a row" do
			board.spots = [
										 "X", "O", "3",
										 "O", "5", "6",
										 "X", "8", "X"
										 ]
			computer.minimax(board, "O").last.should == "8"
		end

		it "in a column" do
			board.spots = [
										 "X", "O", "3",
										 "4", "5", "6",
										 "X", "8", "9"
										]
			computer.minimax(board, "O").last.should == "4"
		end

		it "in a diagonal" do
			board.spots = [
										 "X", "O", "X",
										 "O", "5", "6",
										 "X", "8", "9"
										 ]
			computer.minimax(board, "O").last.should == "5"
		end
	end

	context "Computer choose the best spot" do
		before(:each) {
			board.spots = [
										 "X", "O", "X",
										 "O", "5", "6",
										 "X", "8", "9"
										 ]
		}

		it "mark" do
			computer = Computer.new()
			expect {computer.choose_the_best_spot(board, "O")}.to change {board.spots[4]}.to("O")
		end
	end
end
