import api from "@/service/axios";
import { PostQuestionSchema, type PostQuestionSchemaType } from "../schemas/questionSchema/PostQuestionSchema";
import { ResponseQuestionResponseSchema, type QuestionResponseType } from "../schemas/questionSchema/ResponseQuestionSchema";

export async function postQuestion(questionData: PostQuestionSchemaType): Promise<QuestionResponseType> {
    try {
        const validatedData = PostQuestionSchema.parse(questionData);

        const response = await api.post("/api/questoes", validatedData);

        console.log("Resposta do servidor:", response.data);

        const validatedResponse = ResponseQuestionResponseSchema.parse(response.data);

        console.log("Resposta validada com sucesso:", validatedResponse);
        return validatedResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erro ao criar questão:", error.message);

            if ((error as any).response?.data) {
                console.error("Erro da API:", (error as any).response.data);
                throw new Error((error as any).response.data.message || "Erro ao criar questão");
            }
        }

        throw new Error("Erro inesperado ao criar questão");
    }
}