# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.destroy_all
Product.destroy_all

20.times do |n|
  Category.create(name: Faker::Commerce.department)
end

1000.times do |n|
  Product.create(
    category_id: Category.pluck(:id).sample,
    name: Faker::Commerce.product_name,
    description: Faker::Restaurant.description,
    sku: Faker::Alphanumeric.alpha(number: 20),
    price: Faker::Commerce.price
  )
end
