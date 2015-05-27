class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_and_belongs_to_many :leagues
  has_and_belongs_to_many :matches
  has_many :results
end