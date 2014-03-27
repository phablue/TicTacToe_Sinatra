require "sinatra"
require "./lib/tictactoe"

configure do
  set :game => Game.new(Reader.new, Writer.new)
  set :board => settings.game.board
  set :current_player => settings.game.current_player
  set :chosen_spot => settings.game.chosen_spot
end

get "/main" do
  erb :tictactoe
end

get "/game" do
  game.check_game_over(current_player)
  erb :tictactoe
end

post "/game/choice_mark/" do
  mark = request.body.read
  settings.game.current_player = mark
end

post "/game/chosen_spot/" do
  chosen_spot = request.body.read
  settings.game.chosen_spot = chosen_spot
  board.mark_choice_spot(chosen_spot, current_player)
end
