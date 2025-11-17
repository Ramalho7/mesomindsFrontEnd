import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetContent } from "@/hooks/content/useGetContent";
import * as GetContentModule from "@/service/content/getContent";
import type { ContentPayloadResponse } from "@/Interface/content/ContentPayloadResponse";

vi.mock("@/service/content/getContent");

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
    vi.clearAllMocks();
    queryClient.clear();
});

describe("useGetContent", () => {
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

    const mockContentType = {
        id: 1,
        title: "Artigo",
        description: "Artigo informativo",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        status: "Ativo" as const,
        creator: mockUser,
        last_editor: mockUser,
    };

    const mockContentResponse: ContentPayloadResponse = {
        current_page: 1,
        data: [
            {
                id: 1,
                title: "Content 1",
                content: "Lorem ipsum",
                id_materia: null,
                content_types_id: 1,
                status: "Ativo",
                published_at: "2024-01-01",
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
                creator: mockUser,
                last_editor: mockUser,
                content_type: mockContentType,
                content_tags: [],
                images: null,
                is_moderator_only: false,
            },
            {
                id: 2,
                title: "Content 2",
                content: "Dolor sit amet",
                id_materia: null,
                content_types_id: 1,
                status: "Ativo",
                published_at: "2024-01-01",
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
                creator: mockUser,
                last_editor: mockUser,
                content_type: mockContentType,
                content_tags: [],
                images: null,
                is_moderator_only: false,
            },
        ],
        first_page_url: "http://localhost:8000/api/conteudos?page=1",
        from: 1,
        last_page: 1,
        last_page_url: "http://localhost:8000/api/conteudos?page=1",
        links: [
            { url: null, label: "&laquo; Previous", page: null, active: false },
            { url: "http://localhost:8000/api/conteudos?page=1", label: "1", page: 1, active: true },
            { url: null, label: "Next &raquo;", page: null, active: false },
        ],
        next_page_url: null,
        path: "http://localhost:8000/api/conteudos",
        per_page: 15,
        prev_page_url: null,
        to: 2,
        total: 2,
    };

    it("should return data when fetchContents resolves successfully", async () => {
        vi.spyOn(GetContentModule, "fetchContents").mockResolvedValue(mockContentResponse);

        const { result } = renderHook(() => useGetContent(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockContentResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
    });

    it("should handle loading state correctly", () => {
        vi.spyOn(GetContentModule, "fetchContents").mockImplementation(
            () => new Promise(() => { })
        );

        const { result } = renderHook(() => useGetContent(), { wrapper });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
    });

    it("should handle error state when fetchContents rejects", async () => {
        const mockError = new Error("Failed to fetch contents");
        vi.spyOn(GetContentModule, "fetchContents").mockRejectedValue(mockError);

        const { result } = renderHook(() => useGetContent(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true), {
            timeout: 3000,
        });

        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(mockError);
    });

    it("should pass correct params to fetchContents", async () => {
        const emptyResponse: ContentPayloadResponse = {
            ...mockContentResponse,
            data: [],
            total: 0,
            from: 0,
            to: 0,
        };
        vi.spyOn(GetContentModule, "fetchContents").mockResolvedValue(emptyResponse);

        const params = { search: "test", status: "Ativo", page: 1 };
        const { result } = renderHook(() => useGetContent(params), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(GetContentModule.fetchContents).toHaveBeenCalledWith(params);
    });

    it("should not fetch when enabled is false", () => {
        const emptyResponse: ContentPayloadResponse = {
            ...mockContentResponse,
            data: [],
            total: 0,
            from: 0,
            to: 0,
        };
        vi.spyOn(GetContentModule, "fetchContents").mockResolvedValue(emptyResponse);

        const { result } = renderHook(() => useGetContent(undefined, false), { wrapper });

        expect(result.current.isLoading).toBe(false);
        expect(GetContentModule.fetchContents).not.toHaveBeenCalled();
    });

    it("should mark as fetched after successful fetch", async () => {
        vi.spyOn(GetContentModule, "fetchContents").mockResolvedValue(mockContentResponse);

        const { result } = renderHook(() => useGetContent(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.isFetched).toBe(true);
        expect(result.current.data).toEqual(mockContentResponse);
    });
});