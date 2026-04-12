"""Orders router – mirrors Next.js /api/rfq/[id]/approve endpoint."""

import uuid
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from ..database import get_db
from ..models import Order, RFQ, Quote

router = APIRouter()


class OrderStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None


@router.post("/approve/{rfq_id}", status_code=status.HTTP_201_CREATED)
async def approve_quote(rfq_id: str, db: AsyncSession = Depends(get_db)):
    """Approve a quote and create an order."""
    stmt = (
        select(RFQ)
        .options(selectinload(RFQ.quote))
        .where(RFQ.id == rfq_id)
    )
    result = await db.execute(stmt)
    rfq = result.scalar_one_or_none()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    if not rfq.quote:
        raise HTTPException(status_code=400, detail="No quote to approve")
    if rfq.status not in ("quoted",):
        raise HTTPException(status_code=400, detail="RFQ is not in quoted status")

    # Generate order number
    count_result = await db.execute(select(func.count()).select_from(Order))
    count = count_result.scalar() or 0
    order_number = f"SG-{datetime.utcnow().year}-{str(count + 1).zfill(4)}"

    order = Order(
        id=str(uuid.uuid4()),
        rfq_id=rfq_id,
        order_number=order_number,
        status="in_production",
        amount=rfq.quote.amount,
        currency=rfq.quote.currency,
    )
    rfq.status = "approved"
    rfq.updated_at = datetime.utcnow()

    db.add(order)
    await db.commit()
    await db.refresh(order)
    return {"order": order}


@router.get("/")
async def list_orders(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Order)
        .options(selectinload(Order.rfq).selectinload(RFQ.user))
        .order_by(Order.created_at.desc())
    )
    result = await db.execute(stmt)
    return {"orders": result.scalars().all()}


@router.patch("/{order_id}")
async def update_order(order_id: str, data: OrderStatusUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Order).where(Order.id == order_id))
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = data.status
    if data.notes:
        order.notes = data.notes
    if data.status == "shipped":
        order.shipped_at = datetime.utcnow()
    if data.status == "completed":
        order.completed_at = datetime.utcnow()
    order.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(order)
    return {"order": order}
