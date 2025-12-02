import { z } from 'zod';
import { ResponseAlternativeSchema } from '../questionSchema/alternativeSchema/ResponseAlternativeSchema';

export const QuestionInCollectionSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    description: z.string().optional(),
    type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]),
    subject_id: z.number().optional(),
    materia: z.number().optional(),
    correct_answer: z.string().optional(),
    correction: z.string().optional(),
    status: z.string().optional(),
    criador: z.number().optional(),
    ultimo_editor: z.number().optional(),
    pivot: z.object({
        collection_id: z.number(),
        question_id: z.number(),
        status: z.string(),
        order: z.number(),
        created_by: z.number(),
        updated_by: z.number(),
        created_at: z.string(),
        updated_at: z.string(),
    }).optional(),
    alternatives: z.array(ResponseAlternativeSchema).optional(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type QuestionInCollectionType = z.infer<typeof QuestionInCollectionSchema>;