class Product < ApplicationRecord
  belongs_to :category

  validates :name, uniqueness: true
  validates :sku,  uniqueness: true
end
