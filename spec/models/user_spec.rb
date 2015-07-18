require 'rails_helper'

RSpec.describe User do
  it { should have_and_belong_to_many(:teams) }
  it { should have_many(:messages) }
  it { should have_many(:leagues) }
  it { should have_many(:matches) }

  describe "current league" do
    let(:user) { FactoryGirl.create(:user) }
    let(:team) { FactoryGirl.create(:team) }
    let(:league_1) { FactoryGirl.create(:league) }
    let(:league_2) { FactoryGirl.create(:league) }

    it "should return nil if user has no leagues" do
      expect(user.current_league).to be_nil
    end

    it "should have a current league if any league" do
      user.teams << team
      league_1.teams << team
      league_2.teams << team
      user.reload
      expect(user.current_league).to be_a(League)
    end

    it "should be able to change current league" do
      user.teams << team
      league_1.teams << team
      league_2.teams << team

      user.current_league = league_1
      expect(user.current_league).to be_a(League)
      expect(user.current_league).to eq(league_1)

      user.current_league = league_2
      expect(user.current_league).to be_a(League)
      expect(user.current_league).to eq(league_2)
    end
  end

  describe "player team" do
    let(:user) { FactoryGirl.create(:user) }

    it "should have an auto generated player team" do
      expect(user.teams.first.player_team).to eq(true)
    end
  end
end