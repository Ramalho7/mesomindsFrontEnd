import { z } from "zod";

export const postAlternativeSchema = z.object({
    question_id: z.number().optional(),
    content: z.string().min(1, "O corpo da alternativa precisa ser preenchido"),
    criador: z.number().optional(),
    ultimo_editor: z.number().nullish()
})

export type PostAlternativeSchemaType = z.infer<typeof postAlternativeSchema>;