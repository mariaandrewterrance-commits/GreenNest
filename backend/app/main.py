import os
import uuid
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import or_
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Category, ContactMessage, NewsletterSubscriber, Product, CartItem, WishlistItem, Order, OrderItem
from .schemas import (
    CartAdd, CartUpdate, CategoryOut, ContactCreate, NewsletterCreate,
    OrderCreate, OrderOut, ProductOut, WishlistRequest
)
from .seed import seed_database

app = FastAPI(
    title="GreenNest API",
    version="1.0.0",
    description="Backend API for the GreenNest gardening e-commerce website."
)

origins = [x.strip() for x in os.getenv("CORS_ORIGINS", "http://localhost:5500,http://127.0.0.1:5500").split(",") if x.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    seed_database()

def product_out(p: Product):
    return {
        "id": p.id, "sku": p.sku, "name": p.name, "category_id": p.category_id,
        "price": p.price, "old_price": p.old_price, "rating": p.rating,
        "reviews": p.reviews, "image": p.image, "badge": p.badge,
        "description": p.description, "stock": p.stock, "is_active": p.is_active,
        "category_name": p.category.name if p.category else None
    }

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "GreenNest API"}

@app.get("/api/categories", response_model=list[CategoryOut])
def categories(db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.name).all()

@app.get("/api/products", response_model=list[ProductOut])
def products(
    search: str = Query("", max_length=100),
    category: str = Query("", max_length=100),
    sort: str = Query("default"),
    min_price: float = 0,
    max_price: float = 100000,
    db: Session = Depends(get_db),
):
    q = db.query(Product).filter(Product.is_active == True, Product.price >= min_price, Product.price <= max_price)
    if search:
        term = f"%{search.lower()}%"
        q = q.filter(or_(Product.name.ilike(term), Product.description.ilike(term), Product.sku.ilike(term)))
    if category:
        q = q.join(Category).filter(Category.name == category)
    if sort == "price-asc":
        q = q.order_by(Product.price.asc())
    elif sort == "price-desc":
        q = q.order_by(Product.price.desc())
    elif sort == "rating":
        q = q.order_by(Product.rating.desc(), Product.reviews.desc())
    elif sort == "name":
        q = q.order_by(Product.name.asc())
    else:
        q = q.order_by(Product.id.asc())
    return [product_out(p) for p in q.all()]

@app.get("/api/products/{product_id}", response_model=ProductOut)
def product(product_id: int, db: Session = Depends(get_db)):
    p = db.get(Product, product_id)
    if not p or not p.is_active:
        raise HTTPException(404, "Product not found")
    return product_out(p)

@app.get("/api/cart")
def get_cart(session_id: str, db: Session = Depends(get_db)):
    rows = db.query(CartItem).filter(CartItem.session_id == session_id).all()
    items, subtotal = [], 0
    for row in rows:
        line = row.product.price * row.quantity
        subtotal += line
        items.append({
            "id": row.id, "product_id": row.product_id, "quantity": row.quantity,
            "product": product_out(row.product), "line_total": round(line, 2)
        })
    shipping = 0 if subtotal >= 499 or subtotal == 0 else 49
    return {"items": items, "subtotal": round(subtotal,2), "shipping": shipping, "total": round(subtotal+shipping,2)}

@app.post("/api/cart")
def add_cart(payload: CartAdd, db: Session = Depends(get_db)):
    p = db.get(Product, payload.product_id)
    if not p or not p.is_active:
        raise HTTPException(404, "Product not found")
    row = db.query(CartItem).filter_by(session_id=payload.session_id, product_id=payload.product_id).first()
    new_qty = payload.quantity + (row.quantity if row else 0)
    if new_qty > p.stock:
        raise HTTPException(400, f"Only {p.stock} units are available")
    if row:
        row.quantity = new_qty
    else:
        db.add(CartItem(session_id=payload.session_id, product_id=p.id, quantity=payload.quantity))
    db.commit()
    return get_cart(payload.session_id, db)

