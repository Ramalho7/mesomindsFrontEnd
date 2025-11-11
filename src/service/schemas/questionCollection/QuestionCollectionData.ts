import { z } from 'zod';
import { UserSchema } from '../UserSchema';
import { QuestionInCollectionSchema } from './QuestionInCollection';

export const QuestionCollectionDataSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    subject_id: z.number(),
    type: z.string(),
    due_date: z.string(),
    created_by: UserSchema,
    updated_by: UserSchema,
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    questions: z.array(QuestionInCollectionSchema),
});

export type QuestionCollectionData = z.infer<typeof QuestionCollectionDataSchema>;