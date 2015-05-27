require 'rails_helper'

RSpec.describe Season do
  it { should have_many(:matches) }
  it { should belong_to(:league) }
end