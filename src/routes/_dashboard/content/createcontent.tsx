import ContentForm from '@/components/ContentForm/ContentForm'
import Tiptap from '@/components/TipTap/Tiptap'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/content/createcontent')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentForm/>
  )
}