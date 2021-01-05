# Routes

## Products Blueprint

### Create
```py
@products.route('/', methods=["POST"])
def create_product():
    pass
```

### Read
```py
@products.route('/<id>')
def get_product_by_id():
    pass


@products.route('/all')
def get_all_products():
    pass


@products.route('/<tag>')
def get_products_by_tag():
    pass
```

### Update
```py
@products.route('/edit/<id>', methods=["PUT"])
def update_product():
```

### Destroy
```py
@products.route('/delete/<id>')
def delete_product():
    pass
```


## Users Blueprint

### Create
```py
@users.route('/', methods=["POST"])
def create_user():
    pass
```

### Read
```py
@users.route('/<id>')
def get_user_by_id():
    pass


@users.route('/all')
def get_all_users():
    pass


@users.route('/<id>/followers')
def get_followers():
    pass


@users.route('/<id>/follow/<user>')
def follow_user():
    pass


@users.route('/<id>/unfollow/<user>')
def unfollow_user():
    pass


@users.route('/<id>/favorites')
def get_favorite_products():
    pass


@users.route('/<id>/favorites/add/<product>')
def add_favorite_product():
    pass


@users.route('/<id>/favorites/remove/<product>')
def remove_favorite_product():
    pass
```
