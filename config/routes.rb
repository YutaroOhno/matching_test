Rails.application.routes.draw do
  root  'users#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users do
    member do
     get :following, :followers
    end
  end
  resources :relationships, only: [:create, :destroy]
  resources :matching, only: [:index]
  get '/user/like', to: 'matching#like', as: :like
  get '/user/liked', to: 'matching#liked', as: :liked
  resources :messages, only: [:show, :create]
end
