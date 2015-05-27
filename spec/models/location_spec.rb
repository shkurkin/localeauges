require 'rails_helper'

RSpec.describe Location do
  it { should have_many(:leagues) }
  it { should have_many(:matches) }
end