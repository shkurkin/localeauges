class UsersController < ApplicationController
  before_action :set_user, only: [:edit]
  def edit
    gon.user = @current_user
    @S3_BUCKET = S3_BUCKET
  end
end
