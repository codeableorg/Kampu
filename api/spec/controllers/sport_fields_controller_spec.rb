require 'rails_helper'

describe SportFieldsController do

  before do
    @sport_field_params = {
      name: 'Sport green',
      description: 'Some desciptiom',
      price_day: 70,
      price_night: 120,
    }
  end

  describe 'POST create' do
    it 'returns http status created' do
      post :create, params: @sport_field_params
      expect(response.status).to eq(201)
      expect(response).to have_http_status(:created)
    end

    it 'returns the sport_field created' do
      post :create, params: @sport_field_params
      expected_sport_field = JSON.parse(response.body)
      expect(expected_sport_field).to have_key("id")
      expect(expected_sport_field["name"]).to eq("Sport green")
    end
  end

end
