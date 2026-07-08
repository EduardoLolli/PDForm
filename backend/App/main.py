from fastapi import FastAPI
from App.routers.pdf_routes import router as pdf_router

app = FastAPI(title="PDForm")

app.include_router(pdf_router)

@app.get("/")
async def root():
        return{
            "message": "",
            "connection": True
        }