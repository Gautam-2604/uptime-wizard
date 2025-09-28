'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './StatusBadge'
import { AddMonitorDialog } from './AddMonitorDialog'
import { Plus, ExternalLink } from 'lucide-react'

export interface Monitor {
  id: string
  name: string
  url: string
  status: 'up' | 'down' | 'pending'
  lastChecked: string
  uptimePercentage: number
  responseTime?: number
}

interface MonitorTableProps {
  monitors: Monitor[]
  onAddMonitor?: (monitor: Omit<Monitor, 'id' | 'status' | 'lastChecked' | 'uptimePercentage'>) => void
}

export function MonitorTable({ monitors, onAddMonitor }: MonitorTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddMonitor = (monitor: any) => {
    onAddMonitor?.(monitor)
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Monitors</h2>
          <p className="text-muted-foreground">
            Manage and monitor your websites and services
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Monitor
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>URL/IP</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Checked</TableHead>
              <TableHead>Uptime %</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monitors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="text-muted-foreground">
                    No monitors configured yet. Add your first monitor to get started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              monitors.map((monitor) => (
                <TableRow key={monitor.id}>
                  <TableCell className="font-medium">{monitor.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="truncate max-w-xs">{monitor.url}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={monitor.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {monitor.lastChecked}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        monitor.uptimePercentage >= 99 ? 'text-green-600' :
                        monitor.uptimePercentage >= 95 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {monitor.uptimePercentage.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {monitor.responseTime ? `${monitor.responseTime}ms` : '-'}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddMonitorDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddMonitor={handleAddMonitor}
      />
    </div>
  )
}
