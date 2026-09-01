import {
  Search,
  SlidersHorizontal,
  Plus,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import TransactionItem from "../components/TransactionItem"
import { useTransactions } from "../context/UseTransactions"

function Transaction() {
  const { transactions } = useTransactions()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<
    "all" | "income" | "expense"
  >("all")

  const navigate = useNavigate()

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
    <section className="min-w-0 bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header>
        <p className="text-sm font-medium text-green-600">
          Activity
        </p>

        {/* Title + Actions */}
        <div className="mt-1 flex items-center justify-between gap-4">
          <h2 className="min-w-0 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Transactions
          </h2>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Filter */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 sm:h-10 sm:w-auto sm:gap-2 sm:px-4"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm transition hover:bg-green-700 sm:h-10 sm:w-auto sm:gap-2 sm:px-4"
              aria-label="Add transaction"
            >
              <Plus size={19} />

              <span className="hidden text-sm font-medium sm:inline">
                Add Transaction
              </span>
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Manage your income and expenses.
        </p>
      </header>

      {/* Search */}
      <div className="relative mt-6 sm:mt-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Tabs */}
      <div className="mt-4 rounded-xl bg-gray-100 p-1">
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-2.5 text-sm transition ${
              filter === "all"
                ? "bg-white font-medium text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("income")}
            className={`rounded-lg px-3 py-2.5 text-sm transition ${
              filter === "income"
                ? "bg-white font-medium text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Income
          </button>

          <button
            type="button"
            onClick={() => setFilter("expense")}
            className={`rounded-lg px-3 py-2.5 text-sm transition ${
              filter === "expense"
                ? "bg-white font-medium text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      {/* Results Count */}
      {hasTransactions && (
        <p className="mt-6 text-xs text-gray-500 sm:text-sm">
          Showing {filteredTransactions.length} transactions
        </p>
      )}

      {/* Content */}
      <div className="mt-4 space-y-3">
        {!hasTransactions ? (
          /* No transactions */
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Plus size={22} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No transactions yet
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Start tracking your income and expenses by
              adding your first transaction.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/add-transaction")
              }
              className="mt-6 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Add Transaction
            </button>
          </div>
        ) : !hasResults ? (
          /* No search results */
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              No transactions found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
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