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
  return (
    <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3 className="mt-3 wrap-break-word text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        ₦{amount.toLocaleString()}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}

export default SummaryCard

