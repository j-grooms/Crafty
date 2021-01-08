from flask import Blueprint, request
from app.models import db, Product, Tag
from app.forms import ProductForm, LoginForm

products = Blueprint('products', __name__)


# CREATE
@products.route('/', methods=["POST"])
def create_product():
    form = ProductForm()
    json = request.get_json(force=True)
    form['csrf_token'].data = request.cookies['csrf_token']
    form['sold_by'].data = json.get('sold_by')
    form['name'].data = json.get('name')
    form['price'].data = json.get('price')
    form['category'].data = json.get('category')
    if form.validate_on_submit():
        tags = json.get('tags')
        product = Product(sold_by=json.get('sold_by'),
                          name=json.get('name'),
                          price=json.get('price'),
                          category=json.get('category'),
                          description=json.get('description'),
                          dimensions=json.get('dimensions'),
                          weight=json.get('weight'),
                          quantity=json.get('quantity'),
                          image=json.get('image'))
        db.session.add(product)
        db.session.commit()
        newProduct = Product.query.filter(Product.name == json.get(
            'name')).order_by(Product.id.desc()).first()
        for tag in tags:
            tag = Tag(product_id=newProduct.id, tag=tag)
            db.session.add(tag)
            db.session.commit()
        return {'product': product.to_dict()}
    return {"error": "Product Rejected"}


# READ
@products.route('/<id>')
def get_product_by_id(id):
    product_id = id
    product = Product.query.get(product_id)
    return {"products": product.to_dict()}


@products.route('/all')
def get_all_products():
    products = db.session.query(Product).all()
    return {"products": [product.to_dict() for product in products]}


@products.route('/by_tag/<tag>')
def get_products_by_tag(tag):
    tags = Tag.query.filter(Tag.tag == tag).all()
    return {"products": [tag.to_product_dict() for tag in tags]}


@products.route('/by_user/<user_id>')
def get_products_by_user(user_id):
    id = user_id
    products = Product.query.filter(Product.sold_by == id).all()
    return {"products": [product.to_dict() for product in products]}


# UPDATE
@products.route('/edit/<id>', methods=["PUT"])
def update_product(id):
    form = ProductForm()
    json = request.get_json(force=True)
    form['csrf_token'].data = request.cookies['csrf_token']
    form['sold_by'].data = json.get('sold_by')
    form['name'].data = json.get('name')
    form['price'].data = json.get('price')
    form['category'].data = json.get('category')
    if form.validate_on_submit():
        tags = json.get('tags')
        old_tags = Tag.query.filter(Tag.product_id == json.get("id")).all()
        product = Product.query.get(json.get("id"))
        product.name = json.get('name')
        product.price = json.get('price')
        product.category = json.get('category')
        product.description = json.get('description')
        product.dimensions = json.get('dimensions')
        product.weight = json.get('weight')
        product.quantity = json.get('quantity')
        product.image = json.get('image')
        db.session.commit()
        for tag in old_tags:
            db.session.delete(tag)
            db.session.commit()
        for tag in tags:
            tag = Tag(product_id=product.id, tag=tag)
            db.session.add(tag)
            db.session.commit()
        return {'product': product.to_dict()}
    return {"error": "update rejected"}


# DESTROY
@products.route('/delete/<id>', methods=["POST"])
def delete_product(id):
    form = LoginForm()
    json = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['username'].data = json.get('username')
    form['password'].data = json.get('password')
    product = Product.query.get(id)
    if form.validate_on_submit():
        db.session.delete(product)
        db.session.commit()
        return {"product": "product deleted"}
    return {"error": "deletion rejected"}
