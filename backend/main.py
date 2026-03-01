from fastapi import FastAPI
import models
from database import engine
from routers import inventory, dashboard
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title = "Pharmacy EMR API")

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
        )

app.include_router(inventory.router)
app.include_router(dashboard.router)
