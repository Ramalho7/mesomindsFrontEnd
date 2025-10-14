import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/provas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/provas"!</div>
}
