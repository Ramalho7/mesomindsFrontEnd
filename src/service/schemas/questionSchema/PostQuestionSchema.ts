import { z } from "zod";
import { postAlternativeSchema } from "./alternativeSchema/PostAlternativeSchema";

export const PostQuestionSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    content: z.string().min(1, "O conteúdo é obrigatório"),
    correction: z.string().optional(),
    materia: z.number().nullable(),
    type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]),
    status: z.enum(["active", "inactive"]).default("active"),
    alternatives: z
        .array(postAlternativeSchema)
        .optional(),
}).refine(
    (data) => {
        if (data.type === "Multipla" || data.type === "VerdadeiroFalso") {
            return data.alternatives && data.alternatives.length > 0;
        }
        return true;
    },
    {
        message: "Questões do tipo 'Aberta' não podem conter alternativas",
        path: ["alternatives"],
    },
);

export type PostQuestionSchemaType = z.infer<typeof PostQuestionSchema>;

