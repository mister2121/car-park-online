import { useState } from "react"
import "../styles/login.css"
import "./validators/RegisterValidation.js"
import validateRegister from "./validators/RegisterValidation.js"
import { Navigate } from "react-router-dom"

export default function RegisterPage() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const [type, setType] = useState("")
	const [errors, setErrors] = useState({})
	const [redirect, setRedirect] = useState(false)

	async function register(ev) {
		ev.preventDefault()

		// Check if there any errors coming from the RegisterValidator.js 
		// If there are none, proceed with the register 
		
		const validationErrors = validateRegister(username, password, email, type)
		if (Object.keys(validationErrors).length === 0) {
			const response = await fetch("http://localhost:4000/register", {
				method: "POST",
				body: JSON.stringify({ username, password, email, type }),
				headers: { "Content-Type": "application/json" },
			})

			if (response.ok) {
				alert("Registration successful!")
				setRedirect(true)
			} else {

				// Error handling in case of bad request
				// Show an alert if username or email is already taken 

				const responseData = await response.json()
				if (response.status === 400) {
					const { error } = responseData
					if (error.includes("Username")) {
						alert("Username is already in use")
					} else if (error.includes("Email")) {
						alert("Email is already in use")
					}
				} else {
					alert("Registration failed")
				}
			}
		} else {
			setErrors(validationErrors)
		}
	}

	if (redirect) {
		return <Navigate to={"/login"} />
	}

	return (
		<div className='form-wrapper'>
			<div className='register-form-container'>
				<form className='register' onSubmit={register}>
					<h1>Register</h1>

					<input
						className='login-input'
						type='text'
						placeholder='username'
						value={username}
						onChange={ev => setUsername(ev.target.value)}
						required
					/>
					{errors.username && (
						<div className='register-error'>
							<span>{errors.username}</span>
						</div>
					)}

					<input
						className='login-input'
						type='text'
						placeholder='email'
						value={email}
						onChange={ev => setEmail(ev.target.value)}
						required
					/>
					{errors.email && (
						<div className='register-error'>
							<span>{errors.email}</span>
						</div>
					)}

					<input
						className='login-input'
						type='password'
						placeholder='password'
						value={password}
						onChange={ev => setPassword(ev.target.value)}
						required
					/>
					{errors.password && (
						<div className='register-error'>
							<span>{errors.password}</span>
						</div>
					)}

					<select
						className='login-input register-select'
						value={type}
						onChange={ev => setType(ev.target.value)}
						required>
						<option value=''>Select role</option>
						<option value='parking owner'>Parking owner</option>
						<option value='driver'>Driver</option>
					</select>
					{errors.type && (
						<div className='register-error'>
							<span>{errors.type}</span>
						</div>
					)}

					<button className='login-submit'>Register</button>
				</form>
			</div>
		</div>
	)
}
