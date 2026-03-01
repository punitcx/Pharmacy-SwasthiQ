import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import Inventory from "./pages/Inventory.jsx"
import Layout from "./components/Layout.jsx"

function App() {
  return (
	<Router>
	  <Routes>
	  <Route path="/" element={<Dashboard/>} />
	  <Route path="/inventory" element={<Inventory/>} />
	  </Routes>
	</Router>
  )
  
}

export default App
