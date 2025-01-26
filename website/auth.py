from flask import Blueprint, render_template, request, flash, redirect, url_for,session
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user, UserMixin
import re

auth = Blueprint('auth', __name__)

def loggin(user):
    login_user(user, remember=True)

@auth.route("/", methods=['GET','POST'])
def register():
    if request.method=='POST':           
        # Define a regex pattern to match strings that are 8 characters or longer
        pattern = r'^.{8,10}$'
                
        # Use the `re.search()` function to test if the pattern matches the text
        username=request.form.get("signupusername")
        password=request.form.get('signuppassword')
        confirmpassword=request.form.get('signupconfirmpassword')
        email=request.form.get('signupemail')
        print(username, password,confirmpassword,email)
        if (username=='' or password=='' or confirmpassword=='' or email==''):
            flash('Fill all the details')
            return render_template("signup.html")
        elif username.isalpha and  username!='' and email!='' and email.__contains__('@') and password==confirmpassword:
            match = re.search(pattern, password)
            if match:
                new_user = User(username=username, password=generate_password_hash(password, method='sha256'),email=email)                
                db.session.add(new_user)
                db.session.commit()
                if username=='shivam' and password=='Shivam@123':
                    loggin(new_user)
                    return redirect(url_for('views.admin',username=username))
                loggin(new_user)
                return redirect(url_for('views.home',username=username))
            else: 
                flash('Password should be 8 character long')
                return render_template("signup.html")
        else:
            flash('Incorret details filled in.')    
            return render_template("signup.html")
    else:    
        return render_template("signup.html")


@auth.route("/login", methods=['GET','POST'])
def login():
    if request.method=='POST' and 'login' in request.form:
        username=request.form.get('loginusername')
        password=request.form.get('loginpassword')
        print(username,password)
        user = User.query.filter_by(username=username).first()
        if username.isalpha and user:
            if check_password_hash(user.password, password):
                if user.username=='shivam'and password=='Shivam@123':
                    loggin(user)
                    return redirect(url_for('views.admin',username=user.username))
                loggin(user)
                return redirect(url_for('views.home',username=user.username))
            else:
                flash('Incorrect password, retry.')
                return render_template("login.html") 
        else:
            flash('Username does not exist.')
            return render_template("login.html") 
    elif request.method=='GET':
        return render_template("login.html") 
        
        
        

@auth.route("/logout", methods=['GET','POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
