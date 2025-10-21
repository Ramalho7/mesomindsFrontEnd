import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  return (
    <div className="flex justify-center items-center w-full h-[38.438rem] bg-[url('/src/assets/images/dinoBanner.svg')] bg-cover bg-center mt-[2.188rem]">
      <div className="flex flex-col items-center text-left justify-center gap-[15px] w-[90%] max-w-[80%] h-[85%] bg-white/75 px-[0.938rem] py-[1.875rem]">
        <p className="text-3xl sm:text-5xl text-center">
          A evolução que você precisa para alcançar seus objetivos começa na <span className="font-black text-action">Mesominds</span>.
        </p>
        <p className="text-xl sm:text-2xl text-center">
          Aqui, você encontra apoio, conteúdo de qualidade e a evolução que sua jornada acadêmica precisa.
        </p>
        <div className="flex flex-col sm:flex-row mt-[1.875rem] gap-[0.938rem] sm:gap-[1.875rem] items-center justify-center">
          <Button variant="action" size="lg" asChild>
            <Link to="/login">Comece agora</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/sobre">Saiba mais</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}