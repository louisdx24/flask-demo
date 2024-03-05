from flask import Flask
from datetime import datetime

books = {1: "Python book", 2.0: "Java book", 3: "Flask book"}
app = Flask(__name__)


@app.route("/sum/x=<a>&y=<b>")
def get_sum(a, b):
    try:
        return f"{a}+{b} 總和為:{eval(a)+eval(b)}"
    except Exception as e:
        print(e)
        return "數值不正確"


@app.route("/books/<int:id>")
def get_book(id):
    try:
        return books[id]
    except Exception as e:
        print(e)
        return "書籍編號錯誤!"


@app.route("/books")
def get_books():
    return books


# 一個函式可綁多個 router
@app.route("/hello")
@app.route("/")
def index():
    print(datetime.now())
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"<h1>Hello Flask!{now}</h1>"


# ctr+c 斷開 server
app.run(debug=True)
