import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
import "./Header.css"

export default function Header({ isHomePage }) {
	const { setUserInfo, userInfo } = useContext(UserContext)
	const navigate = useNavigate()
	const [isSticky, setIsSticky] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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
				console.error("Check login error:", error)
				setIsLoading(false)
			})
	}, [setUserInfo])

	useEffect(() => {
		const stickyNavbar = () => {
			if (window.scrollY > 0) {
				setIsSticky(true)
			} else {
				setIsSticky(false)
			}
		}
		window.addEventListener("scroll", stickyNavbar)
		return () => {
			window.removeEventListener("scroll", stickyNavbar)
		}
	}, [])

	function logout() {
		fetch("http://localhost:4000/logout", {
			credentials: "include",
			method: "POST",
		})
			.then(() => {
				document.cookie =
					"token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
				setUserInfo(null)
				navigate("/") // Redirect to home after logout
			})
			.catch(error => {
				console.error("Logout error:", error)
			})
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	const username = userInfo?.username
	const type = userInfo?.type

	return (
		<header
			className={`${isHomePage ? "homepage-header" : ""} ${
				isSticky ? "sticky" : ""
			}`}>
			<div className='header-container'>
				<Link to='/' className='logo'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
						className='logo'>
						<path d='M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z' />
					</svg>
					Car Park Online
				</Link>
				<nav className={`${isMenuOpen ? "open" : ""}`}>
					{username ? (
						<>
							{type === "driver" && (
								<>
									<Link to='/contact'>Contact us</Link>
									<Link to='/bookings'>My bookings</Link>
									<Link to='/profile'>Profile</Link>
								</>
							)}
							{type === "parking owner" && (
								<>
									<Link to='/contact'>Contact us</Link>
									<Link to='/parkings'>My parkings</Link>
									<Link to='/profile'>Profile</Link>
								</>
							)}
							<button onClick={logout} className='nav-bttn'>
								Log out
							</button>
						</>
					) : (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register' className='nav-bttn'>
								Register
							</Link>
						</>
					)}
				</nav>
				<button
					className='menu-toggle'
					onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
			<div className={`menu ${isMenuOpen ? "open" : ""}`}>
				{username ? (
					<>
						{type === "driver" && (
							<>
								<Link to='/contact'>Contact us</Link>
								<Link to='/bookings'>My bookings</Link>
								<Link to='/profile'>Profile</Link>
							</>
						)}
						{type === "parking owner" && (
							<>
								<Link to='/contact'>Contact us</Link>
								<Link to='/parkings'>My parkings</Link>
								<Link to='/profile'>Profile</Link>
							</>
						)}
						<button onClick={logout} className='nav-bttn'>
							Log out
						</button>
					</>
				) : (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/register' className='nav-bttn'>
							Register
						</Link>
					</>
				)}
			</div>
		</header>
	)
}
