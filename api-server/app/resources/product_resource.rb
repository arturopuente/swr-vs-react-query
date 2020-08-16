class ProductResource < JSONAPI::Resource
  attributes :name, :sku, :description, :price

  belongs_to :category
end
