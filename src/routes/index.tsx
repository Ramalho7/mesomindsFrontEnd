import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <Button asChild>
          <a href="/example">Link como botão</a>
        </Button>
      </header>
    </div>
  )
}
