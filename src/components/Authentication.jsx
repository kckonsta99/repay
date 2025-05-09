import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const {signup, login} = useAuth()


    async function handleAuthenticate() {
        if (!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating) {
            return
        }

        try {
            setIsAuthenticating(true)
            setError(null)

            if (isRegistration) {
                // register
                await signup(email, password)
            } else {
                // login
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        } finally {
            setIsAuthenticating(false)
        }
        
     
    }

    return (
        <>
            <h2 className="signuplogin">{isRegistration ? 'Sign up' : 'Login'}</h2>
            <p>{isRegistration ? 'Create an account' : 'Sign in to your account!'}</p>
            {error && (
                <p>❌ {error}</p>
            )}
            <input className="" value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} placeholder="Email" />
            <input value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder="********" type="password" />
            <button className="flyingBtnSub" onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
            <button className="flyingBtnDarkSub" onClick={() => {
                setIsRegistration(!isRegistration)
            }}>{isRegistration ? 'Login' : 'Sign up'}</button>
        </>
    )
}