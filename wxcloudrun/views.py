from datetime import datetime
from flask import render_template, request
from run import app

@app.route('/')
def index():
    user_wx_openid=request.headers.get('x-wx-openid')
    return render_template('index.html',openid=user_wx_openid)


