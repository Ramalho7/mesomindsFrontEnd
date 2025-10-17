import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/questoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/questoes"!</div>
}
