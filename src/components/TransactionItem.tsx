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
  const navigate = useNavigate()

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false)

  const isIncome = transaction.type === "income"

  const handleDelete = () => {
    removeTransaction(transaction.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      {/* Transaction Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
        {/* Transaction Information */}
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Transaction Icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isIncome
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {isIncome ? (
                <ArrowDownRight size={19} />
              ) : (
                <ArrowUpRight size={19} />
              )}
            </div>

            {/* Transaction Details */}
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                {transaction.title}
              </h3>

              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
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
            className={`shrink-0 text-sm font-semibold sm:text-base ${
              isIncome
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end border-t border-gray-100 pt-4 sm:mt-0 sm:border-0 sm:pt-0">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 text-green-600 transition hover:bg-green-50 sm:h-auto sm:w-auto sm:gap-1.5 sm:border-0 sm:px-3 sm:py-2"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2"
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
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete transaction?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">
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
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
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