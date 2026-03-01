import API_URL from "../config.js"
import "./Dashboard.css"
import cashIcon from "../assets/cash.jpg"
import cartIcon from "../assets/cart.jpeg"
import lowStockIcon from "../assets/low_stock.png"
import purchaseOrdersIcon from "../assets/purchase_orders.jpeg"
import RecentSalesSection from "./RecentSalesSection.jsx"
import Inventory from "./Inventory.jsx";
import { useState, useEffect } from 'react'

function Dashboard() {
  const [activeTab, setActiveTab] = useState("sales");
  const [data, setData] = useState(0)
  const [error, setError] = useState(0)
  
  console.log("API_URL:", API_URL);

  useEffect(() => {
          Promise.all([
		fetch(`${API_URL}/dashboard/total-sales`).then(res => res.json()),
		fetch(`${API_URL}/dashboard/items-sold`).then(res => res.json()),
		fetch(`${API_URL}/dashboard/low-stock`).then(res => res.json()),
		fetch(`${API_URL}/dashboard/purchase-orders`).then(res => res.json()),
		fetch(`${API_URL}/dashboard/recent-sales`).then(res => res.json())
	])
          .then(([sales, itemsSold, lowStock, purchase, recentSales]) => {
		  setData({
			  sales,
			  itemsSold,
			  lowStock,
			  purchase,
			  recentSales
		  })
	  })
          .catch(err => {
	    setError("Failed to load dashboard data")
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
        <div className="dashboard-container">
          <h2>Pharmacy CRM</h2>
          <h3> Manage inventory, sales and purchase orders </h3>
      		<div className="dashboard-cards">
	      	  <div className="dashboard-card">
	      	      	<img src={cashIcon} width="40" height="40" />
	      		<p>₹{data.sales.total_sales}</p>
			<h3>Today's Sales</h3>
	      	  </div>

	      	  <div className="dashboard-card">
	      	  	<img src={cartIcon} width="40" height="40" />
		        <p>{data.itemsSold.total_items_sold}</p>
		        <h3>Items Sold Today</h3>
		  </div>

	      	  <div className="dashboard-card">
	      	  	<img src={lowStockIcon} width="40" height="40" />
		        <p>{data.lowStock.low_stock}</p>
		        <h3>Low Stock Items</h3>
		  </div>

	      	  <div className="dashboard-card">
	      	  	<img src={purchaseOrdersIcon} width="40" height="40" />
		        <p>{data.purchase.purchase_orders}</p>
		        <h3>Purchase Orders</h3>
		  </div>

	</div>
	<div className="toggle-container">
	<div className="toggle-buttons">
	  <button
	    className={activeTab === "sales" ? "active-btn" : "inactive-btn"}
	    onClick={() => setActiveTab("sales")}
	  >
	    Sales
	  </button>

	  <button
	    className={activeTab === "inventory" ? "active-btn" : "inactive-btn"}
	    onClick={() => setActiveTab("inventory")}
	  >
	    Inventory
	  </button>
	</div>
	{activeTab === "sales" && (
	  <>	  
	    <RecentSalesSection recentSales={data.recentSales} />
	  </>
	)}
	
	{activeTab === "inventory" && (
	  <>
	    <Inventory/>
	  </>
	)}
	</div>
	</div>
  )

}

export default Dashboard
