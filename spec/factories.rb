FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:password) { |n| "password" }
    sequence(:password_confirmation) { |n| "password" }
  end

  factory :team do
    sequence(:name) { |n| "Team#{n}" }
  end

  factory :league do
    sequence(:name) { |n| "League#{n}" }
  end

  factory :season do
  end

  factory :chat do
  end

  factory :message do
  end

  factory :match do
    datetime Time.now
  end

  factory :result do
  end

  factory :location do
    sequence(:name) { |n| "location#{n}" }
    sequence(:nickname) { |n| "nickname#{n}" }
    sequence(:address) { |n| "83#{n} Market St, San Francisco, CA 94103" }
    lat 37.779814
    lng 122.3940954
  end
end