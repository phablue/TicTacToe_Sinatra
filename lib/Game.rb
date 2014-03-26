require_relative "game_board"
require_relative "game_rules"
require_relative "human"
require_relative "computer"

class Game
	attr_accessor :current_player
	attr_accessor :board

	def initialize(reader, writer)
		@current_player = ""
		@game_continue = true
		@reader = reader
		@writer = writer
		@board = GameBoard.new
		@rules = GameRules.new
		@human = Human.new(@reader, @writer)
		@computer = Computer.new(@writer)
	end

	def end_of_game_msg(current_player)
		if current_player == "X" && @rules.game_win(@board)
			#show win message for user
		elsif current_player == "O" && @rules.game_win(@board)
			#show win message for comp
		elsif @rules.game_tie(@board)
			#show win message for tie
		end
	end

	def change_player(current_player)
		@current_player = (current_player == "X") ? "O" : "X"
		false
	end

	def check_game_over(current_player)
		return true if @rules.game_over(@board)
		change_player(current_player)
	end

	def play
		go_first
		while @game_continue
			if @answer == "y"
				@human.choose_spot(@board, @current_player)
				break if check_game_over(@current_player)
				@computer.choose_the_best_spot(@board, @current_player)
				break if check_game_over(@current_player)
			else
				@computer.choose_the_best_spot(@board, @current_player)
				break if check_game_over(@current_player)
				@human.choose_spot(@board, @current_player)
				break if check_game_over(@current_player)
			end
		end
		# end_of_game_msg(@current_player)
		# game over message 
	end
end
