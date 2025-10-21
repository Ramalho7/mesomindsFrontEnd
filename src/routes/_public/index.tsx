import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import notes from '@/assets/images/2111.w039.n003.5B.p1.5.jpg';
import calc from '@/assets/images/2324019.jpg';
import math from '@/assets/images/2423222.jpg';

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  return (
    <>
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
      <div className='max-w-[500px] mt-10 mb-10 flex flex-col flex-wrap'>
        <h2 className='text-4xl font-black text-action'>Tudo o que você precisa para evoluir nos estudos</h2>
        <p className='text-lg text-muted-foreground mt-2'>Descubra com opodemos ajudar você a alcançar seus objetivos</p>
      </div>
      <div className='flex flex-col lg:flex-row gap-10'>
        <Link to='/abordagem'>
          <Card variant="feature" size="md" className="w-full h-auto rounded-t-xl">
            <CardHeader className='flex flex-col !gap-5'>
              <img src={math} className="w-full h-[250px] lg:w-[250px] lg:h-[235px] rounded-t-xl"/>
              <CardTitle>Questões comentadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Pratique com questões detalhadamente comentadas para entender cada conceito e melhorar seu desempenho.</p>
            </CardContent>
            <CardFooter>
              <Button variant={"action"}>Aprenda já</Button>
            </CardFooter>
          </Card>
        </Link>

        <Link to='/abordagem'>
          <Card variant="feature" size="md">
            <CardHeader className='flex flex-col !gap-5'>
              <img src={calc} className="w-full h-[250px] lg:w-[250px] lg:h-[235px] rounded-t-xl"/>
              <CardTitle>Conteúdos Exclusivos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Acesse materiais únicos e aprofundados, criados para facilitar seu aprendizado e garantir resultados.</p>
            </CardContent>
            <CardFooter>
              <Button variant={"action"}>Aprenda já</Button>
            </CardFooter>
          </Card>
        </Link>
        <Link to='/abordagem'>
          <Card variant="feature" size="md">
            <CardHeader className='flex flex-col !gap-5'>
              <img src={notes} className="w-full h-[250px] lg:w-[250px] lg:h-[235px] rounded-t-xl"/>
              <CardTitle>Simulados e Provas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Desafie-se com simulados e provas que simulam situações reais para testar seus conhecimentos.</p>
            </CardContent>
            <CardFooter>
              <Button variant={"action"}>Aprenda já</Button>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </>
  )
}