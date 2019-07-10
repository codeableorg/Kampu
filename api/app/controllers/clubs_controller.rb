class ClubsController < ApplicationController
  before_action :set_club, only: [:show, :update, :destroy]

  def index
    render json: Club.all
  end

  def show
    render json: @club
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { message: e.message }, status: :not_found
  end

  private    
  def set_club
    @club = Club.find(params[:id])
  end

  def club_params
    params.permit(:name, :email, :city, :country,  :address, :image, gallery: [])
  end

end