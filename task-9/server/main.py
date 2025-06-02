from fastapi import FastAPI, Request
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_with_llama(request: Request):
    data = await request.json()
    message = data.get("message", "")

    response = requests.post(
        "http://host.docker.internal:11434/api/chat",
        json={
            "model": "llama3.2",
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ],
            "stream": False
        }
    )
    
    reply = response.json().get("message", {}).get("content", "[]")
    return {"response": reply}
