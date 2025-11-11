import QuestionCollectionForm from '@/components/QuestionCollectionForm/QuestionCollectionForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_dashboard/questionCollection/createQuestionCollection',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <QuestionCollectionForm/>
  )
}
