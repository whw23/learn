import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def main():
    collection = AsyncIOMotorClient("mongodb://mongo:mongo@localhost:27017")["mydatabase"]["users"]

    data = [
        {"username": "aaa", "password": "admin", "email": "admin@admin.com", "enabled": True, "admin": True},
        {"username": "bbb", "password": "123456", "email": "john@outlook.com", "enabled": True, "admin": False},
        {"username": "ccc", "password": "123456", "email": "alice@163.com", "enabled": True, "admin": False},
        {"username": "ddd", "password": "123456", "email": "bob@qq.com", "enabled": True, "admin": False},
    ]
    await collection.insert_many(data)

asyncio.run(main())