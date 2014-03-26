class GameRules
	def win_requirement_row(board)
		win_requirement(board.row_spots)
	end

	def win_requirement_column(board)
		win_requirement(board.column_spots)
	end

	def win_requirement_diagonal(board)
		win_requirement(board.diagonal_spots)
	end

	def win_requirement(spots)
		spots.any? do |spot|
			spot.uniq.length == 1
		end
	end

	def game_win(board)
		win_requirement_row(board) || win_requirement_column(board) || win_requirement_diagonal(board)
	end

	def game_tie(board)
		board.available_spots.empty?
	end

	def game_over(board)
		game_win(board) || game_tie(board)
	end
end