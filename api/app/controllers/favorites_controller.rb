class FavoritesController < ApplicationController
  before_action :set_club

  def create
    current_user.favorite(@club)
    render json: @club, status: :created
  end
  
  def destroy
    current_user.unfavorite(@club)
    render json: @club
  end

  private    
  def set_club
    @club = Club.find(params[:club_id])
  end

end
