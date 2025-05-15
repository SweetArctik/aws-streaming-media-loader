from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from s3_client import list_bucket_files
import os
from dotenv import load_dotenv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o tu dominio local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/files")
def get_files():
    return list_bucket_files()
