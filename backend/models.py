from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from sqlalchemy.sql import func
from database import Base

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    med_name = Column(String, nullable=False)
    gen_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    batch_no = Column(String, nullable=False)
    expiry_date = Column(Date, nullable=False)
    quantity = Column(Integer, nullable=False)
    cost_price = Column(Float, nullable=False)
    mrp = Column(Float, nullable=False)
    supplier = Column(String, nullable=False)
    status = Column(String, default="Active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(String)
    cust_name = Column(String)
    quantity_sold = Column(Integer)
    payment_type = Column(String, default = "Cash")
    selling_price = Column(Float)
    sold_at = Column(DateTime(timezone=True), server_default = func.now())
    status = Column(String, default="Completed")

