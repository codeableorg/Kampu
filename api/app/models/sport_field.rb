class SportField < ApplicationRecord
  has_one_attached :image

  validates :name, :description, :price_day, :price_night, presence: true
end
