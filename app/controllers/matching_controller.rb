class MatchingController < ApplicationController
  def index
    @users = current_user.matchers
  end
end
