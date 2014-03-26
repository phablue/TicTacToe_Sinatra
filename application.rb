require "sinatra"
require "./lib/tictactoe"

configure do
  set :game => Game.new(Reader.new, Writer.new), :human => Human.new
end

get "/main" do
  erb :tictactoe
end

get "/game" do
  erb :tictactoe
end

post "/game/choice_mark/" do
  mark = request.body.read
  settings.game.current_player = mark
end

post "/game/play/" do
end
