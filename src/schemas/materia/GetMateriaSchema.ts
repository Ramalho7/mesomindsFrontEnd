import { paginationLinkSchema } from "../PaginationLinksSchemas";
import { UserSchema } from "../UserSchema";
import { z } from "zod";

const materiaSchema = z.object({
    id: z.number(),
    nome: z.string(),
    descricao: z.string(),
    criador: z.number(),
    status: z.enum(["Ativo", "Inativo", "Bloqueado"]),
    ultimo_editor: z.number(),
    created_at: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "created_at deve ser uma data válida",
    }),
    updated_at: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "updated_at deve ser uma data válida",
    }),
    creator: UserSchema,
    last_editor: UserSchema,
});

export const getMateriaSchema = z.object({
    success: z.boolean(),
    data: z.object({
        current_page: z.number(),
        data: z.array(materiaSchema),
        first_page_url: z.url(),
        from: z.number(),
        last_page: z.number(),
        last_page_url: z.url(),
        links: z.array(paginationLinkSchema),
        next_page_url: z.url().nullable(),
        path: z.url(),
        per_page: z.number(),
        prev_page_url: z.url().nullable(),
        to: z.number(),
        total: z.number(),
    }),
});

export type GetMateriaResponseType = z.infer<typeof getMateriaSchema>;