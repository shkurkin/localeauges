class AddCurrentLeagueIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :current_league_id, :integer
  end
end
