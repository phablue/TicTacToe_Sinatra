class Human
	def choose_spot(board, current_player)
		check_available(board, current_player, answer)
	end

	def check_available(board, current_player, answer)
		if board.available_spots.include?(answer)
			board.mark_choice_spot(answer, current_player)
		end
	end
end
