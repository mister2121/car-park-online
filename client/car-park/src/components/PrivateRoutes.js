import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../UserContext"

const PrivateRoutes = () => {
	const { userInfo } = useContext(UserContext)

	// If userInfo is null that means the user is not logged in. Redirect him to /login route
	const isLoggedIn = userInfo !== null

	return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoutes
