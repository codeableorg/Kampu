class SportFieldsController < ApplicationController
  before_action :set_sport_field, only: [:show]

  def index
    render json: SportField.all
  end

  def show
    render json: @sport_field
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
    p params[:selectedDate]
    bookings = @sport_field.bookings.where("DATE(date) = ?", params[:selectedDate])
    club = @sport_field.club
    render json: {club: club, bookings: bookings}
  end

  def times
    @sport_field = SportField.find(params[:id])
    bookings = @sport_field.bookings.where(:date => params[:start]..params[:end])
    render json: bookings
  end

  private
  def set_sport_field
    @sport_field = SportField.find(params[:id])
  end
  def sport_field_params
    params.permit(:name, :description, :price_day, :price_night, :image, :club_id)
  end

end
