import type { Transaction } from "../types/transaction"

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Salary",
    category: "Income",
    amount: 300000,
    type: "income",
    date: "19 Aug 2026",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    amount: 15000,
    type: "expense",
    date: "18 Aug 2026",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    amount: 5000,
    type: "expense",
    date: "17 Aug 2026",
  },
  {
    id: 4,
    title: "Freelance work",
    category: "Income",
    amount: 50000,
    type: "income",
    date: "16 Aug 2026",
  },
]