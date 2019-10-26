class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :title, presence: true, uniqueness: true
end
