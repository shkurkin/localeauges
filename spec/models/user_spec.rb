require 'rails_helper'

RSpec.describe User do
  it { should have_and_belong_to_many(:teams) }
  it { should have_many(:messages) }
  it { should have_many(:leagues) }
end