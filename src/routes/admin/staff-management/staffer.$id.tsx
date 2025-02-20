import { createFileRoute } from "@tanstack/react-router"
import { TeacherDetailView } from "@/components/teacher-profile"

const Staffer = () => {
  return (
    <TeacherDetailView />
  )
}

export const Route = createFileRoute("/admin/staff-management/staffer/$id")({
  component: Staffer,
})

