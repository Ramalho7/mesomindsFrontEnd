import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
    validateSearch: (search) => ({
        redirect: (search.redirect as string) || '/',
    }),
    beforeLoad: ({ context, search }) => {
        // Redirect if already authenticated
        if (context.auth.isAuthenticated) {
            throw redirect({ to: search.redirect })
        }
    },
    component: RegisterComponent,
})

function RegisterComponent() {
    const { auth } = Route.useRouteContext()
    const { redirect } = Route.useSearch()
    const navigate = Route.useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Validações
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem')
            setIsLoading(false)
            return
        }

        if (!formData.userType) {
            setError('Selecione um tipo de usuário')
            setIsLoading(false)
            return
        }

        try {
            // Aqui você implementaria a lógica de registro
            // await auth.register(formData)
            
            // Após registro bem-sucedido, redireciona para login
            navigate({ to: "/login" })
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white-50 py-12">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                {/* Cabeçalho */}
                <div className="text-center">
                    <h1 className="text-3xl font-black text-black-900">Crie sua conta</h1>
                    <h2 className="text-lg font-medium text-black-600 mt-2">
                        Destrave na matemática agora mesmo
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black-700 mb-1">
                            Nome
                        </label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Seu nome completo"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* E-mail */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black-700 mb-1">
                            E-mail
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black-700 mb-1">
                            Senha
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Crie uma senha segura"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Confirmar Senha */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black-700 mb-1">
                            Confirme sua senha
                        </label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Digite a senha novamente"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Tipo de Usuário */}
                    <div>
                        <label htmlFor="userType" className="block text-sm font-medium text-black-700 mb-1">
                            Tipo de usuário
                        </label>
                        <select
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            required
                        >
                            <option value="">Selecione o tipo </option>
                            <option value="student">Estudante</option>
                            <option value="teacher">Professor</option>
                            
                        </select>
                    </div>

                    {/* Botão Registrar */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        {isLoading ? 'Criando conta...' : 'Registrar'}
                    </Button>

                    {/* Link para Login */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Já possui conta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate({ to: "/login" })}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Faça login agora!
                            </button>
                        </p>
                    </div>
                </form>

                {/* Divisor */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Ou entre com</span>
                    </div>
                </div>

                {/* Botão Google */}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                </Button>
           </div>
       </div>
    )
}