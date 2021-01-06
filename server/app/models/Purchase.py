from .db import db


class Purchase(db.Model):
    __tablename__ = 'purchases'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user = db.relationship('User', back_populates='purchases')
    product = db.relationship('Product', back_populates='purchases')

    def to_dict(self):
        return {
            # 'id': self.id,
            'user_id': self.user_id,
            'product': self.product.to_dict(),
        }
