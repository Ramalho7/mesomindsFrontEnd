import { z } from "zod";
import { ResponseAlternativeSchema } from "./alternativeSchema/ResponseAlternativeSchema";
import { UserSchema } from "../UserSchema";

export const QuestionDataSchema = z.object({
    title: z.string(),
    content: z.string(),
    correction: z.string().optional(),
    materia: z.number().nullable(),
    type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]),
    criador: z.number(),
    ultimo_editor: z.number(),
    status: z.enum(["Active", "Inactive"]),
    updated_at: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "updated_at deve ser uma data válida",
    }),
    created_at: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "created_at deve ser uma data válida",
    }),
    id: z.number(),
    alternatives: z.array(ResponseAlternativeSchema).optional(),
    creator: UserSchema,
    last_editor: UserSchema,
});

export const ResponseQuestionResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: QuestionDataSchema,
});

export type QuestionResponseType = z.infer<typeof ResponseQuestionResponseSchema>;
export type QuestionDataType = z.infer<typeof QuestionDataSchema>;