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
    selected_filter = params[:filterDate]
    date = Date.today
    case selected_filter
    when "month"
      start_date = date - 1.month
    when "3month"
      start_date = date - 3.month
    when "year"
      start_date = date - 1.year
    when "week"
      start_date = date - 1.week
    else
      "nothing"
    end
    end_date = date

    report = @club.sport_fields.map do |sport_field|
      bookings = sport_field.bookings.where(:date => start_date..end_date)
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
