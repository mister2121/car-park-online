import React, { useEffect, useState } from "react"
import "./singlelistingpage.css"
import { useParams } from "react-router-dom"
import ImageSlider from "./components/ImageSlider"
import SingleListingGoogle from "./components/SingleListingGoogle"
import BookingForm from "./components/BookingForm"
import Header from "./components/Header"
import Details from "./components/Details"
import Description from "./components/Description"
import Reviews from "./components/Reviews"
import Contact from "./components/Contact"

export default function SingleListingPage() {
	const { id } = useParams()
	const [parking, setParking] = useState([])
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [selectedParkingLocation, setSelectedParkingLocation] = useState(null)

	const handleLocationSelect = location => {
		setSelectedLocation(location)
	}

	useEffect(() => {
		if (!id) {
			return
		}

		fetch("http://localhost:4000/parkings/" + id)
			.then(response => response.json())
			.then(data => {
				setParking(data)
				const initialLocation = {
					lat: data.location.coordinates[1],
					lng: data.location.coordinates[0],
				}

				setSelectedLocation(initialLocation)
			})
			.catch(error => console.error("Error fetching parking: ", error))
	}, [id])

	return (
		<main>
			<div className='single-listing-container'>
				<ImageSlider parking={parking} setParking={setParking} />
				<div className='single-listing-content'>
					<div className='single-listing-left-container'>
						<Header 
							parking={parking} 
						/>
						<Details 
							parking={parking}
						/>
						<Description 
							parking={parking}
						/>
						<div className='single-listing-location'>
							<h1>Map</h1>
							<div className='listing-google-api'>
								<SingleListingGoogle
									onLocationSelect={handleLocationSelect}
									initialLocation={selectedLocation}
								/>
							</div>
						</div>
						<Reviews />
						<Contact />
					</div>
					<BookingForm parking={parking} setParking={setParking} />
				</div>
			</div>
		</main>
	)
}
