from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from App.routers.pdf_routes import router as pdf_router

app = FastAPI(title="PDForm")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção você coloca a URL exata do front, para o seu estudo o "*" (tudo) resolve.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router)

@app.get("/")
async def root():
        return{
            "message": "",
            "connection": True
        }