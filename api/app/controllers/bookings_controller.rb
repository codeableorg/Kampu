class BookingsController < ApplicationController
  before_action :set_booking, only: [:show]

  def index
    render json: Booking.all
  end

  def show
    render json: @booking
  end

  def create
    booking = current_user.bookings.new(booking_params)
    if booking.save
      render json: booking, status: :created
    else
      render json: { errors: booking.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  
  def set_booking
    @booking = Booking.find(params[:id])
  end

  def booking_params
<<<<<<< HEAD
    params.permit(:date, :start_hour, :end_hour, :amount, :sport_field_id, :user_id)
=======
    params.permit(:date, :start_hour, :end_hour, :amount, :sport_field_id)
>>>>>>> 007913f7d6b21f93ec55aea792518ab9c3c21af8
  end

end