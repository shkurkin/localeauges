class TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
  end

  def define_teams_for_match
    teams = {};
    teams.merge! make_new_teams(params[:data])
    teams.merge! find_user_teams(params[:data])
    render json: {teams: teams}
  end

  def generate_name
    render json: {name: Team.generate_name}
  end

  private

  def make_new_teams(teams)
    new_teams = {}
    teams.each do |team|
      next unless team['players'] && team['players'].length > 1
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
    new_teams
  end

  def find_user_teams(teams)
    user_teams = {}
    teams.each do |team|
      if team['players'] && team['players'].length == 1
        player = team['players'].first
        user_team = Team.where(name: player['email'], player_team: true).first
        user_teams[team['respond_as']] = {id: user_team.id, name: user_team.name, userTeam: true}
      end
    end
    user_teams
  end

end