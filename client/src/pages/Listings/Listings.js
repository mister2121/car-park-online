import "./listings.css"
import { useEffect, useState } from "react"
import ParkingList from "./components/ParkingList"
import GoogleMapListings from "./components/GoogleMapListings"
import { useLocation } from "react-router-dom"

// Haversine formula to calculate the distance between two locations
const deg2rad = deg => deg * (Math.PI / 180)

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

export default function Listings() {
	const [distanceFromLocation, setDistanceFromLocation] = useState([])
	const [listings, setListings] = useState([])
	const [allParkings, setAllParkings] = useState(0)
	const location = useLocation()
	const selectedLocation = location.state.selectedLocation

	useEffect(() => {
		if (selectedLocation) {
			fetch("http://localhost:4000/listings")
				.then(response => response.json())
				.then(data => {
					// Sort the listings based on distance to selected location
					const sortedData = data.sort(
						(a, b) =>
							calculateDistance(
								selectedLocation.coordinates.lat,
								selectedLocation.coordinates.lng,
								a.location.coordinates[1],
								a.location.coordinates[0]
							) -
							calculateDistance(
								selectedLocation.coordinates.lat,
								selectedLocation.coordinates.lng,
								b.location.coordinates[1],
								b.location.coordinates[0]
							)
					)

					// Calculate and store distance for each parking
					const distances = sortedData.map(parking =>
						calculateDistance(
							selectedLocation.coordinates.lat,
							selectedLocation.coordinates.lng,
							parking.location.coordinates[1],
							parking.location.coordinates[0]
						)
					)
					setDistanceFromLocation(distances)

					setListings(data)
					setAllParkings(data.length)
				})
				.catch(error => console.error("Error fetching listings: ", error))
		}
	}, [selectedLocation])

	return (
		<div className='listings-container'>
			<div className='listings-wrapper'>
				<ParkingList
					listings={listings}
					setListings={setListings}
					calculateDistance={calculateDistance}
					distanceFromLocation={distanceFromLocation}
					allParkings={allParkings}
					selectedLocation={selectedLocation}
				/>
			</div>
			<GoogleMapListings
				listings={listings}
				selectedLocation={selectedLocation}
			/>
		</div>
	)
}
