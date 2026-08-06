import './dashboard.css'

interface SummaryCardProps {
  label: string
  count: number
}

export function SummaryCard({ label, count }: SummaryCardProps) {
  return (
    <div className="summary-card">
      <span className="summary-card__count">{count}</span>
      <span className="summary-card__label">{label}</span>
    </div>
  )
}
