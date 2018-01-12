class Relationship < ApplicationRecord
  # scope :reciprocal, -> { joins("INNER JOIN relationships AS r ON relationships.following_id = r.follower_id AND r.following_id = relationships.follower_id") }

  belongs_to :following, class_name: "User"
  belongs_to :follower, class_name: "User"
  validates_presence_of :following_id, :follower_id

  def matching?
	  	# binding.pry

  	# 	  aite = User.find(params[:following_id])
	  # if aite.following?(current_user)
	  # 	@test = "マッチング成功"
	  # if self.following.following?(current_user.id)
	# if self.following.following?(current_user)
	#   	binding.pry

	# end

  end
end


# self.following.following?(User.find(2))
