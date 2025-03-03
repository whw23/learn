from fastapi import FastAPI, Body, File, UploadFile, Form, HTTPException, status, Query, Path, Header, Cookie, Request, Response, BackgroundTasks
from fastapi.responses import StreamingResponse
import time
import uvicorn
import asyncio
from pydantic import BaseModel, Field
app = FastAPI()


class inputSample(BaseModel):
    name: str = Field(..., example="test")  # 必填字段 无默认值 示例值为 test
    age: int = Field(..., example=20)  # 必填字段 无默认值 示例值为 20
    # 非必填字段 默认值为 None 示例值为 email，不要这么写。如果未传入 email 字段，值会被赋为 None，但 None 不符合 str 类型声明，会触发 Pydantic 的验证错误。
    email: str = Field(None, example="test@email.com")
    # 非必填字段 默认值为 None 示例值为 12345678901，建议这么写。使用联合类型 str | None（或 Optional[str]），明确允许字段值为字符串或 None。默认值 None 是合法的，不会触发验证错误
    phone: str | None = Field(None, example="12345678901")


class outputSample(BaseModel):
    name: str = Field(..., example="示例商品")
    price: float = Field(..., example=99.99)


@app.post("/test", response_model=outputSample, responses={
    status.HTTP_200_OK: {
        "description": "成功响应",
        "content": {
            "application/json": {
                "example": {"name": "自定义示例", "price": 88.88}
            }
        }
    }
}, tags=["Utils"], summary="Test", description="Test 示例接口。")
async def test(input: inputSample):
    output = outputSample(name=input.name, age=input.age)
    return output


@app.post("/ocr", tags=["Utils"], summary="OCR", description="OCR 替代示例，OCR接口无需暴露给用户。")
async def ocr(payload: dict = Body(..., example={"image": "data:application/jpg;base64,JVBERi0xLjQKJcfs..."})):
    return "晨光微熹时，老槐树的影子斜斜地躺在青石板路上，露珠顺着叶片滚落，在积灰的铜铃铛上砸出清脆的颤音。穿深蓝运动衫的姑娘踩着碎步跑过，运动鞋底摩擦地面的沙沙声惊醒了蜷在长椅下的虎斑猫。它伸个懒腰，纵身跃上锈迹斑斑的健身器材，尾尖恰好扫过半空悬停的蜻蜓翅膀。远处传来烤红薯的焦香，混着槐花香，被穿堂风揉成某种令人鼻酸的甜味，像是儿时总在课间操时分飘来的糖葫芦叫卖声。"


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
