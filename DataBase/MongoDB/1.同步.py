from pymongo import MongoClient

# 连接集合
user_collection = MongoClient("mongodb://mongo:mongo@localhost:27017")["mydatabase"]["users"]

# 插入多条数据
data = [
    {"username": "admin", "password":"admin","email": "admin@admin.com","enabled": True, "admin": True},
    {"username": "John", "password":"123456","email": "john@outlook.com","enabled": True, "admin": False},
    {"username": "Alice","password":"123456", "email": "alice@163.com","enabled": True, "admin": False},
    {"username": "Bob","password":"123456", "email": "bob@qq.com","enabled": True, "admin": False},
]
user_collection.insert_many(data)