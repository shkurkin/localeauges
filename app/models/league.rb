class League < ActiveRecord::Base
  has_and_belongs_to_many :teams
  has_many :seasons
  has_many :users, through: :teams
  has_one :chat, as: :group
  belongs_to :location

  after_save :add_default_season

  private

  def add_default_season
    season = Season.create(start_date: Date.today, match_frequency: 'whenever', league_default: true)
    self.seasons << season
  end
end
