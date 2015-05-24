class CreateSeasons < ActiveRecord::Migration
  def change
    create_table :seasons do |t|
      t.date :start_date
      t.string :match_frequency
      t.integer :league_id

      t.timestamps null: false
    end
  end
end
