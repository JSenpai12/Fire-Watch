from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import MAP_KEY
from routes.fires import router 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

app.include_router(router)

@app.get("/")
def health_check():
    return {"status": "ok"}
