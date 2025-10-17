import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/perfil')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/perfil"!</div>
}
