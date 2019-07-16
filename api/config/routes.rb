Rails.application.routes.draw do
  scope :api do
    post '/login', to: 'sessions#login'
    post '/register', to: 'sessions#register'
    delete '/logout', to: 'sessions#destroy'
    resources :clubs do
      resource :favorites, only: [:create, :destroy]
    end
    resources :sport_fields
  end
end
