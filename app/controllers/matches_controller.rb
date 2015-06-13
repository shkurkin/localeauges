class MatchesController < ApplicationController
  before_action :set_user, only: [:new, :create]

  def new
    @match = Match.new
    @map = true
    players = User.all.select('id', 'email')
    teams = Team.all.where('NOT player_team').select('id', 'name')
    locations = Location.all.select('id', 'nickname', 'address', 'lat', 'lng')
    gon.newMatch = {
      players: players,
      teams: teams,
      locations: locations,
      location: {nickname: 'Location', address: 'Address'},
      t1Players: [],
      t1Team: [],
      t2Players: [],
      t2Team: []
    }
  end

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
