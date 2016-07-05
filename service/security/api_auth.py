from functools import wraps
from flask import request, send_from_directory
import sqlite3
import hashlib

'''
Dirty auth implementation
'''

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'auth-token' in request.cookies:
            token = request.cookies.get("auth-token")
        username = None
        if 'username' in request.cookies:
            username = request.cookies.get("username")
        if token is None or username is None or not (AuthStore().get_token(username) == token):
            return send_from_directory('.', 'login.html')
        return f(*args, **kwargs)
    return decorated


class AuthStore:

    def __init__(self):
        self.db_file = 'app.db'

    def valid_user(self, username, password):
        conn = sqlite3.connect(self.db_file)
        cur = conn.cursor()
        cur.execute("select 1 from user_login where username = ? and password = ?", (username, password))
        is_valid = cur.fetchone() is not None
        conn.close()
        return is_valid

    def init(self):
        conn = sqlite3.connect(self.db_file)
        cur = conn.cursor()
        sql = "create table if not exists user_login " \
              "( " \
              "     username text primary key, " \
              "     password text not null, " \
              "     user_role text not null, " \
              "     last_login text, " \
              "     is_active int, " \
              "     created_ts text" \
              ")"
        cur.execute(sql)

        if not self.valid_user('admin', 'admin01'):
            sql = "insert into user_login(username, password, user_role, is_active) values(?,?,?,?)"
            cur.execute(sql, ('admin', 'admin01', 'admin', 1))

        conn.commit()
        conn.close()

    def get_token(self, username):
        conn = sqlite3.connect(self.db_file)
        cur = conn.cursor()
        sql = "select password from user_login where username = ?"
        cur.execute(sql, (username,))
        row = cur.fetchone()
        if row is not None:
            return str(hashlib.sha224("%s-%s-HASH" % (username, row[0])).hexdigest())
        return None

