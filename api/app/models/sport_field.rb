class SportField < ApplicationRecord
  has_one_attached :image
  has_many :bookings

  belongs_to :club

  validates :name, :description, :price_day, :price_night, presence: true
end

