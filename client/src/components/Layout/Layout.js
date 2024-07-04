import { Outlet, useLocation } from "react-router-dom"
import Header from "../Header/Header.js"
import Footer from "../Footer/Footer.js"

export default function Layout() {
	const location = useLocation()
	const isHomePage = location.pathname === "/" // Check if current page is home

	return (
		<main>
			<Header isHomePage={isHomePage} />
			<Outlet />
			<Footer />
		</main>
	)
}
