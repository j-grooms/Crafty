from werkzeug.security import generate_password_hash
from app.models import (
    db, User, Product, Favorite, Follower, Purchase, Rating, Tag)

# Adds a demo user, you can add other users here if you want


def seed_all():

    demo = User(username='Demo User',
                email='demo@aa.io',
                password='password',
                profile_pic='demoProfile.jpg',
                banner='demoBanner.jpg',
                )
    demo2 = User(username='Demo User 2',
                 email='demo2@aa.io',
                 password='password',
                 profile_pic='demoProfile.jpg',
                 banner='demoBanner.jpg',
                 )
    demo3 = User(username='Demo User 3',
                 email='demo3@aa.io',
                 password='password',
                 profile_pic='demoProfile.jpg',
                 banner='demoBanner.jpg',
                 )

    product = Product(sold_by=1,
                      name='Product',
                      price=10.99,
                      category='Jewelry',
                      description='Product description',
                      dimensions="3ft x 3ft x 3ft",
                      weight="1 pound",
                      quantity=10,
                      image='demoProduct')
    product2 = Product(sold_by=1,
                       name='Product 2',
                       price=18.99,
                       category='Sports',
                       description='Product description',
                       dimensions="3ft x 3ft x 3ft",
                       weight="4 pounds",
                       quantity=4,
                       image='demoProduct')
    product3 = Product(sold_by=1,
                       name='Product 3',
                       price=13.99,
                       category='Home',
                       description='Product description',
                       dimensions="1ft x 1ft x 1ft",
                       weight="1 pound",
                       quantity=34,
                       image='demoProduct')
    product4 = Product(sold_by=2,
                       name='Product 4',
                       price=3.99,
                       category='Home',
                       description='Product description',
                       dimensions="1ft x 1ft x 1ft",
                       weight="1 pound",
                       quantity=2,
                       image='demoProduct')
    product5 = Product(sold_by=2,
                       name='Product 5',
                       price=53.99,
                       category='Jewelry',
                       description='Product description',
                       dimensions="1ft x 1ft x 1ft",
                       weight="1 pound",
                       quantity=1,
                       image='demoProduct')
    product6 = Product(sold_by=2,
                       name='Product 6',
                       price=19.99,
                       category='Sports',
                       description='Product description',
                       dimensions="1ft x 1ft x 1ft",
                       weight="1 pound",
                       quantity=20,
                       image='demoProduct')

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.add(product)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_all():
    db.session.execute('''TRUNCATE users,
                       products,
                       purchases,
                       followers,
                       favorites,
                       ratings,
                       tags
                       restart identity;
                       ''')
    db.session.commit()
