from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
import models, schemas
from database import get_db
from crud import calculate_status

router = APIRouter(prefix="/inventory", tags=["Inventory"])

@router.get("/overview", response_model=schemas.InventoryOverview)
def inventory_overview(db: Session = Depends(get_db)):
    total_items = db.query(func.count(models.Medicine.id)).scalar() or 0

    total_active_stock = db.query(func.count(models.Medicine.quantity)).filter(
            models.Medicine.status == "Active"
            ).scalar() or 0

    total_low_stock = db.query(func.count(models.Medicine.id)).filter(
        models.Medicine.status == "Low Stock"
        ).scalar() or 0

    total_inventory_value = db.query(func.sum(models.Medicine.cost_price * models.Medicine.quantity)).scalar() or 0

    return {
        "total_items": total_items,
        "total_active_stock": total_active_stock,
        "total_low_stock": total_low_stock,
        "total_inventory_value": total_inventory_value
        }

@router.get("/", response_model=List[schemas.MedicineResponse])
def list_medicines(
        search: str = None,
        status: str = None,
        db: Session = Depends(get_db)
        ):
    query = db.query(models.Medicine)

    if search:
        query = query.filter(models.Medicine.med_name.contains(search))

    if status:
        query = query.filter(models.Medicine.status == status)

    return query.all()

@router.post("/", response_model=schemas.MedicineResponse, status_code=201)
def add_medicine(
        medicine: schemas.MedicineCreate,
        db: Session = Depends(get_db)
        ):

    db_medicine = models.Medicine(**medicine.dict())
    db_medicine.status = calculate_status(db_medicine)
    db.add(db_medicine)
    db.commit()
    db.refresh(db_medicine)

    return db_medicine

@router.put("/{medicine_id}", response_model=schemas.MedicineResponse)
def update_medicine(
        medicine_id: int,
        medicine: schemas.MedicineUpdate,
        db: Session = Depends(get_db)
        ):

    db_medicine = db.query(models.Medicine).filter(
            models.Medicine.id == medicine_id
            ).first()

    if not db_medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    for key,value in medicine.dict(exclude_unset=True).items():
        setattr(db_medicine, key, value)

    db_medicine.status = calculate_status(db_medicine)

    db.commit()
    db.refresh(db_medicine)

    return db_medicine
