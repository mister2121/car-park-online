import React, { useEffect, useState } from "react"
import "./singlelistingpage.css"
import { useParams } from "react-router-dom"
import ImageSlider from "./components/ImageSlider"
import SingleListingGoogle from "./components/SingleListingGoogle"
import BookingForm from "./components/BookingForm"

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
						<div className='single-listing-header'>
							<div className='single-listing-title-desc'>
								<h1>{parking.name}</h1>
							</div>
							<div className='single-listing-address'>
								<span>{parking.address}</span>
								<div className='single-listing-icons'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										style={{ width: "20px", height: "20px", fill: "white" }}>
										<path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
									</svg>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										style={{ width: "20px", height: "20px", fill: "white" }}>
										<path d='M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z' />
									</svg>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 448 512'
										style={{ width: "20px", height: "20px", fill: "white" }}>
										<path d='M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z' />
									</svg>
								</div>
							</div>
						</div>
						<div className='single-listing-details'>
							<div className='listing-card'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									style={{ width: "50px", height: "50px", fill: "white" }}>
									<path d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
								</svg>
								<div className='listing-card-info'>
									<span style={{ fontWeight: "bold" }}>Open:</span>
									<span>
										{parking.openTime} - {parking.closeTime}
									</span>
								</div>
							</div>
							<div className='listing-card'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 640 512'
									style={{ width: "50px", height: "50px", fill: "white" }}>
									<path d='M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
								</svg>
								<div className='listing-card-info'>
									<span style={{ fontWeight: "bold" }}>Capacity:</span>
									<span>{parking.maxCap}</span>
								</div>
							</div>
							<div className='listing-card'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 576 512'
									style={{ width: "50px", height: "50px", fill: "white" }}>
									<path d='M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z' />
								</svg>
								<div className='listing-card-info'>
									<span style={{ fontWeight: "bold" }}>Price per hour:</span>
									<span>£{parking.hourPrice}</span>
								</div>
							</div>
						</div>
						<div className='single-listing-desc'>
							<h1>Description</h1>
							<p>{parking.description}</p>
						</div>
						<div className='single-listing-location'>
							<h1>Map</h1>
							<div className='listing-google-api'>
								<SingleListingGoogle
									onLocationSelect={handleLocationSelect}
									initialLocation={selectedLocation}
								/>
							</div>
						</div>
						<div className='single-listing-reviews'>
							<div className='review-rating-wrapper'>
								<h1>Reviews</h1>
								<div className='review-rating'>
									<span>15 Reviews</span>
									<div className='review-rating-icon'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 576 512'
											style={{ width: "15px", height: "15px", fill: "gold" }}>
											<path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z' />
										</svg>
										<span>5.0</span>
									</div>
								</div>
							</div>
							<div className='review-card'>
								<div className='review-person'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										style={{ width: "40px", height: "40px", fill: "white" }}>
										<path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
									</svg>
									<div className='review-details'>
										<span className='review-card-name'>Cameron Williamson</span>
										<span className='review-card-date'>2 months ago</span>
									</div>
								</div>

								<p className='review-card-desc'>
									Lovely place, especially the location. Clean and secure.
									Definitely recommend.
								</p>
							</div>
							<div className='review-card'>
								<div className='review-person'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										style={{ width: "40px", height: "40px", fill: "white" }}>
										<path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
									</svg>
									<div className='review-details'>
										<span className='review-card-name'>Jenny Wilson</span>
										<span className='review-card-date'>2 months ago</span>
									</div>
								</div>

								<p className='review-card-desc'>
									Lovely place, especially the location. Clean and secure.
									Definitely recommend.
								</p>
							</div>
							<div className='review-card'>
								<div className='review-person'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										style={{ width: "40px", height: "40px", fill: "white" }}>
										<path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
									</svg>
									<div className='review-details'>
										<span className='review-card-name'>Jerome Bell</span>
										<span className='review-card-date'>2 months ago</span>
									</div>
								</div>
								<p className='review-card-desc'>
									Lovely place, especially the location. Clean and secure.
									Definitely recommend.
								</p>
							</div>
							<button className='send-btn'>Show all</button>
						</div>
						<div className='single-listing-contact'>
							<h1>Contact the owner</h1>
							<textarea
								className='message-text-area'
								rows='4'
								cols='50'
								placeholder='Write your message here'></textarea>
							<button className='send-btn'>Send message</button>
							<h2>Or call at: +44 1234 567890</h2>
						</div>
					</div>
					<div className='single-listing-booking-form'>
						<BookingForm parking={parking} setParking={setParking} />
					</div>
				</div>
			</div>
		</main>
	)
}
