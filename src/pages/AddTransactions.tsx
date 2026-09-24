import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react"

import { useTransactions } from "../context/UseTransactions"
import { useTheme } from "../context/UseTheme"

function AddTransactions() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
  } = useTransactions()

  const { theme } = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()

  const isDark = theme === "dark"

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
        date: new Date().toISOString(),
      })
    }

    navigate("/transactions")
  }

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
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/transactions")}
        className={`
          mb-5 inline-flex items-center gap-2
          text-sm font-medium transition
          sm:mb-6
          ${
            isDark
              ? "text-[#A7B3AA] hover:text-[#F1F5F2]"
              : "text-[#718096] hover:text-[#1F2933]"
          }
        `}
      >
        <ArrowLeft size={17} />
        <span>Back to transactions</span>
      </button>

      {/* Header */}
      <header>
        <p
          className={`
            text-sm font-medium
            ${
              isDark
                ? "text-[#69B77D]"
                : "text-[#3F8F5B]"
            }
          `}
        >
          Transactions
        </p>

        <h2
          className={`
            mt-1 text-2xl font-bold tracking-tight
            sm:text-3xl
            ${
              isDark
                ? "text-[#F1F5F2]"
                : "text-[#1F2933]"
            }
          `}
        >
          {transactionToEdit
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <p
          className={`
            mt-2 max-w-lg text-sm leading-6
            sm:text-base
            ${
              isDark
                ? "text-[#A7B3AA]"
                : "text-[#718096]"
            }
          `}
        >
          {transactionToEdit
            ? "Update the details of your transaction below."
            : "Keep your finances organized by recording your income and expenses."}
        </p>
      </header>

      {/* Form Card */}
      <div
        className={`
          mt-6 w-full max-w-2xl rounded-2xl
          border p-4 shadow-sm
          sm:mt-8 sm:p-7
          ${
            isDark
              ? "border-[#2B382F] bg-[#18201B]"
              : "border-[#E5EAE6] bg-white"
          }
        `}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >
          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className={`
                mb-2 block text-sm font-semibold
                ${
                  isDark
                    ? "text-[#F1F5F2]"
                    : "text-[#1F2933]"
                }
              `}
            >
              Amount
            </label>

            <div
              className={`
                flex items-center rounded-xl border
                px-4 transition
                ${
                  amountError
                    ? isDark
                      ? "border-[#C95D55] bg-[#3A2524]"
                      : "border-[#D86B61] bg-[#FDEDEC]"
                    : isDark
                      ? "border-[#2B382F] bg-[#111713] focus-within:border-[#69B77D] focus-within:bg-[#1E2921]"
                      : "border-[#E5EAE6] bg-[#F7F9F6] focus-within:border-[#3F8F5B] focus-within:bg-white"
                }
              `}
            >
              <span
                className={`
                  mr-2 text-lg font-semibold
                  ${
                    isDark
                      ? "text-[#7F8C83]"
                      : "text-[#718096]"
                  }
                `}
              >
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
                className={`
                  w-full bg-transparent py-4
                  text-xl font-semibold outline-none
                  placeholder:text-[#66736B]
                  sm:text-2xl
                  ${
                    isDark
                      ? "text-[#F1F5F2]"
                      : "text-[#1F2933]"
                  }
                `}
              />
            </div>

            {amountError && (
              <p
                className={`
                  mt-2 text-sm
                  ${
                    isDark
                      ? "text-[#E47A72]"
                      : "text-[#D86B61]"
                  }
                `}
              >
                {amountError}
              </p>
            )}
          </div>

          {/* Transaction title */}
          <div>
            <label
              htmlFor="title"
              className={`
                mb-2 block text-sm font-semibold
                ${
                  isDark
                    ? "text-[#F1F5F2]"
                    : "text-[#1F2933]"
                }
              `}
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
              className={`
                w-full rounded-xl border
                px-4 py-3.5 text-sm outline-none
                transition sm:text-base
                ${
                  titleError
                    ? isDark
                      ? "border-[#C95D55] bg-[#3A2524]"
                      : "border-[#D86B61] bg-[#FDEDEC]"
                    : isDark
                      ? "border-[#2B382F] bg-[#111713] text-[#F1F5F2] placeholder:text-[#66736B] focus:border-[#69B77D] focus:bg-[#1E2921]"
                      : "border-[#E5EAE6] bg-[#F7F9F6] text-[#1F2933] placeholder:text-[#A5AEA8] focus:border-[#3F8F5B] focus:bg-white"
                }
              `}
            />

            {titleError && (
              <p
                className={`
                  mt-2 text-sm
                  ${
                    isDark
                      ? "text-[#E47A72]"
                      : "text-[#D86B61]"
                  }
                `}
              >
                {titleError}
              </p>
            )}
          </div>

          {/* Transaction type */}
          <div>
            <label
              className={`
                mb-3 block text-sm font-semibold
                ${
                  isDark
                    ? "text-[#F1F5F2]"
                    : "text-[#1F2933]"
                }
              `}
            >
              Transaction type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Expense */}
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`
                  flex min-w-0 items-center gap-2.5
                  rounded-xl border p-3 text-left
                  transition sm:gap-3 sm:p-4
                  ${
                    type === "expense"
                      ? isDark
                        ? "border-[#5A3431] bg-[#3A2524]"
                        : "border-[#F3D2CF] bg-[#FDEDEC]"
                      : isDark
                        ? "border-[#2B382F] bg-[#111713] hover:bg-[#202B23]"
                        : "border-[#E5EAE6] bg-[#F7F9F6] hover:bg-white"
                  }
                `}
              >
                <div
                  className={`
                    flex h-9 w-9 shrink-0
                    items-center justify-center rounded-lg
                    ${
                      type === "expense"
                        ? isDark
                          ? "bg-[#4A2D2A] text-[#E47A72]"
                          : "bg-[#F9DDDA] text-[#D86B61]"
                        : isDark
                          ? "bg-[#202B23] text-[#66736B]"
                          : "bg-white text-[#A5AEA8]"
                    }
                  `}
                >
                  <ArrowDownRight size={18} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        type === "expense"
                          ? isDark
                            ? "text-[#E47A72]"
                            : "text-[#D86B61]"
                          : isDark
                            ? "text-[#A7B3AA]"
                            : "text-[#526057]"
                      }
                    `}
                  >
                    Expense
                  </p>

                  <p
                    className={`
                      mt-0.5 truncate text-xs
                      ${
                        isDark
                          ? "text-[#66736B]"
                          : "text-[#8A9490]"
                      }
                    `}
                  >
                    Money spent
                  </p>
                </div>
              </button>

              {/* Income */}
              <button
                type="button"
                onClick={() => setType("income")}
                className={`
                  flex min-w-0 items-center gap-2.5
                  rounded-xl border p-3 text-left
                  transition sm:gap-3 sm:p-4
                  ${
                    type === "income"
                      ? isDark
                        ? "border-[#31533A] bg-[#1E3325]"
                        : "border-[#DCEBDD] bg-[#EAF5ED]"
                      : isDark
                        ? "border-[#2B382F] bg-[#111713] hover:bg-[#202B23]"
                        : "border-[#E5EAE6] bg-[#F7F9F6] hover:bg-white"
                  }
                `}
              >
                <div
                  className={`
                    flex h-9 w-9 shrink-0
                    items-center justify-center rounded-lg
                    ${
                      type === "income"
                        ? isDark
                          ? "bg-[#23452C] text-[#69B77D]"
                          : "bg-[#DDF1E2] text-[#3F8F5B]"
                        : isDark
                          ? "bg-[#202B23] text-[#66736B]"
                          : "bg-white text-[#A5AEA8]"
                    }
                  `}
                >
                  <ArrowUpRight size={18} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        type === "income"
                          ? isDark
                            ? "text-[#69B77D]"
                            : "text-[#3F8F5B]"
                          : isDark
                            ? "text-[#A7B3AA]"
                            : "text-[#526057]"
                      }
                    `}
                  >
                    Income
                  </p>

                  <p
                    className={`
                      mt-0.5 truncate text-xs
                      ${
                        isDark
                          ? "text-[#66736B]"
                          : "text-[#8A9490]"
                      }
                    `}
                  >
                    Money received
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`
              border-t
              ${
                isDark
                  ? "border-[#2B382F]"
                  : "border-[#E5EAE6]"
              }
            `}
          />

          {/* Actions */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className={`
                order-2 w-full rounded-xl
                border px-5 py-3
                text-sm font-medium transition
                sm:order-1 sm:w-auto
                ${
                  isDark
                    ? "border-[#2B382F] bg-[#18201B] text-[#A7B3AA] hover:bg-[#202B23] hover:text-[#F1F5F2]"
                    : "border-[#E5EAE6] bg-white text-[#718096] hover:bg-[#F1F6F2] hover:text-[#1F2933]"
                }
              `}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`
                order-1 w-full rounded-xl
                px-6 py-3 text-sm font-semibold
                text-white shadow-sm transition
                sm:order-2 sm:w-auto
                ${
                  isDark
                    ? "bg-[#69B77D] hover:bg-[#5FAE72]"
                    : "bg-[#3F8F5B] hover:bg-[#347A4D]"
                }
              `}
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