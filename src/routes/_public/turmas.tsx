import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/turmas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/turmas"!</div>
}
