import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import { transactions as initialTransactions } from "../data/transaction"
import type { Transaction } from "../types/transaction"
import { TransactionContext } from "./TransactionContext"

type TransactionProviderProps = {
  children: ReactNode
}

export function TransactionProvider({
  children,
}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("fintrack-transactions")

    if (savedTransactions) {
      return JSON.parse(savedTransactions)
    }

    return initialTransactions
  })

  useEffect(() => {
    localStorage.setItem(
      "fintrack-transactions",
      JSON.stringify(transactions)
    )
  }, [transactions])

  const addTransaction = (transaction: Transaction) => {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      transaction,
    ])
  }

  const removeTransaction = (id: number) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id)
    )
  }

  const updateTransaction = (
    id: number,
    updatedTransaction: Transaction
  ) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction, id }
          : transaction
      )
    )
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}