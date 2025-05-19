import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div className="p-6 text-3xl font-semibold text-center text-gray-900">
            {user ? (
                <>
                    <h1>Welcome, {user.name}!</h1>
                    <p className="text-base text-gray-700">{user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Dashboard