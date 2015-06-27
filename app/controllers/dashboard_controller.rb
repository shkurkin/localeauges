class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:index]

  def index
    @matches = @user.matches.where('datetime >= ?', Date.today).order(datetime: :desc)
    gon.matches = {
      all: @matches,
      nextMatch: @matches.first
    }
  end
end
