class Chat < ActiveRecord::Base
  has_many :messages
  belongs_to :group, polymorphic: true
end
