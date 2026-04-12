"""Users router – admin client management."""

import uuid
import hashlib
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from ..database import get_db
from ..models import User

router = APIRouter()


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    company: Optional[str] = None
    phone: Optional[str] = None
    role: str = "client"


@router.get("/")
async def list_clients(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User)
        .options(selectinload(User.rfqs))
        .where(User.role == "client")
        .order_by(User.created_at.desc())
    )
    return {"users": result.scalars().all()}


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(data: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check email uniqueness
    existing = await db.execute(select(User).where(User.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        id=str(uuid.uuid4()),
        name=data.name,
        email=data.email,
        password=hashlib.sha256(data.password.encode()).hexdigest(),  # In prod: use bcrypt
        company=data.company,
        phone=data.phone,
        role=data.role,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return {"user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}}


@router.get("/{user_id}")
async def get_user(user_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).options(selectinload(User.rfqs)).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user": user}
