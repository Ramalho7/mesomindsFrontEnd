import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/flashcards')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/flashcards"!</div>
}
