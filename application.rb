require "json"
require "sinatra"
require "./lib/game"

configure do
  set :game => Game.new
end

before do
  @game = settings.game
  @current_player
end

get "/" do
  erb :tictactoe
end

get "/game/" do
  {:game_over => @game.check_game_over()}.to_json
end

post "/game/human/" do
  chosen_spot = params[:chosen_spot]
  current_player = params[:current_player]
  @game.board.mark_choice_spot(chosen_spot, current_player)
end

post "/game/computer/" do
  @current_player = params[:current_player]
end

get "/game/computer/" do
  {:computer_choice => @game.computer.choose_the_best_spot(@game.board, @current_player)}.to_json
end
