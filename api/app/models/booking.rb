class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :sport_field
end