import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from './Interface/User'
import { useNavigate } from '@tanstack/react-router'

interface AuthState {
    isAuthenticated: boolean
    user: User | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Restore auth state on app load
    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (token) {
            // Validate token with your API
            fetch('http://localhost:8000/api/validatetoken', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((userData) => {
                    if (userData.user) {
                        setIsAuthenticated(true)
                        setUser(userData.user)
                    } else {
                        localStorage.removeItem('auth-token')
                    }
                })
                .catch(() => {
                    localStorage.removeItem('auth-token')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        )
    }

    const login = async (email: string, password: string) => {
        // Replace with your authentication logic
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
            const userData = await response.json()
            setIsAuthenticated(true)
            setUser(userData.user)
            // Store token for persistence
            localStorage.setItem('auth-token', userData.token)
            console.log('isAuthenticated após login:', true)
        } else {
            throw new Error('Authentication failed')
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('auth-token')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}