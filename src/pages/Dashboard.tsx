import { ArrowDownRight, ArrowUpRight, Plus, Wallet } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";
import { useTransactions } from "../context/UseTransactions";
import { useTheme } from "../context/UseTheme";

function Dashboard() {
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  /*
   * Spending by category
   */
  const spendingByCategory = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        categoryTotals[transaction.category] =
          (categoryTotals[transaction.category] || 0) + transaction.amount;
      });

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  /*
   * Keep the chart visually limited to the most important
   * categories while grouping smaller categories into Others.
   */
  const chartData = useMemo(() => {
    if (spendingByCategory.length <= 5) {
      return spendingByCategory;
    }

    const topCategories = spendingByCategory.slice(0, 4);

    const otherAmount = spendingByCategory
      .slice(4)
      .reduce((total, item) => total + item.amount, 0);

    return [
      ...topCategories,
      {
        category: "Others",
        amount: otherAmount,
      },
    ];
  }, [spendingByCategory]);

  const chartTotal = chartData.reduce((total, item) => total + item.amount, 0);

  /* Chart colors
   
    We keep the different category colors because they
    make the spending breakdown easier to understand.
   */
  const categoryColors = useMemo(
    () => ["#4F8F62", "#D86B61", "#D89A52", "#8D73B8", "#4FA5A0"],
    [],
  );

  /* Create the donut chart using a conic gradient.*/
  const donutGradient = useMemo(() => {
    if (chartTotal === 0) {
      return isDark ? "#2B382F 0deg 360deg" : "#E5EAE6 0deg 360deg";
    }

    let currentDegree = 0;

    const sections = chartData.map((item, index) => {
      const percentage = item.amount / chartTotal;
      const degree = percentage * 360;

      const start = currentDegree;
      const end = currentDegree + degree;

      currentDegree = end;

      return `${categoryColors[index % categoryColors.length]} ${start}deg ${end}deg`;
    });

    return sections.join(", ");
  }, [categoryColors, chartData, chartTotal, isDark]);

  return (
    <section
      className={`
        min-w-0 min-h-screen p-4 transition-colors
        duration-200 sm:p-6 lg:p-8
        ${isDark ? "bg-[#111713] text-[#F1F5F2]" : "bg-[#F7F9F6] text-[#1F2933]"
        }
      `}
    >
      {/* Header */}
      <header>
        <p
          className={`
            mt-1 text-xl font-bold tracking-tight
            sm:text-3xl
            ${isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"}
          `}
        >
          Good Morning, Blossom
        </p>

        <p
          className={`
            mt-2 text-sm sm:text-base
            ${isDark ? "text-[#A7B3AA]" : "text-[#718096]"}
          `}
        >
          Here's your financial overview.
        </p>
      </header>

      {/* Balance Highlight */}
      <div
        className={`
          mt-7 overflow-hidden rounded-2xl p-5
          shadow-sm transition-colors duration-200
          sm:mt-8 sm:p-6
          ${isDark ? "bg-[#1E3325]" : "bg-[#3F8F5B]"}
        `}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Wallet size={17} />
              <span>Total Balance</span>
            </div>

            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ₦{totalBalance.toLocaleString()}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-5 text-white/70">
              Your current balance after income and expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/add-transaction")}
            className="
              inline-flex w-full items-center
              justify-center gap-2 rounded-xl
              bg-white px-4 py-3 text-sm
              font-semibold text-[#2F7045]
              transition hover:bg-[#F1F6F2]
              sm:w-auto
            "
          >
            <Plus size={17} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Income */}
        <div className="relative">
          <SummaryCard
            title="Income"
            amount={totalIncome}
            description="Total money received"
          />

          <div
            className={`
              absolute right-5 top-5 flex h-9 w-9
              items-center justify-center rounded-xl
              ${isDark
                ? "bg-[#1E3325] text-[#69B77D]"
                : "bg-[#EAF5ED] text-[#3F8F5B]"
              }
            `}
          >
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Expenses */}
        <div className="relative">
          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            description="Total money spent"
          />

          <div
            className={`
              absolute right-5 top-5 flex h-9 w-9
              items-center justify-center rounded-xl
              ${isDark
                ? "bg-[#3A2928] text-[#E28A81]"
                : "bg-[#FBEDEC] text-[#D86B61]"
              }
            `}
          >
            <ArrowDownRight size={18} />
          </div>
        </div>

        {/* Savings */}
        <div className="relative sm:col-span-2 xl:col-span-1">
          <SummaryCard
            title="Savings"
            amount={totalBalance}
            description="Income remaining"
          />

          <div
            className={`
              absolute right-5 top-5 flex h-9 w-9
              items-center justify-center rounded-xl
              ${isDark
                ? "bg-[#29332D] text-[#A7B3AA]"
                : "bg-[#EEF1EF] text-[#526057]"
              }
            `}
          >
            <Wallet size={18} />
          </div>
        </div>
      </div>

      {/* Spending Overview */}
      <section
        className={`
          mt-8 rounded-2xl border p-5
          shadow-sm transition-colors duration-200
          sm:p-6
          ${isDark
            ? "border-[#2B382F] bg-[#18201B]"
            : "border-[#E5EAE6] bg-white"
          }
        `}
      >
        <div>
          <h3
            className={`
              text-base font-semibold sm:text-lg
              ${isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"}
            `}
          >
            Spending Overview
          </h3>

          <p
            className={`
              mt-1 text-sm
              ${isDark ? "text-[#A7B3AA]" : "text-[#718096]"}
            `}
          >
            Keep an eye on where your money goes.
          </p>
        </div>

        {chartTotal === 0 ? (
          <div
            className={`
              mt-5 flex h-56 items-center
              justify-center rounded-xl
              ${isDark ? "bg-[#111713]" : "bg-[#F7F9F6]"}
            `}
          >
            <div className="text-center">
              <p
                className={`
                  text-sm font-medium
                  ${isDark ? "text-[#7F8C83]" : "text-[#8A9490]"}
                `}
              >
                No spending data yet
              </p>

              <p
                className={`
                  mt-1 text-xs
                  ${isDark ? "text-[#66736B]" : "text-[#A0AAA4]"}
                `}
              >
                Your spending breakdown will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
            {/* Donut */}
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center sm:h-48 sm:w-48">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${donutGradient})`,
                }}
              />

              {/* Donut hole */}
              <div
                className={`
                  absolute flex h-28 w-28
                  flex-col items-center justify-center
                  rounded-full sm:h-30 sm:w-30
                  ${isDark ? "bg-[#18201B]" : "bg-white"}
                `}
              >
                <span
                  className={`
                    text-lg font-bold sm:text-xl
                    ${isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"}
                  `}
                >
                  ₦{chartTotal.toLocaleString()}
                </span>

                <span
                  className={`
                    mt-0.5 text-[10px] sm:text-xs
                    ${isDark ? "text-[#7F8C83]" : "text-[#718096]"}
                  `}
                >
                  Total Expenses
                </span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="w-full max-w-sm">
              <div className="space-y-3">
                {chartData.map((item, index) => {
                  const percentage =
                    chartTotal > 0
                      ? Math.round((item.amount / chartTotal) * 100)
                      : 0;

                  return (
                    <div
                      key={item.category}
                      className="flex items-center gap-3"
                    >
                      {/* Color indicator */}
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[index % categoryColors.length],
                        }}
                      />

                      <span
                        className={`
                          min-w-0 flex-1 truncate
                          text-xs sm:text-sm
                          ${isDark ? "text-[#A7B3AA]" : "text-[#718096]"}
                        `}
                      >
                        {item.category}
                      </span>

                      <span
                        className={`
                          shrink-0 text-xs font-medium
                          sm:text-sm
                          ${isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"}
                        `}
                      >
                        ₦{item.amount.toLocaleString()}
                      </span>

                      <span
                        className={`
                          w-8 shrink-0 text-right text-xs
                          ${isDark ? "text-[#66736B]" : "text-[#A0AAA4]"}
                        `}
                      >
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Recent Transactions */}
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <div>
            <h3
              className={`
                text-base font-semibold sm:text-lg
                ${isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"}
              `}
            >
              Recent Transactions
            </h3>

            <p
              className={`
                mt-1 text-sm
                ${isDark ? "text-[#A7B3AA]" : "text-[#718096]"}
              `}
            >
              Your latest financial activity.
            </p>
          </div>

          {transactions.length > 0 && (
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className={`
                text-sm font-medium transition
                ${isDark
                  ? "text-[#69B77D] hover:text-[#82C993]"
                  : "text-[#3F8F5B] hover:text-[#2F7045]"
                }
              `}
            >
              View all
            </button>
          )}
        </div>

        <div className="mt-4 space-y-3">
          {transactions.length === 0 ? (
            <div
              className={`
                rounded-2xl border px-6 py-12
                text-center shadow-sm
                ${isDark
                  ? "border-[#2B382F] bg-[#18201B]"
                  : "border-[#E5EAE6] bg-white"
                }
              `}
            >
              <h4
                className={`
                  text-base font-semibold
                  ${isDark ? "text-[#F1F5F2]" : "text-[#1F2933]"}
                `}
              >
                No recent transactions
              </h4>

              <p
                className={`
                  mx-auto mt-2 max-w-sm text-sm
                  ${isDark ? "text-[#A7B3AA]" : "text-[#718096]"}
                `}
              >
                Start tracking your finances by adding your first income or
                expense.
              </p>

              <button
                type="button"
                onClick={() => navigate("/add-transaction")}
                className="
                  mt-5 inline-flex items-center
                  gap-2 rounded-xl bg-[#3F8F5B]
                  px-4 py-2.5 text-sm font-medium
                  text-white transition hover:bg-[#34794B]
                "
              >
                <Plus size={17} />
                Add Transaction
              </button>
            </div>
          ) : (
            recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
