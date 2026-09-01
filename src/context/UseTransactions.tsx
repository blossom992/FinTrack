import { useContext } from "react"
import { TransactionContext } from "./TransactionContext"

export function useTransactions() {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    )
  }

  return context
}