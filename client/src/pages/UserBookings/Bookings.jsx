import "./bookings.css"
import React, { useState, useEffect } from "react"
import UpcomingParkings from "./components/UpcomingBookings"
import HistoryBookings from "./components/HistoryBookings"

export default function Bookings() {
	const [currentPage, setCurrentPage] = useState("upcoming")
	const [bookings, setBookings] = useState([])

	// Fetching all bookings from a user
	useEffect(() => {
		fetch("http://localhost:4000/booking", {
			credentials: "include",
		})
			.then(response => response.json())
			.then(data => {
				setBookings(data)
			})
			.catch(error => console.error("Error fetching bookings: ", error))
	}, [])

	// If a booking's entry date (time) is later than current time, add that booking to "history" tab
	// Else, this booking is about to happen - set to "upcoming" tab

	const getCurrentDateTime = () => new Date()

	const upcomingBookings = bookings.filter(booking => {
		const entryDate = new Date(booking.entryDate)
		return entryDate > getCurrentDateTime()
	})

	const historyBookings = bookings.filter(booking => {
		const entryDate = new Date(booking.entryDate)
		return entryDate <= getCurrentDateTime()
	})

	// State controlling which page is currently open by the user - either upcoming or history (bookings)
	const handleCurrentPage = page => {
		setCurrentPage(page)
	}

	return (
		<div className='user-bookings-wrapper'>
			<div className='user-bookings-header'>
				<h2
					onClick={() => handleCurrentPage("upcoming")}
					className={currentPage === "upcoming" ? "active-page" : ""}>
					Upcoming
				</h2>
				<h2
					onClick={() => handleCurrentPage("history")}
					className={currentPage === "history" ? "active-page" : ""}>
					Past
				</h2>
			</div>

			{/* If user clicked "Upcoming" show upcoming bookings */}

			{currentPage === "upcoming" && (
				<>
					<UpcomingParkings
						bookings={upcomingBookings}
						setBookings={setBookings}
					/>
				</>
			)}

			{/* If user clicked "History" show his past bookings  */}

			{currentPage === "history" && (
				<>
					<HistoryBookings bookings={historyBookings} />
				</>
			)}
		</div>
	)
}
