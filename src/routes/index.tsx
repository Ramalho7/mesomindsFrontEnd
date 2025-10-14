import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <Button asChild>
        <a href="/example">Link como botão</a>
      </Button>
    </div>
  )
}
