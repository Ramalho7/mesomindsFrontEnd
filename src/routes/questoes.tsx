import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/questoes"!</div>
}
