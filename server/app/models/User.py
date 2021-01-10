from .db import db
from .Follower import Follower
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(100))
    banner = db.Column(db.String(100))
    money = db.Column(db.Numeric)
    bio = db.Column(db.Text)
    products = db.relationship(
        'Product', back_populates='user',  cascade="all, delete-orphan")
    favorites = db.relationship(
        'Favorite', back_populates='user',  cascade="all, delete-orphan")
    purchases = db.relationship(
        'Purchase', back_populates='user',  cascade="all, delete-orphan")
    ratings = db.relationship(
        'Rating', back_populates='user',  cascade="all, delete-orphan")
    followers = db.relationship('User',
                                secondary="followers",
                                primaryjoin=id == Follower.c.user_id,
                                secondaryjoin=id == Follower.c.follower,
                                )
    following = db.relationship('User',
                                secondary="followers",
                                primaryjoin=id == Follower.c.follower,
                                secondaryjoin=id == Follower.c.user_id,
                                )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_pic": self.profile_pic,
            "banner": self.banner,
            "bio": self.bio,
            "money": float(self.money),
            "favorites": [favorite.to_dict() for favorite in self.favorites],
            "followers": [
                follower.to_product_dict() for follower in self.followers],
            "following": [
                follower.to_product_dict() for follower in self.following]
        }

    def to_product_dict(self):
        return {
            "id": self.id,
            "username": self.username,
        }
