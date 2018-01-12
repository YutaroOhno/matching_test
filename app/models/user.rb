class User < ApplicationRecord
  scope :matching, -> user_id { joins("INNER JOIN relationships ON relationships.follower_id = users.id
  INNER JOIN relationships AS r ON relationships.following_id = r.follower_id AND r.following_id = relationships.follower_id").where('relationships.following_id = ?', user_id) }

  mount_uploader :avatar, AvatarUploader
  has_many :active_relationships,class_name:  "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "following_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :following
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :messages
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def following?(other_user)
    following.include?(other_user)
  end

  # ユーザーをフォローする
  # def follow(other_user)
  #   active_relationships.create(following_id: other_user.id)
  # end

  # ユーザーをアンフォローする
  # def unfollow(other_user)
  #   active_relationships.find_by(following_id: other_user.id).destroy
  # end

  # 現在のユーザーがフォローしてたらtrueを返す
  # def following?(other_user)
  #   following.include?(other_user)
  # end

  # def matching_users
  #   @users = []
  #   self.following.each do |user|
  #     if user.following?(self)
  #       @users << user
  #     end
  #   end
  # end

  def matchers
    following & followers
  end

end
