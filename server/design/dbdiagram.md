Users
-
id PK int
username varchar(100) UNIQUE
email varchar(50)
profile_pic string
banner_pic string
bio text
hashed_password string
money numeric

Ratings
-
id PK int
product int FK >- Products.id
rating int
comment varchar(250)

Products
-
id PK int
sold_by int FK >- Users.id
name varchar(100)
price numeric
category varchar(50)
description text
dimensions string
weight string
quantity int
image string

Favorites
-
id PK int
user_id int FK >- Users.id
product_id int FK >- Products.id

Purchases
-
id int PK
user_id int FK >- Users.id
product_id int FK >- Products.id

Tags
-
id pk int
product_id int fk >- Products.id
tag varchar(30)

Followers
-
id int PK
user_id int FK >- Users.id
follower int FK >- Users.id
