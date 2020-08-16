JSONAPI.configure do |config|
  config.json_key_format = :camelized_key
  config.resource_cache = Rails.cache

  config.default_paginator = :paged

  config.default_page_size = 10
  config.maximum_page_size = 100
end
