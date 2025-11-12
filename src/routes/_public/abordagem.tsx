import { createFileRoute } from '@tanstack/react-router'
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute('/_public/abordagem')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<><div className="bg-gray-50 border-b py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <header>
    <nav className="flex space-x-2 text-sm text-green-600">
    <Link to="/">Home/</Link>
    <Link to="/abordagem">Abordagem</Link>
    </nav>
    </header>
  </div>
</div><section className="py-12 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <h1 className="text-4xl md:text-5xl font-bold text-black-900 mb-6">
        Nossa Abordagem
      </h1>
      <p className="text-lg md:text-xl text-black-700 mb-6 leading-relaxed">
        Só que não é só diversão: cada conteúdo é construído com metodologia,
        curadoria e adaptação ao seu ritmo. O resultado? Uma experiência que
        prende a atenção e faz o aprendizado durar muito mais tempo.
      </p>
      <p className="text-lg text-black-700 leading-relaxed">
        Aqui, aprender não tem cara de sala de aula chata. As atividades são curtas,
        dinâmicas e pensadas para parecer mais um jogo do que uma apostila. Quando o
        estudo diverte, fica muito mais fácil manter o foco e aprender de verdade.
      </p>
    </div>
    <br></br>
    <hr></hr> 
  </section><section className="py-12 bg-black-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-black-900 mb-6">
            Aprendizado baseado em prática
          </h2>
          <p className="text-lg text-black-700 mb-4 leading-relaxed">
            <strong>Aprender não é só teoria, é colocar a mão na massa!</strong>
          </p>
          <p className="text-black-600 mb-6 leading-relaxed">
            Nossa plataforma foca em exercícios práticos que ajudam você a fixar o
            conteúdo de forma natural e divertida, transformando cada estudo em um
            passo real rumo ao domínio do assunto.
          </p>
          <p className="text-black-600 leading-relaxed">
            Tenha à disposição questões, simulados, quizzes e provas que permitem
            testar seus conhecimentos e acompanhar sua evolução passo a passo.
          </p>
        </div>
        <div className="flex-1">
          <div>
          <img className="bg-blue-100 rounded-lg h-64 w-full flex items-center justify-center text-blue-600 text-lg font-semibold" 
          src= "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?semt=ais_hybrid&w=740&q=80"/>
          </div>
        </div>
      </div>
    </div>
    <br></br>
    <hr></hr>
  </section><section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-black-900 mb-6">
            Conteúdo feito para você
          </h2>
          <p className="text-black-600 mb-6 leading-relaxed">
            Mais do que oferecer materiais prontos, nossa plataforma entrega
            conteúdos selecionados e produzidos com curadoria especializada.
          </p>
          <p className="text-black-600 leading-relaxed">
            Cada atividade é pensada para se adaptar ao seu ritmo e estilo de
            aprendizado, garantindo que você estude com o que realmente faz
            diferença para o seu progresso.
          </p>
        </div>
        <div className="flex-1">
        <div>
          <img className="bg-blue-100 rounded-lg h-64 w-full flex items-center justify-center text-blue-600 text-lg font-semibold" 
          src= "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?semt=ais_hybrid&w=740&q=80"/>
          </div>
        </div>
      </div>
    </div>
    <br></br>
    <hr></hr>
  </section><section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-black-900 mb-6">
            Uma aprendizagem que prende sua atenção
          </h2>
          <p className="text-black-700 mb-6 leading-relaxed">
            Aprender não precisa ser cansativo. Nossa plataforma combina metodologias
            modernas, como Aprendizagem Baseada em Problemas e Projetos, Microlearning
            e Ensino Colaborativo, sempre com uma camada de gamificação que transforma
            o estudo em uma experiência divertida e instigante.
          </p>
        </div>
        <div className="flex-1">
        <div>
          <img className="bg-blue-100 rounded-lg h-64 w-full flex items-center justify-center text-blue-600 text-lg font-semibold" 
          src= "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?semt=ais_hybrid&w=740&q=80"/>
          </div>
        </div>
      </div>
    </div>
    <br></br>
    <hr></hr>
  </section><section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-black-900 mb-6">
            Sempre Evoluindo
          </h2>
          <p className="text-black-600 mb-6 leading-relaxed">
            Aqui, aprender é uma aventura! Cada atividade, prova, questão ou simulado
            que você completa deixa a sua pegada registrada, mostrando para a gente
            como tornar sua jornada de estudo mais poderosa e divertida.
          </p>
          <p className="text-black-600 leading-relaxed">
            Com essas pegadas, criamos novos conteúdos, ajustamos rotinas, inventamos
            recursos inéditos e garantimos que cada minuto que você passa estudando
            valha de verdade. Crescer junto com você é a nossa missão, e nunca paramos
            de evoluir!
          </p>
        </div>
        <div className="flex-1">
        <div>
          <img className="bg-blue-100 rounded-lg h-64 w-full flex items-center justify-center text-blue-600 text-lg font-semibold" 
          src= "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?semt=ais_hybrid&w=740&q=80"/>
          </div>
        </div>
      </div>
    </div>
  </section></>
)
}

