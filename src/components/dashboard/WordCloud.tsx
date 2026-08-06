import { useMemo } from 'react'
import type { WordCloudEntry } from '../../core/models/HotWord'
import './dashboard.css'

interface WordCloudProps {
  data: WordCloudEntry[]
}

const CLOUD_COLORS = [
  '#d4784c', '#c0673b', '#e8a87c', '#b85d32',
  '#d4974a', '#a08060', '#6b9e85', '#d1523f',
  '#cc8855', '#8b6f5e',
]

export function WordCloud({ data }: WordCloudProps) {
  const words = useMemo(() => {
    if (data.length === 0) return []

    const maxValue = Math.max(...data.map((d) => d.value), 1)
    const minValue = Math.min(...data.map((d) => d.value), maxValue)
    const range = maxValue - minValue || 1

    const minSize = 14
    const maxSize = 42

    return data.map((d) => {
      const ratio = (d.value - minValue) / range
      const size = minSize + ratio * (maxSize - minSize)
      const color = CLOUD_COLORS[Math.floor(Math.random() * CLOUD_COLORS.length)]
      const weight = ratio > 0.6 ? 700 : ratio > 0.3 ? 600 : 500
      return { text: d.name, count: d.value, size, color, weight }
    })
  }, [data])

  if (words.length === 0) return null

  return (
    <div className="wordcloud">
      {words.map((w, i) => (
        <span
          key={i}
          className="wordcloud__word"
          style={{
            fontSize: `${w.size}px`,
            color: w.color,
            fontWeight: w.weight,
          }}
          title={`${w.text}: ${w.count} 次`}
        >
          {w.text}
        </span>
      ))}
    </div>
  )
}
