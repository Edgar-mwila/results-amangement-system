import { SubjectPerformance } from '@/components/subject-performance'
import { createFileRoute } from '@tanstack/react-router'

const Subject: React.FC = () => {
  const subjectId = Route.useParams().id
  return <SubjectPerformance subjectId={subjectId} />
}

export const Route = createFileRoute('/admin/class-management/$id/subject/$id')(
  {
    component: Subject,
  },
)
