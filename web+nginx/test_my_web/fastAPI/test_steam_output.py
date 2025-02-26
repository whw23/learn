from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time
import uvicorn
import asyncio

app = FastAPI()

# 异步生成器函数
async def generate_data():
    for i in range(1, 11):
        await asyncio.sleep(1)  # 模拟耗时操作（异步等待）
        yield f"Chunk {i}\n"

@app.get("/stream")
async def stream_data():
    return StreamingResponse(
        generate_data(), 
        media_type="text/plain"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)