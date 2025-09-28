'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ResponseTimeChart } from '@/components/dashboard/ResponseTimeChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Monitor, Activity, AlertTriangle, Clock } from 'lucide-react'

// Mock data
const mockResponseTimes = [
  120, 98, 145, 89, 156, 134, 98, 167, 123, 145, 
  178, 134, 112, 198, 156, 123, 145, 167, 134, 189,
  123, 156, 134, 145, 167
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor the health and performance of your services
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Monitors"
            value="12"
            description="4 active, 8 paused"
            icon={Monitor}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Uptime (30 days)"
            value="99.8%"
            description="Above target of 99.5%"
            icon={Activity}
            trend={{ value: 0.1, isPositive: true }}
          />
          <StatsCard
            title="Incidents (24h)"
            value="2"
            description="1 resolved, 1 investigating"
            icon={AlertTriangle}
            trend={{ value: -12.5, isPositive: true }}
          />
          <StatsCard
            title="Avg Response Time"
            value="142ms"
            description="Last 24 hours"
            icon={Clock}
            trend={{ value: -5.2, isPositive: true }}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Response Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Response Time (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponseTimeChart data={mockResponseTimes} />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>24h ago</span>
                <span>Now</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">API Server is down</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Main Website recovered</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Database response time increased</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New monitor added: Payment API</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
