require 'rails_helper'

describe FavoritesController do

  before do
    @club = Club.create(
      name: 'Club golden',
      address: 'Jr cayumba 440',
      schedule: {
        'monday-friday': {
          start: '8',
          end: '22'
        }
      }
    )
    @user = User.create(
      name: 'Lian Nivin',
      email: 'liam@kampu.pe', 
      role: "regular", 
      password: '123456'
    )
    @user.regenerate_token
    cookies.signed[:auth_token] = { value: @user.token, httponly: true }
  end

  describe 'POST create' do
    it 'returns http status created' do
      post :create, params: { club_id: @club.id }
      expect(response.status).to eq(201)
      expect(response).to have_http_status(:created)
    end

    it 'returns the club favorited' do
      post :create, params: { club_id: @club.id }
      expected_club = JSON.parse(response.body)
      expect(expected_club).to have_key("id")
      expect(expected_club["name"]).to eq("Club golden")
      expect(expected_club["favorited"]).to eq(true)
      expect(expected_club["favorited_count"]).to eq(1)
    end
  end

end
