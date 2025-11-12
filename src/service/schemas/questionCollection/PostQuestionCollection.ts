import { z } from "zod";
import { PostQuestionSchema } from "../questionSchema/PostQuestionSchema";

export const PostQuestionCollectionSchema = z.object({
    title: z.string().min(1, "Título da coleção é obrigatório"),
    description: z.string().min(1, "Descrição da coleção é obrigatória"),
    subject_id: z.number().positive("Matéria é obrigatória"),
    type: z.enum(["Simulation", "Exam", "Activity", "Exercise"], {
        message: "Tipo de coleção inválido",
    }),
    due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data de vencimento inválida",
    }),
    status: z.enum(["Active", "Inactive"]).default("Active"),
    questions: z.array(PostQuestionSchema).min(1, "Adicione pelo menos uma questão"),
});

export type PostQuestionCollectionType = z.infer<typeof PostQuestionCollectionSchema>;