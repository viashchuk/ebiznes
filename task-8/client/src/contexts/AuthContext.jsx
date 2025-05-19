import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const login = async (email, password) => {
        const data = await axios.post('http://localhost:3000/api/login', { email, password })

        if (data) {
            setUpToken(data.data.token)
            setUser(data.data.user)
        }

        return data
    }

    const value = {
        token,
        user,
        login
    }

    const setUpToken = (token) => {
        if (token) {
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        } else {
            localStorage.removeItem("token");
            axios.defaults.headers.common["Authorization"] = undefined
        }

        setToken(token)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        setUpToken(token)
    }, [])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}