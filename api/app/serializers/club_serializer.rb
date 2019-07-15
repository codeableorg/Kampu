class ClubSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :address, :image, :schedule, :favorited

  def image
    # rails_blob_path(object.image, only_path: true) if object.image.attached?
    url_for(object.image) if self.object.image.attached?
  end

  def favorited
    current_user ? current_user.favorited?(object) : false
  end
end
