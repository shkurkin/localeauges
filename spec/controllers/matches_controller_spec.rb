require 'rails_helper'

RSpec.describe MatchesController do
  let(:user) { FactoryGirl.create(:user) }
  let(:team1) { FactoryGirl.create(:team) }
  let(:team2) { FactoryGirl.create(:team) }
  let(:league) { FactoryGirl.create(:league) }
  let(:location) { FactoryGirl.create(:location) }
  let(:match_params) { FactoryGirl.attributes_for(:match) }

  describe "create" do
    it "should create a match" do
      league.teams << [team1, team2]
      team1.users << user

      expect {
        post :create, match: match_params, season_id: league.default_season.id, location_id: location.id, team1_id: team1.id, team2_id: team2.id
      }.to change { Match.count }.by(1)

      expect(Match.last.teams).to eq([team1, team2])

      expect(Match.last.season.league_default).to eq(true)
    end
  end
end