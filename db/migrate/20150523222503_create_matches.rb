class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.datetime :datetime
      t.integer :season_id
      t.integer :location_id

      t.timestamps null: false
    end
  end
end
