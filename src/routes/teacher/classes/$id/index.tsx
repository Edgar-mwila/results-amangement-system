import ClassView from '@/components/class'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes/$id/')({
  component: ClassView,
})
