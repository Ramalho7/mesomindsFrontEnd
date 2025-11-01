import type { LastEditor } from "@/Interface/LastEditor"
import type { Creator } from "../../Criator"

export interface ContentType {
  id: number
  title: string
  description: string
  creator: Creator
  last_editor: LastEditor
  created_at: string
  updated_at: string
  status: "Ativo" | "Inativo"
}