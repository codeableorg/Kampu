class ClubSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :price, :address, :image, :schedule, :favorited, :favorited_count, :district, :latitude, :longitude, :sport_fields

  def image
    # rails_blob_path(object.image, only_path: true) if object.image.attached?
    if self.object.image.attached?
      object.image.map do |img|
        url_for(img)
      end
    end
  end

  def price
    self.object.sport_fields.minimum(:price_day)
  end

  def favorited
    current_user ? current_user.favorited?(object) : false
  end

  def favorited_count
    object.favorites.count
  end
end
