import { useMemo, type JSX } from "react"

import { useTransactions } from "../context/UseTransactions"
import { formatCurrency } from "../utils/formatCurrency"

type SpendingCategory = {
  name: string
  amount: number
  percentage: number
  color: string
}

function SpendingOverview() {
  const { transactions } = useTransactions()

  const spendingData = useMemo<SpendingCategory[]>(() => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense"
    )

    const totalExpenses = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

    if (totalExpenses === 0) {
      return []
    }

    const categoryTotals = expenseTransactions.reduce<
      Record<string, number>
    >((totals, transaction) => {
      const category = transaction.category || "Others"

      totals[category] =
        (totals[category] || 0) + transaction.amount

      return totals
    }, {})

    const categoryColors = [
      "#5B5BB7",
      "#E85B5B",
      "#E77A55",
      "#A85BB7",
      "#8B76D9",
      "#5C9A9A",
    ]

    const sortedCategories = Object.entries(
      categoryTotals
    ).sort(([, amountA], [, amountB]) => amountB - amountA)

    const visibleCategories = sortedCategories.slice(0, 5)

    const remainingAmount = sortedCategories
      .slice(5)
      .reduce(
        (total, [, amount]) => total + amount,
        0
      )

    if (remainingAmount > 0) {
      visibleCategories.push([
        "Others",
        remainingAmount,
      ])
    }

    return visibleCategories.map(
      ([name, amount], index) => ({
        name,
        amount,
        percentage: Math.round(
          (amount / totalExpenses) * 100
        ),
        color:
          categoryColors[
            index % categoryColors.length
          ],
      })
    )
  }, [transactions])

  const totalExpenses = spendingData.reduce(
    (total, category) => total + category.amount,
    0
  )

  const radius = 46
  const circumference = 2 * Math.PI * radius

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          Spending Overview
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          See where your money is going.
        </p>
      </div>

      {spendingData.length === 0 ? (
        /* Empty State */
        <div className="mt-5 flex h-52 items-center justify-center rounded-xl bg-gray-50">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">
              No expenses yet
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Your spending breakdown will appear here.
            </p>
          </div>
        </div>
      ) : (
        /* Chart + Legend */
        <div
          className="
            mt-6
            flex
            flex-col
            items-center
            gap-6
            sm:mt-7
            lg:flex-row
            lg:items-center
            lg:justify-center
            lg:gap-12
          "
        >
          {/* Donut Chart */}
          <div className="relative flex shrink-0 items-center justify-center">
            <svg
              width="150"
              height="150"
              viewBox="0 0 120 120"
              className="-rotate-90"
            >
              {/* Background ring */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="15"
              />

              {/* Spending segments */}
              {spendingData.reduce<
                (JSX.Element | null)[]
              >((elements, category, index) => {
                const accumulatedPercentage =
                  spendingData
                    .slice(0, index)
                    .reduce(
                      (sum, cat) =>
                        sum + cat.percentage,
                      0
                    )

                const segmentPercentage =
                  category.percentage

                const segmentLength =
                  (segmentPercentage / 100) *
                  circumference

                const offset =
                  -(accumulatedPercentage / 100) *
                  circumference

                return [
                  ...elements,
                  <circle
                    key={category.name}
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={category.color}
                    strokeWidth="15"
                    strokeDasharray={`${segmentLength} ${circumference}`}
                    strokeDashoffset={offset}
                    strokeLinecap="butt"
                  />,
                ]
              }, [])}
            </svg>

            {/* Centre Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                {formatCurrency(totalExpenses)}
              </span>

              <span className="mt-0.5 text-[9px] text-gray-500 sm:text-[10px]">
                Total Expenses
              </span>
            </div>
          </div>

          {/* Legend */}
          <div
            className="
              w-full
              max-w-sm
              space-y-3
              lg:w-[320px]
              lg:max-w-none
            "
          >
            {spendingData.map((category) => (
              <div
                key={category.name}
                className="flex min-w-0 items-center gap-2"
              >
                {/* Color Dot */}
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: category.color,
                  }}
                />

                {/* Category */}
                <span className="min-w-0 flex-1 truncate text-xs text-gray-600 sm:text-sm">
                  {category.name}
                </span>

                {/* Amount */}
                <span className="shrink-0 text-[10px] font-medium text-gray-700 sm:text-xs">
                  {formatCurrency(category.amount)}
                </span>

                {/* Percentage */}
                <span className="w-8 shrink-0 text-right text-[10px] text-gray-400 sm:text-xs">
                  {category.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default SpendingOverview