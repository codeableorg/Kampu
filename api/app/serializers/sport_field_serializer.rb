class SportFieldSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :image, :price_day, :price_night, :club_id

  def image
    url_for(object.image) if self.object.image.attached?
  end
end
