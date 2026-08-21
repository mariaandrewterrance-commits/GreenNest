from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field

class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    description: str
    icon: str

class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    sku: str
    name: str
    category_id: int
    price: float
    old_price: float
    rating: float
    reviews: int
    image: str
    badge: str
    description: str
    stock: int
    is_active: bool
    category_name: Optional[str] = None

class CartAdd(BaseModel):
    session_id: str = Field(min_length=1, max_length=100)
    product_id: int
    quantity: int = Field(default=1, ge=1)

class CartUpdate(BaseModel):
    session_id: str = Field(min_length=1, max_length=100)
    quantity: int = Field(ge=1)

class WishlistRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=100)
    product_id: int

class CustomerDetails(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = ""
    address: str = Field(min_length=5)
    city: str = Field(min_length=2)
    pincode: str = Field(min_length=4, max_length=20)

class OrderCreate(CustomerDetails):
    session_id: str = Field(min_length=1, max_length=100)
    promo_code: str = ""

class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=250)
    message: str = Field(min_length=5)

class NewsletterCreate(BaseModel):
    email: EmailStr

class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    product_id: int
    product_name: str
    price: float
    quantity: int

class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    order_number: str
    customer_name: str
    email: str
    phone: str
    address: str
    city: str
    pincode: str
    subtotal: float
    shipping: float
    discount: float
    total: float
    status: str
    created_at: datetime
    items: list[OrderItemOut]


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    