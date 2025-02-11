import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const SchoolCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([
    {
      date: new Date(currentDate.getFullYear(), 3, 28),
      event: "Term 1 Results Day",
      type: "results"
    },
    {
      date: new Date(currentDate.getFullYear(), 7, 18),
      event: "Term 2 Results Day",
      type: "results"
    },
    {
      date: new Date(currentDate.getFullYear(), 11, 8),
      event: "End of Year Results",
      type: "results"
    },
  ])
  
  // Zambian School Terms Data
  const schoolTerms = {
    firstTerm: {
      start: new Date(currentDate.getFullYear(), 0, 9),
      end: new Date(currentDate.getFullYear(), 3, 28),
      name: "Term 1"
    },
    secondTerm: {
      start: new Date(currentDate.getFullYear(), 4, 15),
      end: new Date(currentDate.getFullYear(), 7, 18),
      name: "Term 2"
    },
    thirdTerm: {
      start: new Date(currentDate.getFullYear(), 8, 11),
      end: new Date(currentDate.getFullYear(), 11, 8),
      name: "Term 3"
    }
  }

  const eventTypes = [
    { id: 'results', name: 'Results Day', color: 'bg-[#F2CC8F]' },
    { id: 'midterm', name: 'Mid-Term Test', color: 'bg-[#81B29A]' },
    { id: 'endterm', name: 'End-Term Test', color: 'bg-[#E07A5F]' }
  ]

  // Get current term
  const getCurrentTerm = (date: number | Date) => {
    if (date >= schoolTerms.firstTerm.start && date <= schoolTerms.firstTerm.end) {
      return schoolTerms.firstTerm
    } else if (date >= schoolTerms.secondTerm.start && date <= schoolTerms.secondTerm.end) {
      return schoolTerms.secondTerm
    } else if (date >= schoolTerms.thirdTerm.start && date <= schoolTerms.thirdTerm.end) {
      return schoolTerms.thirdTerm
    }
    return { name: "Holiday" }
  }

  // Calendar generation functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventForDay = (date: Date) => {
    return events.find(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth()
    )
  }

  // Navigation handlers
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleAddEvent = (formData: { day: string; title: string; type: string }) => {
    const newEvent = {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(formData.day)),
      event: formData.title,
      type: formData.type
    }
    setEvents([...events, newEvent])
  }

  // Event form component
  const AddEventForm = () => {
    const [formData, setFormData] = useState({
      day: '',
      title: '',
      type: 'results'
    })

    const handleSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      handleAddEvent(formData)
      setFormData({ day: '', title: '', type: 'results' })
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Day</label>
          <Input
            type="number"
            min="1"
            max={getDaysInMonth(currentDate)}
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
          <Select
            value={formData.type}
            onValueChange={(value: string) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Add Event</Button>
      </form>
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
      days.push(
        <div
          key={`empty-${i}`}
          className="h-16 border border-[#3D405B]"
        ></div>
      )
    }

    // Cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const event = getEventForDay(currentDay)
      const isToday = currentDay.toDateString() === today.toDateString()
      const currentTerm = getCurrentTerm(currentDay)
      const isHoliday = currentTerm.name === "Holiday"

      days.push(
        <div
          key={day}
          className={`h-16 border border-[#3D405B] p-2 cursor-pointer hover:bg-gray-100 
            ${isToday ? 'bg-[#3D405B] text-white' : 
              isHoliday ? 'bg-[#F4F1DE] text-[#3D405B]' : 'bg-white text-[#3D405B]'}`}
        >
          <div className="font-bold">{day}</div>
          {event && (
            <div
              className={`text-xs p-1 mt-1 rounded ${
                eventTypes.find(type => type.id === event.type)?.color
              }`}
            >
              {event.event}
            </div>
          )}
        </div>
      )
    }

    return days
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const currentTerm = getCurrentTerm(currentDate)

  return (
    <div className="w-full text-[#3D405B]">
      {/* Current Term Title */}
      <div className="text-center font-bold text-2xl mb-4">
        {currentTerm.name}
      </div>
      <Card className="border border-[#3D405B]">
        <CardHeader className="bg-[#F2CC8F]">
          <CardTitle className="flex flex-col space-y-2">
            {/* Navigation with Month and Year */}
            <div className="flex items-center justify-between">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-[#E6B56C] rounded-full"
              >
                <ChevronLeft className="h-5 w-5 text-[#3D405B]" />
              </button>
              <span className="font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-[#E6B56C] rounded-full"
              >
                <ChevronRight className="h-5 w-5 text-[#3D405B]" />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* Add Event Button */}
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <AddEventForm />
              </DialogContent>
            </Dialog>
          </div>
          {/* Legend */}
          <div className="flex gap-4 mb-4 text-sm flex-wrap">
            {eventTypes.map(type => (
              <div key={type.id} className="flex items-center gap-2">
                <div className={`w-4 h-4 ${type.color} rounded border border-[#3D405B]`}></div>
                <span>{type.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F4F1DE] rounded border border-[#3D405B]"></div>
              <span>Holiday</span>
            </div>
          </div>
          {/* Calendar header */}
          <div className="grid grid-cols-7 gap-0 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold py-1">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SchoolCalendar