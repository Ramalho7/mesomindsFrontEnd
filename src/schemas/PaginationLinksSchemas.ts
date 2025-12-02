import { z } from "zod";

export const paginationLinkSchema = z.object({
    url: z.url().nullable(),
    label: z.string(),
    page: z.number().nullable(),
    active: z.boolean(),
});