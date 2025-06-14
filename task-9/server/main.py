from fastapi import FastAPI, Request
import requests
from fastapi.middleware.cors import CORSMiddleware
from textblob import TextBlob


app = FastAPI()


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openings = [
    "Welcome to our store! How can I assist you today?",
    "Hi there! Looking for something special?",
    "Hello! I'm your shopping assistant. Need help finding a product?",
    "Good to see you! Let me know if you have any questions.",
    "Hey! I'm here to help you with your shopping."
]

closings = [
    "Thank you for visiting our store. Have a great day!",
    "Hope you found what you were looking for. Come back soon!",
    "Thanks for shopping with us! Feel free to return anytime.",
    "We're always here if you need more help. Take care!",
    "It was a pleasure assisting you. Goodbye!"
]

system_prompt = (
    "You are a friendly assistant for an electronics store.\n\n"
    "If the user message is '__FORCE_GREETING__', you must respond with exactly one of the following greetings. "
    "Do not explain. Do not repeat '__FORCE_GREETING__'. Do not say anything else. "
    "Choose randomly from the greetings list. Do not always use the first one.\n\n"
    "GREETINGS:\n" +
    "\n".join(f"- {o}" for o in openings) + "\n\n" +
    "In all other cases, respond naturally. If you feel the customer's issue is resolved, you may end the conversation "
    "with exactly one of the closing messages below.\n\n"
    "CLOSINGS:\n" +
    "\n".join(f"- {c}" for c in closings)
)

electronics_keywords = [
    "phone", "laptop", "tablet", "tv", "headphones", "charger", "cable",
    "earbuds", "screen", "warranty", "return", "order", "buy", "delivery",
    "price", "cost", "available", "availability", "store", "shop",
    "electronics", "accessories", "smartphone", "computer", "thank you"]

def is_related_to_store(message: str) -> bool:
    msg = message.lower()
    return any(keyword in msg for keyword in electronics_keywords)

def is_negative_response(text: str) -> bool:
    blob = TextBlob(text)
    return blob.sentiment.polarity < -0.1

@app.post("/chat")
async def chat_with_llama(request: Request):
    data = await request.json()
    message = data.get("message", "")
    
    if message and not is_related_to_store(message):
        return {
            "response": "I'm sorry, but I can only help with questions related to electronics and our store."
        }
        
    response = requests.post(
        "http://host.docker.internal:11434/api/chat",
        json={
            "model": "llama3.2",
            "messages": [
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": message
                }
            ],
            "stream": False
        }
    )
    
    reply = response.json().get("message", {}).get("content", "").strip()
    
    if is_negative_response(reply):
        return {"response": "Sorry, something went wrong with the assistant’s response."}
    
    return {"response": reply}
