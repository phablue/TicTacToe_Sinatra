require "json"
require "sinatra"
require "./lib/tictactoe"

configure do
  set :game => Game.new
end

before do
  @game = settings.game
  @board = settings.game.board
  @computer = settings.game.computer
  @current_player = settings.game.current_player
  @chosen_spot = settings.game.chosen_spot
end

get "/main" do
  erb :tictactoe
end

get "/game/" do
  {:game_over => @game.check_game_over(@current_player)}.to_json
  {:computer_choice => @computer.choose_the_best_spot(@board, @current_player)}.to_json
end

post "/game/human/" do
  @current_player = request.body.read
  request.body.rewind
  @chosen_spot = request.body.read
  @board.mark_choice_spot(@chosen_spot, @current_player)
end

post "/game/computer/" do
  @current_player = request.body.read
end
