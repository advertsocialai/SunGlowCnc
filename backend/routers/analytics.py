"""Analytics router – mirrors Next.js admin analytics page data."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from ..database import get_db
from ..models import RFQ, Order, User, Contact

router = APIRouter()


@router.get("/")
async def get_analytics(db: AsyncSession = Depends(get_db)):
    # Fetch counts
    rfq_result = await db.execute(select(RFQ))
    rfqs = rfq_result.scalars().all()

    order_result = await db.execute(select(Order))
    orders = order_result.scalars().all()

    user_result = await db.execute(select(func.count()).select_from(User).where(User.role == "client"))
    client_count = user_result.scalar()

    contact_result = await db.execute(select(Contact))
    contacts = contact_result.scalars().all()

    # Revenue calculations
    total_revenue = sum(o.amount for o in orders if o.status == "completed")
    pipeline_value = sum(o.amount for o in orders if o.status != "completed")

    # Status breakdown
    status_counts: dict[str, int] = {}
    for r in rfqs:
        status_counts[r.status] = status_counts.get(r.status, 0) + 1

    # Material breakdown
    material_counts: dict[str, int] = {}
    for r in rfqs:
        mat = r.material.split(" ")[0]
        material_counts[mat] = material_counts.get(mat, 0) + 1

    top_materials = sorted(material_counts.items(), key=lambda x: x[1], reverse=True)[:6]

    active_statuses = {"approved", "in_production", "quality_check", "shipped", "completed"}
    conversion_rate = (
        round(len([r for r in rfqs if r.status in active_statuses]) / len(rfqs) * 100)
        if rfqs else 0
    )

    return {
        "rfq_count": len(rfqs),
        "client_count": client_count,
        "order_count": len(orders),
        "total_revenue": total_revenue,
        "pipeline_value": pipeline_value,
        "contact_count": len(contacts),
        "unread_contacts": sum(1 for c in contacts if c.status == "new"),
        "conversion_rate": conversion_rate,
        "status_counts": status_counts,
        "top_materials": [{"material": m, "count": c} for m, c in top_materials],
    }
