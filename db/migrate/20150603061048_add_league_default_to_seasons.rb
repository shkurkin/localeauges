class AddLeagueDefaultToSeasons < ActiveRecord::Migration
  def change
    add_column :seasons, :league_default, :boolean
  end
end
