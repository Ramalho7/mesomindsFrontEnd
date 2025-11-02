export type Creator = {
    id: number
    nome: string
    email: string
    tipo: string
    criador?: number | null | undefined
    ultimo_editor?: number | null | undefined
    status: string
    created_at: string
    updated_at: string
}