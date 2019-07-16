Rails.application.routes.draw do
  scope :api do
    post '/login', to: 'sessions#login'
    post '/register', to: 'sessions#register'
    delete '/logout', to: 'sessions#destroy'
    get '/schedule/:id', to: 'sport_fields#schedule'
    resources :clubs
    resources :sport_fields do
      get 'schedule', on: :member
    end
  end
end
