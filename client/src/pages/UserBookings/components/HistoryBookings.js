import BookingCard from "./BookingCard"

export default function HistoryBookings({ bookings }) {
	return (
		<div className='upcoming-container'>
			<div className='booking-card-header'>
				<h3>Your past bookings</h3>
			</div>

			{bookings.length > 0 ? (
				bookings.map(booking => (
					<div key={booking._id} className='booking-card'>
						<BookingCard booking={booking} />
						<div className='booking-actions'>
							<div className='booking-action'>
								<button type='button' className='booking-extend-bttn'>
									Give a review
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<div>No past bookings.</div>
			)}
		</div>
	)
}
