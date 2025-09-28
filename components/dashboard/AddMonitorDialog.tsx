'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AddMonitorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMonitor: (monitor: {
    name: string
    url: string
    checkInterval: number
    notificationChannels: string[]
  }) => void
}

export function AddMonitorDialog({ open, onOpenChange, onAddMonitor }: AddMonitorDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    checkInterval: 60,
    notificationChannels: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.url) {
      onAddMonitor(formData)
      setFormData({
        name: '',
        url: '',
        checkInterval: 60,
        notificationChannels: []
      })
    }
  }

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Monitor</DialogTitle>
          <DialogDescription>
            Configure a new monitor to track the uptime of your website or service.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Monitor Name</Label>
            <Input
              id="name"
              placeholder="My Website"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL or IP Address</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval">Check Interval (seconds)</Label>
            <Input
              id="interval"
              type="number"
              min="30"
              max="3600"
              value={formData.checkInterval}
              onChange={(e) => handleInputChange('checkInterval', parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="channels">Notification Channels</Label>
            <Input
              id="channels"
              placeholder="email@example.com, #slack-channel"
              onChange={(e) => handleInputChange('notificationChannels', e.target.value.split(',').map(s => s.trim()))}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated list of email addresses or Slack channels
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Monitor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
