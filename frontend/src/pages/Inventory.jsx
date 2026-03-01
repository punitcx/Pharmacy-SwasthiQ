import API_URL from "../config.js"
import "./Inventory.css"
import { useState, useEffect } from 'react'

function Inventory() {
  const [data, setData] = useState(0)
  const [error, setError] = useState(0)
  const [medicines, setMedicines] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
  med_name: "",
  gen_name: "",
  category: "",
  batch_no: "",
  expiry_date: "",
  quantity: "",
  cost_price: "",
  mrp: "",
  supplier: "",
  status: "Active"
})
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  })
}
  const handleSubmit = async (e) => {
  e.preventDefault()

  const payload = {
    ...form,
    quantity: Number(form.quantity),
    cost_price: Number(form.cost_price),
    mrp: Number(form.mrp)
  }

  let res

  if (editingId) {
    // UPDATE
    res = await fetch(`${API_URL}/inventory/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  } else {
    // CREATE
    res = await fetch(`${API_URL}/inventory/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  }

  if (res.ok) {
    const updatedMedicine = await res.json()

    if (editingId) {
      setMedicines(
        medicines.map((med) =>
          med.id === editingId ? updatedMedicine : med
        )
      )
      setEditingId(null)
    } else {
      setMedicines([...medicines, updatedMedicine])
    }

    setForm({
      med_name: "",
      gen_name: "",
      category: "",
      batch_no: "",
      expiry_date: "",
      quantity: "",
      cost_price: "",
      mrp: "",
      supplier: "",
      status: "Active"
    })
  }
}

  const handleEdit = (med) => {
  setForm({
    med_name: med.med_name,
    gen_name: med.gen_name,
    category: med.category,
    batch_no: med.batch_no,
    expiry_date: med.expiry_date,
    quantity: med.quantity,
    cost_price: med.cost_price,
    mrp: med.mrp,
    supplier: med.supplier,
    status: med.status
  })

  setEditingId(med.id)
}
  
  useEffect(() => {
          Promise.all([
		fetch(`${API_URL}/inventory/overview`).then(res => res.json()),
		fetch(`${API_URL}/inventory/`).then(res => res.json())
	])
          .then(([overview, medicines]) => {
		  setData({
			  overview,
			  medicines,
		  })
	  })
          .catch(err => {
	    setError("Failed to load Inventory data")
	    console.error("Error:", err)
	  })
  }, [])

  if(error) {
    return <p>{error}</p>
  }

  if(!data){
    return <p>Loading...</p>
  }
  
    return (
        <div className="inventory-container">
      	<h2>Add Medicine</h2>

<form className="medicine-form" onSubmit={handleSubmit}>

  <input name="med_name" placeholder="Medicine Name"
    value={form.med_name} onChange={handleChange} required />

  <input name="gen_name" placeholder="Generic Name"
    value={form.gen_name} onChange={handleChange} required />

  <input name="category" placeholder="Category (Tablet/Syrup)"
    value={form.category} onChange={handleChange} required />

  <input name="batch_no" placeholder="Batch Number"
    value={form.batch_no} onChange={handleChange} required />

  <input type="date" name="expiry_date"
    value={form.expiry_date} onChange={handleChange} required />

  <input type="number" name="quantity" placeholder="Quantity"
    value={form.quantity} onChange={handleChange} required />

  <input type="number" name="cost_price" placeholder="Cost Price"
    value={form.cost_price} onChange={handleChange} required />

  <input type="number" name="mrp" placeholder="MRP"
    value={form.mrp} onChange={handleChange} required />

  <input name="supplier" placeholder="Supplier"
    value={form.supplier} onChange={handleChange} required />

  <select name="status" value={form.status} onChange={handleChange}>
    <option value="Active">Active</option>
    <option value="Low Stock">Low Stock</option>
    <option value="Expired">Expired</option>
  </select>

  <button type="submit">
  {editingId ? "Update Medicine" : "Add Medicine"}
</button>
</form>

          <h2>Inventory Overview</h2>
		<div className="overview-section">
	      	  <div className="overview-card">
			<h3>Total Items</h3>
	      		<p>{data.overview.total_items}</p>
	      	  </div>

	      	  <div className="overview-card">
		        <h3>Active Stock</h3>
		        <p>{data.overview.total_active_stock}</p>
		  </div>

	      	  <div className="overview-card">
		        <h3>Low Stock</h3>
		        <p>{data.overview.total_low_stock}</p>
		  </div>

	      	  <div className="overview-card">
		        <h3>Total Value</h3>
		        <p>₹{data.overview.total_inventory_value}</p>
		  </div>
		</div>
	
	  <h2>Complete Inventory</h2>

		  <table className="inventory-table"> 
		    <thead>
		      <tr>
			<th>Medicine Name</th>
			<th>Generic Name</th>
			<th>Category</th>
			<th>Batch No</th>
			<th>Expiry Date</th>
			<th>Quantity</th>
			<th>Cost Price</th>
			<th>MRP</th>
			<th>Supplier</th>
			<th>Status</th>
			<th>Update</th>
		      </tr>
		    </thead>
		    <tbody>
		      {data.medicines.map((medicine) => (
			<tr key={medicine.id}>
			  <td>{medicine.med_name}</td>	
			  <td>{medicine.gen_name}</td>
			  <td>{medicine.category}</td>
			  <td>{medicine.batch_no}</td>
			  <td>{new Date(medicine.expiry_date).toLocaleString()}</td>
			  <td>{medicine.quantity}</td>
			  <td>₹{medicine.cost_price}</td>
			  <td>₹{medicine.mrp}</td>
			  <td>{medicine.supplier}</td>
			  <td>
			  <span className={`status ${medicine.status.replace(" ", "-").toLowerCase()}`}>
            			{medicine.status}
  			  </span>
			  </td>
			  <td><button className="edit-btn" onClick={() => handleEdit(medicine)}>Edit</button></td>
			</tr>
		      ))}
		    </tbody>
		  </table>
	</div>
  )

}

export default Inventory
