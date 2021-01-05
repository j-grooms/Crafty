from .db import db


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    sold_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    dimensions = db.Column(db.String(100))
    weight = db.Column(db.String(40))
    quantity = db.Column(db.Integer)
    image = db.Column(db.String(100))
    user = db.relationship("User", back_populates='products')

    def to_dict(self):
        return {
            "id": self.id,
            "sold_by": self.sold_by,
            "name": self.name,
            "price": self.price,
            "category": self.category,
            "description": self.description,
            "dimensions": self.dimensions,
            "weight": self.weight,
            "quantity": self.quantity,
            "image": self.image
        }
