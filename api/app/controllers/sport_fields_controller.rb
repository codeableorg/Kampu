class SportFieldsController < ApplicationController

  def create
    sport_field = SportField.new(sport_field_params)
    if sport_field.save
      render json: sport_field, status: :created
    else
      render json: { errors: sport_field.errors}, status: :unprocessable_entity
    end
  end

  private
  def sport_field_params
    params.permit(:name, :description, :price_day, :price_night, :image)
  end

end
