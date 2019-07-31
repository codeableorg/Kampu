class UserSerializer < ActiveModel::Serializer

  attributes :id, :name, :email, :bookings

  def bookings
    object.bookings.map do |booking|
      booking.attributes.merge({
        sport_field_name: booking.sport_field.name,
        club_id: booking.sport_field.club.id,
        club_name: booking.sport_field.club.name
      })
    end
  end

end
