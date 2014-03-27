require "sinatra"
require "./lib/tictactoe"

configure do
  set :game => Game.new(Reader.new, Writer.new)
end

before do
  @game = settings.game
  @board = settings.game.board
  @current_player = settings.game.current_player
  @chosen_spot = settings.game.chosen_spot
end

get "/main" do
  erb :tictactoe
end

get "/game" do
  @game.check_game_over(current_player)
  erb :tictactoe
end

post "/game/choice_mark/" do
  @current_player = request.body.read
end

post "/game/chosen_spot/" do
  @chosen_spot = request.body.read
  @board.mark_choice_spot(@chosen_spot, @current_player)
end