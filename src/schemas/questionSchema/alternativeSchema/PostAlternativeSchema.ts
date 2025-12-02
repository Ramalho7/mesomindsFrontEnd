import { z } from "zod";

export const postAlternativeSchema = z.object({
    question_id: z.number().optional(),
    content: z.string().min(1, "O corpo da alternativa precisa ser preenchido"),
    correct: z.boolean().optional(),
})

export type PostAlternativeSchemaType = z.infer<typeof postAlternativeSchema>;