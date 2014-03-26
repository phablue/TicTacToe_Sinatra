class Human
	attr_accessor :choosen_spot

	def initialize
		@choosen_spot = ""
	end

	def choose_spot(board, current_player)
		check_available(board, current_player, @choosen_spot)
	end

	def check_available(board, current_player, choosen_spot)
		if board.available_spots.include?(@choosen_spot)
			board.mark_choice_spot(@choosen_spot, current_player)
		end
	end
end
