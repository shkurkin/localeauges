class MatchesController < ApplicationController
  def create
    @match = Match.new(match_params)
    team1 = Team.find(params[:team1_id])
    team2 = Team.find(params[:team2_id])
    season = Season.find(params[:season_id])
    location = Location.find(params[:location_id])
    @match.teams << [team1, team2]
    @match.season = season
    @match.location = location
    @match.save
  end

  private

  def match_params
    params.require(:match).permit(:datetime, :season_id, :location_id)
  end
end
