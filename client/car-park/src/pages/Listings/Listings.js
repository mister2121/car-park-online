import "../styles/listings.css"
import { useEffect, useState } from "react"
import ParkingList from "./components/ParkingList"
import GoogleMapListings from "./components/GoogleMapListings"
import SortingOptions from "./components/SortingOptions"

export default function Listings() {
	const [listings, setListings] = useState([])
	const [userLocation, setUserLocation] = useState(null)
	const [allParkings, setALlParkings] = useState(0)

	useEffect(() => {
		// setUserLocation({ latitude: 52.634358, longitude: -1.132811 })

		// Geolocation api needed to calculate the distance from parkings
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const latitude = position.coords.latitude
					const longitude = position.coords.longitude
					setUserLocation({ latitude, longitude })
				},
				error => {
					console.error(`Geolocation error: ${error.message}`)
				}
			)
		} else {
			console.error("Geolocation not supported in this browser")
		}

		fetch("http://localhost:4000/listings")
			.then(response => response.json())
			.then(data => {
				setListings(data)
				setALlParkings(data.length)
			})
			.catch(error => console.error("Error fetching listings: ", error))
	}, [])

	// Haversine formula to calculate the distance between user and a parking
	const calculateDistance = (lat1, lon1, lat2, lon2) => {
		const R = 6371 // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1)
		const dLon = deg2rad(lon2 - lon1)
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		const distance = R * c // Distance in km
		return distance
	}

	const deg2rad = deg => deg * (Math.PI / 180)

	return (
		<div className='listings-container'>
			<div className='listings-wrapper'>
				<div className='listings-header-options'>
					<div>
						<h3>Found {allParkings} parkings</h3>
					</div>
					<SortingOptions
						setListings={setListings}
						listings={listings}
						calculateDistance={calculateDistance}
						userLocation={userLocation}
					/>
				</div>
				<ParkingList
					listings={listings}
					setListings={setListings}
					userLocation={userLocation}
					setUserLocation={setUserLocation}
					calculateDistance={calculateDistance}
				/>
			</div>
			<GoogleMapListings listings={listings} />
			{/* <div className='google-api'>Google API tba</div> */}
		</div>
	)
}
