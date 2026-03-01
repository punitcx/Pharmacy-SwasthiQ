from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class InventoryOverview(BaseModel):
    total_items: int
    total_active_stock: int
    total_low_stock: int
    total_inventory_value: float

class MedicineBase(BaseModel):
    med_name: str
    gen_name: str
    category: str
    batch_no: str
    expiry_date: date
    quantity: int
    cost_price: float
    mrp: float
    supplier: str
    status: str


class MedicineCreate(MedicineBase):
    pass

class MedicineUpdate(BaseModel):
    med_name: Optional[str] = None
    gen_name: Optional[str] = None
    category: Optional[str] = None
    batch_no: Optional[str] = None
    expiry_date: Optional[date] = None
    quantity: Optional[int] = None
    cost_price: Optional[float] = None
    mrp: Optional[float] = None
    supplier: Optional[str] = None
    status: Optional[str] = None

class MedicineResponse(MedicineBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        orm_mode = True

class SaleBase(BaseModel):
    cust_name: str
    quantity_sold: int
    selling_price: float
    payment_type: str

class SaleCreate(SaleBase):
    pass

class SaleResponse(SaleBase):
    id: int
    sale_id: str
    status: str
    payment_type: str
    sold_at: datetime
