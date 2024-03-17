import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
