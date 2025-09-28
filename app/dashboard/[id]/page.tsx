import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardDetailProps {
  params: { id: string }
}

export default function DashboardDetail({ params }: DashboardDetailProps) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard {params.id}</h1>
          <p className="text-muted-foreground">
            Detailed view for dashboard {params.id}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a detailed view for dashboard with ID: {params.id}</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}