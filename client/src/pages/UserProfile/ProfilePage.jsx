import { UserContext } from "../../components/UserContext"
import { useContext, useEffect, useState } from "react"
import "./profile.css"
import validateEmail from "./validators/EmailValidator"
import validatePassword from "./validators/PasswordValidator"
import Email from "./components/Email"
import Role from "./components/Role"
import Password from "./components/Password"
import Delete from "./components/Delete"

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
				<Role 
					userInfo={userInfo} 
				/>
				<div className='profile-line'></div>
				<Email 
					userInfo={userInfo} 
					newEmail={newEmail} 
					setNewEmail={setNewEmail} 
					errors={errors} 
					updateEmail={updateEmail} 
				/>
				<div className='profile-line'></div>
				<Password 
					errors={errors}
					setNewPassword={setNewPassword}
					updatePassword={updatePassword}
					setOldPassword={setOldPassword}
				/>
				<div className='profile-line'></div>
				<Delete 
					deleteAccount={deleteAccount}
				/>
			</div>
		</div>
	)
}
