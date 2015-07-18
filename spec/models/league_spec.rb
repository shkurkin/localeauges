require 'rails_helper'

RSpec.describe League do
  it { should have_and_belong_to_many(:teams) }
  it { should have_many(:seasons) }
  it { should have_one(:chat) }
  it { should belong_to(:location) }
  it { should have_many(:users) }

  let(:league) { FactoryGirl.create(:league) }

  describe "default season" do
    it "should be auto-generated with a new league" do
      expect(league.seasons.first.league_default).to eq(true)
    end
  end
end