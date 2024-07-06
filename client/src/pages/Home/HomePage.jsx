import { Link } from "react-router-dom"
import "./homepage.css"
import SearchBox from "./components/SearchBox"
import Hero from "./components/Hero"
import Cards from "./components/Cards"
import ECO from "./components/ECO"
import About from "./components/About"

export default function HomePage() {
	return (
		<main>
			<Hero />
			<div className='info-one-container'>
				<Cards />
				<ECO />
				<About />
			</div>
		</main>
	)
}
