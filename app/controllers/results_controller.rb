class ResultsController < ApplicationController

  def record_match_results
    @match = Match.find(params[:match_id])
    results = @match.results
    users_result = Result.new(team_id: params[:users_team_id],
      score: params[:users_team_score], details: params[:users_team_detail])
    opponents_results = Result.new(team_id: params[:opponents_team_id],
     score: params[:opponents_team_score], details: params[:opponents_team_detail])
    if(!users_result.save)
      render json: users_result.errors, status: :unprocessable_entity
    end
    if(!opponents_results.save)
      render json: opponents_results.errors, status: :unprocessable_entity
    end
    results.delete_all
    @match.results << [users_result, opponents_results]
  end

end
