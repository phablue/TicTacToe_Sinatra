class Human
	def initialize(input, output)
		@input = input
		@output = output
	end

	def choose_spot(board, current_player)
		ask_move
		answer = user_input
		check_available(board, current_player, answer)
	end

	def ask_move
		@output.print_out(move_msg)
	end

	def user_input
		@input.get_input
	end

	def check_available(board, current_player, answer)
		if board.available_spots.include?(answer)
			board.mark_choice_spot(answer, current_player)
		else
			unavailable_spot(board, current_player)
		end
	end

	def raise_error
		@output.print_out err_msg
	end

	def move_msg
		"Click a spot you want"
	end

	def err_msg
		"That is not an available spot. Please choose a different spot."
	end

	def unavailable_spot(board, current_player)
		raise_error
		choose_spot(board, current_player)
	end
end
