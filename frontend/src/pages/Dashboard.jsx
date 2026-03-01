import "./Dashboard.css"
import RecentSalesSection from "./RecentSalesSection.jsx"
import Inventory from "./Inventory.jsx";
import { useState, useEffect } from 'react'

function Dashboard() {
  const [activeTab, setActiveTab] = useState("sales");
  const [data, setData] = useState(0)
  const [error, setError] = useState(0)

  useEffect(() => {
          Promise.all([
		fetch("http://localhost:8000/dashboard/total-sales").then(res => res.json()),
		fetch("http://localhost:8000/dashboard/items-sold").then(res => res.json()),
		fetch("http://localhost:8000/dashboard/low-stock").then(res => res.json()),
		fetch("http://localhost:8000/dashboard/purchase-orders").then(res => res.json()),
		fetch("http://localhost:8000/dashboard/recent-sales").then(res => res.json())
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
          <h1>Pharmacy CRM</h1>
          <h3> Manage inventory, sales and purchase orders </h3>
      		<div className="dashboard-cards">
	      	  <div className="dashboard-card">
	      		<p>₹{data.sales.total_sales}</p>
			<h3>Today's Sales</h3>
	      	  </div>

	      	  <div className="dashboard-card">
		        <p>{data.itemsSold.total_items_sold}</p>
		        <h3>Items Sold Today</h3>
		  </div>

	      	  <div className="dashboard-card">
		        <p>{data.lowStock.low_stock}</p>
		        <h3>Low Stock Items</h3>
		  </div>

	      	  <div className="dashboard-card">
		        <p>{data.purchase.purchase_orders}</p>
		        <h3>Purchase Orders</h3>
		  </div>

	</div>
	<div className="toggle-buttons">
	  <button
	    className={activeTab === "sales" ? "active-btn" : ""}
	    onClick={() => setActiveTab("sales")}
	  >
	    Sales
	  </button>

	  <button
	    className={activeTab === "inventory" ? "active-btn" : ""}
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
  )

}

export default Dashboard
