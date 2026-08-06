import type { InputHTMLAttributes } from 'react'
import './common.css'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function TextInput({ label, error, className = '', ...props }: TextInputProps) {
  const inputCls = `input ${error ? 'input--error' : ''} ${className}`.trim()
  return (
    <div className="input-group">
      {label && <label className="input-group__label">{label}</label>}
      <input className={inputCls} {...props} />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}
