from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
import models,schemas
from database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.post("/make-sale", response_model=schemas.SaleResponse, status_code=201)
def make_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    db_sale = models.Sale(**sale.dict()) 
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)

    current_year = db.query(extract('year', func.now())).scalar()
    db_sale.sale_id = f"INV-{current_year}-{db_sale.id}"
    db.commit()
    db.refresh(db_sale)

    return db_sale

@router.get("/total-sales")
def get_sales_summary(db: Session = Depends(get_db)):
    today = func.date(func.now())

    total_sales = db.query(
            func.sum(models.Sale.selling_price)
            ).filter(
            func.date(models.Sale.sold_at) == today
            ).scalar() or 0

    return {"total_sales": total_sales}

@router.get("/items-sold")
def get_items_sold(db: Session = Depends(get_db)):
    today = func.date(func.now())
    
    total_items = db.query(
            func.sum(models.Sale.quantity_sold)
            ).filter(
            func.date(models.Sale.sold_at) == today
            ).scalar() or 0

    return {"total_items_sold": total_items}

@router.get("/recent-sales")
def get_recent_sales(db: Session = Depends(get_db)):
    recent_sales = db.query(models.Sale).order_by(
            models.Sale.sold_at.desc()
            ).limit(5).all()

    return {"recent_sales": recent_sales}

@router.get("/low-stock")
def get_low_stock(db: Session = Depends(get_db)):
    low_stock = db.query(func.count(models.Medicine.id)).filter(
            models.Medicine.status == "Low Stock"
            ).scalar() or 0

    return {"low_stock": low_stock}

@router.get("/purchase-orders")
def get_purchase_orders(db: Session = Depends(get_db)):
    purchase_orders = db.query(func.count(models.Sale.id)).filter(
            models.Sale.payment_type == "PO"
            ).scalar() or 0

    return {"purchase_orders": purchase_orders}
