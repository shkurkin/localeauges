class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_and_belongs_to_many :leagues
  has_and_belongs_to_many :matches
  has_many :results
  validates_uniqueness_of :name

  def self.generate_name
    name = Faker::App.name + Faker::Number.number(5);
    while(Team.find_by_name(name)) do
      name = Faker::App.name + Faker::Number.number(5);
    end
    name
  end
end
