import { createContext } from "react"
import type { Transaction } from "../types/transaction"

export type TransactionContextType = {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  removeTransaction: (id: number) => void
  updateTransaction: (id: number, updatedTransaction: Transaction) => void
}

export const TransactionContext =
  createContext<TransactionContextType | undefined>(undefined)