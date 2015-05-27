require 'rails_helper'

RSpec.describe Chat do
  it { should have_many(:messages) }
  it { should belong_to(:group) }
end