from .db import db


class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    rating = db.Column(db.Numeric)
    comment = db.Column(db.String(250))
    user = db.relationship('User', back_populates='ratings')
    product = db.relationship('Product', back_populates='ratings')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "rating": float(self.rating),
            "comment": self.comment
        }

    def to_product_dict(self):
        return {
            "product_id": self.product_id,
            "userId": self.user.id,
            "username": self.user.username,
            "rating": float(self.rating),
            "comment": self.comment,
        }
