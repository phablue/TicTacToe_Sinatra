require 'spec_helper'
require 'stringio'

describe Writer do
  let(:output) {StringIO.new}
  let(:writer) {Writer.new(output)}

  context "output" do
    it "print" do
      writer.should_receive(:print_out).with("test")
      writer.print_out("test")
    end

    it "puts" do
      writer.should_receive(:puts_out).with("test")
      writer.puts_out("test")
    end
  end
end