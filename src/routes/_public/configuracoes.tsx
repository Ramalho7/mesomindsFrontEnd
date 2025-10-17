import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/configuracoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/configuracoes"!</div>
}
