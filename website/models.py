import datetime
from email.policy import default
from unicodedata import name
from . import db
from flask_login import UserMixin, current_user
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150))
    password = db.Column(db.String(150))
    email=db.Column(db.String(150))
    order = db.relationship('Order') 
       
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True)
    actors=db.Column(db.JSON, nullable=False)
    image= db.Column(db.BLOB)
    duration=db.Column(db.Time)  #db.Time
    about= db.Column(db.String(150))
    imdb_rating=db.Column(db.Float)
    release_date=db.Column(db.Date())  #db.DateTime
    director_name=db.Column(db.String(60))
    movievenue = db.relationship('Venue', backref='movie_venue',lazy=True)    

class Theatre(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    city=db.Column(db.String, nullable=False)
    theatrevenue = db.relationship('Venue', backref='theatre_venue',lazy=True)    
    
class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movie_id=db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    theatre_id=db.Column(db.Integer, db.ForeignKey('theatre.id'), nullable=False)
    date=db.Column(db.Date(), nullable=False)
    time=db.Column(db.Time(), nullable=False)
    cost=db.Column(db.Integer, default=100)
    ordervenue = db.relationship('Order', backref='order_venue',lazy=True)    
    
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    venue_id=db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seats=db.Column(db.Integer, nullable=False)

    