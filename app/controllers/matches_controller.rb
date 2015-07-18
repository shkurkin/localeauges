class MatchesController < ApplicationController
  before_action :set_user, only: [:new, :create]

  def new
    @match = Match.new
    @map = true
    players = User.all.select('id', 'email', 'name')
    teams = Team.all.where('NOT player_team').select('id', 'name')
    locations = Location.all.select('id', 'name', 'address', 'lat', 'lng')
    gon.newMatch = {
      players: players,
      teams: teams,
      locations: locations,
      location: {name: 'Location', address: 'Address'},
      t1NewName: 'Team 1',
      t1NewPlayers: [],
      t1Team: [],
      t2NewName: 'Team 2',
      t2NewPlayers: [],
      t2Team: []
    }
  end

  def create
    @match = Match.new(match_params)
    # DateTime.strptime("06-18-2015 06:30 PM", "%m-%d-%Y %I:%M %p")
    datetime = DateTime.strptime(params[:datetime], "%m-%d-%Y %I:%M %p")
    @match.datetime = datetime
    @team1 = Team.find(params[:team1_id])
    @team2 = Team.find(params[:team2_id])
    @location = Location.find(params[:location_id])
    @match.teams << [@team1, @team2]
    if @match.save
      MatchMailer.new_match(@match).deliver
      render "matches/modal", layout: false
    else
      render json: new_team.errors, status: :unprocessable_entity
    end
  end

  private

  def match_params
    params.permit(:location_id, :season_id)
  end
end
