import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router' 

export const Route = createFileRoute('/_dashboard/content/contents')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='flex flex-col'>Hello "/_dashboard/content/contents"!
    <Link to='/content/createcontent'>Create contents</Link>
  </div>
)
}
