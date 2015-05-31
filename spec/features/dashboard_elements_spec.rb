require 'rails_helper'

RSpec.describe "Dashboard elements", :js => true do
  before(:each) do
    @user_attr = FactoryGirl.attributes_for(:user)
    User.create!(@user_attr)
    visit root_path
    fill_in "user_email", with: @user_attr[:email]
    fill_in "user_password", with: @user_attr[:password]
    click_on "Log in"
  end

  describe "logged in" do
    it "should have a log out button" do
      expect(page).to have_css("#logOut")
    end

    it "should have a left menu" do
      expect(page).to have_css("#sidebar")
    end

    it "should have a leauge select" do
      expect(page).to have_css("#leagueSelect")
    end

    it "should show user email" do
      expect(page).to have_content(@user_attr[:email])
    end
  end
end