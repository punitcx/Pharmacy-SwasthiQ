import { Link, useLocation } from "react-router-dom"
import "./Layout.css"

function Layout({ children }) {
  const location = useLocation()

  return (
    <div>
      <header className="navbar">
        <h1 className="logo">Pharmacy CRM</h1>

        <nav>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/inventory"
            className={location.pathname === "/inventory" ? "active" : ""}
          >
            Inventory
          </Link>
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
