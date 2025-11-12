import { z } from "zod";
import { postAlternativeSchema } from "./alternativeSchema/PostAlternativeSchema";

export const UpdateQuestionSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional(),
    correction: z.string().optional(),
    materia: z.number().nullable().optional(),
    type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]).optional(),
    alternatives: z.array(postAlternativeSchema).optional(),
});

export type EditQuestionPayload = z.infer<typeof UpdateQuestionSchema>;