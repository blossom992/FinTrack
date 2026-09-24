import {
  Search,
  SlidersHorizontal,
  Plus,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import TransactionItem from "../components/TransactionItem"
import { useTransactions } from "../context/UseTransactions"
import { useTheme } from "../context/UseTheme"

function Transaction() {
  const { transactions } = useTransactions()
  const { theme } = useTheme()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<
    "all" | "income" | "expense"
  >("all")

  const navigate = useNavigate()

  const isDark = theme === "dark"

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesFilter =
        filter === "all" ||
        transaction.type === filter

      return matchesSearch && matchesFilter
    }
  )

  const hasTransactions = transactions.length > 0
  const hasResults = filteredTransactions.length > 0

  return (
    <section
      className={`
        min-h-screen min-w-0 p-4
        transition-colors duration-200
        sm:p-6 lg:p-8
        ${
          isDark
            ? "bg-[#111713] text-[#F1F5F2]"
            : "bg-[#F7F9F6] text-[#1F2933]"
        }
      `}
    >
      {/* Header */}
      <header>
        <p
          className={`text-sm font-medium ${
            isDark
              ? "text-[#69B77D]"
              : "text-[#3F8F5B]"
          }`}
        >
          Activity
        </p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <h2
            className={`
              min-w-0 text-2xl font-bold tracking-tight
              sm:text-3xl
              ${
                isDark
                  ? "text-[#F1F5F2]"
                  : "text-[#1F2933]"
              }
            `}
          >
            Transactions
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            {/* Filter */}
            <button
              type="button"
              className={`
                inline-flex h-10 w-10
                items-center justify-center
                rounded-xl border shadow-sm
                transition
                sm:h-10 sm:w-auto sm:gap-2 sm:px-4
                ${
                  isDark
                    ? "border-[#2B382F] bg-[#18201B] text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#F1F5F2]"
                    : "border-[#E5EAE6] bg-white text-[#718096] hover:bg-[#F1F6F2] hover:text-[#1F2933]"
                }
              `}
              aria-label="Filter transactions"
            >
              <SlidersHorizontal size={18} />

              <span className="hidden text-sm font-medium sm:inline">
                Filter
              </span>
            </button>

            {/* Add Transaction */}
            <button
              type="button"
              onClick={() =>
                navigate("/add-transaction")
              }
              className={`
                inline-flex h-10 w-10
                items-center justify-center
                rounded-xl text-white shadow-sm
                transition
                sm:h-10 sm:w-auto sm:gap-2 sm:px-4
                ${
                  isDark
                    ? "bg-[#69B77D] hover:bg-[#5FAE72]"
                    : "bg-[#3F8F5B] hover:bg-[#347A4D]"
                }
              `}
              aria-label="Add transaction"
            >
              <Plus size={19} />

              <span className="hidden text-sm font-medium sm:inline">
                Add Transaction
              </span>
            </button>
          </div>
        </div>

        <p
          className={`
            mt-2 text-sm sm:text-base
            ${
              isDark
                ? "text-[#A7B3AA]"
                : "text-[#718096]"
            }
          `}
        >
          Manage your income and expenses.
        </p>
      </header>

      {/* Search */}
      <div className="relative mt-6 sm:mt-8">
        <Search
          size={18}
          className={`
            absolute left-4 top-1/2
            -translate-y-1/2
            ${
              isDark
                ? "text-[#66736B]"
                : "text-[#A5AEA8]"
            }
          `}
        />

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className={`
            h-12 w-full rounded-xl border
            pl-11 pr-4 text-sm outline-none
            transition
            ${
              isDark
                ? "border-[#2B382F] bg-[#18201B] text-[#F1F5F2] placeholder:text-[#66736B] focus:border-[#69B77D] focus:ring-2 focus:ring-[#23452C]"
                : "border-[#E5EAE6] bg-white text-[#1F2933] placeholder:text-[#A5AEA8] focus:border-[#3F8F5B] focus:ring-2 focus:ring-[#EAF5ED]"
            }
          `}
        />
      </div>

      {/* Tabs */}
      <div
        className={`
          mt-4 rounded-xl p-1
          ${
            isDark
              ? "bg-[#18201B]"
              : "bg-[#EAF0EB]"
          }
        `}
      >
        <div className="grid grid-cols-3 gap-1">
          {(
            [
              ["all", "All"],
              ["income", "Income"],
              ["expense", "Expenses"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`
                rounded-lg px-3 py-2.5
                text-sm transition
                ${
                  filter === value
                    ? isDark
                      ? "bg-[#263129] font-medium text-[#69B77D] shadow-sm"
                      : "bg-white font-medium text-[#3F8F5B] shadow-sm"
                    : isDark
                      ? "text-[#7F8C83] hover:text-[#F1F5F2]"
                      : "text-[#718096] hover:text-[#1F2933]"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {hasTransactions && (
        <p
          className={`
            mt-6 text-xs sm:text-sm
            ${
              isDark
                ? "text-[#7F8C83]"
                : "text-[#718096]"
            }
          `}
        >
          Showing {filteredTransactions.length} transactions
        </p>
      )}

      {/* Content */}
      <div className="mt-4 space-y-3">
        {!hasTransactions ? (
          /* No transactions */
          <div
            className={`
              flex flex-col items-center
              justify-center rounded-2xl
              border px-6 py-14 text-center
              shadow-sm
              ${
                isDark
                  ? "border-[#2B382F] bg-[#18201B]"
                  : "border-[#E5EAE6] bg-white"
              }
            `}
          >
            <div
              className={`
                mb-4 flex h-12 w-12
                items-center justify-center
                rounded-full
                ${
                  isDark
                    ? "bg-[#1E3325] text-[#69B77D]"
                    : "bg-[#EAF5ED] text-[#3F8F5B]"
                }
              `}
            >
              <Plus size={22} />
            </div>

            <h3
              className={`
                text-lg font-semibold
                ${
                  isDark
                    ? "text-[#F1F5F2]"
                    : "text-[#1F2933]"
                }
              `}
            >
              No transactions yet
            </h3>

            <p
              className={`
                mt-2 max-w-sm text-sm
                ${
                  isDark
                    ? "text-[#A7B3AA]"
                    : "text-[#718096]"
                }
              `}
            >
              Start tracking your income and expenses by
              adding your first transaction.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/add-transaction")
              }
              className={`
                mt-6 rounded-xl px-5 py-2.5
                text-sm font-medium text-white
                transition
                ${
                  isDark
                    ? "bg-[#69B77D] hover:bg-[#5FAE72]"
                    : "bg-[#3F8F5B] hover:bg-[#347A4D]"
                }
              `}
            >
              Add Transaction
            </button>
          </div>
        ) : !hasResults ? (
          /* No search results */
          <div
            className={`
              flex flex-col items-center
              justify-center rounded-2xl
              border px-6 py-14 text-center
              shadow-sm
              ${
                isDark
                  ? "border-[#2B382F] bg-[#18201B]"
                  : "border-[#E5EAE6] bg-white"
              }
            `}
          >
            <h3
              className={`
                text-lg font-semibold
                ${
                  isDark
                    ? "text-[#F1F5F2]"
                    : "text-[#1F2933]"
                }
              `}
            >
              No transactions found
            </h3>

            <p
              className={`
                mt-2 max-w-sm text-sm
                ${
                  isDark
                    ? "text-[#A7B3AA]"
                    : "text-[#718096]"
                }
              `}
            >
              Try changing your search or filter to find
              what you're looking for.
            </p>
          </div>
        ) : (
          /* Transactions */
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Transaction