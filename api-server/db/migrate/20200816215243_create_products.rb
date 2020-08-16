class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, unique: true
      t.string :sku, unique: true
      t.text :description
      t.float :price
      t.references :category

      t.timestamps
    end
  end
end
