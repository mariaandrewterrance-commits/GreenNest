# GreenNest Backend — FastAPI + SQLite

This backend was created after analysing the uploaded GreenNest frontend. The frontend contains 21 gardening products across 6 categories and currently stores product/cart/wishlist data in `script.js` + browser `localStorage`.

## Stack
- Python
- FastAPI
- SQLAlchemy 2
- SQLite (zero configuration, local database)
- Pydantic
- Uvicorn
- CORS

## Database tables
- categories
- products
- cart_items
- wishlist_items
- orders
- order_items
- contact_messages
- newsletter_subscribers

The database is automatically created as `greennest.db` when the API starts, and the products from the existing frontend are automatically seeded.

## 1. Install Python
Use Python 3.10+.

Check:
```bash
python --version
```

## 2. Open the backend folder
```bash
cd backend
```

## 3. Create a virtual environment
Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

## 4. Install dependencies
```bash
pip install -r requirements.txt
```

## 5. Start FastAPI
```bash
uvicorn app.main:app --reload
```

API:
http://127.0.0.1:8000

Swagger documentation:
http://127.0.0.1:8000/docs

ReDoc:
http://127.0.0.1:8000/redoc

## Main endpoints

### Products
GET `/api/products`
GET `/api/products/{id}`
GET `/api/products?category=Plants`
GET `/api/products?search=tomato`
GET `/api/products?sort=rating`
GET `/api/categories`

### Cart
GET `/api/cart?session_id=...`
POST `/api/cart`
PUT `/api/cart/{item_id}`
DELETE `/api/cart/{item_id}?session_id=...`

### Wishlist
GET `/api/wishlist?session_id=...`
POST `/api/wishlist/toggle`

### Orders
POST `/api/orders`
GET `/api/orders/{order_number}`

### Contact/newsletter
POST `/api/contact`
POST `/api/newsletter`

## Important: connecting the existing frontend

Your original frontend can still run as it does now because it was designed as a static site. The new API is separate and ready to replace the static product/localStorage layer.

Recommended development setup:
1. Run FastAPI on `http://127.0.0.1:8000`.
2. Serve the `frontend` folder from a local HTTP server, for example VS Code Live Server on port 5500.
3. Update `script.js` so product loading, cart, wishlist, contact, newsletter and checkout calls use `/api/...`.

Do NOT use `file://` for API integration because browser CORS/origin behaviour is inconsistent. The original frontend can still be opened directly when you only want to view the static UI.

## Example API request

Add product to backend cart:
```json
POST http://127.0.0.1:8000/api/cart

{
  "session_id": "demo-session-123",
  "product_id": 1,
  "quantity": 2
}
```

Create an order:
```json
POST http://127.0.0.1:8000/api/orders

{
  "session_id": "demo-session-123",
  "name": "Maria",
  "email": "customer@example.com",
  "phone": "9876543210",
  "address": "12 Garden Street",
  "city": "Vellore",
  "pincode": "632001",
  "promo_code": "GREEN10"
}
```

## Reset database
Stop FastAPI, delete:
`backend/greennest.db`

Then start FastAPI again. It will recreate and reseed the database.

## Production note
SQLite is ideal for development and a small demo. For a real multi-user production store, switch `DATABASE_URL` to PostgreSQL and add authentication, payment integration, admin authorization, migrations, rate limiting and secure secrets.
