import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { useGetMaterias } from "@/hooks/materia/useGetMateria";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as GetMateriasModule from "@/service/materias/GetMaterias";
import type { GetMateriaResponseType } from "@/service/schemas/materia/GetMateriaSchema";

vi.mock("@/service/materias/GetMaterias");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
});

describe("useGetMaterias", () => {
    const mockUser = {
        id: 1,
        nome: "User 1",
        email: "user1@example.com",
        tipo: "admin",
        criador: null,
        ultimo_editor: null,
        status: "Ativo",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    };

    const mockMateriaResponse: GetMateriaResponseType = {
        success: true,
        data: {
            current_page: 1,
            data: [
                {
                    id: 1,
                    nome: "Materia 1",
                    descricao: "Descrição 1",
                    criador: 1,
                    status: "Ativo",
                    ultimo_editor: 1,
                    created_at: "2024-01-01T00:00:00Z",
                    updated_at: "2024-01-01T00:00:00Z",
                    creator: mockUser,
                    last_editor: mockUser,
                },
                {
                    id: 2,
                    nome: "Materia 2",
                    descricao: "Descrição 2",
                    criador: 1,
                    status: "Ativo",
                    ultimo_editor: 1,
                    created_at: "2024-01-01T00:00:00Z",
                    updated_at: "2024-01-01T00:00:00Z",
                    creator: mockUser,
                    last_editor: mockUser,
                },
            ],
            last_page: 1,
            per_page: 15,
            total: 2,
            from: 1,
            to: 2,
            first_page_url: "http://localhost:8000/api/materias?page=1",
            last_page_url: "http://localhost:8000/api/materias?page=1",
            next_page_url: null,
            prev_page_url: null,
            path: "http://localhost:8000/api/materias",
            links: [
                { url: null, label: "&laquo; Previous", page: null, active: false },
                { url: "http://localhost:8000/api/materias?page=1", label: "1", page: 1, active: true },
                { url: null, label: "Next &raquo;", page: null, active: false },
            ],
        },
    };

    it("should return data when fetchMaterias resolves successfully", async () => {
        vi.spyOn(GetMateriasModule, "fetchMaterias").mockResolvedValue(mockMateriaResponse);

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockMateriaResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
    });

    it("should handle loading state correctly", () => {
        vi.spyOn(GetMateriasModule, "fetchMaterias").mockImplementation(
            () => new Promise(() => { })
        );

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
    });

    it("should handle error state when fetchMaterias rejects", async () => {
        const mockError = new Error("Failed to fetch materias");
        vi.spyOn(GetMateriasModule, "fetchMaterias").mockRejectedValue(mockError);

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true), {
            timeout: 3000,
        });

        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(mockError);
    });

    it("should use the correct query key", async () => {
        vi.spyOn(GetMateriasModule, "fetchMaterias").mockResolvedValue(mockMateriaResponse);

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockMateriaResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.isFetched).toBe(true);
    });
});