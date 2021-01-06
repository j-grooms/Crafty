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
                money=75.00,
                bio="I sell things"
                )
    demo2 = User(username='Demo User 2',
                 email='demo2@aa.io',
                 password='password',
                 profile_pic='demoProfile.jpg',
                 banner='demoBanner.jpg',
                 money=50.00,
                 bio="I sell things"
                 )
    demo3 = User(username='Demo User 3',
                 email='demo3@aa.io',
                 password='password',
                 profile_pic='demoProfile.jpg',
                 banner='demoBanner.jpg',
                 money=100.00,
                 bio="I buy things"
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

    tag = Tag(product_id=1, tag="Ring")
    tag2 = Tag(product_id=2, tag="Ball")
    tag3 = Tag(product_id=3, tag="Kitchen")
    tag4 = Tag(product_id=4, tag="Candle")
    tag5 = Tag(product_id=5, tag="Necklace")
    tag6 = Tag(product_id=6, tag="Padding")
    tag7 = Tag(product_id=2, tag="Soccer")
    tag8 = Tag(product_id=1, tag="Opal")

    favorite = Favorite(user_id=3, product_id=1)
    favorite2 = Favorite(user_id=3, product_id=5)
    favorite3 = Favorite(user_id=1, product_id=6)
    favorite4 = Favorite(user_id=2, product_id=2)

    purchase = Purchase(user_id=3, product_id=2)
    purchase2 = Purchase(user_id=2, product_id=2)
    purchase3 = Purchase(user_id=1, product_id=6)

    rating = Rating(user_id=3, product_id=2, rating=5.0,
                    comment="Great for sports!")
    rating2 = Rating(user_id=2, product_id=2, rating=3.5,
                     comment="Not as durable as I'd hoped!")
    rating3 = Rating(user_id=1, product_id=6, rating=5.0,
                     comment="Keeps my kids safe. 5 stars")

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)

    demo.followers.append(demo3)
    demo2.followers.append(demo3)
    demo3.followers.append(demo2)

    db.session.add(product)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)

    db.session.commit()

    db.session.add(tag)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)

    db.session.add(favorite)
    db.session.add(favorite2)
    db.session.add(favorite3)
    db.session.add(favorite4)

    db.session.add(purchase)
    db.session.add(purchase2)
    db.session.add(purchase3)

    db.session.add(rating)
    db.session.add(rating2)
    db.session.add(rating3)

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
