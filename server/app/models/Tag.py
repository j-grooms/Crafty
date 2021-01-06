from .db import db


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    tag = db.Column(db.String(30))
    product = db.relationship('Product', back_populates='tags')

    def to_dict(self):
        return {
            # "id": self.id,
            # "product_id": self.product_id,
            "tag": self.tag
        }
