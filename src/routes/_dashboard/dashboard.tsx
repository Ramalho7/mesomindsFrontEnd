import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Users, 
  GraduationCap,
  BarChart3,
  Trophy,
  ClipboardList
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const dashboardCards = [
    {
      title: 'Total de usuários',
      description: 'Houve um crescimento de 10% (mês)',
      value: '100',
      growth: '+10%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: null,
    },
    {
      title: 'Total de conteúdos',
      description: 'Houve um crescimento de 10% (mês)',
      value: '250',
      growth: '+10%',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/content',
    },
    {
      title: 'Total de simulados',
      description: 'Houve um crescimento de 10% (mês)',
      value: '20',
      growth: '+10%',
      icon: ClipboardList,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: null,
    },
    {
      title: 'Total de turmas',
      description: 'Houve um crescimento de 10% (mês)',
      value: '20',
      growth: '+10%',
      icon: GraduationCap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: null,
    },
    {
      title: 'Total de provas',
      description: 'Houve um crescimento de 0% (mês)',
      value: '20',
      growth: '0%',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: null,
    },
    {
      title: 'Simulados ativos',
      description: 'Houve um crescimento de 10% (mês)',
      value: '20',
      growth: '+10%',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      link: null,
    },
    {
      title: 'Questões',
      description: 'Houve um crescimento de 10% (mês)',
      value: 'Nenhum dado disponível',
      growth: null,
      icon: HelpCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/question',
    },
    {
      title: 'Coleções de Questões',
      description: 'Houve um crescimento de 10% (mês)',
      value: '20',
      growth: '+10%',
      icon: BarChart3,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      link: '/questionCollection',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de gerenciamento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon
          const CardWrapper = card.link ? Link : 'div'
          const cardProps = card.link ? { to: card.link, className: 'block' } : { className: 'block' }
          
          return (
            <CardWrapper key={index} {...cardProps}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <Icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    {card.growth && (
                      <span className={`text-sm font-semibold ${card.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {card.growth}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={`text-3xl font-bold ${card.value === 'Nenhum dado disponível' ? 'text-sm text-green-600' : 'text-secondary'}`}>
                    {card.value}
                  </p>
                  {card.growth && (
                    <p className="text-xs text-gray-500 mt-2">
                      Crescimento de: {card.growth}
                    </p>
                  )}
                </CardContent>
              </Card>
            </CardWrapper>
          )
        })}
      </div>
    </div>
  )
}
