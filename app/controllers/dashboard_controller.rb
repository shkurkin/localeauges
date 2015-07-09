class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:index]

  def index
    @matches = @user.matches.where('datetime >= ?', Date.today).order(:datetime)
    gon.matches = {
      all: [],
      active: 0
    }
    @matches.each do |match|
      teams = match.teams.order(:name).map do |team|
        {
          name: team.name,
          players: team.users.map { |player| {email: player.email} }
        }
      end
      out = {
        teams: teams,
        datetime: match.datetime,
        location: match.location
      }
      gon.matches[:all].push(out)
    end
  end
end
