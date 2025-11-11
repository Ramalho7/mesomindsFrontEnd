import { z } from 'zod';
import { ResponseAlternativeSchema } from '../questionSchema/alternativeSchema/ResponseAlternativeSchema';

export const QuestionInCollectionSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    description: z.string().optional(),
    type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]),
    subject_id: z.number().optional(),
    correct_answer: z.string().optional(),
    correction: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
    alternatives: z.array(ResponseAlternativeSchema).optional(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type QuestionInCollectionType = z.infer<typeof QuestionInCollectionSchema>;