import BookingCard from "./BookingCard"

export default function UpcomingBookings({ bookings, setBookings }) {
	// Delete (Cancel) the booking on user's click

	const cancelBooking = id => {
		fetch(`http://localhost:4000/booking/${id}`, {
			method: "DELETE",
			credentials: "include",
		})
			.then(response => response.json())
			.then(() => {
				setBookings(values => {
					return values.filter(item => item._id !== id) // Delete (filter) from the state to remove from the site
				})
			})
			.catch(error => {
				console.error("Error canceling booking:", error)
			})
	}

	return (
		<div className='upcoming-container'>
			<div className='booking-card-header'>
				<h3>Your upcoming bookings</h3>
			</div>

			{/* Mapping through all the fetched bookings */}

			{bookings.length > 0 ? (
				bookings.map(booking => (
					<div key={booking._id} className='booking-card'>
						<BookingCard booking={booking} />
						<div className='booking-actions'>
							<div className='booking-action'>
								<button type='button' className='booking-extend-bttn'>
									Extend
								</button>
								<button
									type='button'
									className='booking-cancel-bttn'
									onClick={() => cancelBooking(booking._id)}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<div>No upcoming bookings</div>
			)}
		</div>
	)
}
