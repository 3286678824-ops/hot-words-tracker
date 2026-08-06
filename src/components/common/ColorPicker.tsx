import './common.css'

const PRESET_COLORS = [
  '#d4784c', '#d1523f', '#d4974a', '#c0673b', '#e8a87c',
  '#6b9e85', '#a08060', '#cc8855', '#8b6f5e', '#b85d32',
]

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="color-picker">
      {PRESET_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`color-picker__swatch ${color === value ? 'color-picker__swatch--active' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={`选择颜色 ${color}`}
        />
      ))}
    </div>
  )
}
