import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/SideBar"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transaction"
import AddTransactions from "./pages/AddTransactions"

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen items-stretch bg-gray-50">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Routes>
            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Transactions */}
            <Route
              path="/transactions"
              element={<Transactions />}
            />

            {/* Add Transaction */}
            <Route
              path="/add-transaction"
              element={<AddTransactions />}
            />

            {/* Edit Transaction */}
            <Route
              path="/add-transaction/:id"
              element={<AddTransactions />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App