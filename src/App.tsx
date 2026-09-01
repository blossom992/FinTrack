import { useState } from "react"
import type { ReactElement } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/SideBar"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transaction"
import AddTransactions from "./pages/AddTransactions"

const SidebarComponent = Sidebar as unknown as ({
  isOpen,
  onClose,
  onToggle,
}: {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}) => ReactElement

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <SidebarComponent
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen((current) => !current)}
        />

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {/* Mobile Menu Button */}
          {!sidebarOpen && (
            <div className="flex items-center border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100"
              >
                <span className="text-xl">☰</span>
              </button>

              <span className="ml-3 text-lg font-bold text-gray-900">
                FinTrack
              </span>
            </div>
          )}

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