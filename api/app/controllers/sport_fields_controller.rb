class SportFieldsController < ApplicationController

  def index
    render json: SportField.all
  end

  def create
    sport_field = SportField.new(sport_field_params)
    if sport_field.save
      render json: sport_field, status: :created
    else
      render json: { errors: sport_field.errors}, status: :unprocessable_entity
    end
  end

  def schedule
    @sport_field = SportField.find(params[:id])
    bookings = @sport_field.bookings.where("DATE(date) = ?", Date.today)
    club = @sport_field.club
    render json: {club: club, bookings: bookings}
  # CREAR UNA VISTA en el CLIENTE y crear un servicio para traerlo
  end


  private
  def sport_field_params
    params.permit(:name, :description, :price_day, :price_night, :image)
  end

end
