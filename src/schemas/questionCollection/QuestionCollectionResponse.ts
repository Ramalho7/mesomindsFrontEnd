import { z } from "zod";
import { QuestionCollectionDataSchema } from "./QuestionCollectionData";
import { paginationLinkSchema } from "../PaginationLinksSchemas";

export const QuestionCollectionResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        current_page: z.number(),
        data: z.array(QuestionCollectionDataSchema),
        first_page_url: z.url(),
        from: z.number().nullable(),
        last_page: z.number(),
        last_page_url: z.url(),
        links: z.array(paginationLinkSchema),
        next_page_url: z.url().nullable(),
        path: z.url(),
        per_page: z.number(),
        prev_page_url: z.url().nullable(),
        to: z.number().nullable(),
        total: z.number(),
    }),
});

export type QuestionCollectionResponseType = z.infer<typeof QuestionCollectionResponseSchema>;