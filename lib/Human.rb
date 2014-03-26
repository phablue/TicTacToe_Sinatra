class Human
	attr_accessor :chosen_spot

	def initialize
		@chosen_spot = ""
	end

	def choose_spot(board, current_player)
		check_available(board, current_player, @chosen_spot)
	end

	def check_available(board, current_player, chosen_spot)
		if board.available_spots.include?(@chosen_spot)
			board.mark_choice_spot(@chosen_spot, current_player)
		end
	end
end
