from fastapi import FastAPI, Request
import requests

app = FastAPI()

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
