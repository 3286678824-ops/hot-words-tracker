import './common.css'

interface TagProps {
  color: string
  children: string
  onClick?: () => void
  selected?: boolean
}

export function Tag({ color, children, onClick, selected }: TagProps) {
  const cls = `tag ${onClick ? 'tag--clickable' : ''} ${selected ? 'tag--selected' : ''}`.trim()
  return (
    <span
      className={cls}
      style={{ backgroundColor: color + '20', color, borderColor: color }}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
