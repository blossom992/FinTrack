import {
  ChevronDown,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { useMemo, useState } from "react"

import { useTransactions } from "../context/UseTransactions"
import { formatCurrency } from "../utils/formatCurrency"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const categoryColors = [
  "#6366F1",
  "#EF4444",
  "#F97316",
  "#A855F7",
  "#14B8A6",
]

function getMonthIndex(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return -1
  }

  return parsedDate.getMonth()
}

function Insights() {
  const { transactions } = useTransactions()

  const currentMonth = months[new Date().getMonth()]

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth)

  const selectedMonthIndex = months.indexOf(selectedMonth)

  /*
   * Transactions for the selected month
   */
  const monthTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        getMonthIndex(transaction.date) ===
        selectedMonthIndex
    )
  }, [transactions, selectedMonthIndex])

  /*
   * Income and expenses
   */
  const income = useMemo(() => {
    return monthTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      )
  }, [monthTransactions])

  const expenses = useMemo(() => {
    return monthTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      )
  }, [monthTransactions])

  const balance = income - expenses

  /*
   * Spending by category
   */
  const spendingCategories = useMemo(() => {
    const categoryTotals: Record<string, number> = {}

    monthTransactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        const category = transaction.category || "Others"

        categoryTotals[category] =
          (categoryTotals[category] || 0) +
          transaction.amount
      })

    return Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [monthTransactions])

  const categoryTotal = spendingCategories.reduce(
    (total, category) => total + category.amount,
    0
  )

  /*
   * Limit donut to biggest categories
   */
  const visibleCategories = useMemo(() => {
    if (spendingCategories.length <= 5) {
      return spendingCategories
    }

    const topCategories = spendingCategories.slice(0, 4)

    const others = spendingCategories
      .slice(4)
      .reduce(
        (total, category) => total + category.amount,
        0
      )

    return [
      ...topCategories,
      {
        name: "Others",
        amount: others,
      },
    ]
  }, [spendingCategories])

  /*
   * Donut chart
   */
  const donutGradient = useMemo(() => {
    if (categoryTotal === 0) {
      return "#E5E7EB 0deg 360deg"
    }

    let currentDegree = 0

    return visibleCategories
      .map((category, index) => {
        const degree =
          (category.amount / categoryTotal) * 360

        const start = currentDegree
        const end = currentDegree + degree

        currentDegree = end

        return `${
          categoryColors[
            index % categoryColors.length
          ]
        } ${start}deg ${end}deg`
      })
      .join(", ")
  }, [visibleCategories, categoryTotal])

  /*
   * Monthly trend data
   */
  const trendData = useMemo(() => {
    const data = []

    for (let offset = 5; offset >= 0; offset--) {
      const monthIndex =
        (selectedMonthIndex - offset + 12) % 12

      const monthExpenses = transactions
        .filter(
          (transaction) =>
            transaction.type === "expense" &&
            getMonthIndex(transaction.date) === monthIndex
        )
        .reduce(
          (total, transaction) => total + transaction.amount,
          0
        )

      data.push({
        month: months[monthIndex].slice(0, 3),
        amount: monthExpenses,
      })
    }

    return data
  }, [transactions, selectedMonthIndex])

  const maxTrendValue = Math.max(
    ...trendData.map((item) => item.amount),
    1
  )

  /*
   * SVG line chart points
   */
  const trendPoints = trendData
    .map((item, index) => {
      const x =
        trendData.length === 1
          ? 50
          : (index / (trendData.length - 1)) * 100

      const y =
        88 -
        (item.amount / maxTrendValue) * 70

      return `${x},${y}`
    })
    .join(" ")

  /*
   * Monthly spending percentages
   */
  const totalActivity = income + expenses

  const incomePercentage =
    totalActivity === 0
      ? 0
      : Math.round((income / totalActivity) * 100)

  const expensePercentage =
    totalActivity === 0
      ? 0
      : Math.round((expenses / totalActivity) * 100)

  const balancePercentage =
    totalActivity === 0
      ? 0
      : Math.round(
          (Math.abs(balance) / totalActivity) * 100
        )

  return (
    <section className="min-w-0 bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Insights
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Analyze your financial activity
          </p>
        </div>

        {/* Month selector */}
        <div className="relative w-full sm:w-40">
          <select
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(event.target.value)
            }
            className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </header>

      {/* Insights grid */}
      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Income vs Expenses */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Income vs Expenses
          </h2>

          <div className="mt-6">
            {income === 0 && expenses === 0 ? (
              <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50">
                <div className="text-center">
                  <Wallet
                    size={24}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 text-sm font-medium text-gray-500">
                    No activity for {selectedMonth}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Add transactions to see your comparison.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex h-64 flex-1 items-end justify-center gap-8 border-b border-gray-100 pb-0 sm:gap-12">
                  <div className="flex h-full flex-col items-center justify-end">
                    <span className="mb-2 text-xs font-medium text-gray-600">
                      {formatCurrency(income)}
                    </span>

                    <div
                      className="w-10 rounded-t-md bg-green-500 transition-all"
                      style={{
                        height: `${
                          Math.max(
                            (income /
                              Math.max(
                                income,
                                expenses,
                                1
                              )) *
                              170,
                            income > 0 ? 18 : 0
                          )
                        }px`,
                      }}
                    />

                    <span className="mt-3 text-xs text-gray-500">
                      Income
                    </span>
                  </div>

                  <div className="flex h-full flex-col items-center justify-end">
                    <span className="mb-2 text-xs font-medium text-gray-600">
                      {formatCurrency(expenses)}
                    </span>

                    <div
                      className="w-10 rounded-t-md bg-red-500 transition-all"
                      style={{
                        height: `${
                          Math.max(
                            (expenses /
                              Math.max(
                                income,
                                expenses,
                                1
                              )) *
                              170,
                            expenses > 0 ? 18 : 0
                          )
                        }px`,
                      }}
                    />

                    <span className="mt-3 text-xs text-gray-500">
                      Expenses
                    </span>
                  </div>
                </div>

                <div className="space-y-4 sm:w-28">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-600">
                      Income
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm text-gray-600">
                      Expenses
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Spending Category */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Spending Category
          </h2>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center sm:h-52 sm:w-52">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${donutGradient})`,
                }}
              />

              <div className="absolute flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white sm:h-32 sm:w-32">
                <span className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                  {formatCurrency(categoryTotal)}
                </span>

                <span className="mt-1 text-[9px] text-gray-500 sm:text-[10px]">
                  Total Expenses
                </span>
              </div>
            </div>

            <div className="w-full max-w-xs space-y-3">
              {visibleCategories.length === 0 ? (
                <div className="rounded-xl bg-gray-50 px-4 py-6 text-center">
                  <p className="text-sm text-gray-500">
                    No spending data
                  </p>
                </div>
              ) : (
                visibleCategories.map(
                  (category, index) => {
                    const percentage =
                      categoryTotal === 0
                        ? 0
                        : Math.round(
                            (category.amount /
                              categoryTotal) *
                              100
                          )

                    return (
                      <div
                        key={category.name}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              categoryColors[
                                index %
                                  categoryColors.length
                              ],
                          }}
                        />

                        <span className="min-w-0 flex-1 truncate text-sm text-gray-600">
                          {category.name}
                        </span>

                        <span className="text-xs font-medium text-gray-700">
                          {percentage}%
                        </span>
                      </div>
                    )
                  }
                )
              )}
            </div>
          </div>
        </section>

        {/* Monthly Spending */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Monthly Spending
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Income
                </p>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <TrendingUp size={14} />
                </div>
              </div>

              <p className="mt-5 text-base font-bold text-gray-900">
                {formatCurrency(income)}
              </p>

              <p className="mt-1 text-xs text-green-600">
                {incomePercentage}% of activity
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Expenses
                </p>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <TrendingDown size={14} />
                </div>
              </div>

              <p className="mt-5 text-base font-bold text-gray-900">
                {formatCurrency(expenses)}
              </p>

              <p className="mt-1 text-xs text-red-500">
                {expensePercentage}% of activity
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Balance
                </p>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Wallet size={14} />
                </div>
              </div>

              <p className="mt-5 text-base font-bold text-gray-900">
                {formatCurrency(balance)}
              </p>

              <p
                className={`mt-1 text-xs ${
                  balance >= 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {balancePercentage}% of activity
              </p>
            </div>
          </div>
        </section>

        {/* Expenses Trend */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Expenses Trend
          </h2>

          <div className="mt-5">
            {trendData.every(
              (item) => item.amount === 0
            ) ? (
              <div className="flex h-52 items-center justify-center rounded-xl bg-gray-50">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                    No expense trend yet
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Add expenses to see your monthly trend.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="h-52 w-full overflow-visible"
                >
                  <line
                    x1="0"
                    y1="88"
                    x2="100"
                    y2="88"
                    stroke="#E5E7EB"
                    strokeWidth="0.5"
                  />

                  <line
                    x1="0"
                    y1="53"
                    x2="100"
                    y2="53"
                    stroke="#F3F4F6"
                    strokeWidth="0.5"
                  />

                  <line
                    x1="0"
                    y1="18"
                    x2="100"
                    y2="18"
                    stroke="#F3F4F6"
                    strokeWidth="0.5"
                  />

                  <polyline
                    points={trendPoints}
                    fill="none"
                    stroke="#34C759"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {trendData.map(
                    (item, index) => {
                      const x =
                        trendData.length === 1
                          ? 50
                          : (index /
                              (trendData.length -
                                1)) *
                            100

                      const y =
                        88 -
                        (item.amount /
                          maxTrendValue) *
                          70

                      return (
                        <circle
                          key={`${item.month}-${index}`}
                          cx={x}
                          cy={y}
                          r="1.8"
                          fill="#34C759"
                        />
                      )
                    }
                  )}
                </svg>

                <div className="mt-2 flex justify-between">
                  {trendData.map((item, index) => (
                    <span
                      key={`${item.month}-${index}`}
                      className="text-[10px] text-gray-400 sm:text-xs"
                    >
                      {item.month}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Insights

