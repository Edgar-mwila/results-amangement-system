import React from "react"
import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Download,
  Users,
  PenSquare,
  Save,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

type EventType = "results" | "midterm" | "endterm" | "holiday" | "meeting" | "other"

interface CalendarEvent {
  id: string
  date: Date
  title: string
  type: EventType
  description?: string
  time?: string
}

interface SchoolTerm {
  name: string
  start: Date
  end: Date
}

const SchoolCalendar = ({edit}: {edit: boolean}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeView, setActiveView] = useState<"month" | "term" | "year">("month")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const { toast } = useToast()

  // Set edit mode when component mounts
  React.useEffect(() => {
    setIsEditMode(edit)
  }, [edit])

  // Zambian School Terms Data
  const schoolTerms: Record<string, SchoolTerm> = {
    firstTerm: {
      start: new Date(currentDate.getFullYear(), 0, 9),
      end: new Date(currentDate.getFullYear(), 3, 28),
      name: "Term 1",
    },
    secondTerm: {
      start: new Date(currentDate.getFullYear(), 4, 15),
      end: new Date(currentDate.getFullYear(), 7, 18),
      name: "Term 2",
    },
    thirdTerm: {
      start: new Date(currentDate.getFullYear(), 8, 11),
      end: new Date(currentDate.getFullYear(), 11, 8),
      name: "Term 3",
    },
  }

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      date: new Date(currentDate.getFullYear(), 3, 28),
      title: "Term 1 Results Day",
      type: "results",
      description: "Final results for Term 1 will be released to students and parents.",
    },
    {
      id: "2",
      date: new Date(currentDate.getFullYear(), 7, 18),
      title: "Term 2 Results Day",
      type: "results",
      description: "Final results for Term 2 will be released to students and parents.",
    },
    {
      id: "3",
      date: new Date(currentDate.getFullYear(), 11, 8),
      title: "End of Year Results",
      type: "results",
      description: "Final results for the academic year will be released to students and parents.",
    },
    {
      id: "4",
      date: new Date(currentDate.getFullYear(), 1, 15),
      title: "Mid-Term Test - Mathematics",
      type: "midterm",
      description: "Mid-term assessment for all classes in Mathematics.",
    },
    {
      id: "5",
      date: new Date(currentDate.getFullYear(), 5, 10),
      title: "Staff Meeting",
      type: "meeting",
      description: "General staff meeting to discuss Term 2 progress.",
      time: "14:00",
    },
    {
      id: "6",
      date: new Date(currentDate.getFullYear(), 3, 29),
      title: "Term 1 Holiday Begins",
      type: "holiday",
      description: "School closes for Term 1 holiday.",
    },
  ])

  const eventTypes = [
    { id: "results", name: "Results Day", color: "bg-[#F2CC8F]", icon: <CheckCircle className="h-4 w-4" /> },
    { id: "midterm", name: "Mid-Term Test", color: "bg-[#81B29A]", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "endterm", name: "End-Term Test", color: "bg-[#E07A5F]", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "holiday", name: "Holiday", color: "bg-[#F4F1DE]", icon: <Calendar className="h-4 w-4" /> },
    { id: "meeting", name: "Meeting", color: "bg-[#3D405B] text-white", icon: <Users className="h-4 w-4" /> },
    { id: "other", name: "Other", color: "bg-gray-200", icon: <Info className="h-4 w-4" /> },
  ]

  // Get current term
  const getCurrentTerm = (date: Date) => {
    if (date >= schoolTerms.firstTerm.start && date <= schoolTerms.firstTerm.end) {
      return schoolTerms.firstTerm
    } else if (date >= schoolTerms.secondTerm.start && date <= schoolTerms.secondTerm.end) {
      return schoolTerms.secondTerm
    } else if (date >= schoolTerms.thirdTerm.start && date <= schoolTerms.thirdTerm.end) {
      return schoolTerms.thirdTerm
    }
    return { name: "Holiday", start: new Date(), end: new Date() }
  }

  // Calendar generation functions
  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const getFirstDayOfMonth = (date: Date) => {
    return startOfMonth(date).getDay()
  }

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  // Navigation handlers
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleAddEvent = (formData: {
    day: string
    title: string
    type: EventType
    description?: string
    time?: string
  }) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), Number.parseInt(formData.day)),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      time: formData.time,
    }

    setEvents([...events, newEvent])

    toast({
      title: "Event added",
      description: `${formData.title} has been added to the calendar.`,
    })

    setIsAddingEvent(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setSelectedEvent(null)
    setEditingEvent(null)

    toast({
      title: "Event deleted",
      description: "The event has been removed from the calendar.",
    })
  }

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
    setEditingEvent(null)
    setSelectedEvent(updatedEvent)
    setUnsavedChanges(false)

    toast({
      title: "Event updated",
      description: `${updatedEvent.title} has been updated.`,
    })
  }

  const handleExportCalendar = () => {
    // In a real app, this would generate a PDF or CSV file
    toast({
      title: "Calendar exported",
      description: "The calendar has been exported successfully.",
    })
  }

  // Event form component
  const EventForm = () => {
    const [formData, setFormData] = useState({
      day: "",
      title: "",
      type: "results" as EventType,
      description: "",
      time: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      handleAddEvent(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Day</label>
          <Input
            type="number"
            min="1"
            max={endOfMonth(currentDate).getDate()}
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Type</label>
          <Select value={formData.type} onValueChange={(value: EventType) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${type.color} mr-2`}></div>
                    {type.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time (optional)</label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (optional)</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsAddingEvent(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#3D405B] hover:bg-[#2A2B3D]">
            Add Event
          </Button>
        </DialogFooter>
      </form>
    )
  }

  // Event details component
  const EventDetails = ({ event }: { event: CalendarEvent }) => {
    const eventType = eventTypes.find((type) => type.id === event.type)
    
    // State for editing form
    const [editForm, setEditForm] = useState({
      title: event.title,
      type: event.type,
      description: event.description || "",
      time: event.time || "",
    })

    // Update form when selected event changes
    React.useEffect(() => {
      setEditForm({
        title: event.title,
        type: event.type,
        description: event.description || "",
        time: event.time || "",
      })
    }, [event])

    const handleEditChange = (field: string, value: string) => {
      setEditForm({ ...editForm, [field]: value })
      setUnsavedChanges(true)
    }

    const handleSave = () => {
      const updatedEvent: CalendarEvent = {
        ...event,
        title: editForm.title,
        type: editForm.type as EventType,
        description: editForm.description,
        time: editForm.time,
      }
      handleUpdateEvent(updatedEvent)
    }

    const handleStartEditing = () => {
      setEditingEvent(event)
    }

    const handleCancelEditing = () => {
      if (unsavedChanges) {
        if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
          setEditingEvent(null)
          setUnsavedChanges(false)
        }
      } else {
        setEditingEvent(null)
      }
    }

    if (editingEvent && editingEvent.id === event.id) {
      // Editing view
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Event Type</label>
            <Select value={editForm.type} onValueChange={(value: EventType) => handleEditChange("type", value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${type.color} mr-2`}></div>
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <Input
              value={editForm.title}
              onChange={(e) => handleEditChange("title", e.target.value)}
              required
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
            <Input
              value={editForm.title}
              onChange={(e) => handleEditChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time (optional)</label>
            <Input
              type="time"
              value={editForm.time}
              onChange={(e) => handleEditChange("time", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <Textarea
              value={editForm.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="text-gray-500 text-sm">
            Date: {format(event.date, "MMMM d, yyyy")}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEditing}>
              Cancel
            </Button>
            <Button 
              className="bg-[#3D405B] hover:bg-[#2A2B3D]"
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      )
    }

    // Viewing view
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={eventType?.color || "bg-gray-200"}>
            <span className="flex items-center">
              {eventType?.icon}
              <span className="ml-1">{eventType?.name}</span>
            </span>
          </Badge>
          <div className="flex space-x-2">
            {isEditMode && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                onClick={handleStartEditing}
              >
                <PenSquare className="h-4 w-4" />
              </Button>
            )}
            {isEditMode && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg text-[#3D405B]">{event.title}</h3>
          <p className="text-gray-500 text-sm">
            {format(event.date, "MMMM d, yyyy")}
            {event.time && ` at ${event.time}`}
          </p>
        </div>

        {event.description && (
          <div>
            <h4 className="font-medium text-sm text-[#3D405B]">Description</h4>
            <p className="text-gray-700">{event.description}</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedEvent(null)}>
            Close
          </Button>
        </DialogFooter>
      </div>
    )
  }

  // Calendar grid generation
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const today = new Date()

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>)
    }

    // Cells for each day of the month
    for (let i = 0; i < daysInMonth.length; i++) {
      const currentDay = daysInMonth[i]
      const dayEvents = getEventsForDay(currentDay)
      const isToday = isSameDay(currentDay, today)
      const currentTerm = getCurrentTerm(currentDay)
      const isHoliday = currentTerm.name === "Holiday"

      days.push(
        <div
          key={i}
          className={`h-24 border border-gray-200 p-1 overflow-hidden transition-colors
            ${isToday ? "bg-[#3D405B] text-white" : isHoliday ? "bg-[#F4F1DE]" : "bg-white"}
            ${isEditMode ? "cursor-pointer hover:bg-gray-100" : ""}`}
          onClick={() => {
            if (isEditMode && !dayEvents.length) {
              setIsAddingEvent(true)
              // Pre-populate the day in the form
              // This functionality would be implemented in the EventForm component
            }
          }}
        >
          <div className="font-bold text-sm p-1">{format(currentDay, "d")}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => {
              const eventType = eventTypes.find((type) => type.id === event.type)

              return (
                <Popover key={event.id}>
                  <PopoverTrigger asChild>
                    <button
                      className={`text-xs p-1 rounded w-full text-left truncate ${eventType?.color || "bg-gray-200"}`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.title}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2">
                    <div className="font-bold">{event.title}</div>
                    <div className="text-xs text-gray-500">
                      {format(event.date, "MMMM d, yyyy")}
                      {event.time && ` at ${event.time}`}
                    </div>
                    {event.description && (
                      <div className="text-xs mt-1 text-gray-700 truncate">{event.description}</div>
                    )}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-xs text-[#3D405B]"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </Button>
                  </PopoverContent>
                </Popover>
              )
            })}
            {dayEvents.length > 2 && (
              <button
                className="text-xs text-[#3D405B] hover:underline w-full text-left"
                onClick={() => {
                  // Show a dialog with all events for this day
                  setSelectedEvent(dayEvents[0])
                }}
              >
                +{dayEvents.length - 2} more
              </button>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  // Confirmation dialog for discarding changes
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null)

  const confirmDiscardChanges = (action: () => void) => {
    if (unsavedChanges) {
      setPendingAction(() => action)
      setIsConfirmDialogOpen(true)
    } else {
      action()
    }
  }

  const handleConfirmDiscard = () => {
    setUnsavedChanges(false)
    if (pendingAction) {
      pendingAction()
    }
    setIsConfirmDialogOpen(false)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentTerm = getCurrentTerm(currentDate)

  return (
    <div className="w-full text-[#3D405B] space-y-6">
      {/* Current Term Title */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#3D405B]">School Calendar</h1>
          <p className="text-gray-500">
            Current Term: <span className="font-medium">{currentTerm.name}</span>
            {currentTerm.name !== "Holiday" && (
              <>
                {" "}
                ({format(currentTerm.start, "MMM d")} - {format(currentTerm.end, "MMM d, yyyy")})
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
        {/* Action Buttons */}
          <Button variant="outline" className="bg-white border-[#3D405B] text-[#3D405B]" onClick={handleExportCalendar}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {isEditMode && (
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button className="bg-[#3D405B] hover:bg-[#2A2B3D]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new event for {format(currentDate, "MMMM yyyy")}</DialogDescription>
                </DialogHeader>
                <EventForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-[#F2CC8F] rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CardTitle className="text-xl">
              {/* Navigation with Month and Year */}
              <div className="flex items-center gap-4">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-[#E6B56C] rounded-full transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-5 w-5 text-[#3D405B]" />
                </button>
                <span className="font-bold text-[#3D405B]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-[#E6B56C] rounded-full transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-5 w-5 text-[#3D405B]" />
                </button>
              </div>
            </CardTitle>

            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "month" | "term" | "year")}>
              <TabsList>
                <TabsTrigger value="month" className="data-[state=active]:bg-[#3D405B] data-[state=active]:text-white">
                  Month
                </TabsTrigger>
                <TabsTrigger value="term" className="data-[state=active]:bg-[#3D405B] data-[state=active]:text-white">
                  Term
                </TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-[#3D405B] data-[state=active]:text-white">
                  Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            {eventTypes.map((type) => (
              <div key={type.id} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 ${type.color} rounded-full border border-gray-300 flex items-center justify-center`}
                >
                  {type.id === "holiday" ? null : <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span>{type.name}</span>
              </div>
            ))}
          </div>

          {/* Calendar header */}
          <div className="grid grid-cols-7 gap-0 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold py-2 bg-gray-100 border-b border-gray-200">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0">{generateCalendarDays()}</div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 flex justify-between items-center text-sm text-gray-500">
          <div>Total Events: {events.length}</div>
          <div>Last Updated: {format(new Date(), "MMMM d, yyyy")}</div>
        </CardFooter>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => {
        if (!open) {
          if (editingEvent && unsavedChanges) {
            confirmDiscardChanges(() => {
              setSelectedEvent(null)
              setEditingEvent(null)
            })
          } else {
            setSelectedEvent(null)
            setEditingEvent(null)
          }
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Event Details"}</DialogTitle>
          </DialogHeader>
          {selectedEvent && <EventDetails event={selectedEvent} />}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Discarding Changes */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
          </DialogHeader>
          <p>You have unsaved changes. Are you sure you want to discard them?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDiscard}
            >
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Term View (stub implementation) */}
      {activeView === "term" && (
        <Card className="mt-4 border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Term View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(schoolTerms).map((term) => (
                <div key={term.name} className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg">{term.name}</h3>
                  <p>
                    {format(term.start, "MMMM d, yyyy")} - {format(term.end, "MMMM d, yyyy")}
                  </p>
                  <div className="mt-2">
                    <h4 className="font-medium">Key Events:</h4>
                    <ul className="list-disc pl-5 mt-1">
                      {events
                        .filter(
                          (event) => event.date >= term.start && event.date <= term.end
                        )
                        .slice(0, 3)
                        .map((event) => (
                          <li key={event.id} className="text-sm">
                            <button 
                              className="hover:underline text-left"
                              onClick={() => setSelectedEvent(event)}
                            >
                              {event.title} ({format(event.date, "MMM d")})
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Year View (stub implementation) */}
      {activeView === "year" && (
        <Card className="mt-4 border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Year View - {currentDate.getFullYear()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map((_, index) => {
                const monthEvents = events.filter(
                  (event) => 
                    event.date.getMonth() === index && 
                    event.date.getFullYear() === currentDate.getFullYear()
                );
                
                return (
                  <div key={index} className="border rounded-lg p-2">
                    <h3 className="font-bold">{monthNames[index]}</h3>
                    <div className="text-xs mt-1">
                      {monthEvents.length > 0 ? (
                        <ul className="space-y-1">
                          {monthEvents.slice(0, 3).map((event) => (
                            <li key={event.id}>
                              <button 
                                className="hover:underline text-left truncate block w-full"
                                onClick={() => setSelectedEvent(event)}
                              >
                                {format(event.date, "d")} - {event.title}
                              </button>
                            </li>
                          ))}
                          {monthEvents.length > 3 && (
                            <li className="text-gray-500">+{monthEvents.length - 3} more</li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No events</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SchoolCalendar