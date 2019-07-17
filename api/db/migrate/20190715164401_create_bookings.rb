class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
        t.date :date
        t.integer :start_hour
        t.integer :end_hour
        t.integer :amount
        t.references :sport_field, foreign_key: true
        t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
