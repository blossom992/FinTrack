import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Wallet,
} from "lucide-react"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import SummaryCard from "../components/SummaryCard"
import TransactionItem from "../components/TransactionItem"
import { useTransactions } from "../context/UseTransactions"

function Dashboard() {
  const { transactions } = useTransactions()
  const navigate = useNavigate()

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  /*
   * Spending by category
   */
  const spendingByCategory = useMemo(() => {
    const categoryTotals: Record<string, number> = {}

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        categoryTotals[transaction.category] =
          (categoryTotals[transaction.category] || 0) +
          transaction.amount
      })

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  /*
   * Keep the chart visually limited to the most important
   * categories while grouping smaller categories into Others.
   */
  const chartData = useMemo(() => {
    if (spendingByCategory.length <= 5) {
      return spendingByCategory
    }

    const topCategories = spendingByCategory.slice(0, 4)

    const otherAmount = spendingByCategory
      .slice(4)
      .reduce((total, item) => total + item.amount, 0)

    return [
      ...topCategories,
      {
        category: "Others",
        amount: otherAmount,
      },
    ]
  }, [spendingByCategory])

  const chartTotal = chartData.reduce(
    (total, item) => total + item.amount,
    0
  )

  /*
   * Chart colors
   */
  const categoryColors = useMemo(
    () => ["#6366F1", "#EF4444", "#F97316", "#A855F7", "#14B8A6"],
    []
  )

  /*
   * Create the donut chart using a conic gradient.
   */
  const donutGradient = useMemo(() => {
    if (chartTotal === 0) {
      return "#E5E7EB 0deg 360deg"
    }

    let currentDegree = 0

    const sections = chartData.map((item, index) => {
      const percentage = item.amount / chartTotal
      const degree = percentage * 360

      const start = currentDegree
      const end = currentDegree + degree

      currentDegree = end

      return `${categoryColors[index % categoryColors.length]} ${start}deg ${end}deg`
    })

    return sections.join(", ")
  }, [categoryColors, chartData, chartTotal])

  return (
    <section className="min-w-0 bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header>
        <p className="mt-1 text-lg font-bold tracking-tight text-gray-900 sm:text-3xl">
          Good Morning, Blossom
        </p>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Here's your financial overview.
        </p>
      </header>

      {/* Balance Highlight */}
      <div className="mt-7 overflow-hidden rounded-2xl bg-gray-900 p-5 text-white shadow-sm sm:mt-8 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wallet size={17} />
              <span>Total Balance</span>
            </div>

            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              ₦{totalBalance.toLocaleString()}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-5 text-gray-400">
              Your current balance after income and expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/add-transaction")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 sm:w-auto"
          >
            <Plus size={17} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="relative">
          <SummaryCard
            title="Income"
            amount={totalIncome}
            description="Total money received"
          />

          <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <div className="relative">
          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            description="Total money spent"
          />

          <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <ArrowDownRight size={18} />
          </div>
        </div>

        <div className="relative">
          <SummaryCard
            title="Savings"
            amount={totalIncome - totalExpenses}
            description="Income remaining"
          />

          <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Wallet size={18} />
          </div>
        </div>
      </div>

      {/* Spending Overview */}
      <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            Spending Overview
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Keep an eye on where your money goes.
          </p>
        </div>

        {chartTotal === 0 ? (
          /* Empty chart state */
          <div className="mt-5 flex h-56 items-center justify-center rounded-xl bg-gray-50">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-400">
                No spending data yet
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Your spending breakdown will appear here.
              </p>
            </div>
          </div>
        ) : (
          /* Chart */
          <div className="mt-6 flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
            {/* Donut */}
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center sm:h-48 sm:w-48">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${donutGradient})`,
                }}
              />

              {/* Donut hole */}
              <div className="absolute flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white sm:h-30 sm:w-30">
                <span className="text-lg font-bold text-gray-900 sm:text-xl">
                  ₦{chartTotal.toLocaleString()}
                </span>

                <span className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                  Total Expenses
                </span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="w-full max-w-sm">
              <div className="space-y-3">
                {chartData.map((item, index) => {
                  const percentage =
                    chartTotal > 0
                      ? Math.round(
                          (item.amount / chartTotal) * 100
                        )
                      : 0

                  return (
                    <div
                      key={item.category}
                      className="flex items-center gap-3"
                    >
                      {/* Color indicator */}
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[
                              index %
                                categoryColors.length
                            ],
                        }}
                      />

                      {/* Category */}
                      <span className="min-w-0 flex-1 truncate text-xs text-gray-600 sm:text-sm">
                        {item.category}
                      </span>

                      {/* Amount */}
                      <span className="shrink-0 text-xs font-medium text-gray-900 sm:text-sm">
                        ₦{item.amount.toLocaleString()}
                      </span>

                      {/* Percentage */}
                      <span className="w-8 shrink-0 text-right text-xs text-gray-400">
                        {percentage}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Recent Transactions */}
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              Recent Transactions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your latest financial activity.
            </p>
          </div>

          {transactions.length > 0 && (
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className="text-sm font-medium text-green-600 transition hover:text-green-700"
            >
              View all
            </button>
          )}
        </div>

        <div className="mt-4 space-y-3">
          {transactions.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
              <h4 className="text-base font-semibold text-gray-900">
                No recent transactions
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                Start tracking your finances by adding your
                first income or expense.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/add-transaction")
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
              >
                <Plus size={17} />
                Add Transaction
              </button>
            </div>
          ) : (
            transactions
              .slice(0, 5)
              .map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
          )}
        </div>
      </section>
    </section>
  )
}

export default Dashboard