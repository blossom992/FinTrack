import { useState } from "react"
import type { ReactElement } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/SideBar"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transaction"
import AddTransactions from "./pages/AddTransactions"
import Insights from "./pages/Insights"
import Settings from "./pages/Settings"
import { ThemeProvider } from "./context/ThemeProvider"
import { useTheme } from "./context/UseTheme"

const SidebarComponent = Sidebar as unknown as ({
  isOpen,
  onClose,
  onToggle,
}: {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}) => ReactElement

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "dark bg-gray-950" : "bg-gray-50"
        }`}
      >
       <div
  className={`flex min-h-screen items-stretch ${
    theme === "dark"
      ? "bg-[#111713]"
      : "bg-[#F7F9F6]"
  }`}
>
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
             <div className={`flex items-center border-b ${
    theme === "dark"
      ? "border-b border-[#29372f] bg-[#121a16]"
      : "border-[#E5EAE6] bg-white"
  } px-4 py-3 lg:hidden`}>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open navigation menu"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition hover:${
    theme === "dark"
      ? "bg-gray-800 text-[#718096]"
      : "bg-[#F7F9F6] text-[#718096]"
  }`}
                >
                  <span className="text-xl">☰</span>
                </button>

                <span className="ml-3 text-lg font-bold text-gray-900 dark:text-gray-100">
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

              {/* Insights */}
              <Route
                path="/insights"
                element={<Insights />}
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

              {/* Settings */}
              <Route
                path="/settings"
                element={<Settings />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App