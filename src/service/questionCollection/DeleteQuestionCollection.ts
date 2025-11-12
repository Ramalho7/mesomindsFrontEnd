import api from "@/service/axios";
import type { DeleteQuestionCollectionResponse } from "../schemas/questionCollection/DeleteQuestionCollectionSchema";

export async function deleteQuestionCollection(id: number): Promise<DeleteQuestionCollectionResponse> {
    const response = await api.delete<DeleteQuestionCollectionResponse>(
        `/api/questoescolecao/${id}`
    );
    return response.data;
}
