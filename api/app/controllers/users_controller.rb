class UsersController < ApplicationController
  
  def me
    render json: current_user.as_json(only: %i[name email role]), status: :ok
  end

  def user_with_bookings
    render json: current_user
  end

end