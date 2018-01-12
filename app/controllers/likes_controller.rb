class LikesController < ApplicationController
  def create
    like = current_user.likes.create
    redirect_to :root
  end
end
