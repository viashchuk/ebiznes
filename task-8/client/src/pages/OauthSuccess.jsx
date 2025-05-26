import { useEffect } from 'react'
import { useNavigate } from "react-router"

import { useAuth } from "../hooks/useAuth"

const OauthSuccess = () => {
    const { loginWithOAuth } = useAuth()
    let navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const email = params.get('email')
        const name = params.get('name')
        console.log(params)

        if (token && email && name) {
            loginWithOAuth(token, { email, name })
            navigate('/dashboard')
        } else {
            // navigate('/login')
        }
    }, [])

    return <p>Logging in...</p>
}

export default OauthSuccess