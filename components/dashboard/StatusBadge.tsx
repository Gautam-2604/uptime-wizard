import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  status: 'up' | 'down' | 'pending'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    up: { variant: 'default' as const, text: 'Up', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    down: { variant: 'destructive' as const, text: 'Down', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
    pending: { variant: 'secondary' as const, text: 'Pending', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' }
  }

  const config = variants[status]

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} ${className}`}
    >
      {config.text}
    </Badge>
  )
}
