from werkzeug.security import generate_password_hash
from app.models import (
    db, User, Product, Favorite, Follower, Purchase, Rating, Tag)

# Adds a demo user, you can add other users here if you want


def seed_all():

    demo = User(username='Demo User',
                email='demo@aa.io',
                password='password',
                profile_pic='demo_user.jpg',
                banner='demoBanner.jpg',
                money=75.00,
                bio="I sell handmade jewelry! Necklaces, bracelets, earrings"
                )
    demo2 = User(username="Kate's Clothing",
                 email='kate@kate.com',
                 password='HT67OP89',
                 profile_pic='demo_user2.jpg',
                 banner='demo_banner2.jpg',
                 money=50.00,
                 bio="I sell unique and custom printed clothing. I often go to the thrift store for inspiration and fabrics"
                 )
    demo3 = User(username='Demo User 3',
                 email='paul@paul.com',
                 password='GA45FG13',
                 profile_pic='demo_user3.jpg',
                 banner='demo_banner3.jpg',
                 money=100.00,
                 bio="Find the next addition to your home in my store!"
                 )

    product = Product(sold_by=1,
                      name='Garnet Bracelet',
                      price=18.99,
                      category='Jewelry',
                      description="A bracelet made from January's birthstone, Garnet. Elastic band, one size fits all ",
                      dimensions="6 in x 6 in x 5 cm",
                      weight="5 ounces",
                      quantity=12,
                      image='garnet_bracelet.jpg')
    product2 = Product(sold_by=1,
                       name='Stone Necklace',
                       price=29.99,
                       category='Jewelry',
                       description='An eye-catching necklace made from green stones and copper',
                       dimensions="1 ft x 1 ft x 8 cm",
                       weight="1 pounds",
                       quantity=4,
                       image='green_necklace.jpg')
    product3 = Product(sold_by=1,
                       name='Labradorite Earrings',
                       price=14.99,
                       category='Jewelry',
                       description='Labradorite in a beautiful Sterling Silver setting.',
                       dimensions="4 cm x 4 cm x 10 cm",
                       weight="2 ounces",
                       quantity=6,
                       image='labradorite_earrings.jpg')
    product4 = Product(sold_by=1,
                       name='Moonstone Bracelet',
                       price=34.99,
                       category='Jewelry',
                       description='A bracelet made from Moonstone and Quartz',
                       dimensions="6 in x 6 in x 10 cm",
                       weight="8 ounces",
                       quantity=12,
                       image='moonstone_bracelet.jpg')
    product5 = Product(sold_by=1,
                       name='Pearl Earrings',
                       price=53.99,
                       category='Jewelry',
                       description='Beautiful pink pearls! Silver fasteners.',
                       dimensions="1 in x 1 in x 4 in",
                       weight="6 ounces",
                       quantity=2,
                       image='pearl_earrings.jpg')
    product6 = Product(sold_by=1,
                       name='Black Opal Pendant',
                       price=99.99,
                       category='Jewelry',
                       description='Authentic Lightning Ridge Black Opal from Australia. One of a kind!',
                       dimensions="14 cm x 2 cm x 6 cm",
                       weight="3 ounces",
                       quantity=1,
                       image='opal_necklace.jpg')
    product7 = Product(sold_by=2,
                       name='Custom Shirts',
                       price=10.99,
                       category='Clothing',
                       description="Screen Printed shirts with almost any design you can think of!",
                       dimensions="2 ft x 4 ft x 5 cm",
                       weight="5 ounces",
                       quantity=99,
                       image='custom_shirt.jpg')
    product8 = Product(sold_by=2,
                       name='Custom Hoodies',
                       price=29.99,
                       category='Clothing',
                       description='Screen printed hoodies with almost any design you can think of!',
                       dimensions="2 ft x 4 ft x 15 cm",
                       weight="1 pounds",
                       quantity=52,
                       image='custom_hoodie.jpg')
    product9 = Product(sold_by=2,
                       name='Leather Belt',
                       price=24.99,
                       category='Clothing',
                       description='Hand tooled leather belt',
                       dimensions="4 ft x 4 in x 10 cm",
                       weight="1 pounds",
                       quantity=5,
                       image='leather_belt.jpg')
    product10 = Product(sold_by=2,
                        name='Leather Jacket',
                        price=89.99,
                        category='Clothing',
                        description='Hand-made mens leather jacket, size large',
                        dimensions="3 ft x 4 ft x 20 cm",
                        weight="2 pounds",
                        quantity=4,
                        image='leather_jacket.jpg')
    product11 = Product(sold_by=2,
                        name='Slouch Beanie',
                        price=23.99,
                        category='Clothing',
                        description='Oversized wool beanie, perfect for colder months.',
                        dimensions="8 in x 8 in x 12 in",
                        weight="6 ounces",
                        quantity=2,
                        image='slouch_beanie.jpg')
    product12 = Product(sold_by=2,
                        name='Slippers',
                        price=19.99,
                        category='Clothing',
                        description='Unisex non-slip wool slippers, size 10',
                        dimensions="1 ft x 6 in x 6 in",
                        weight="1 pounds",
                        quantity=12,
                        image='slippers.jpg')
    product13 = Product(sold_by=3,
                        name='Hand-Dipped Candles',
                        price=3.99,
                        category='Home',
                        description='Hand-dipped beeswax candles, no scent.',
                        dimensions="1 in x 1 in x 12 in",
                        weight="6 ounces",
                        quantity=12,
                        image='candles.jpg')
    product14 = Product(sold_by=3,
                        name='Decorative Candle',
                        price=29.99,
                        category='Home',
                        description='Beautiful, multi-layered centerpiece candle',
                        dimensions="4 in x 4 in x 1 ft",
                        weight="1 pounds",
                        quantity=4,
                        image='unique_candle.jpg')
    product15 = Product(sold_by=3,
                        name='Potholders',
                        price=8.99,
                        category='Home',
                        description='Set of 2 knitted potholders.',
                        dimensions="8 in x 8 in x 6 cm",
                        weight="6 ounces",
                        quantity=16,
                        image='potholders.jpg')
    product16 = Product(sold_by=3,
                        name='Quilt',
                        price=49.99,
                        category='Home',
                        description='Unique quilt! One of a kind.',
                        dimensions="4 ft x 6 ft x 6 cm",
                        weight="3 pounds",
                        quantity=1,
                        image='quilt.jpg')
    product17 = Product(sold_by=3,
                        name='Fall Throw Pillow',
                        price=23.99,
                        category='Home',
                        description='Fall-themed throw pillows, perfect compliment to any room.',
                        dimensions="2 ft x 2 ft x 1 ft",
                        weight="1 pounds",
                        quantity=5,
                        image='throw_pillow.jpg')
    product18 = Product(sold_by=3,
                        name='Amp Key Holder',
                        price=39.99,
                        category='Home',
                        description='Great for any musician! Note: parts are pulled from salvaged amps and may not match what is pictured',
                        dimensions="1 ft x 6 in x 6 in",
                        weight="2 pounds",
                        quantity=8,
                        image='key_holder.jpg')

    tag = Tag(product_id=1, tag="Garnet")
    tag2 = Tag(product_id=1, tag="Bracelet")
    tag3 = Tag(product_id=2, tag="Necklace")
    tag4 = Tag(product_id=2, tag="Stone")
    tag5 = Tag(product_id=3, tag="Earring")
    tag6 = Tag(product_id=3, tag="Silver")
    tag7 = Tag(product_id=4, tag="Bracelet")
    tag8 = Tag(product_id=4, tag="Moonstone")
    tag9 = Tag(product_id=5, tag="Pearl")
    tag10 = Tag(product_id=5, tag="Earring")
    tag11 = Tag(product_id=6, tag="Opal")
    tag12 = Tag(product_id=6, tag="Necklace")
    tag13 = Tag(product_id=7, tag="Print")
    tag14 = Tag(product_id=7, tag="Shirt")
    tag15 = Tag(product_id=8, tag="Print")
    tag16 = Tag(product_id=8, tag="Hoodie")
    tag17 = Tag(product_id=9, tag="Leather")
    tag18 = Tag(product_id=9, tag="Belt")
    tag19 = Tag(product_id=10, tag="Jacket")
    tag20 = Tag(product_id=10, tag="Leather")
    tag21 = Tag(product_id=11, tag="Wool")
    tag22 = Tag(product_id=11, tag="Beanie")
    tag23 = Tag(product_id=12, tag="Slipper")
    tag24 = Tag(product_id=12, tag="Wool")
    tag25 = Tag(product_id=13, tag="Beeswax")
    tag26 = Tag(product_id=13, tag="Candle")
    tag27 = Tag(product_id=14, tag="Candle")
    tag28 = Tag(product_id=14, tag="Sculpted")
    tag29 = Tag(product_id=15, tag="Wool")
    tag30 = Tag(product_id=15, tag="Knit")
    tag31 = Tag(product_id=16, tag="Blanket")
    tag32 = Tag(product_id=16, tag="Quilt")
    tag33 = Tag(product_id=17, tag="Pillow")
    tag34 = Tag(product_id=17, tag="Decorative")
    tag35 = Tag(product_id=18, tag="Guitar")
    tag36 = Tag(product_id=18, tag="Amp")

    favorite = Favorite(user_id=3, product_id=1)
    favorite2 = Favorite(user_id=3, product_id=5)
    favorite3 = Favorite(user_id=1, product_id=7)
    favorite4 = Favorite(user_id=1, product_id=10)

    purchase = Purchase(user_id=3, product_id=2)
    purchase2 = Purchase(user_id=2, product_id=2)
    purchase3 = Purchase(user_id=1, product_id=7)
    purchase3 = Purchase(user_id=1, product_id=18)

    rating = Rating(user_id=2, product_id=2, rating=5.0,
                    comment="I wear it every day!")
    rating2 = Rating(user_id=3, product_id=2, rating=3.0,
                     comment="Not as durable as I'd hoped!")
    rating3 = Rating(user_id=1, product_id=7, rating=5.0,
                     comment="We ordered 12 of these for our hockey team. Holding up great")
    rating4 = Rating(user_id=3, product_id=5, rating=5.0,
                     comment="My wife loved these for our anniversary")

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
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)

    db.session.commit()

    db.session.add(tag)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)
    db.session.add(tag9)
    db.session.add(tag10)
    db.session.add(tag11)
    db.session.add(tag12)
    db.session.add(tag13)
    db.session.add(tag14)
    db.session.add(tag15)
    db.session.add(tag16)
    db.session.add(tag17)
    db.session.add(tag18)
    db.session.add(tag19)
    db.session.add(tag20)
    db.session.add(tag21)
    db.session.add(tag22)
    db.session.add(tag23)
    db.session.add(tag24)
    db.session.add(tag25)
    db.session.add(tag26)
    db.session.add(tag27)
    db.session.add(tag28)
    db.session.add(tag29)
    db.session.add(tag30)
    db.session.add(tag31)
    db.session.add(tag32)
    db.session.add(tag33)
    db.session.add(tag34)
    db.session.add(tag35)
    db.session.add(tag36)

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
    db.session.add(rating4)

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
