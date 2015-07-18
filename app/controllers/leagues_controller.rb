class LeaguesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:index, :show]

  def index
    @leagues = current_user.leagues
  end

  def show
    @league = League.find(params[:id])
    current_user.current_league = @league
    current_user.save
  end
end