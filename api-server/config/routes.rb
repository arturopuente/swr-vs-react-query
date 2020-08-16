Rails.application.routes.draw do
  jsonapi_resources :products
  jsonapi_resources :categories
end
