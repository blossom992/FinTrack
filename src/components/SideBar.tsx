import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  TrendingUp,
  X,
} from "lucide-react"

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

function Sidebar({
  isOpen,
  onClose,
  onToggle,
}: SidebarProps) {
  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/transactions",
      label: "Transactions",
      icon: Receipt,
    },
    {
      to: "/insights",
      label: "Insights",
      icon: BarChart3,
    },
    {
      to: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 shrink-0 flex-col
          border-r border-gray-200 bg-white
          px-5 py-5
          shadow-xl
          transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:translate-x-0 lg:shadow-none
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between lg:justify-start lg:px-3">
          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white">
              F
            </div>

            <span className="ml-3 text-xl font-bold tracking-tight text-gray-900 ">
              FinTrack
            </span>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-10 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 font-medium text-green-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={
                        isActive ? 2.2 : 1.8
                      }
                    />

                    <span className="ml-3">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Keep Tracking Card */}
        <div className="mt-auto hidden pt-8 lg:block">
          <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4 text-center">
            {/* Icon */}
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white shadow-sm">
              <TrendingUp
                size={19}
                strokeWidth={2}
              />
            </div>

            {/* Message */}
            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              Keep tracking!
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Your finances are looking great with
              your dedication.
            </p>

            {/* Mini chart */}
            <div className="mt-5 flex h-16 items-end justify-center gap-1.5">
              <div className="h-4 w-1.5 rounded-full bg-green-200" />
              <div className="h-7 w-1.5 rounded-full bg-green-300" />
              <div className="h-5 w-1.5 rounded-full bg-green-200" />
              <div className="h-10 w-1.5 rounded-full bg-green-400" />
              <div className="h-8 w-1.5 rounded-full bg-green-300" />
              <div className="h-14 w-1.5 rounded-full bg-green-500" />
            </div>
          </div>
        </div>

        {/* Desktop Toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="absolute -right-4 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 lg:flex"
          aria-label="Toggle sidebar"
        >
          <span className="text-sm">‹</span>
        </button>
      </aside>
    </>
  )
}

export default Sidebar