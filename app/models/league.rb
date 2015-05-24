class League < ActiveRecord::Base
  has_and_belongs_to_many :teams
  has_many :seasons
  has_one :chat, as: :group
  belongs_to :location
end
