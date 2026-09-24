import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  TrendingUp,
  X,
} from "lucide-react"

import { useTheme } from "../context/UseTheme"

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
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/transactions", label: "Transactions", icon: Receipt },
    { to: "/insights", label: "Insights", icon: BarChart3 },
    { to: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 shrink-0 flex-col
          border-r px-5 py-5
          shadow-[8px_0_30px_rgba(0,0,0,0.03)]
          transition-all duration-200
          lg:static lg:z-auto lg:translate-x-0 lg:shadow-none
          ${isDark
            ? "border-[#2B382F] bg-[#151C17]"
            : "border-[#E5EAE6] bg-white"
          }
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-between lg:px-3">

          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3F8F5B] text-sm font-bold text-white">
              F
            </div>

            <span
              className={`
                ml-3 text-xl font-bold tracking-tight
                ${isDark
                  ? "text-[#F1F5F2]"
                  : "text-[#1F2933]"
                }
              `}
            >
              FinTrack
            </span>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className={`
              flex h-9 w-9 items-center
              justify-center rounded-xl
              transition lg:hidden
              ${isDark
                ? "text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#F1F5F2]"
                : "text-[#718096] hover:bg-[#F1F6F2] hover:text-[#1F2933]"
              }
            `}
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-10 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center rounded-xl px-3 py-3 text-sm transition-all duration-200 ${isActive
                    ? isDark
                      ? "bg-[#1E3325] font-semibold text-[#69B77D]"
                      : "bg-[#EAF5ED] font-semibold text-[#3F8F5B]"
                    : isDark
                      ? "text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#F1F5F2]"
                      : "text-[#718096] hover:bg-[#F1F6F2] hover:text-[#1F2933]"
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

        {/* Keep Tracking */}
        <div className="mt-auto hidden pt-8 lg:block">
          <div
            className={`
              rounded-2xl border p-5 text-center
              ${isDark
                ? "border-[#2B4532] bg-[#1A2A1F]"
                : "border-[#DCEBDD] bg-[#F1F8F2]"
              }
            `}
          >
            <div
              className={`
                mx-auto flex h-11 w-11
                items-center justify-center
                rounded-xl
                ${isDark
                  ? "bg-[#23452C] text-[#69B77D]"
                  : "bg-[#DDF1E2] text-[#3F8F5B]"
                }
              `}
            >
              <TrendingUp size={19} strokeWidth={2} />
            </div>

            <h3
              className={`
                mt-4 text-sm font-semibold
                ${isDark
                  ? "text-[#F1F5F2]"
                  : "text-[#1F2933]"
                }
              `}
            >
              Keep tracking!
            </h3>

            <p
              className={`
                mt-2 text-xs leading-5
                ${isDark
                  ? "text-[#A7B3AA]"
                  : "text-[#718096]"
                }
              `}
            >
              Small steps add up. Keep an eye on your
              spending and stay on track.
            </p>

            {/* Mini Chart */}
            <div className="mt-5 flex h-16 items-end justify-center gap-1.5">
              <div
                className={`h-4 w-1.5 rounded-full ${isDark
                    ? "bg-[#31533A]"
                    : "bg-[#C8E5CF]"
                  }`}
              />

              <div
                className={`h-7 w-1.5 rounded-full ${isDark
                    ? "bg-[#3C6848]"
                    : "bg-[#B2D9BB]"
                  }`}
              />

              <div
                className={`h-5 w-1.5 rounded-full ${isDark
                    ? "bg-[#31533A]"
                    : "bg-[#C8E5CF]"
                  }`}
              />

              <div
                className={`h-10 w-1.5 rounded-full ${isDark
                    ? "bg-[#4B8258]"
                    : "bg-[#8FC49C]"
                  }`}
              />

              <div
                className={`h-8 w-1.5 rounded-full ${isDark
                    ? "bg-[#416F4D]"
                    : "bg-[#A6D2AF]"
                  }`}
              />

              <div
                className={`h-14 w-1.5 rounded-full ${isDark
                    ? "bg-[#69B77D]"
                    : "bg-[#3F8F5B]"
                  }`}
              />
            </div>
          </div>
        </div>

        {/* Desktop Toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className={`
            absolute -right-4 top-6 hidden
            h-8 w-8 items-center justify-center
            rounded-full border shadow-sm
            transition lg:flex
            ${isDark
              ? "border-[#2B382F] bg-[#18201B] text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#69B77D]"
              : "border-[#E5EAE6] bg-white text-[#718096] hover:bg-[#F1F6F2] hover:text-[#3F8F5B]"
            }
          `}
        >
          <span className="text-sm">‹</span>
        </button>

      </aside>
    </>
  )
}

export default Sidebar