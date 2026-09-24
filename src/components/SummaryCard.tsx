import { useTheme } from "../context/UseTheme"

type SummaryCardProps = {
  title: string
  amount: number
  description?: string
}

function SummaryCard({
  title,
  amount,
  description,
}: SummaryCardProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`
        min-w-0 rounded-2xl border p-5
        shadow-sm transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${
          isDark
            ? "border-[#2B382F] bg-[#18201B]"
            : "border-[#E5EAE6] bg-white"
        }
      `}
    >
      <p
        className={`
          text-sm font-medium
          ${
            isDark
              ? "text-[#A7B3AA]"
              : "text-[#718096]"
          }
        `}
      >
        {title}
      </p>

      <h3
        className={`
          mt-3 wrap-break-word text-2xl
          font-bold tracking-tight
          ${
            isDark
              ? "text-[#F1F5F2]"
              : "text-[#1F2933]"
          }
        `}
      >
        ₦{amount.toLocaleString()}
      </h3>

      {description && (
        <p
          className={`
            mt-2 text-sm
            ${
              isDark
                ? "text-[#7F8C83]"
                : "text-[#718096]"
            }
          `}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SummaryCard