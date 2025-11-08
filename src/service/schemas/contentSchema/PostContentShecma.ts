import { z } from "zod";

export const createContentSchema = z
    .object({
        title: z
            .string()
            .min(1, "Título é obrigatório")
            .max(255, "Título muito longo"),
        content: z.string().min(1, "Conteúdo é obrigatório"),
        content_type: z.string().min(1, "Tipo de conteúdo é obrigatório"),
        tags: z.array(
            z.object({
                tag_name: z
                    .string()
                    .min(1, "Nome da tag é obrigatório")
                    .max(255, "Nome da tag muito longo"),
                description: z.string().optional(),
            }),
        ),
        status: z.enum(["Ativo", "Rascunho", "Arquivado"], {
            message: "Status deve ser Ativo, Rascunho ou Arquivado",
        }),
        is_moderator_only: z.boolean(),
        images: z.array(z.string()).optional(),
        image_alt_text: z.array(z.string()).optional(),
        published_at: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.images && data.image_alt_text) {
                return data.images.length === data.image_alt_text.length;
            }
            return true;
        },
        {
            message: "Cada imagem deve ter um texto alternativo correspondente",
            path: ["image_alt_text"],
        },
    );

export type CreateContentPayload = z.infer<typeof createContentSchema>;

export const createContentResponseSchema = z.object({
    success: z.boolean(),
    data: z
        .object({
            id: z.number(),
            title: z.string(),
            content: z.string(),
            created_at: z.string(),
        })
        .optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type CreateContentResponse = z.infer<typeof createContentResponseSchema>;