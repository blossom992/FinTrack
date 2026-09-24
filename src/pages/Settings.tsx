import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Check,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react"

import { useTheme } from "../context/UseTheme"

function Settings() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const isDark = theme === "dark"

  return (
    <div
      className={`
        min-h-screen px-4 py-6 transition-colors duration-200
        sm:px-6 lg:px-8
        ${
          isDark
            ? "bg-[#111713] text-[#F1F5F2]"
            : "bg-[#F7F9F6] text-[#1F2933]"
        }
      `}
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div>
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"
            }`}
          >
            Settings
          </h1>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-[#A7B3AA]" : "text-[#718096]"
            }`}
          >
            Manage your account, preferences and data.
          </p>
        </div>

        {/* Profile Card */}
        <div
          className={`
            mt-8 flex items-center justify-between
            rounded-2xl border p-5
            transition-colors duration-200
            sm:p-6
            ${
              isDark
                ? "border-[#2B382F] bg-[#18201B]"
                : "border-[#E5EAE6] bg-white"
            }
          `}
        >
          <div className="flex min-w-0 items-center gap-4">

            {/* Avatar */}
            <div
              className={`
                flex h-14 w-14 shrink-0 items-center
                justify-center rounded-full text-sm font-semibold
                ${
                  isDark
                    ? "bg-[#1E3325] text-[#69B77D]"
                    : "bg-[#EAF5ED] text-[#3F8F5B]"
                }
              `}
            >
              BU
            </div>

            {/* User */}
            <div className="min-w-0">
              <h2
                className={`text-sm font-semibold ${
                  isDark
                    ? "text-[#F1F5F2]"
                    : "text-[#1F2933]"
                }`}
              >
                Blossom U.
              </h2>

              <p
                className={`mt-1 truncate text-sm ${
                  isDark
                    ? "text-[#A7B3AA]"
                    : "text-[#718096]"
                }`}
              >
                blossom@gmail.com
              </p>
            </div>
          </div>

          <button
            type="button"
            className={`
              shrink-0 rounded-xl px-3 py-2 text-sm
              font-medium transition
              ${
                isDark
                  ? "text-[#69B77D] hover:bg-[#1E3325]"
                  : "text-[#3F8F5B] hover:bg-[#EAF5ED]"
              }
            `}
          >
            Edit Profile
          </button>
        </div>

        {/* Account */}
        <div className="mt-10">

          <h2
            className={`text-base font-semibold ${
              isDark
                ? "text-[#F1F5F2]"
                : "text-[#1F2933]"
            }`}
          >
            Account
          </h2>

          <div
            className={`
              mt-4 overflow-hidden rounded-2xl border
              transition-colors duration-200
              ${
                isDark
                  ? "border-[#2B382F] bg-[#18201B]"
                  : "border-[#E5EAE6] bg-white"
              }
            `}
          >

            {/* Profile */}
            <button
              type="button"
              className={`
                group flex w-full items-center
                justify-between p-5 text-left
                transition sm:p-6
                ${
                  isDark
                    ? "hover:bg-[#202B23]"
                    : "hover:bg-[#F1F6F2]"
                }
              `}
            >
              <div>
                <h3
                  className={`text-sm font-medium ${
                    isDark
                      ? "text-[#F1F5F2]"
                      : "text-[#1F2933]"
                  }`}
                >
                  Profile
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    isDark
                      ? "text-[#A7B3AA]"
                      : "text-[#718096]"
                  }`}
                >
                  Personal information
                </p>
              </div>

              <ChevronRight
                size={19}
                className={`
                  shrink-0 transition-transform
                  group-hover:translate-x-0.5
                  ${
                    isDark
                      ? "text-[#66736B]"
                      : "text-[#A5AEA8]"
                  }
                `}
              />
            </button>

            <div
              className={`mx-5 border-t sm:mx-6 ${
                isDark
                  ? "border-[#2B382F]"
                  : "border-[#E5EAE6]"
              }`}
            />

            {/* Transaction History */}
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className={`
                group flex w-full items-center
                justify-between p-5 text-left
                transition sm:p-6
                ${
                  isDark
                    ? "hover:bg-[#202B23]"
                    : "hover:bg-[#F1F6F2]"
                }
              `}
            >
              <div>
                <h3
                  className={`text-sm font-medium ${
                    isDark
                      ? "text-[#F1F5F2]"
                      : "text-[#1F2933]"
                  }`}
                >
                  Transaction History
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    isDark
                      ? "text-[#A7B3AA]"
                      : "text-[#718096]"
                  }`}
                >
                  View your recent activity
                </p>
              </div>

              <ChevronRight
                size={19}
                className={`
                  shrink-0 transition-transform
                  group-hover:translate-x-0.5
                  ${
                    isDark
                      ? "text-[#66736B]"
                      : "text-[#A5AEA8]"
                  }
                `}
              />
            </button>

            <div
              className={`mx-5 border-t sm:mx-6 ${
                isDark
                  ? "border-[#2B382F]"
                  : "border-[#E5EAE6]"
              }`}
            />

            {/* Appearance */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setShowThemeMenu((current) => !current)
                }
                className={`
                  group flex w-full items-center
                  justify-between p-5 text-left
                  transition sm:p-6
                  ${
                    isDark
                      ? "hover:bg-[#202B23]"
                      : "hover:bg-[#F1F6F2]"
                  }
                `}
              >
                <div>
                  <h3
                    className={`text-sm font-medium ${
                      isDark
                        ? "text-[#F1F5F2]"
                        : "text-[#1F2933]"
                    }`}
                  >
                    Appearance
                  </h3>

                  <p
                    className={`mt-1 text-sm ${
                      isDark
                        ? "text-[#A7B3AA]"
                        : "text-[#718096]"
                    }`}
                  >
                    {isDark
                      ? "Dark Mode"
                      : "Light Mode"}
                  </p>
                </div>

                <ChevronRight
                  size={19}
                  className={`
                    shrink-0 transition-transform
                    ${
                      showThemeMenu
                        ? "rotate-90"
                        : ""
                    }
                    ${
                      isDark
                        ? "text-[#66736B]"
                        : "text-[#A5AEA8]"
                    }
                  `}
                />
              </button>

              {/* Theme Options */}
              {showThemeMenu && (
                <div
                  className={`
                    border-t px-4 py-4
                    sm:px-5
                    ${
                      isDark
                        ? "border-[#2B382F] bg-[#111713]"
                        : "border-[#E5EAE6] bg-[#F7F9F6]"
                    }
                  `}
                >
                  <div className="space-y-2">

                    {/* Light */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme("light")
                        setShowThemeMenu(false)
                      }}
                      className={`
                        flex w-full items-center
                        justify-between rounded-xl p-3
                        text-left transition
                        ${
                          theme === "light"
                            ? isDark
                              ? "bg-[#1E2921]"
                              : "bg-white shadow-sm"
                            : isDark
                              ? "hover:bg-[#202B23]"
                              : "hover:bg-white"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            flex h-10 w-10
                            items-center justify-center
                            rounded-xl
                            ${
                              isDark
                                ? "bg-[#2D352C] text-[#D9B85A]"
                                : "bg-[#FFF8E7] text-[#D9A441]"
                            }
                          `}
                        >
                          <Sun size={18} />
                        </div>

                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isDark
                                ? "text-[#F1F5F2]"
                                : "text-[#1F2933]"
                            }`}
                          >
                            Light Mode
                          </p>

                          <p
                            className={`mt-0.5 text-xs ${
                              isDark
                                ? "text-[#7F8C83]"
                                : "text-[#8A9490]"
                            }`}
                          >
                            Use the light appearance
                          </p>
                        </div>
                      </div>

                      {theme === "light" && (
                        <Check
                          size={18}
                          className={
                            isDark
                              ? "text-[#69B77D]"
                              : "text-[#3F8F5B]"
                          }
                        />
                      )}
                    </button>

                    {/* Dark */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme("dark")
                        setShowThemeMenu(false)
                      }}
                      className={`
                        flex w-full items-center
                        justify-between rounded-xl p-3
                        text-left transition
                        ${
                          theme === "dark"
                            ? isDark
                              ? "bg-[#1E2921]"
                              : "bg-white shadow-sm"
                            : isDark
                              ? "hover:bg-[#202B23]"
                              : "hover:bg-white"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            flex h-10 w-10
                            items-center justify-center
                            rounded-xl
                            ${
                              isDark
                                ? "bg-[#263129] text-[#B8C4BC]"
                                : "bg-[#E8ECE9] text-[#526057]"
                            }
                          `}
                        >
                          <Moon size={18} />
                        </div>

                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isDark
                                ? "text-[#F1F5F2]"
                                : "text-[#1F2933]"
                            }`}
                          >
                            Dark Mode
                          </p>

                          <p
                            className={`mt-0.5 text-xs ${
                              isDark
                                ? "text-[#7F8C83]"
                                : "text-[#8A9490]"
                            }`}
                          >
                            Use the dark appearance
                          </p>
                        </div>
                      </div>

                      {theme === "dark" && (
                        <Check
                          size={18}
                          className="text-[#69B77D]"
                        />
                      )}
                    </button>

                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings