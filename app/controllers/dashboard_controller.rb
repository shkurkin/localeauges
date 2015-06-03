class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:index]

  def index
  end
end