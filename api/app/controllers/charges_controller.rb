class ChargesController < ApplicationController
  def create
    
    charge = Stripe::Charge.create({
      amount: params[:amount] * 100,
      description: "Kampu - Sports Field booking",
      currency: "usd",
      source: params[:token]
    })

    booking = current_user.bookings.create(
      date: params[:date],
      start_hour: params[:start_hour], 
      end_hour: params[:end_hour], 
      amount: params[:amount],
      sport_field_id: params[:sport_field_id]
    )
    if booking.save
      render json: booking, status: :created
    else
      render json: { errors: booking.errors.full_messages}, status: :unprocessable_entity
    end
  
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end
end
