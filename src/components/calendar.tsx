import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const SchoolCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Zambian School Terms Data
  const schoolTerms = {
    firstTerm: {
      start: new Date(currentDate.getFullYear(), 0, 9), // January 9
      end: new Date(currentDate.getFullYear(), 3, 28),  // April 28
      name: "Term 1"
    },
    secondTerm: {
      start: new Date(currentDate.getFullYear(), 4, 15), // May 15
      end: new Date(currentDate.getFullYear(), 7, 18),   // August 18
      name: "Term 2"
    },
    thirdTerm: {
      start: new Date(currentDate.getFullYear(), 8, 11), // September 11
      end: new Date(currentDate.getFullYear(), 11, 8),   // December 8
      name: "Term 3"
    }
  }

  // Important School Days
  const importantDays = [
    {
      date: new Date(currentDate.getFullYear(), 3, 28), // April 28
      event: "Term 1 Results Day",
      type: "results"
    },
    {
      date: new Date(currentDate.getFullYear(), 7, 18), // August 18
      event: "Term 2 Results Day",
      type: "results"
    },
    {
      date: new Date(currentDate.getFullYear(), 11, 8), // December 8
      event: "End of Year Results",
      type: "results"
    },
    {
      date: new Date(currentDate.getFullYear(), 1, 15), // February 15
      event: "Open Day",
      type: "openDay"
    },
    // Add more important days as needed
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
    return { name: "Holiday" }
  }

  // Calendar generation functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getImportantDay = (date: Date) => {
    return importantDays.find(day => 
      day.date.getDate() === date.getDate() && 
      day.date.getMonth() === date.getMonth()
    )
  }

  // Navigation handlers
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
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
      const importantDay = getImportantDay(currentDay)
      const isToday = currentDay.toDateString() === today.toDateString()

      days.push(
        <div
          key={day}
          className={`h-16 border border-[#3D405B] p-2 cursor-pointer hover:bg-gray-100 
            ${isToday ? 'bg-[#3D405B] text-white' : 'bg-white text-[#3D405B]'}`}
        >
          <div className="font-bold">{day}</div>
          {importantDay && (
            <div
              className={`text-xs p-1 mt-1 rounded ${
                importantDay.type === 'results'
                  ? 'bg-[#F2CC8F]'
                  : 'bg-blue-100'
              }`}
            >
              {importantDay.event}
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
    <div  className="w-full text-[#3D405B]">
      {/* Current Term Title */}
      <div className="text-center font-bold text-lg">
        {currentTerm.name}
      </div>
      <Card className='border border-[#3D405B]'>
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
          {/* Legend */}
          <div className="flex gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F2CC8F] rounded border border-[#3D405B]"></div>
              <span>Results Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded border border-[#3D405B]"></div>
              <span>Open Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 rounded border border-[#3D405B]"></div>
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
