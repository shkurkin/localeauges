class AddPlayerTeamToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :player_team, :boolean, null: false, default: false
  end
end
