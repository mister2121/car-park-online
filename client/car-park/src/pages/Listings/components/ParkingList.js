import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"

const ParkingList = ({
	listings,
	setListings,
	userLocation,
	setUserLocation,
	calculateDistance,
	parkingsVisited,
}) => {
	const [pageNumber, setPageNumber] = useState(0)

	const showSelectButton = listingId => (
		<Link to={"/listing/" + listingId} type='button' className='select-listing'>
			Select
		</Link>
	)

	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	const parkingsPerPage = 7
	const pagesVisited = pageNumber * parkingsPerPage
	const pageCount = Math.ceil(listings.length / parkingsPerPage)
	const displayParkings = listings
		.slice(pagesVisited, pagesVisited + parkingsPerPage)
		.map(listing => (
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
								<div className='listing-desc'>
									<h3>{listing.address}</h3>
								</div>
								<div className='listing-dist'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='1.5'
										stroke='currentColor'
										className='w-6 h-6 car-icon'>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
										/>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
										/>
									</svg>
									<span>
										{userLocation && listing.location
											? calculateDistance(
													userLocation.latitude,
													userLocation.longitude,
													listing.location.coordinates[1],
													listing.location.coordinates[0]
											  ).toFixed(2) + " km away"
											: "Distance not available"}
									</span>{" "}
								</div>
							</div>
							<div className='listing-button'>
								{showSelectButton(listing._id)}
							</div>
						</div>
						<div className='listing-text-extra'>
							<div className='listing-price'>
								<span>£{listing.hourPrice}/hr</span>
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
