import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Select } from '@radix-ui/react-select'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/register')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/perfil',
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {

  const { auth } = Route.useRouteContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tipo, setTipo] = useState<"Aluno" | "Professor" | "">("")
  const [nome, setNome] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (tipo === "") {
      setError('Selecione o tipo de usuário')
      setIsLoading(false)
      return
    }

    try {
      await auth.register(email, password, password_confirmation, nome, tipo)

      navigate({ to: "/perfil" })
    } catch (err) {
      setError('Não foi possível seguir com o registro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center  flex flex-col gap-[8px]'>
      <form onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 p-6 border rounded-lg items-center justify-center">
        <h1 className='text-2xl font-black text-center'>Crie sua conta</h1>
        <h2 className='text-lg font-medium text-center'>Destrave na matemática agora mesmo</h2>
        <div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <Input
              id="nome"
              name='nome'
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Senha
            </label>
            <Input
              id="password"
              name='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
              required
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium mb-1">
              Confirme a senha
            </label>
            <Input
              id="password_confirmation"
              name='password_confirmation'
              type="password"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[16px]"
              required
            />
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-1">
              Tipo de usuário
            </label>
            <Select
              value={tipo} onValueChange={(value) => setTipo(value as "Aluno" | "Professor")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aluno">Aluno</SelectItem>
                <SelectItem value="Professor">Professor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          variant={"action"}
          className='w-full disable:opacity-50 disable:cursor-not-allowed'
        >
          Registrar-se
        </Button>
        <Link
          to={"/login"}
          search={{ redirect: '/perfil' }}
        ><p>Já possui conta? <span className='underline decoration-accent'>Acesse agora.</span></p></Link>
      </form>
    </div>
  )
}
