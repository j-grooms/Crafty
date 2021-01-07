from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired


class ProductForm(FlaskForm):
    sold_by = IntegerField('sold_by', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
