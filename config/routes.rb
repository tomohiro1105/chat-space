Rails.application.routes.draw do
  devise_for :users
  root  'groups#index'
  resources :users, onry: [:index, :edit, :update]
  resources :groups, onry: [:new, :create, :edit, :update ] do
    resources :messages, only: [:index] 
  end
        

end
