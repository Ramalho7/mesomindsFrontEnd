import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/turmas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/turmas"!</div>
}
