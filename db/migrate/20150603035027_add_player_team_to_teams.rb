class AddPlayerTeamToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :player_team, :boolean
  end
end
