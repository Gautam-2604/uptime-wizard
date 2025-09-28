'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { MonitorTable, Monitor } from '@/components/dashboard/MonitorTable'

// Mock data
const initialMonitors: Monitor[] = [
  {
    id: '1',
    name: 'Main Website',
    url: 'https://example.com',
    status: 'up',
    lastChecked: '2 minutes ago',
    uptimePercentage: 99.95,
    responseTime: 120
  },
  {
    id: '2',
    name: 'API Server',
    url: 'https://api.example.com',
    status: 'down',
    lastChecked: '5 minutes ago',
    uptimePercentage: 98.21,
    responseTime: 0
  },
  {
    id: '3',
    name: 'Database',
    url: '192.168.1.100:5432',
    status: 'up',
    lastChecked: '1 minute ago',
    uptimePercentage: 99.87,
    responseTime: 45
  },
  {
    id: '4',
    name: 'CDN',
    url: 'https://cdn.example.com',
    status: 'up',
    lastChecked: '3 minutes ago',
    uptimePercentage: 99.99,
    responseTime: 89
  }
]

export default function MonitorsPage() {
  const [monitors, setMonitors] = useState<Monitor[]>(initialMonitors)

  const handleAddMonitor = (newMonitor: Omit<Monitor, 'id' | 'status' | 'lastChecked' | 'uptimePercentage'>) => {
    const monitor: Monitor = {
      ...newMonitor,
      id: Date.now().toString(),
      status: 'pending',
      lastChecked: 'Never',
      uptimePercentage: 0
    }
    setMonitors(prev => [...prev, monitor])
  }

  return (
    <DashboardLayout>
      <MonitorTable monitors={monitors} onAddMonitor={handleAddMonitor} />
    </DashboardLayout>
  )
}
