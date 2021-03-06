from flask import Blueprint, request
from app.models import db, Product, Tag
from app.forms import LoginForm, SignUpForm
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required

auth = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["no user session found"]}, 200


@auth.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    json = request.get_json()
    print(json.get("username"))
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    form['username'].data = json.get("username")
    form['password'].data = json.get("password")
    if form.validate_on_submit():
        print("validated")
        # Add the user to the session, we are logged in!
        user = (
            User.query.filter(User.username == form.data['username']).first())
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    # return "Error"


@auth.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    body = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['username'].data = body.get('username')
    form['password'].data = body.get('password')
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profile_pic=body.get('profile_pic'),
            banner=body.get('banner'),
            bio=body.get('bio'),
            money=body.get('money'),
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return {"user": user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
