require "json"
require "sinatra"
require "./lib/game"

use Rack::Session::Pool

get "/" do
  session.clear
  erb :tictactoe
end

get "/game/" do
  session[:game] = Game.new
end

post "/game/human/" do
  game = session[:game]
  chosen_spot = params[:chosen_spot]
  current_player = params[:current_player]
  game.board.mark_choice_spot(chosen_spot, current_player)
end

post "/game/computer/" do
  session[:current_player] = params[:current_player]
end

get "/game/computer/" do
  game = session[:game]
  current_player = session[:current_player]
  computer_choice = game.computer.choose_the_best_spot(game.board, current_player)
  {:computer_choice => computer_choice}.to_json
end

get "/game/gamerules/" do
  game = session[:game]
  {:game_over => game.rules.game_over(game.board),
    :game_win => game.rules.game_win(game.board),
    :game_tie => game.rules.game_tie(game.board)}.to_json
end

get "/resetgame/" do
  redirect "/"
end
