# Qiita DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
|group_id|integer|null: false, foreigin_key: true|
### Association
- has_many :messages
- has_many :groups, through: users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_title|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :message
- has_many :users, through: users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreigin_key: true|
### Association
- belongs_to :user
- belongs_to :groups

## users_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
