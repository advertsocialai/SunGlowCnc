"""RFQ router – mirrors Next.js /api/rfq endpoints."""

import uuid
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from ..database import get_db
from ..models import RFQ, User

router = APIRouter()


class RFQCreate(BaseModel):
    title: str
    description: Optional[str] = None
    material: str
    tolerance: Optional[str] = None
    quantity: int
    priority: str = "normal"
    notes: Optional[str] = None
    file_url: Optional[str] = None
    file_name: Optional[str] = None
    user_id: str


class RFQUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    notes: Optional[str] = None


@router.get("/")
async def list_rfqs(user_id: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    """List RFQs. Pass user_id to filter by client, omit for admin view."""
    stmt = (
        select(RFQ)
        .options(selectinload(RFQ.user), selectinload(RFQ.quote), selectinload(RFQ.order))
        .order_by(RFQ.created_at.desc())
    )
    if user_id:
        stmt = stmt.where(RFQ.user_id == user_id)
    result = await db.execute(stmt)
    rfqs = result.scalars().all()
    return {"rfqs": rfqs}


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_rfq(data: RFQCreate, db: AsyncSession = Depends(get_db)):
    rfq = RFQ(
        id=str(uuid.uuid4()),
        user_id=data.user_id,
        title=data.title,
        description=data.description,
        material=data.material,
        tolerance=data.tolerance,
        quantity=data.quantity,
        priority=data.priority,
        notes=data.notes,
        file_url=data.file_url,
        file_name=data.file_name,
        status="pending",
    )
    db.add(rfq)
    await db.commit()
    await db.refresh(rfq)
    return {"rfq": rfq}


@router.get("/{rfq_id}")
async def get_rfq(rfq_id: str, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(RFQ)
        .options(selectinload(RFQ.user), selectinload(RFQ.quote), selectinload(RFQ.order))
        .where(RFQ.id == rfq_id)
    )
    result = await db.execute(stmt)
    rfq = result.scalar_one_or_none()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    return {"rfq": rfq}


@router.patch("/{rfq_id}")
async def update_rfq(rfq_id: str, data: RFQUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RFQ).where(RFQ.id == rfq_id))
    rfq = result.scalar_one_or_none()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    if data.status is not None:
        rfq.status = data.status
    if data.priority is not None:
        rfq.priority = data.priority
    if data.notes is not None:
        rfq.notes = data.notes
    rfq.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(rfq)
    return {"rfq": rfq}
