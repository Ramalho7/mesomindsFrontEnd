import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetContent } from "@/hooks/content/useGetContent";
import { fetchContents } from "@/service/content/getContent";

vi.mock("@/service/content/getContent");

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
});

describe("useGetContent", () => {
    it("should return data when fetchContents resolves successfully", async () => {
        const mockData: any[] = [
            { id: 1, title: "Content 1", content: "Lorem ipsum" },
            { id: 2, title: "Content 2", content: "Dolor sit amet" },
        ];
        (fetchContents as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useGetContent(), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);

        console.log(result.current);
    });

    it("should handle loading state correctly", async () => {
        (fetchContents as any).mockImplementation(() => new Promise(() => { }));

        const { result } = renderHook(() => useGetContent(), { wrapper });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();

        console.log(result.current);
    });

    it("should handle error state when fetchContents rejects", async () => {
        const mockError = new Error("Failed to fetch contents");
        (fetchContents as any).mockRejectedValue(mockError);

        const { result } = renderHook(() => useGetContent(), { wrapper });

        await waitFor(() => result.current.isError);

        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(mockError);

        console.log(result.current);
    });

    it("should pass correct params to fetchContents", async () => {
        const mockData: any[] = [];
        (fetchContents as any).mockResolvedValue(mockData);

        const params = { search: "test", status: "Ativo", page: 1 };
        const { result } = renderHook(() => useGetContent(params), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(fetchContents).toHaveBeenCalledWith(params);

        console.log(result.current);
    });

    it("should not fetch when enabled is false", async () => {
        const mockData: any[] = [];
        (fetchContents as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useGetContent(undefined, false), { wrapper });

        expect(result.current.isLoading).toBe(false);
        expect(fetchContents).not.toHaveBeenCalled();

        console.log(result.current);
    });

    it("should mark as fetched after successful fetch", async () => {
        const mockData: any[] = [{ id: 1, title: "Content 1" }];
        (fetchContents as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useGetContent(), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.isFetched).toBe(true);
        expect(result.current.data).toEqual(mockData);

        console.log(result.current);
    });
});