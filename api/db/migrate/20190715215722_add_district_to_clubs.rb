class AddDistrictToClubs < ActiveRecord::Migration[5.2]
  def change
    add_column :clubs, :district, :string
    add_column :clubs, :latitude, :string
    add_column :clubs, :longitude, :string
  end
end
