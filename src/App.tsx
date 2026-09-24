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
  <div
    className={`
      sticky top-0 z-30
      flex items-center
      border-b px-4 py-3
      lg:hidden
      ${
        theme === "dark"
          ? "border-[#2B382F] bg-[#151C17]"
          : "border-[#E5EAE6] bg-white"
      }
    `}
  >
    <button
      type="button"
      onClick={() => setSidebarOpen(true)}
      aria-label="Open navigation menu"
      className={`
        flex h-10 w-10 items-center
        justify-center rounded-xl
        transition
        ${
          theme === "dark"
            ? "text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#F1F5F2]"
            : "text-[#718096] hover:bg-[#F1F6F2] hover:text-[#1F2933]"
        }
      `}
    >
      <span className="text-xl">☰</span>
    </button>

    <span
      className={`
        ml-3 text-lg font-bold
        ${
          theme === "dark"
            ? "text-[#F1F5F2]"
            : "text-[#1F2933]"
        }
      `}
    >
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