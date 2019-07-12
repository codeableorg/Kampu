class CreateSportFields < ActiveRecord::Migration[5.2]
  def change
    create_table :sport_fields do |t|
      t.string :name
      t.string :description
      t.integer :price_day
      t.integer :price_night
      t.references :club, foreign_key: true

      t.timestamps
    end
  end
end
