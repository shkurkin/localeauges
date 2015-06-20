class TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
  end

  def make_multiple
    teams = params[:data]
    new_teams = {}
    teams.each do |team|
      next unless team['players']
      new_team = Team.new(name: team['name'])
      team['players'].each do |player|
        new_team.users << User.find(player['id'])
      end
      if new_team.save
        new_teams[team['respond_as']] = {id: new_team['id'], name: new_team['name']}
      else
        render json: new_team.errors, status: :unprocessable_entity
      end
    end
    render json: {new_teams: new_teams}
  end

  def generate_name
    render json: {name: Team.generate_name}
  end

end