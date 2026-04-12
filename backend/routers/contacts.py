"""Contacts router – mirrors Next.js /api/contact endpoint."""

import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..database import get_db
from ..models import Contact

router = APIRouter()


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str


class ContactUpdate(BaseModel):
    status: str


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_contact(data: ContactCreate, db: AsyncSession = Depends(get_db)):
    contact = Contact(
        id=str(uuid.uuid4()),
        name=data.name,
        email=data.email,
        phone=data.phone,
        company=data.company,
        message=data.message,
        status="new",
    )
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    return {"contact": contact, "message": "Contact inquiry submitted successfully"}


@router.get("/")
async def list_contacts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Contact).order_by(Contact.created_at.desc()))
    return {"contacts": result.scalars().all()}


@router.patch("/{contact_id}")
async def update_contact(contact_id: str, data: ContactUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    contact.status = data.status
    await db.commit()
    await db.refresh(contact)
    return {"contact": contact}
