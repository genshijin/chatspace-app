# DB設計
## usersテーブル
|Column|Type|Options|
|--|--|--|
|name|string|null:false, index_users_on_name|
|email|string|null:false, unique: true|
|password|integer|null:false|

### Association
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :massages

## groupsテーブル
|Column|Type|Options|
|--|--|--|
|name|string|null:false|

### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :messages

## users_groupsテーブル
|Column|Type|Options|
|--|--|--|
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|--|--|--|
|body|text| |
|image|string| |
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
