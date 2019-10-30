Rails.application.routes.draw do
  devise_for :users
  root  'groups#index'
  resources :users, onry: [:index, :edit, :update]
  resources :groups, onry: [:new, :create, :edit, :update ] do
    resources :messages, only: [:index, :create] 

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json'}
    end
  end
end
