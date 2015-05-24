require 'rails_helper'

RSpec.describe Match do
  it { should have_and_belong_to_many(:teams) }
  it { should have_many(:results) }
  it { should have_one(:chat) }
  it { should belong_to(:season) }
  it { should belong_to(:location) }
end