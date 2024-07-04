import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"
import SortingOptions from "./SortingOptions"

const ParkingList = ({
	listings,
	calculateDistance,
	selectedLocation,
	distanceFromLocation,
	setListings,
}) => {
	const [pageNumber, setPageNumber] = useState(0)

	// Filtering listings to show only nearby ( 5 km or closer ) to the searched location
	const filteredListings = listings.filter(listing => {
		if (listing.location) {
			const distance = calculateDistance(
				selectedLocation.coordinates.lat,
				selectedLocation.coordinates.lng,
				listing.location.coordinates[1],
				listing.location.coordinates[0]
			)
			return distance <= 5 // 5 km or less
		}
		return false
	})

	// "Select" button on each div with parking, link that redirects to the specific parking
	const showSelectButton = listingId => (
		<Link to={"/listing/" + listingId} type='button' className='select-listing'>
			Select
		</Link>
	)

	// Change page with pagination functionality
	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	// Pagination
	// specify amount of parkings that are supposed to be per page (parkingsPerPage)
	const parkingsPerPage = 7
	const pagesVisited = pageNumber * parkingsPerPage
	const pageCount = Math.ceil(filteredListings.length / parkingsPerPage)

	// Slicing parkings to show only specific amount per page
	const displayParkings = filteredListings
		.slice(pagesVisited, pagesVisited + parkingsPerPage)
		.map((listing, index) => (
			<div className='listing-list' key={listing._id}>
				<div key={listing._id} className='listing-info'>
					<div className='listing-image-wrapper'>
						<div className='listing-image'>
							{listing.photo?.[0] && (
								<img
									src={`http://localhost:4000/uploads/` + listing.photo?.[0]}
									alt=''
								/>
							)}
						</div>
					</div>
					<div className='listing-text'>
						<div className='listing-text-main'>
							<div className='listing-text-main-wrapper'>
								<div className='listing-name'>
									<h2>{listing.name}</h2>
								</div>
								<div className='listing-desc'>
									<h3>{listing.address}</h3>
								</div>
								<div className='listing-dist'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-6 h-6 car-icon'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
										/>
									</svg>
									<span>
										{listing.location
											? calculateDistance(
													selectedLocation.coordinates.lat,
													selectedLocation.coordinates.lng,
													listing.location.coordinates[1],
													listing.location.coordinates[0]
											  ).toFixed(2) + " km away"
											: "Distance not available"}
									</span>
								</div>
							</div>
							<div className='listing-button'>
								{showSelectButton(listing._id)}
							</div>
						</div>
						<div className='listing-text-extra'>
							<div className='listing-price'>
								<span>£{parseFloat(listing.hourPrice).toFixed(2)}/hr</span>
							</div>
							<div className='listing-open-times'>
								<span className='open-span'>Open:</span>
								<span>
									{listing.openTime} - {listing.closeTime}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		))

	return (
		<>
			<div className='listings-header-options'>
				<div className='listings-header-location'>
					<h3>
						Found
						<span style={{ color: "#cf5734" }}>
							{" "}
							{filteredListings.length}{" "}
						</span>
						parkings nearby (5km or less):
					</h3>
					<h3>{selectedLocation.name}</h3>
				</div>
				<SortingOptions
					setListings={setListings}
					listings={listings}
					calculateDistance={calculateDistance}
					selectedLocation={selectedLocation}
				/>
			</div>

			{displayParkings}

			<ReactPaginate
				previousLabel={"Previous"}
				nextLabel={"Next"}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={"paginationBttns"}
				previousLinkClassName={"previousBttn"}
				nextLinkClassName={"nextBttn"}
				disabledClassName={"paginationDisabled"}
				activeClassName={"paginationActive"}
			/>
		</>
	)
}

export default ParkingList
