class Club < ApplicationRecord
  has_one_attached :image
  has_many :favorites
  has_many :sport_fields
  
  validates :name, presence: true
  validates :address, presence: true
  # validates :schedule, presence: true
  before_save :set_parse, on: [ :create, :update ]

  private
  def set_parse
    self.schedule = JSON.parse(self.schedule) if self.schedule.class != Hash
  end

end
