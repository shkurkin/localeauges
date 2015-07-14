# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Users
User.create!(email: 'user@example.com', name: 'example', password: 'password', password_confirmation: 'password', timezone: Faker::Address.time_zone)
20.times do
  password = Faker::Internet.password
  User.create!(email: Faker::Internet.email, name: Faker::Name.name, password: password, password_confirmation: password, timezone: Faker::Address.time_zone)
end

# Teams
5.times do
  team = Team.create!(name: Faker::Lorem.word)
  rand(1..5).times { team.users << User.order("RANDOM()").first }
end

# Locations
6.times do
  Location.create!(
    name: Faker::Address.street_address,
    nickname: Faker::Address.street_name,
    address: "#{Faker::Address.street_address} #{Faker::Address.city}, #{Faker::Address.state_abbr} #{Faker::Address.zip}",
    lat: Faker::Address.latitude,
    lng: Faker::Address.longitude)
end

# Leagues
3.times do
  league = League.create!(name: Faker::Lorem.word)
  league.create_chat
  league.location = Location.order("RANDOM()").first
  league.save
  rand(3..9).times do
    message = Message.create(content: Faker::Company.bs)
    message.user = User.order("RANDOM()").first
    message.save
    league.chat.messages << message
  end
  rand(1..4).times do
    season = Season.create!(start_date: Faker::Date.forward(30), match_frequency: 'weekly')
    league.seasons << season
    rand(4..9) do
      match = Match.create!(datetime: Faker::Time.forward(30))
      match.create_chat
      season.matches << match
      match.location = Location.order("RANDOM()").first
      match.save
      2.times do
        result = Result.create!(score: Faker::Number.digit, details: Faker::Company.bs)
        match.results << result
        match.team = Team.order("RANDOM()").first
        match.save
      end
    end
  end
end
