require_relative "game_rules"

class Computer
	def initialize
		@rules = GameRules.new
	end

	def choose_the_best_spot(board, current_player)
		choice = minimax(board, current_player)[1]
		board.mark_choice_spot(choice, current_player)
		return choice
	end

	def minimax(board, current_player, level = 0)
		point = -1
		best_point = -1
		best_spot = nil
		return get_point(board, level), nil if @rules.game_over(board)
			board.available_spots.each do |spot|
		 		board.mark_choice_spot(spot, current_player)
		 		point = -minimax(board, change_player(current_player), level += 1)[0]
		 		board.mark_choice_spot(spot, spot)
		 		if point > best_point
		 			best_point = point
		 			best_spot = spot
		 		end
		 	end
		 return [best_point, best_spot]
	 end

	def get_point(board, level)
		return (1.0 / -level) if @rules.game_win(board)
		return 0
	end

	def change_player(current_player)
		(current_player == "X") ? "O" : "X"
	end
end
