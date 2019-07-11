Rails.application.routes.draw do
  scope '/api' do
    # sessions routes
    post '/login', to: 'sessions#login'
    post '/register', to: 'sessions#register'

    delete '/logout', to: 'sessions#destroy'

  end
end
