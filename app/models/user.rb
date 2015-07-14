class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_and_belongs_to_many :teams
  has_many :messages
  has_many :leagues, through: :teams
  has_many :matches, through: :teams

  validates_uniqueness_of :name

  after_create :add_player_team

  def current_league
    return nil unless self.leagues.any?
    league_id = (self.current_league_id) ? self.current_league_id : self.leagues.order("created_at DESC").first
    League.find_by_id(league_id)
  end

  def current_league=(league)
    current_league_id = (league.respond_to? :id) ? league.id : league
    self.current_league_id = current_league_id.to_i
  end

  private

  def add_player_team
    team = Team.create(name: self.name, player_team: true)
    self.teams << team
  end
end
