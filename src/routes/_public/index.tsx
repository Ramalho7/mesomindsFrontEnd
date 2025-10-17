import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  return (
    <div className="flex justify-left items-center w-full h-[615px] bg-[url('/src/assets/images/dinoBanner.svg')] bg-cover bg-center mt-[35px]">
      <div className='flex flex-col gap-[15px] w-[545px] h-[545px] bg-white/75 ml-5 px-[15px] py-[30px]'>
        <p className='text-5xl'>A evolução que você precisa para alcançar seus objetivos começa na <span className='font-black text-action'>Mesominds</span>.</p>
        <p className='text-2xl'>Aqui, você encontra apoio, conteúdo de qualidade e a evolução que sua jornada acadêmica precisa.</p>
        <div className='flex gap-[30px] items-center'>
          <Button variant={"action"} size={"lg"}asChild>
            <Link to="/login">Comece agora</Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link to="/sobre">Saiba mais</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
