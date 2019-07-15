class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :favorites, dependent: :destroy

  validates :email, :name, :role, presence: true
  validates :email, uniqueness: true

  def invalidate_token
    update(token: nil)
  end

  def self.valid_login?(email, password)
    user = find_by(email: email)
    user if user&.authenticate(password)
  end

  def favorite(club)
    favorites.find_or_create_by(club: club)
  end

  def unfavorite(club)
    favorites.where(club: club).destroy_all
  end

  def favorited?(club)
    favorites.find_by(club_id: club.id).present?        
  end
end
