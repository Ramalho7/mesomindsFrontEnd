import { z } from "zod";

export const DeleteContentSchema = z.object({
    id: z.number().min(1, "ID do conteúdo é obrigatório"),
});

export type DeleteContentPayload = z.infer<typeof DeleteContentSchema>;

export const DeleteContentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z
        .object({
            id: z.number(),
            title: z.string(),
        })
        .optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type DeleteContentResponse = z.infer<typeof DeleteContentResponseSchema>;