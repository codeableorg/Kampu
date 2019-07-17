class SportField < ApplicationRecord
  validates :name, :description, :price_day, :price_night, presence: true
  
  has_one_attached :image
  has_many :bookings
  belongs_to :club
end

