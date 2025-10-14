import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/conteudos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/conteudos"!</div>
}
