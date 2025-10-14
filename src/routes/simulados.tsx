import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/simulados')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/simulados"!</div>
}
