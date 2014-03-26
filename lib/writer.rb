class Writer
  def initialize(output = $stdout)
    @output = output
  end

  def print_out(string)
    @output.print string
  end

  def puts_out(string)
    @output.puts string
  end
end
