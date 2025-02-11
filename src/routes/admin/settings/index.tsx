"use client"

import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Database, Shield, Settings2 } from "lucide-react"

interface NotificationSettings {
  email: boolean
  push: boolean
  reports: boolean
  maintenance: boolean
}

interface BackupSettings {
  frequency: string
  retention: string
  lastBackup: string
}

interface UserRole {
  id: string
  name: string
  permissions: string[]
}

const Settings = () => {
  // State for notification preferences
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    reports: false,
    maintenance: true,
  })

  // State for backup settings
  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    frequency: "daily",
    retention: "30",
    lastBackup: "2025-02-10 23:00:00",
  })

  // State for user roles
  const userRoles: UserRole[] = [
    {
      id: "1",
      name: "Administrator",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Teacher",
      permissions: ["view_classes", "edit_grades", "view_students"],
    },
    {
      id: "3",
      name: "Staff",
      permissions: ["view_classes", "view_students"],
    },
  ]

  // State for maintenance window
  const [maintenanceWindow, setMaintenanceWindow] = useState({
    scheduled: false,
    date: "",
    time: "",
    duration: "1",
  })

  const handleNotificationSave = () => {
    console.log("Saving notification settings:", notificationSettings)
    // Here you would typically make an API call to save the settings
  }

  const handleBackupSave = () => {
    console.log("Saving backup settings:", backupSettings)
    // Here you would typically make an API call to save the settings
  }

  const handleRoleSave = () => {
    console.log("Saving user roles:", userRoles)
    // Here you would typically make an API call to save the settings
  }

  const handleMaintenanceSave = () => {
    console.log("Saving maintenance window:", maintenanceWindow)
    // Here you would typically make an API call to save the settings
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      {/* Notification Preferences */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardContent className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-500" />
                <span className="text-lg">Notification Preferences</span>
              </div>
              <Button variant="secondary">Edit</Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={notificationSettings.email}
                onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, email: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={notificationSettings.push}
                onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, push: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="report-notifications">Report Notifications</Label>
              <Switch
                id="report-notifications"
                checked={notificationSettings.reports}
                onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, reports: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-notifications">Maintenance Alerts</Label>
              <Switch
                id="maintenance-notifications"
                checked={notificationSettings.maintenance}
                onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, maintenance: checked }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleNotificationSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Data Backup and Recovery */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardContent className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-4">
                <Database className="h-6 w-6 text-gray-500" />
                <span className="text-lg">Data Backup and Recovery</span>
              </div>
              <Button variant="secondary">Configure</Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Backup Configuration</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Backup Frequency</Label>
              <Select
                value={backupSettings.frequency}
                onValueChange={(value) => setBackupSettings((prev) => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Retention Period (days)</Label>
              <Input
                type="number"
                value={backupSettings.retention}
                onChange={(e) => setBackupSettings((prev) => ({ ...prev, retention: e.target.value }))}
              />
            </div>
            <div className="text-sm text-gray-500">Last backup: {backupSettings.lastBackup}</div>
          </div>
          <DialogFooter>
            <Button onClick={handleBackupSave}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Roles and Permissions */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardContent className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-gray-500" />
                <span className="text-lg">User Roles and Permissions</span>
              </div>
              <Button variant="secondary">Manage</Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Role Management</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {userRoles.map((role) => (
              <Card key={role.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{role.name}</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Checkbox id={`${role.id}-view-classes`} checked={role.permissions.includes("view_classes")} />
                      <Label htmlFor={`${role.id}-view-classes`}>View Classes</Label>

                      <Checkbox id={`${role.id}-edit-grades`} checked={role.permissions.includes("edit_grades")} />
                      <Label htmlFor={`${role.id}-edit-grades`}>Edit Grades</Label>

                      <Checkbox id={`${role.id}-view-students`} checked={role.permissions.includes("view_students")} />
                      <Label htmlFor={`${role.id}-view-students`}>View Students</Label>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleRoleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* System Maintenance */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:bg-gray-50 cursor-pointer">
            <CardContent className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-4">
                <Settings2 className="h-6 w-6 text-gray-500" />
                <span className="text-lg">System Maintenance</span>
              </div>
              <Button variant="secondary">Schedule</Button>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>Schedule system maintenance during off-peak hours.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="scheduled"
                checked={maintenanceWindow.scheduled}
                onCheckedChange={(checked) => setMaintenanceWindow((prev) => ({ ...prev, scheduled: checked }))}
              />
              <Label htmlFor="scheduled">Enable scheduled maintenance</Label>
            </div>
            {maintenanceWindow.scheduled && (
              <>
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={maintenanceWindow.date}
                    onChange={(e) => setMaintenanceWindow((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={maintenanceWindow.time}
                    onChange={(e) => setMaintenanceWindow((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Duration (hours)</Label>
                  <Select
                    value={maintenanceWindow.duration}
                    onValueChange={(value) => setMaintenanceWindow((prev) => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleMaintenanceSave}>Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const Route = createFileRoute("/admin/settings/")({
  component: Settings,
})