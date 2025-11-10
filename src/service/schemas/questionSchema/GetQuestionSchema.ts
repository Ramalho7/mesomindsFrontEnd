import { z } from "zod";
import { QuestionDataSchema } from "./ResponseQuestionSchema";

export const GetQuestionsResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        current_page: z.number(),
        data: z.array(QuestionDataSchema),
        first_page_url: z.url(),
        from: z.number().nullable(),
        last_page: z.number(),
        last_page_url: z.url(),
        links: z.array(
            z.object({
                url: z.url().nullable(),
                label: z.string(),
                page: z.number().nullable(),
                active: z.boolean(),
            })
        ),
        next_page_url: z.url().nullable(),
        path: z.url(),
        per_page: z.number(),
        prev_page_url: z.url().nullable(),
        to: z.number().nullable(),
        total: z.number(),
    }),
});

export type GetQuestionsResponseType = z.infer<typeof GetQuestionsResponseSchema>;