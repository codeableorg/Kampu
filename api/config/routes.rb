Rails.application.routes.draw do
  scope :api do
    post '/login', to: 'sessions#login'
    post '/register', to: 'sessions#register'
    delete '/logout', to: 'sessions#destroy'
    get '/schedule/:id', to: 'sport_fields#schedule'
    get '/report/:id', to: 'clubs#report'
    get '/me', to: 'users#me'
    get '/userinfo', to: 'users#user_with_bookings'
    post '/booking', to: 'bookings#create'
    resources :clubs do
      resource :favorites, only: [:create, :destroy]
    end
    resources :sport_fields do
      get 'schedule', on: :member
      get 'times', on: :member
    end
  end
end
