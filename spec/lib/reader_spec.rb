require 'spec_helper'
require 'stringio'

describe Reader do
  it "gets input" do
    user_input = StringIO.new "test"
    reader = Reader.new(user_input)
    reader.get_input.should == "test"
  end
end