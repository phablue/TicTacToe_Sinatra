require_relative "game_board"
require_relative "game_rules"
require_relative "computer"

class Game
	attr_accessor :board, :computer, :rules

	def initialize
		@board = GameBoard.new
		@rules = GameRules.new
		@computer = Computer.new
	end
end
