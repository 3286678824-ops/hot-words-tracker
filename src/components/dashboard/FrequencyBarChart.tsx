import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { FrequencyEntry } from '../../core/models/HotWord'
import './dashboard.css'

echarts.use([BarChart, TooltipComponent, GridComponent, CanvasRenderer])

interface FrequencyBarChartProps {
  data: FrequencyEntry[]
}

export function FrequencyBarChart({ data }: FrequencyBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current)
    }

    const sorted = [...data].sort((a, b) => a.count - b.count)
    const words = sorted.map((d) => d.word)
    const counts = sorted.map((d) => d.count)

    chartRef.current.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: 8,
        right: 24,
        top: 8,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: { fontSize: 11, color: '#b8aea4' },
        splitLine: { lineStyle: { color: '#f3efe8' } },
      },
      yAxis: {
        type: 'category',
        data: words,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 13,
          color: '#3d3530',
          fontWeight: 500,
        },
      },
      series: [
        {
          type: 'bar',
          data: counts.map((count) => ({
            value: count,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#e8a87c' },
                { offset: 1, color: '#d4784c' },
              ]),
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: 18,
        },
      ],
    })

    const handleResize = () => chartRef.current?.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [data])

  return <div ref={containerRef} className="chart-container chart-container--bar" />
}
