require 'rails_helper'

RSpec.describe 'Dashboard Authentication', :js => true do
  before(:each) do
    visit root_path
  end

  describe "not authenticated" do
    it 'should not let user view dashboard' do
      expect(page).to have_content("You need to sign in or sign up before continuing.")
    end
  end

  describe "authenticated" do

    context "with valid data" do
      let!(:user) { FactoryGirl.build(:user) }

      it "has a create account form" do
        click_link('Create an account')
        expect(page).to have_css("#new_user")
      end

      it 'sends user to dashboard' do
        click_link('Create an account')
        fill_in "user_email", with: user.email
        fill_in "user_password", with: user.password
        fill_in "user_password_confirmation", with: user.password_confirmation
        click_on "Sign up"
        expect(page).to have_button("logOut")
      end
    end

  end

end