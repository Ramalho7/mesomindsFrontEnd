import { ZodError } from "zod";
import api from "@/service/axios";
import type { ContentPayload } from "@/Interface/content/ContentPayload";
import { ContentByIdResponseSchema } from "../schemas/contentSchema/GetContentByIdSchema";



export async function fetchContent(id?: number): Promise<ContentPayload> {
  try {
    const url = `/api/conteudos/${id}`;
    const response = await api.get(url);
    console.log("Resposta da API:", response.data);

    const parsedResponse = ContentByIdResponseSchema.parse(response.data);
    console.log("Conteúdo validado:", parsedResponse.data);
    return parsedResponse.data;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Erro de validação do Zod:", error.issues);
    } else if (error instanceof Error) {
      console.error("Erro ao carregar o conteúdo:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Não foi possível carregar o conteúdo");
  }
}
