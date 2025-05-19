import React, { useState } from 'react'
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"


const Login = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    let navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await login(email, password)
            navigate("/dashboard")
        } catch (err) {
            console.log(err)
            const message = err.response?.data?.error || 'Login failed'
            setError(message)
        }
    }


    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center">
                    <svg
                        className="h-12 w-12 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 2C5.58 2 2 6 2 10s3.58 8 8 8 8-4 8-8-3.58-8-8-8zm0 14.93c-3.86 0-7-3.14-7-7s3.14-7 7-7v14.93z" />
                    </svg>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                            >
                                Sign in
                            </button>
                        </div>

                        {error && <p className="bg-red-50 py-2 px-4 rounded-md text-red-800">Error: {error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
