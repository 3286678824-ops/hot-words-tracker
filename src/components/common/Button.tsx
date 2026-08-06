import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './common.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  children: ReactNode
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`.trim()
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
