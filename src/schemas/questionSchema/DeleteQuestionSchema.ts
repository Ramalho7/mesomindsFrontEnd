import { z } from "zod";

const DeleteQuestionSchema = z.object({
    id: z.number().min(1, "ID da questão é obrigatório"),
});

export const DeleteQuestionResponseSchema = z.object({
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

export type DeleteQuestionPayload = z.infer<typeof DeleteQuestionSchema>;
export type DeleteQuestionResponse = z.infer<typeof DeleteQuestionResponseSchema>;