@app.put("/api/cart/{item_id}")
def update_cart(item_id: int, payload: CartUpdate, db: Session = Depends(get_db)):
    row = db.get(CartItem, item_id)
    if not row or row.session_id != payload.session_id:
        raise HTTPException(404, "Cart item not found")
    if payload.quantity > row.product.stock:
        raise HTTPException(400, f"Only {row.product.stock} units are available")
    row.quantity = payload.quantity
    db.commit()
    return get_cart(payload.session_id, db)

@app.delete("/api/cart/{item_id}")
def delete_cart(item_id: int, session_id: str, db: Session = Depends(get_db)):
    row = db.get(CartItem, item_id)
    if not row or row.session_id != session_id:
        raise HTTPException(404, "Cart item not found")
    db.delete(row)
    db.commit()
    return get_cart(session_id, db)

@app.get("/api/wishlist")
def get_wishlist(session_id: str, db: Session = Depends(get_db)):
    rows = db.query(WishlistItem).filter_by(session_id=session_id).all()
    return [product_out(r.product) for r in rows]

@app.post("/api/wishlist/toggle")
def toggle_wishlist(payload: WishlistRequest, db: Session = Depends(get_db)):
    p = db.get(Product, payload.product_id)
    if not p:
        raise HTTPException(404, "Product not found")
    row = db.query(WishlistItem).filter_by(session_id=payload.session_id, product_id=payload.product_id).first()
    if row:
        db.delete(row)
        saved = False
    else:
        db.add(WishlistItem(session_id=payload.session_id, product_id=payload.product_id))
        saved = True
    db.commit()
    return {"saved": saved}

@app.post("/api/orders", response_model=OrderOut)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    rows = db.query(CartItem).filter_by(session_id=payload.session_id).all()
    if not rows:
        raise HTTPException(400, "Cart is empty")
    subtotal = 0
    order_items = []
    for row in rows:
        if row.quantity > row.product.stock:
            raise HTTPException(400, f"Not enough stock for {row.product.name}")
        subtotal += row.product.price * row.quantity
        order_items.append((row.product, row.quantity))
    shipping = 0 if subtotal >= 499 else 49
    discount = round(subtotal * 0.10, 2) if payload.promo_code.upper() == "GREEN10" else 0
    total = max(0, round(subtotal + shipping - discount, 2))
    order = Order(
        order_number="GN-" + uuid.uuid4().hex[:10].upper(),
        session_id=payload.session_id, customer_name=payload.name, email=str(payload.email),
        phone=payload.phone, address=payload.address, city=payload.city, pincode=payload.pincode,
        subtotal=round(subtotal,2), shipping=shipping, discount=discount, total=total
    )
    db.add(order)
    db.flush()
    for p, qty in order_items:
        db.add(OrderItem(order_id=order.id, product_id=p.id, product_name=p.name, price=p.price, quantity=qty))
        p.stock -= qty
    for row in rows:
        db.delete(row)
    db.commit()
    db.refresh(order)
    return order

@app.get("/api/orders/{order_number}", response_model=OrderOut)
def get_order(order_number: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter_by(order_number=order_number).first()
    if not order:
        raise HTTPException(404, "Order not found")
    return order

@app.post("/api/contact")
def contact(payload: ContactCreate, db: Session = Depends(get_db)):
    db.add(ContactMessage(name=payload.name, email=str(payload.email), subject=payload.subject, message=payload.message))
    db.commit()
    return {"message": "Your message has been received."}

@app.post("/api/newsletter")
def newsletter(payload: NewsletterCreate, db: Session = Depends(get_db)):
    email = str(payload.email).lower()
    if db.query(NewsletterSubscriber).filter_by(email=email).first():
        return {"message": "You are already subscribed."}
    db.add(NewsletterSubscriber(email=email))
    db.commit()
    return {"message": "Successfully subscribed to GreenNest."}
