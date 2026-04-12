"""
Sunglow CNC – Python FastAPI Backend
Mirrors the Next.js API routes for standalone use or microservice deployment.
Database: PostgreSQL via SQLAlchemy + asyncpg
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from .database import engine, Base
from .routers import rfq, quotes, orders, contacts, users, analytics

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (use Alembic migrations in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="Sunglow CNC API",
    description="FastAPI backend for Sunglow CNC precision machining platform",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("NEXTJS_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rfq.router, prefix="/api/rfq", tags=["RFQ"])
app.include_router(quotes.router, prefix="/api/quotes", tags=["Quotes"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(contacts.router, prefix="/api/contacts", tags=["Contacts"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "sunglow-cnc-api"}
