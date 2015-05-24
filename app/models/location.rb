class Location < ActiveRecord::Base
  has_many :leagues
  has_many :matches
end
