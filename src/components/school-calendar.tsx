"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Filter, Plus } from "lucide-react"
import { themeColors } from "./ui/theme-config"

// Sample events data
const events = [
  { id: 1, title: "Midterm Exam - Math 101", date: new Date(2023, 4, 5), type: "exam" },
  { id: 2, title: "Science Fair", date: new Date(2023, 4, 10), type: "event" },
  { id: 3, title: "Parent-Teacher Conference", date: new Date(2023, 4, 15), type: "meeting" },
  { id: 4, title: "Final Project Due - History", date: new Date(2023, 4, 20), type: "assignment" },
  { id: 5, title: "School Holiday", date: new Date(2023, 4, 25), type: "holiday" },
  { id: 6, title: "Field Trip - Museum", date: new Date(2023, 4, 12), type: "event" },
  { id: 7, title: "Quiz - English", date: new Date(2023, 4, 8), type: "exam" },
  { id: 8, title: "Staff Meeting", date: new Date(2023, 4, 18), type: "meeting" },
]

export default function SchoolCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get events for the selected date
  const selectedDateEvents = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">School Calendar</h1>
          <p className="text-gray-500">View and manage school events</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
            <Plus size={16} />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">
                    {date.toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                classNames={{
                  day_today: `bg-gray-100 text-gray-900 font-bold`,
                  day_selected: `${themeColors.accentBg} text-white hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white`,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  <span>
                    Events for{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                ) : (
                  "Select a date to view events"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div
                        className={`w-2 self-stretch rounded-full ${
                          event.type === "exam"
                            ? `${themeColors.accentBg}`
                            : event.type === "event"
                              ? `${themeColors.secondaryBg}`
                              : event.type === "meeting"
                                ? "bg-purple-500"
                                : event.type === "assignment"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {event.date.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <div className="mt-2">
                          <Badge
                            className={
                              event.type === "exam"
                                ? `${themeColors.accentBg} text-white`
                                : event.type === "event"
                                  ? `${themeColors.secondaryBg} text-white`
                                  : event.type === "meeting"
                                    ? "bg-purple-500 text-white"
                                    : event.type === "assignment"
                                      ? "bg-yellow-500 text-white"
                                      : "bg-red-500 text-white"
                            }
                          >
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No events scheduled for this date</div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter((event) => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div
                        className={`w-2 self-stretch rounded-full ${
                          event.type === "exam"
                            ? `${themeColors.accentBg}`
                            : event.type === "event"
                              ? `${themeColors.secondaryBg}`
                              : event.type === "meeting"
                                ? "bg-purple-500"
                                : event.type === "assignment"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {event.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
