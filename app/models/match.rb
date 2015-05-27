class Match < ActiveRecord::Base
  has_and_belongs_to_many :teams
  has_many :results
  has_one :chat, as: :group
  belongs_to :season
  belongs_to :location
end
