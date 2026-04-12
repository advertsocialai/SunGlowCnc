# Sunglow CNC – Python FastAPI Backend

Standalone Python/FastAPI microservice that mirrors all Next.js API routes.

## Tech Stack

- **Framework**: FastAPI (Python 3.12+)
- **Database**: PostgreSQL via SQLAlchemy (async) + asyncpg
- **ORM**: SQLAlchemy 2.0 with async support
- **Migrations**: Alembic
- **Auth**: JWT tokens (python-jose + passlib/bcrypt)

## Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql://user:password@localhost:5432/sunglowcnc"
export NEXTJS_URL="http://localhost:3000"

# Run development server
uvicorn backend.main:app --reload --port 8000
```

## API Docs

With the server running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/rfq/ | List all RFQs (admin) or user's RFQs |
| POST | /api/rfq/ | Create new RFQ |
| GET | /api/rfq/{id} | Get RFQ details |
| PATCH | /api/rfq/{id} | Update RFQ status |
| POST | /api/quotes/ | Submit a quote for an RFQ |
| POST | /api/orders/approve/{rfq_id} | Approve quote → create order |
| PATCH | /api/orders/{id} | Update order status |
| GET | /api/orders/ | List all orders |
| POST | /api/contacts/ | Submit contact inquiry |
| GET | /api/contacts/ | List contact inquiries (admin) |
| GET | /api/users/ | List clients (admin) |
| GET | /api/analytics/ | Dashboard analytics data |
| GET | /health | Health check |
