class MatchesController < ApplicationController do
  def create
    @match = Match.new(match_params)

  end

  private

  def match_params
    params.require(:match).permit(:datetime, :season_id, :location_id)
  end
end
