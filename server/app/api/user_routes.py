from flask import Blueprint, request
from app.models import db, User, Favorite, Purchase
from app.forms import LoginForm
from flask_login import logout_user

users = Blueprint('users', __name__)


@users.route('/<id>/favorites/add/<product>', methods=["POST"])
def add_favorite_product():
    pass


# READ
@users.route('/<id>')
def get_user_by_id(id):
    user = User.query.filter(User.id == id).first()
    return {"user": user.to_dict()}


@users.route('/all')
def get_all_users():
    users = db.session.query(User).all()
    return {"users": [user.to_dict() for user in users]}


@users.route('/<id>/favorites')
def get_favorite_products(id):
    products = Favorite.query.filter(Favorite.user_id == id).all()
    return {"favorites": [product.to_dict() for product in products]}


@users.route('/<id>/history')
def get_purchase_history(id):
    products = Purchase.query.filter(Purchase.user_id == id).all()
    return {"purchase_history": [purchase.to_dict() for purchase in products]}


# UPDATE
@users.route('/<id>/edit', methods=["PUT"])
def update_user(id):
    form = LoginForm()
    body = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['username'].data = body.get('username')
    form['password'].data = body.get('password')
    if form.validate_on_submit():
        user = User.query.get(id)
        user.bio = body.get('bio')
        user.profile_pic = body.get('profile_pic')
        user.banner = body.get('banner')
        user.money = body.get('money')
        db.session.add(user)
        db.session.commit()
        return {"user": user.to_dict()}
    return {"error": "Update failed"}


# DESTROY
@users.route('/<id>/delete', methods=["POST"])
def delete_user(id):
    form = LoginForm()
    body = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['username'].data = body.get('username')
    form['password'].data = body.get('password')
    if form.validate_on_submit():
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        logout_user()
        return {"message": "User deleted"}
    return {"error": "Deletion rejected"}

@users.route('/<id>/favorites/remove/<product>', methods=["POST"])
def remove_favorite_product():
    pass
