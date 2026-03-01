function SalesSection({ recentSales }) {
  return (
  	<>
		  <h2>Recent Sales</h2>

		  <table className="recent-sales-table">
		    <thead>
		      <tr>
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
	  </>
	);
}

export default SalesSection;
