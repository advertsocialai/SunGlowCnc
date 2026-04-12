"""Quotes router – mirrors Next.js /api/rfq/[id]/quote endpoint."""

import uuid
from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..database import get_db
from ..models import Quote, RFQ

router = APIRouter()


class QuoteCreate(BaseModel):
    rfq_id: str
    amount: float
    valid_days: int = 30
    notes: Optional[str] = None


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_quote(data: QuoteCreate, db: AsyncSession = Depends(get_db)):
    # Check RFQ exists
    result = await db.execute(select(RFQ).where(RFQ.id == data.rfq_id))
    rfq = result.scalar_one_or_none()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")

    # Remove existing quote if any
    existing = await db.execute(select(Quote).where(Quote.rfq_id == data.rfq_id))
    old_quote = existing.scalar_one_or_none()
    if old_quote:
        await db.delete(old_quote)

    quote = Quote(
        id=str(uuid.uuid4()),
        rfq_id=data.rfq_id,
        amount=data.amount,
        valid_until=datetime.utcnow() + timedelta(days=data.valid_days),
        notes=data.notes,
    )
    rfq.status = "quoted"
    rfq.updated_at = datetime.utcnow()

    db.add(quote)
    await db.commit()
    await db.refresh(quote)
    return {"quote": quote}


@router.get("/{quote_id}")
async def get_quote(quote_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Quote).where(Quote.id == quote_id))
    quote = result.scalar_one_or_none()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"quote": quote}
