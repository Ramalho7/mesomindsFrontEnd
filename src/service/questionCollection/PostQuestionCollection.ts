import { ZodError } from "zod";
import api from "@/service/axios";
import { PostQuestionCollectionSchema, type PostQuestionCollectionType } from "../../schemas/questionCollection/PostQuestionCollection";
import type { QuestionCollectionData } from "../../schemas/questionCollection/QuestionCollectionData";

export interface CreateQuestionCollectionResponse {
    success: boolean;
    message: string;
    data: QuestionCollectionData;
}

export async function createQuestionCollection(
    data: PostQuestionCollectionType
): Promise<CreateQuestionCollectionResponse> {
    try {
        const validatedData = PostQuestionCollectionSchema.parse(data);

        console.log("Dados validados:", validatedData);

        const response = await api.post<CreateQuestionCollectionResponse>(
            "/api/questoescolecao",
            validatedData
        );

        console.log("Coleção criada com sucesso:", response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.error("Erro de validação do zod:", error.issues);
            throw new Error(
                "Dados inválidos para criação da coleção: " + 
                error.issues.map(i => i.message).join(", ")
            );
        }
        console.error("Erro ao criar coleção de questões:", error);
        throw new Error("Não foi possível criar a coleção de questões");
    }
}