import { z } from 'zod'

export const imageSchema = z.object({
    id: z.number(),
    file_name: z.string(),
    file_path: z.string().nullable(),
    alt_text: z.string(),
    base64_data: z.string().nullable(),
});