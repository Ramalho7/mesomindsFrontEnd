import { describe, it, expect, vi } from "vitest";
import React from "react";
import { useGetMaterias } from "@/hooks/materia/useGetMateria";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchMaterias } from "@/service/materias/GetMaterias";

vi.mock("@/service/materias/GetMaterias");

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(QueryClientProvider, { client: queryClient }, children);

describe("useGetMaterias", () => {
    it("should return data when fetchMaterias resolves successfully", async () => {
        const mockData = [{ id: 1, title: "Materia 1" }, { id: 2, title: "Materia 2" }];
        (fetchMaterias as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
    });

    it("should handle loading state correctly", async () => {
        (fetchMaterias as any).mockImplementation(() => new Promise(() => { }));

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
    });

    it("should handle error state when fetchMaterias rejects", async () => {
        const mockError = new Error("Failed to fetch materias");
        (fetchMaterias as any).mockRejectedValue(mockError);

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        await waitFor(() => result.current.isError);

        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(mockError);
    });

    it("should use the correct query key", async () => {
        const mockData = [{ id: 1, title: "Materia 1" }];
        (fetchMaterias as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useGetMaterias(), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.isFetched).toBe(true);
    });
});