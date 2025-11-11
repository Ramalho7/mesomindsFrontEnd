import { z } from "zod";

export const ResponseAlternativeSchema = z.object({
    id: z.number(),
    question_id: z.number(),
    content: z.string(),
    correct: z.union([z.boolean(), z.number()]), 
    created_at: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "created_at deve ser uma data válida",
    }),
    updated_at: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "updated_at deve ser uma data válida",
    }),
});