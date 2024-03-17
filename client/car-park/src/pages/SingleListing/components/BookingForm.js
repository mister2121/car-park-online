import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import PaymentModal from "./PaymentModal"
import validateBooking from "../validators/BookingValidator.js"

export default function BookingForm({ parking, setParking }) {
	const [entryDate, setentryDate] = useState("")
	const [exitDate, setexitDate] = useState("")
	const [vehiclePlate, setVehiclePlate] = useState("")
	const [carModel, setCarModel] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [totalPrice, setTotalPrice] = useState(0)
	const [redirect, setRedirect] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		calculateTotalPrice()
	}, [entryDate, exitDate])

	// Calculating total price of the booking
	const calculateTotalPrice = () => {
		const pricePerHour = parking.hourPrice

		if (!entryDate || !exitDate) {
			return // Exit early if either entryDate or exitDate is not set
		}

		const entryDateTime = new Date(entryDate)
		const exitDateTime = new Date(exitDate)

		if (entryDateTime >= exitDateTime) {
			setTotalPrice(0)
			return
		}

		const durationInMilliseconds = exitDateTime - entryDateTime // JavaScript automatically converts dates to milliseconds when subtracted
		const durationInHours = durationInMilliseconds / (1000 * 60 * 60) // Convert milliseconds to hours
		const calculatedPrice = durationInHours * pricePerHour
		setTotalPrice(calculatedPrice.toFixed(2))
	}

	function handleCheckout() {
		// Check if all required inputs are filled correctly before opening the modal
		const validationErrors = validateBooking(
			vehiclePlate,
			carModel,
			phoneNumber,
			entryDate,
			exitDate
		)
		if (Object.keys(validationErrors).length === 0) {
			setErrors({})
			setIsOpen(true)
		} else {
			setErrors(validationErrors)
		}
	}

	if (redirect) {
		return <Navigate to={redirect} />
	}
	return (
		<>
			<div className='single-listing-title'>
				<h1>Interested? Book now:</h1>
			</div>
			<form>
				<label className='booking-label'>From:</label>
				<input
					type='datetime-local'
					className='booking-input'
					value={entryDate}
					onChange={ev => {
						setentryDate(ev.target.value)
						calculateTotalPrice()
					}}
					required></input>
				{errors.entryDate && (
					<div className='register-error'>
						<span>{errors.entryDate}</span>
					</div>
				)}
				<label className='booking-label'>To:</label>
				<input
					type='datetime-local'
					className='booking-input'
					value={exitDate}
					onChange={ev => {
						setexitDate(ev.target.value)
						calculateTotalPrice()
					}}
					required></input>
				{errors.exitDate && (
					<div className='register-error'>
						<span>{errors.exitDate}</span>
					</div>
				)}
				<label className='booking-label'>Vehicle plate number:</label>
				<input
					type='text'
					className='booking-input'
					placeholder='AF73 PKD'
					value={vehiclePlate}
					onChange={ev => setVehiclePlate(ev.target.value)}
					required></input>
				{errors.vehiclePlate && (
					<div className='register-error'>
						<span>{errors.vehiclePlate}</span>
					</div>
				)}
				<label className='booking-label'>Car model:</label>
				<input
					type='text'
					className='booking-input'
					placeholder='Toyota'
					value={carModel}
					onChange={ev => setCarModel(ev.target.value)}
					required></input>
				{errors.carModel && (
					<div className='register-error'>
						<span>{errors.carModel}</span>
					</div>
				)}
				<label className='booking-label'>Your phone number:</label>
				<div className='tel-group'>
					<span>+44</span>
					<input
						type='tel'
						className='booking-input'
						placeholder='123456789'
						value={phoneNumber}
						onChange={ev => setPhoneNumber(ev.target.value)}
						required></input>
				</div>
				{errors.phoneNumber && (
					<div className='register-error'>
						<span>{errors.phoneNumber}</span>
					</div>
				)}
			</form>
			<br />
			<hr />
			<h2>Total: ${totalPrice}</h2>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<button className='checkout-btn' onClick={handleCheckout}>
					Checkout
				</button>
				<PaymentModal
					open={isOpen}
					onClose={() => setIsOpen(false)}
					entryDate={entryDate}
					exitDate={exitDate}
					vehiclePlate={vehiclePlate}
					carModel={carModel}
					phoneNumber={phoneNumber}
					totalPrice={totalPrice}
					parking={parking}
					setParking={setParking}
					setRedirect={setRedirect}></PaymentModal>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						borderBottom: "1px solid rgba(255,255,255,0.5)",
					}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
						style={{ width: "20px", height: "20px" }}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5'
						/>
					</svg>
					<a className='report-link'>Report this listing</a>
				</div>
			</div>
		</>
	)
}
