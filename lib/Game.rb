require_relative "game_board"
require_relative "game_rules"
require_relative "computer"

class Game
	attr_accessor :current_player, :chosen_spot
	attr_accessor :board, :computer

	def initialize
		@current_player = ""
		@chosen_spot = ""
		@game_continue = true
		@board = GameBoard.new
		@rules = GameRules.new
		@computer = Computer.new
	end

	def check_game_over(current_player)
		@rules.game_over(@board) ? true : false
	end
end
