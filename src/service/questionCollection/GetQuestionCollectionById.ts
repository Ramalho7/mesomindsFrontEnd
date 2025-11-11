import api from "../axios";
import { ZodError } from "zod";
import { QuestionCollectionDataSchema, type QuestionCollectionData } from "../schemas/questionCollection/QuestionCollectionData";

export interface GetQuestionCollectionByIdResponse {
    success: boolean;
    data: QuestionCollectionData;
}

export async function GetQuestionCollectionByIdApi(id: number): Promise<QuestionCollectionData> {
    console.log(`Buscando coleção de questões com ID: ${id}`);

    try {
        const response = await api.get<GetQuestionCollectionByIdResponse>(
            `/api/questoescolecao/${id}`
        );

        console.log("Resposta do servidor:", response.data);
        
        const parsedData = QuestionCollectionDataSchema.parse(response.data.data);
        
        return parsedData;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.error("Erro de validação do zod:", error.issues);
            throw new Error("Erro ao validar dados da coleção de questões");
        }
        
        console.error("Erro na API:", error);
        
        if (error instanceof Error && error.message.includes("response")) {
            throw new Error("Coleção de questões não encontrada");
        }
        
        throw new Error("Erro ao buscar coleção de questões");
    }
}