import ClassView from '@/components/class'
import { createFileRoute } from '@tanstack/react-router'

const TeacherClassView = () => {
  return <ClassView isAdmin={false} teacherSubject="Mathematics" />
}

export const Route = createFileRoute('/$school/dashboard/classes/$id/')({
  component: TeacherClassView,
})
