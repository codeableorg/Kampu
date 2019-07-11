require 'rails_helper'

describe ClubsController do

  before do
    @user_params = {
      name: 'Club golden',
      address: 'Jr cayumba 440',
      schedule: {
        'monday-friday': {
          start: '8',
          end: '22'
        },
        'saturday': {
          start: '8',
          end: '22'
        },
        'sunday': {
          start: '8',
          end: '22'
        },
      }
    }
  end

  describe 'POST create' do
    it 'returns http status created' do
      post :create, params: @user_params
      expect(response.status).to eq(201)
      expect(response).to have_http_status(:created)
    end

    it 'returns the club created' do
      post :create, params: @user_params
      expected_club = JSON.parse(response.body)
      expect(expected_club).to have_key("id")
      expect(expected_club["name"]).to eq("Club golden")
    end
  end

end
