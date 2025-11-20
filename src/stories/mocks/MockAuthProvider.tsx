import React from "react";
import { AuthContext } from "@/auth";
import type { AuthState } from "@/auth";

export function MockAuthProvider({
    value,
    children,
}: {
    value: AuthState;
    children: React.ReactNode;
}) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}