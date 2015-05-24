require 'rails_helper'

RSpec.describe Result do
  it { should belong_to(:match) }
  it { should belong_to(:team) }
end