import { Link } from "react-router-dom"
import "./listuserparking.css"
import { useEffect } from "react"
import { useState } from "react"
import Header from "./components/Header"
import ParkingTile from "./components/ParkingTile"

export default function Parkings() {
	const [parkings, setParkings] = useState([])
	const [parkingCount, setParkingCount] = useState(0)
	const [searchInput, setSearchInput] = useState("")

	useEffect(() => {
		const fetchParkings = async () => {
			try {
				const response = await fetch("http://localhost:4000/parkings", {
					credentials: "include",
				})
				if (!response.ok) {
					throw new Error()
				}
				const data = await response.json()
				setParkings(data)
				setParkingCount(data.length)
			} catch (error) {
				console.error("Error:", error)
			}
		}

		fetchParkings()
	}, [])

	const deleteParking = id => {
		fetch(`http://localhost:4000/parkings/${id}`, {
			method: "DELETE",
			credentials: "include",
		})
			.then(response => response.json())
			.then(() => {
				setParkings(values => {
					return values.filter(item => item._id !== id)
				})
				setParkingCount(prevCount => prevCount - 1)
			})
	}

	const filteredParkings = parkings.filter(parking =>
		parking.name.toLowerCase().includes(searchInput.toLowerCase())
	)

	return (
		<div className='main'>
			<Header 
				parkingCount={parkingCount}
				setSearchInput={setSearchInput}
				searchInput={searchInput}
			/>

			<div className='parkings-wrapper'>
				{filteredParkings.length > 0 &&
					filteredParkings.map(parking => (
						<ParkingTile 
							key={parking._id}
							parking={parking} 
							deleteParking={deleteParking} 
						/>
					))}
			</div>
		</div>
	)
}
