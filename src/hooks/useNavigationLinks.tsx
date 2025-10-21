import { useEffect, useState } from 'react'

export function useNavigationLinks() {
  const [isDashboard, setIsDashboard] = useState(false)

  useEffect(() => {
    const hostname = window.location.hostname
    setIsDashboard(hostname.startsWith('dashboard.') || hostname === 'dashboard.localhost')
  }, [])

  const publicLinks = [
    { to: '/simulados', label: 'Simulados' },
    { to: '/questoes', label: 'Questões' },
    { to: '/conteudos', label: 'Conteúdos' },
    { to: '/provas', label: 'Provas' },
    { to: '/turmas', label: 'Turmas' },
  ]

  const dashboardLinks = [
    { to: '/questoes', label: 'Questões' },
    { to: '/content/contents', label: 'Conteúdos' },
    { to: '/usuarios', label: 'Usuários' },
  ]

  const links = isDashboard ? dashboardLinks : publicLinks

  return { links, isDashboard }
}