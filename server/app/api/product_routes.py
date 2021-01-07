from flask import Blueprint, request
from app.models import db, Product, Tag
from app.forms import ProductForm

products = Blueprint('products', __name__)


# @products.route('/')
# def test():
#     return "Test"

# CREATE
@products.route('/', methods=["POST"])
def create_product():
    # also create tags
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
    # also update tags
    pass


# DESTROY
@products.route('/delete/<id>', methods=["POST"])
def delete_product():
    pass
