import React, { useContext, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "./UserContext"

const PrivateRoutes = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch("http://localhost:4000/check-login", {
			credentials: "include",
		})
			.then(response => response.json())
			.then(data => {
				if (data.loggedIn) {
					setUserInfo(data.user)
				}
				setIsLoading(false)
			})
			.catch(error => {
				console.error("Login error:", error)
				setIsLoading(false)
			})
	}, [setUserInfo])

	// Wait to fetch user info
	if (isLoading) {
		return <div>Loading...</div>
	}

	// If userInfo is null that means the user is not logged in. Redirect him to /login route
	const isLoggedIn = userInfo !== null

	return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoutes
