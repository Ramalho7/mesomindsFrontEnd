import { z } from "zod";

const UpdateAlternativeSchema = z.object({
    id: z.number().optional(), 
    content: z.string().min(1, "O conteúdo da alternativa é obrigatório"),
    correct: z.boolean(),
});

const UpdateQuestionSchema = z.object({
    id: z.number().optional(), 
    title: z.string().min(1, "O título é obrigatório"),
    content: z.string().min(1, "O conteúdo é obrigatório"),
    correction: z.string().optional(),
    type: z.enum(["Multipla", "VerdadeiroFalso", "Aberta"]),
    status: z.enum(["Active", "Inactive"]),
    alternatives: z.array(UpdateAlternativeSchema).optional(),
});

export const UpdateQuestionCollectionSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    subject_id: z.number().min(1, "A matéria é obrigatória").optional(),
    type: z.enum(["Simulation", "Exam", "Activity", "Exercise"]).optional(),
    due_date: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
    questions: z.array(UpdateQuestionSchema).min(1, "Adicione pelo menos uma questão"),
});

export type UpdateQuestionCollectionType = z.infer<typeof UpdateQuestionCollectionSchema>;
export type UpdateQuestionType = z.infer<typeof UpdateQuestionSchema>;
export type UpdateAlternativeType = z.infer<typeof UpdateAlternativeSchema>;
