// Booking card component - displays front-end information about id, date, name, location, plate, price
// Child for UpcomingBookings.jsx and HistoryBookings.jsx

const BookingCard = ({ booking }) => {
	return (
		<>
			<div className='booking-id'>
				<h4>ID:</h4>
				<span>#{booking._id}</span>
			</div>
			<div className='booking-date'>
				<h4>Entry time:</h4>
				<span>{new Date(booking.entryDate).toLocaleDateString()}</span>
				<br />
				<span>{new Date(booking.entryDate).toLocaleTimeString()}</span>
			</div>
			<div className='booking-date'>
				<h4>Exit time:</h4>
				<span>{new Date(booking.exitDate).toLocaleDateString()}</span>
				<br />
				<span>{new Date(booking.exitDate).toLocaleTimeString()}</span>
			</div>
			<div className='booking-parking-name'>
				<h4>Parking name:</h4>
				<span>{booking.parkingName}</span>
			</div>
			<div className='booking-parking-location'>
				<h4>Location:</h4>
				<span>{booking.parkingAddress}</span>
			</div>
			<div className='booking-plate'>
				<h4>Plate number:</h4>
				<span>{booking.vehiclePlate}</span>
			</div>
			<div className='booking-price'>
				<h4>Total price:</h4>
				<span>£{booking.totalPrice}</span>
			</div>
		</>
	)
}

export default BookingCard
