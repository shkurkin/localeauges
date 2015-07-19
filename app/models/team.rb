class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_and_belongs_to_many :leagues
  has_and_belongs_to_many :matches
  has_many :results
  validates_uniqueness_of :name

  def self.generate_name
    names = ["Team Awesome", "Beagles", "The Canadians", "xxDestoryerxx",
      "Emancipators", "Foobars", "Germz", "The Haters", "Ions", "Ja Feel",
      "North Korea", "The Losers", "Meercats", "No Shows", "The OhEmGeez",
      "Porto Potties", "Qi", "Randy", "Stoopids", "Team", "Usefuls",
      "Vandals", "Whut", "XXX", "YoYos", "Zoombinis"]
    name = names.sample + rand(1000...9999).to_s;
    while(Team.find_by_name(name)) do
      name = names.sample + rand(1000...9999).to_s;
    end
    name
  end
end
