class TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
  end

  def generate_name
    name = Faker::App.name + Faker::Number.number(6);
    while(Team.find_by_name(name)) do
      name = Faker::App.name + Faker::Number.number(6);
    end
    render json: {name: Faker::App.name + " " + Faker::Number.number(6)}
  end
end