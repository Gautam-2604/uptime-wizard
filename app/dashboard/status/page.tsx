import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, ExternalLink } from 'lucide-react'

// Mock data for public status page preview
const statusPageData = {
  brand: 'UptimeWizard Services',
  description: 'Monitor the operational status of our services',
  monitors: [
    { name: 'Main Website', status: 'up' as const, description: 'Our main website and marketing pages' },
    { name: 'API Server', status: 'down' as const, description: 'REST API for client applications' },
    { name: 'User Dashboard', status: 'up' as const, description: 'Customer dashboard and account management' },
    { name: 'Database', status: 'up' as const, description: 'Primary database cluster' },
    { name: 'CDN', status: 'up' as const, description: 'Content delivery network' },
    { name: 'Email Service', status: 'up' as const, description: 'Transactional email delivery' }
  ]
}

export default function StatusPage() {
  const upCount = statusPageData.monitors.filter(m => m.status === 'up').length
  const totalCount = statusPageData.monitors.length
  const overallStatus = upCount === totalCount ? 'All Systems Operational' : 
                       upCount === 0 ? 'Major Outage' : 'Partial Outage'

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Status Pages</h1>
            <p className="text-muted-foreground">
              Create and manage public status pages for your services
            </p>
          </div>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Public Page
          </Button>
        </div>

        {/* Status Page Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Public Status Page Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simulated Public Status Page */}
            <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
              {/* Brand Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{statusPageData.brand}</h2>
                <p className="text-muted-foreground">{statusPageData.description}</p>
              </div>

              {/* Overall Status */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${
                  overallStatus === 'All Systems Operational' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  overallStatus === 'Major Outage' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {overallStatus}
                </div>
              </div>

              {/* Services Status */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Services</h3>
                <div className="space-y-3">
                  {statusPageData.monitors.map((monitor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border">
                      <div>
                        <div className="font-medium">{monitor.name}</div>
                        <div className="text-sm text-muted-foreground">{monitor.description}</div>
                      </div>
                      <StatusBadge status={monitor.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-8 text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Page Settings */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Status Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Page Title</label>
                <p className="text-sm text-muted-foreground">{statusPageData.brand}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">{statusPageData.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Monitored Services</label>
                <p className="text-sm text-muted-foreground">{totalCount} services configured</p>
              </div>
              <Button variant="outline" className="w-full">
                Edit Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Services Up</span>
                <span className="text-sm font-medium">{upCount}/{totalCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Overall Uptime</span>
                <span className="text-sm font-medium">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Response Time</span>
                <span className="text-sm font-medium">142ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Incidents (30d)</span>
                <span className="text-sm font-medium">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
