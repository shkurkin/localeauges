class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.integer :score
      t.text :details
      t.integer :match_id
      t.integer :team_id

      t.timestamps null: false
    end
  end
end
