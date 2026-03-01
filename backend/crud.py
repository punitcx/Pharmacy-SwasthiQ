from datetime import date

LOW_STOCK_THRESHOLD = 20

def calculate_status(medicine):
    if medicine.expiry_date < date.today():
        return "Expired"
    if medicine.quantity == 0:
        return "Out of Stock"
    if medicine.quantity <= LOW_STOCK_THRESHOLD:
        return "Low Stock"
    return "Active"
