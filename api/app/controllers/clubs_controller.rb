class ClubsController < ApplicationController
  before_action :set_club, only: [:show, :update, :destroy, :report]

  def index
    if params[:favorites].present?
      render json: current_user.clubs
    else
      render json: Club.all
    end
  end

  def show
    render json: @club
  end

  def create
    club = Club.new(club_params)
    if club.save
      render json: club, status: :created
    else
      render json: { errors: club.errors}, status: :unprocessable_entity
    end
  end

  def report
    date = Date.today
    start_date = date.at_beginning_of_month
    end_date = date.at_end_of_month
    report = @club.sport_fields.map do |sport_field|
      bookings = sport_field.bookings.where(:created_at => start_date..end_date)
      sport_field.attributes.merge(bookings: bookings.reduce(0) { |acc,book| acc + book.amount })
    end
    render json: {club: @club, report: report}
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { message: e.message }, status: :not_found
  end

  private    
  def set_club
    @club = Club.find(params[:id])
  end

  def club_params
    params.permit(:name, :address, :schedule, :district, :latitude, :longitude, image: [])
  end

end
