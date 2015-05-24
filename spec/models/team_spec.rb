require 'rails_helper'

RSpec.describe Team do
  it { should have_and_belong_to_many(:users) }
  it { should have_and_belong_to_many(:leagues) }
  it { should have_and_belong_to_many(:matches) }
  it { should have_many(:results) }
end