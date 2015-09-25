class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if(@post.save)
      render status: 200
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:content, :user_id)
  end
end
