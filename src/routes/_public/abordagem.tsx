import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/abordagem')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/abordagem"!</div>
}
