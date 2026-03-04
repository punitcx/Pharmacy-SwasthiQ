import API_URL from "../config.js"
import recentSalesIcon from "../assets/recent_sales.png"
import {useState} from 'react'


function SalesSection({ recentSales, showForm }) {
const [form, setForm] = useState({
  cust_name: "",
  quantity_sold: "",
  selling_price: "",
  payment_type: ""
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
    cust_name: form.cust_name,
    quantity_sold: Number(form.quantity_sold),
    selling_price: Number(form.selling_price),
    payment_type: form.payment_type
  }

  let res
  
  res = await fetch(`${API_URL}/dashboard/make-sale`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  
  if (res.ok) {
    const saleMade = await res.json()

    /*setRecentSales(
        recentSales.recent_sales.map((sale) =>
          sale.id === editingId ? updatedMedicine : med
        )
      )*/

    setForm({
      	cust_name: "",
  	quantity_sold: "",
	selling_price: "",
	payment_type: ""
    })
  }
}

return (
  <div className="sales-container">
      	{showForm && (
      	<div className="sale-form-container">
      	<h2>Make a Sale</h2>

	<form className="sale-form" onSubmit={handleSubmit}>

	  <input name="cust_name" placeholder="Customer Name"
	    value={form.cust_name} onChange={handleChange} required />

	  <input type="number" name="selling_price" placeholder="Selling Price"
	    value={form.selling_price} onChange={handleChange} required />

	  <input type="number" name="quantity_sold" placeholder="Quantity"
	    value={form.quantity_sold} onChange={handleChange} required />

	  <input name="payment_type" placeholder="Payment Type"
	    value={form.payment_type} onChange={handleChange} required />

	  <button type="submit">
	  Make Sale
	</button>
	</form>
	</div>
	)}
		  <h2>Recent Sales</h2>

		  <table className="recent-sales-table">
		    <thead>
		      <tr>
			<th></th>
			<th>Sale ID</th>
			<th>Customer Name</th>
			<th>Quantity</th>
			<th>Payment Type</th>
			<th>Selling Price</th>
			<th>Sold at</th>
			<th>Status</th>
		      </tr>
		    </thead>
		    <tbody>
		      {recentSales.recent_sales.map((sale) => (
			<tr key={sale.id}>
			  <td><img src={recentSalesIcon} width="80" height="40"/></td>
			  <td>{sale.sale_id}</td>	
			  <td>{sale.cust_name}</td>
			  <td>{sale.quantity_sold}</td>
			  <td>{sale.payment_type}</td>
			  <td>₹{sale.selling_price}</td>
			  <td>{new Date(sale.sold_at).toLocaleString()}</td>
			  <td>{sale.status}</td>
			</tr>
		      ))}
		    </tbody>
		  </table>
		</div>
	);
}

export default SalesSection;
