import { z } from "zod";

const DeleteQuestionCollectionSchema = z.object({
    id: z.number().min(1, "ID da coleção é obrigatório"),
});

export const DeleteQuestionCollectionResponseSchema = z.object({
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

export type DeleteQuestionCollectionPayload = z.infer<typeof DeleteQuestionCollectionSchema>;
export type DeleteQuestionCollectionResponse = z.infer<typeof DeleteQuestionCollectionResponseSchema>;
