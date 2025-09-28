'use client'

interface ResponseTimeChartProps {
  data: number[]
  className?: string
}

export function ResponseTimeChart({ data, className }: ResponseTimeChartProps) {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  return (
    <div className={`h-16 flex items-end space-x-1 ${className}`}>
      {data.map((value, index) => {
        const height = ((value - minValue) / range) * 100
        return (
          <div
            key={index}
            className="flex-1 bg-blue-500 rounded-sm min-h-[2px] transition-all duration-200 hover:bg-blue-600"
            style={{ height: `${Math.max(height, 5)}%` }}
            title={`${value}ms`}
          />
        )
      })}
    </div>
  )
}
