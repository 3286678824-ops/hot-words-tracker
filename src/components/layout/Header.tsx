import './layout.css'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
    </header>
  )
}
