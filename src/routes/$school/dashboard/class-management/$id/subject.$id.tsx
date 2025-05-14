import SubjectPerformance from '@/components/subject-performance'
import { createFileRoute } from '@tanstack/react-router'

const Subject: React.FC = () => {
  return <SubjectPerformance />
}

export const Route = createFileRoute(
  '/$school/dashboard/class-management/$id/subject/$id',
)({
  component: Subject,
})
