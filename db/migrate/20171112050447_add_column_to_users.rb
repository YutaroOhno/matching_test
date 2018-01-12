class AddColumnToUsers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :nickname, :string
  	add_column :users, :avatar, :text
  	add_column :users, :profile, :text
  end
end
