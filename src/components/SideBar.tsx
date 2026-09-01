import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  TrendingUp,
} from "lucide-react"

function Sidebar() {
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
    <aside className="flex w-16 shrink-0 flex-col border-r border-gray-200 bg-white px-2 py-5 sm:w-20 sm:px-3 lg:w-64 lg:px-5">
      {/* Logo */}
      <div className="flex items-center justify-center lg:justify-start lg:px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white">
          F
        </div>

        <span className="ml-3 hidden text-xl font-bold tracking-tight text-gray-900 lg:inline">
          FinTrack
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-10 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center justify-center rounded-xl px-3 py-3 text-sm transition-all duration-200 lg:justify-start ${
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
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />

                  <span className="ml-3 hidden lg:inline">
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
            <TrendingUp size={19} strokeWidth={2} />
          </div>

          {/* Message */}
          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            Keep tracking!
          </h3>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Your finances are looking great with your dedication.
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
    </aside>
  )
}

export default Sidebar

