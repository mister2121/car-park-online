import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom"
import "./styles/login.css"

export default function LoginPage() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [redirect, setRedirect] = useState(false)
	const { setUserInfo } = useContext(UserContext)
	const [error, setError] = useState("")

	async function login(ev) {
		ev.preventDefault()
		const response = await fetch("http://localhost:4000/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
		if (response.ok) {
			response.json().then(userInfo => {
				setUserInfo(userInfo)
				setRedirect(true)
			})
		} else {
			setError("Wrong credentials, try again")
		}
	}

	if (redirect) {
		return <Navigate to={"/"} />
	}

	return (
		<div className='form-wrapper'>
			<div className='login-form-container'>
				<form className='login' onSubmit={login}>
					<h1>Login</h1>
					<input
						type='text'
						placeholder='username'
						className='login-input'
						value={username}
						onChange={ev => setUsername(ev.target.value)}
					/>
					<input
						type='password'
						placeholder='password'
						className='login-input'
						value={password}
						onChange={ev => setPassword(ev.target.value)}
					/>

					{error && (
						<div className='register-error'>
							<span className='error-message'>{error}</span>
						</div>
					)}
					<div className='login-password'>
						<span className='login- forgot-password'>Forgot password?</span>
					</div>
					<button className='login-submit'>Login</button>
				</form>
			</div>
		</div>
	)
}
