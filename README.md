# Pharmacy EMR System - SwasthiQ (SDE Intern Assignment)
- Live Frontend (Both are same):
  - https://pharmacy.punit-chau20.workers.dev/ (CloudFlare)
  - https://pharmacy-punit.netlify.app/ (Netlify)
- Backend: https://pharmacy-fastapi-backend.onrender.com/
- Screenshots (As of 02 March 2026, 3:51 PM IST)

<img width="1781" height="1030" alt="image" src="https://github.com/user-attachments/assets/12d5d664-a799-40e8-ae9e-8cdbe68958a9" />
<img width="1781" height="1028" alt="image" src="https://github.com/user-attachments/assets/9fdca4dc-bcc9-4847-9d6b-25b6e03145ab" />
<img width="1781" height="1023" alt="image" src="https://github.com/user-attachments/assets/bbd4bcc2-cb37-4f80-92a9-330e53214cd6" />

<h2>REST API Structure</h2>

<p>The APIs are mainly classified into two categories: <strong>Inventory</strong> and <strong>Dashboard</strong>.</p>

<h3>Inventory APIs</h3>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/inventory/overview</td>
      <td>Inventory Overview</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/inventory/</td>
      <td>List Medicines</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/inventory/</td>
      <td>Add Medicine</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/inventory/{medicine_id}</td>
      <td>Update Medicine</td>
    </tr>
  </tbody>
</table>

<h3>Dashboard APIs</h3>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/dashboard/make-sale</td>
      <td>Make Sale</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/dashboard/total-sales</td>
      <td>Get Sales Summary</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/dashboard/items-sold</td>
      <td>Get Items Sold</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/dashboard/recent-sales</td>
      <td>Get Recent Sales</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/dashboard/low-stock</td>
      <td>Get Low Stock</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/dashboard/purchase-orders</td>
      <td>Get Purchase Orders</td>
    </tr>
  </tbody>
</table>

<hr>
<h2>Repository Structure</h2>

<pre>
Pharmacy-SwasthiQ/
│
├── backend/
├── frontend/
├── LICENSE
└── README.md
</pre>

<hr>

<h2>Backend (FastAPI – Python)</h2>
<p>The backend is implemented using FastAPI for REST API development, SQLAlchemy for ORM-based database interaction, Pydantic for validation, and PostgreSQL as the database. The database URL is configured using environment variables for deployment.</p>
Swagger UI for testing: https://pharmacy-fastapi-backend.onrender.com/docs

<h3>Backend Folder Structure</h3>

<pre>
backend/
│
├── main.py
├── database.py
├── models.py
├── schemas.py
├── crud.py
├── requirements.txt
├── generate_inventory.sh
│
└── routers/
    ├── dashboard.py
    └── inventory.py
</pre>

<ul>
<li><strong>main.py</strong> – Entry point of the FastAPI application. Initializes the app and includes API routers.</li>
<li><strong>database.py</strong> – Handles database connection setup using SQLAlchemy with environment variable configuration.</li>
<li><strong>models.py</strong> – Defines database tables and ORM models.</li>
<li><strong>schemas.py</strong> – Contains Pydantic models for request validation and structured API responses.</li>
<li><strong>crud.py</strong> – Contains core business logic and database operations. The logic to check and update medicine status, reduce stock after sales, and maintain consistency is written here. All update operations are handled through controlled transactional sessions.</li>
<li><strong>routers/dashboard.py</strong> – Defines dashboard-related endpoints such as total sales, items sold, low stock, purchase summary, and recent sales.</li>
<li><strong>routers/inventory.py</strong> – Defines inventory-related endpoints to list, add, update, and manage medicines.</li>
<li><strong>generate_inventory.sh</strong> – Script to seed the database with sample medicine data for demonstration and testing.</li>
</ul>

<h2>Medicine Status and Update Logic</h2>

<p>The logic to determine and update medicine status such as Active, Low Stock, Expired, or Out of Stock is implemented in <strong>crud.py</strong>. This file contains the main business logic that recalculates medicine status based on quantity and expiry date and ensures consistent updates when inventory changes occur through API operations.</p>

<hr>

<h2>Frontend (React – Vite)</h2>

<p>The frontend is developed using React and Vite. React Router DOM is used for routing and navigation. The frontend communicates with the backend using a configurable environment variable for the API base URL.</p>

<h3>Frontend Folder Structure</h3>

<pre>
frontend/
│
├── src/
│   ├── App.jsx
│   ├── config.js
│   ├── main.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Inventory.jsx
│   │   ├── RecentSalesSection.jsx
│   │   └── respective CSS files
</pre>

<ul>
<li><strong>App.jsx</strong> – Contains main routing logic for the application.</li>
<li><strong>config.js</strong> – Stores backend base URL using the <code>VITE_API_URL</code> environment variable.</li>
<li><strong>Dashboard.jsx</strong> – Displays dashboard overview cards and provides toggle navigation between Sales and Inventory views.</li>
<li><strong>Inventory.jsx</strong> – Displays inventory overview and complete medicine list with status indicators and update functionality.</li>
<li><strong>RecentSalesSection.jsx</strong> – Displays recent sales data fetched from the backend.</li>
<li>Each page has its respective CSS file for layout and styling consistency.</li>
</ul>

