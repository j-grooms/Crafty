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


@products.route('/<user>')
def get_products_by_user():
    pass
```

### Update
```py
@products.route('/edit/<id>', methods=["PUT"])
def update_product():
    pass
```

### Destroy
```py
@products.route('/delete/<id>', methods=["POST"])
def delete_product():
    pass
```


## Users Blueprint

### Create
```py
@users.route('/', methods=["POST"])
def create_user():
    pass


@users.route('/<id>/follow/<user>', methods=["POST"])
def follow_user():
    pass


@users.route('/<id>/favorites/add/<product>', methods=["POST"])
def add_favorite_product():
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


@users.route('/<id>/favorites')
def get_favorite_products():
    pass


@users.route('/<id>/history')
def get_purchase_history():
    pass
```

### Update
```py
@users.route('/<id>/edit', methods=["PUT"])
def update_user():
    pass
```

### Destroy
```py
@users.route('/<id>/delete', methods=["POST"])
def delete_user():
    pass


@users.route('/<id>/favorites/remove/<product>', methods=["POST"])
def remove_favorite_product():
    pass


@users.route('/<id>/unfollow/<user>', methods=["POST"])
def unfollow_user():
    pass
```


## Store Blueprint

### Create
```py

```

### Read
```py

```

### Update
```py
@store.route('/cart/add/<id>', methods=["POST"])
def add_to_cart():
    # Also modify cookie
    pass

@store.route('/cart/remove/<id>', methods=["POST"])
def remove_from_cart():
    pass
```

### Destroy
