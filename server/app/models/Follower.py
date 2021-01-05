from .db import db


Follower = db.Table('followers',
                    db.Column('user_id',
                              db.Integer,
                              db.ForeignKey('users.id'),
                              nullable=False),
                    db.Column('follower',
                              db.Integer,
                              db.ForeignKey('users.id'),
                              nullable=False))
