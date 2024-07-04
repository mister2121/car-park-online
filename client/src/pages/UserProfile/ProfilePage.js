import { UserContext } from "../../components/UserContext"
import { useContext, useEffect, useState } from "react"
import "./profile.css"
import validateEmail from "./validators/EmailValidator"
import validatePassword from "./validators/PasswordValidator"

export default function ProfilePage() {
	const { userInfo, setUserInfo } = useContext(UserContext)
	const [newEmail, setNewEmail] = useState("")
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [errors, setErrors] = useState({})

	async function updateEmail(ev) {
		ev.preventDefault()

		// Validate the email address
		const emailErrors = validateEmail(newEmail)
		if (Object.keys(emailErrors).length > 0) {
			setErrors(emailErrors)
			return
		}

		try {
			const response = await fetch(
				`http://localhost:4000/profile/email/${userInfo.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ email: newEmail }),
				}
			)

			if (!response.ok) {
				throw new Error("Failed to update email")
			}
			setUserInfo({ ...userInfo, email: newEmail })
			alert("Email updated successfully")
		} catch (error) {
			console.error("Error updating email:", error)
			alert("Something went wrong")
		}
	}

	async function updatePassword(ev) {
		ev.preventDefault()

		// Validate the old password
		const passValidation = validatePassword(oldPassword, newPassword, userInfo)
		if (Object.keys(passValidation).length > 0) {
			setErrors(passValidation)
			return
		}

		try {
			const response = await fetch(
				`http://localhost:4000/profile/password/${userInfo.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ oldPassword, newPassword }),
				}
			)

			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error)
			}
			alert("Password updated successfully")
		} catch (error) {
			console.error("Error updating password:", error)
			setErrors({ oldPassword: error.message })
		}
	}

	async function deleteAccount(ev) {
		ev.preventDefault()

		try {
			const response = await fetch(
				`http://localhost:4000/profile/${userInfo.id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			)

			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error)
			}
			setUserInfo(null)
		} catch (error) {
			console.error("Error updating password:", error)
			alert("Couldn't delete your account")
		}
	}
	
	// Display a loading message if userInfo was not loaded yet (it prevents the app from redirecting user to login page, when user decides to refresh the page)
	if (!userInfo) {
		return <div>Loading...</div>
	}

	return (
		<div className='profile-wrapper'>
			<div className='profile-header'>
				<h2>Profile settings</h2>
				<h2 style={{ color: "#cf5734" }}>{userInfo.username}</h2>
			</div>

			<div className='profile-settings-container'>
				<div className='profile-line'></div>
				<div className='profile-type'>
					<h2>Role</h2>
					<p>
						Your role is
						<span style={{ fontWeight: "bold" }}> {userInfo.type}</span>.
					</p>
				</div>
				<div className='profile-line'></div>
				<div className='profile-email'>
					<h2>Email address</h2>
					<div className='profile-email-change'>
						<div className='profile-email-change-content'>
							<p>
								Your current email address is
								<br />
								<span style={{ fontWeight: "bold" }}>{userInfo.email}</span>
							</p>
							<div>
								<label htmlFor='newemail'>New email</label>
								<input
									id='newemail'
									name='newemail'
									type='text'
									className='profile-input'
									onChange={ev => setNewEmail(ev.target.value)}></input>

								{errors.email && (
									<div className='register-error'>
										<span>{errors.email}</span>
									</div>
								)}
							</div>
						</div>
						<button
							type='submit'
							className='profile-submit'
							onClick={updateEmail}>
							Change email
						</button>
					</div>
				</div>
				<div className='profile-line'></div>
				<div className='profile-password'>
					<h2>Password</h2>
					<div className='profile-password-input-wrapper'>
						<div className='profile-password-input'>
							<label htmlFor='newpassword'>New password</label>
							<input
								id='newpassword'
								name='newpassword'
								type='password'
								className='profile-input'
								onChange={ev => setNewPassword(ev.target.value)}></input>
							{errors.newPassword && (
								<div className='register-error'>
									<span>{errors.newPassword}</span>
								</div>
							)}
						</div>

						<div className='profile-password-input'>
							<label htmlFor='oldpassword'>Old password</label>
							<input
								id='oldpassword'
								name='oldpassword'
								type='password'
								className='profile-input'
								onChange={ev => setOldPassword(ev.target.value)}></input>
							{errors.oldPassword && (
								<div className='register-error'>
									<span>{errors.oldPassword}</span>
								</div>
							)}
						</div>
					</div>
					<div className='profile-password-reset'>
						<p>Can't remember your current password?</p>
						<span className='profile-link'>Reset it</span>
					</div>
					<button
						type='submit'
						className='profile-submit'
						onClick={updatePassword}>
						Save password
					</button>
				</div>
				<div className='profile-line'></div>
				<div className='profile-delete'>
					<h2>Delete your account</h2>
					<p>You will receive an email to confirm your decision.</p>
					<p>
						Account deletion is final. There will be no way to restore your
						account.
					</p>
					<button
						type='submit'
						className='profile-delete-bttn'
						onClick={deleteAccount}>
						Delete account
					</button>
				</div>
			</div>
		</div>
	)
}
