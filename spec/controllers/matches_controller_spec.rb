require 'rails_helper'

RSpec.describe MatchesController do
  let(:user) { FactoryGirl.create(:user) }
  let(:team1) { FactoryGirl.create(:team) }
  let(:team2) { FactoryGirl.create(:team) }
  let(:league) { FactoryGirl.create(:league) }
  let(:match_params) { FactoryGirl.attributes_for(:match) }

  describe "create" do
    league << [team1, team2]
    team1.users << user

    expect {
      post :create, match: match_params, season_id: season_id, location_id: location_id, team1_id: team1_id, team2_id: team2_id
    }.to change { Match.count }.by(1)

    expect(Match.last.teams).to equal([team1, team2])

    expect(Match.last.season.default).to be_true
  end
end