# DB設計
## usersテーブル
|Column|Type|Options|
|--|--|--|
|nickname|string|null:false|
|email|string|null:false|
|password|integer|nullfalse|

### Assodiation
- has_many :groups, through: :users_groups
- has_many :massages

## groupsテーブル
|Column|Type|Options|
|--|--|--|
|group_name|string|null:false|

### Assodiation
- has_many :menbers, through: :users_groups
- has_many :messages

## users_groupsテーブル
|Column|Type|Options|
|--|--|--|
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|

### Assodiation
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|--|--|--|
|body|text| |
|image|string| |
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|

### Assodiation
- belongs_to :user
- belongs_to :group