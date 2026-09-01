import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react"

import { useTransactions } from "../context/UseTransactions"

function AddTransactions() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
  } = useTransactions()

  const navigate = useNavigate()
  const { id } = useParams()

  const transactionToEdit = transactions.find(
    (transaction) => transaction.id === Number(id)
  )

  const [title, setTitle] = useState(
    transactionToEdit?.title ?? ""
  )

  const [amount, setAmount] = useState(
    transactionToEdit
      ? String(transactionToEdit.amount)
      : ""
  )

  const [type, setType] = useState<"income" | "expense">(
    transactionToEdit?.type ?? "expense"
  )

  const [titleError, setTitleError] = useState("")
  const [amountError, setAmountError] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    let hasError = false

    setTitleError("")
    setAmountError("")

    if (!title.trim()) {
      setTitleError("Please enter a transaction title.")
      hasError = true
    }

    if (!amount || Number(amount) <= 0) {
      setAmountError("Please enter an amount greater than 0.")
      hasError = true
    }

    if (hasError) {
      return
    }

    if (transactionToEdit) {
      updateTransaction(transactionToEdit.id, {
        ...transactionToEdit,
        title: title.trim(),
        amount: Number(amount),
        type,
      })
    } else {
      addTransaction({
        id: Date.now(),
        title: title.trim(),
        category: "Other",
        amount: Number(amount),
        type,
        date: new Date().toLocaleDateString(),
      })
    }

    navigate("/transactions")
  }

  return (
    <section className="min-h-screen min-w-0 bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/transactions")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 sm:mb-6"
      >
        <ArrowLeft size={17} />
        <span>Back to transactions</span>
      </button>

      {/* Header */}
      <header>
        <p className="text-sm font-medium text-green-600">
          Transactions
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {transactionToEdit
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
          {transactionToEdit
            ? "Update the details of your transaction below."
            : "Keep your finances organized by recording your income and expenses."}
        </p>
      </header>

      {/* Form Card */}
      <div className="mt-6 w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:mt-8 sm:p-7">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >
          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Amount
            </label>

            <div
              className={`flex items-center rounded-xl border px-4 transition ${
                amountError
                  ? "border-red-500 bg-red-50/30"
                  : "border-gray-200 bg-gray-50 focus-within:border-green-500 focus-within:bg-white"
              }`}
            >
              <span className="mr-2 text-lg font-semibold text-gray-500">
                ₦
              </span>

              <input
                id="amount"
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value)
                  setAmountError("")
                }}
                placeholder="0.00"
                className="w-full bg-transparent py-4 text-xl font-semibold text-gray-900 outline-none placeholder:text-gray-300 sm:text-2xl"
              />
            </div>

            {amountError && (
              <p className="mt-2 text-sm text-red-500">
                {amountError}
              </p>
            )}
          </div>

          {/* Transaction title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Transaction title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                setTitleError("")
              }}
              placeholder="e.g. Groceries"
              className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition sm:text-base ${
                titleError
                  ? "border-red-500 bg-red-50/30"
                  : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white"
              }`}
            />

            {titleError && (
              <p className="mt-2 text-sm text-red-500">
                {titleError}
              </p>
            )}
          </div>

          {/* Transaction type */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              Transaction type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Expense */}
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex min-w-0 items-center gap-2.5 rounded-xl border p-3 text-left transition sm:gap-3 sm:p-4 ${
                  type === "expense"
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    type === "expense"
                      ? "bg-red-100 text-red-500"
                      : "bg-white text-gray-400"
                  }`}
                >
                  <ArrowDownRight size={18} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      type === "expense"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    Expense
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-400">
                    Money spent
                  </p>
                </div>
              </button>

              {/* Income */}
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex min-w-0 items-center gap-2.5 rounded-xl border p-3 text-left transition sm:gap-3 sm:p-4 ${
                  type === "income"
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-white text-gray-400"
                  }`}
                >
                  <ArrowUpRight size={18} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      type === "income"
                        ? "text-green-700"
                        : "text-gray-700"
                    }`}
                  >
                    Income
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-400">
                    Money received
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Actions */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className="order-2 w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:order-1 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="order-1 w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:order-2 sm:w-auto"
            >
              {transactionToEdit
                ? "Save Changes"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddTransactions