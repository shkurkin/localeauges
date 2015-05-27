class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.integer :group_id
      t.string :group_type

      t.timestamps null: false
    end
  end
end
