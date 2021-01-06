from .db import db


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user = db.relationship('User', back_populates='favorites')
    product = db.relationship('Product', back_populates='favorites')

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "product": self.product.to_dict()
        }
