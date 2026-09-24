import {
  ArrowDownRight,
  ArrowUpRight,
  Pencil,
  Trash2,
} from "lucide-react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import type { Transaction } from "../types/transaction"
import { useTransactions } from "../context/UseTransactions"
import { useTheme } from "../context/UseTheme"
import { formatCurrency } from "../utils/formatCurrency"

type TransactionItemProps = {
  transaction: Transaction
}

function formatTransactionDate(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/(\d+) (\w+) (\d+)/, "$1, $2, $3")
}

function TransactionItem({
  transaction,
}: TransactionItemProps) {
  const { removeTransaction } = useTransactions()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false)

  const isDark = theme === "dark"
  const isIncome = transaction.type === "income"

  const handleDelete = () => {
    removeTransaction(transaction.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      {/* Transaction Card */}
      <div
        className={`
          rounded-2xl border p-4 shadow-sm
          transition-all duration-200
          hover:shadow-md sm:p-5
          ${
            isDark
              ? "border-[#2B382F] bg-[#18201B]"
              : "border-[#E5EAE6] bg-white"
          }
        `}
      >
        {/* Transaction Information */}
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Transaction Icon */}
            <div
              className={`
                flex h-10 w-10 shrink-0
                items-center justify-center rounded-full
                ${
                  isIncome
                    ? isDark
                      ? "bg-[#1E3325] text-[#69B77D]"
                      : "bg-[#EAF5ED] text-[#3F8F5B]"
                    : isDark
                      ? "bg-[#3A2524] text-[#E47A72]"
                      : "bg-[#FDEDEC] text-[#D86B61]"
                }
              `}
            >
              {isIncome ? (
                <ArrowDownRight size={19} />
              ) : (
                <ArrowUpRight size={19} />
              )}
            </div>

            {/* Transaction Details */}
            <div className="min-w-0">
              <h3
                className={`
                  truncate text-sm font-semibold
                  sm:text-base
                  ${
                    isDark
                      ? "text-[#F1F5F2]"
                      : "text-[#1F2933]"
                  }
                `}
              >
                {transaction.title}
              </h3>

              <div
                className={`
                  mt-1 flex min-w-0 items-center
                  gap-1.5 text-xs sm:text-sm
                  ${
                    isDark
                      ? "text-[#7F8C83]"
                      : "text-[#718096]"
                  }
                `}
              >
                <span className="truncate">
                  {transaction.category}
                </span>

                <span className="shrink-0">•</span>

                <span className="shrink-0">
                  {formatTransactionDate(transaction.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Amount */}
          <span
            className={`
              shrink-0 text-sm font-semibold
              sm:text-base
              ${
                isIncome
                  ? isDark
                    ? "text-[#69B77D]"
                    : "text-[#3F8F5B]"
                  : isDark
                    ? "text-[#E47A72]"
                    : "text-[#D86B61]"
              }
            `}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </span>
        </div>

        {/* Actions */}
        <div
          className={`
            mt-4 flex justify-end
            border-t pt-4
            sm:mt-0 sm:border-0 sm:pt-0
            ${
              isDark
                ? "border-[#2B382F]"
                : "border-[#E5EAE6]"
            }
          `}
        >
          <div className="flex items-center gap-2">
            {/* Edit */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/add-transaction/${transaction.id}`
                )
              }
              aria-label={`Edit ${transaction.title}`}
              className={`
                inline-flex h-10 w-10
                items-center justify-center
                rounded-xl transition
                sm:h-auto sm:w-auto sm:gap-1.5
                sm:border-0 sm:px-3 sm:py-2
                ${
                  isDark
                    ? "border border-[#31533A] text-[#69B77D] hover:bg-[#1E3325]"
                    : "border border-[#DCEBDD] text-[#3F8F5B] hover:bg-[#EAF5ED]"
                }
              `}
            >
              <Pencil size={17} />

              <span className="hidden sm:inline">
                Edit
              </span>
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() =>
                setShowDeleteConfirm(true)
              }
              aria-label={`Delete ${transaction.title}`}
              className={`
                inline-flex h-10 w-10
                items-center justify-center
                rounded-xl transition
                sm:h-auto sm:w-auto sm:gap-1.5
                sm:px-3 sm:py-2
                ${
                  isDark
                    ? "border border-[#4A302E] text-[#E47A72] hover:bg-[#3A2524]"
                    : "border border-[#F3D2CF] text-[#D86B61] hover:bg-[#FDEDEC]"
                }
              `}
            >
              <Trash2 size={17} />

              <span className="hidden sm:inline">
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className={`
              w-full max-w-md rounded-2xl
              border p-6 shadow-xl
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
              Delete transaction?
            </h3>

            <p
              className={`
                mt-2 text-sm
                ${
                  isDark
                    ? "text-[#A7B3AA]"
                    : "text-[#718096]"
                }
              `}
            >
              Are you sure you want to delete{" "}
              <span
                className={`
                  font-medium
                  ${
                    isDark
                      ? "text-[#F1F5F2]"
                      : "text-[#1F2933]"
                  }
                `}
              >
                "{transaction.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                className={`
                  rounded-xl border px-4 py-2
                  text-sm font-medium transition
                  ${
                    isDark
                      ? "border-[#2B382F] text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#F1F5F2]"
                      : "border-[#E5EAE6] text-[#718096] hover:bg-[#F1F6F2] hover:text-[#1F2933]"
                  }
                `}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className={`
                  rounded-xl px-4 py-2
                  text-sm font-medium text-white
                  transition
                  ${
                    isDark
                      ? "bg-[#C95D55] hover:bg-[#B9524B]"
                      : "bg-[#D86B61] hover:bg-[#C95D55]"
                  }
                `}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TransactionItem