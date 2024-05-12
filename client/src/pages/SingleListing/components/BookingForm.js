import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import PaymentModal from "./PaymentModal"
import validateBooking from "../validators/BookingValidator.js"

export default function BookingForm({ parking, setParking }) {
	const [entryDate, setEntryDate] = useState("")
	const [entryTime, setEntryTime] = useState("")
	const [exitDate, setExitDate] = useState("")
	const [exitTime, setExitTime] = useState("")
	const [vehiclePlate, setVehiclePlate] = useState("")
	const [carModel, setCarModel] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [totalPrice, setTotalPrice] = useState(0)
	const [redirect, setRedirect] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [errors, setErrors] = useState({})
	const [timeSlots, setTimeSlots] = useState([])

	const generateTimeSlots = (openTime, closeTime) => {
		const timeSlots = []
		let currentTime = new Date(`2000-01-01T${openTime}`)
		const endTime = new Date(`2000-01-01T${closeTime}`)

		while (currentTime <= endTime) {
			const formattedTime = currentTime.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})
			timeSlots.push(formattedTime)

			currentTime.setMinutes(currentTime.getMinutes() + 30)
		}

		return timeSlots
	}

	const calculateTotalPrice = () => {
		const pricePerHour = parking.hourPrice

		if (
			!entryDate ||
			!exitDate ||
			!entryTime ||
			!exitTime ||
			exitTime <= entryTime
		) {
			setTotalPrice(0)
			return
		}

		const isSameDay = entryDate === exitDate

		if (isSameDay) {
			let newEntryTime = new Date(`${entryDate}T${entryTime}`)
			let newExitTime = new Date(`${exitDate}T${exitTime}`)

			const totalTime = (newExitTime - newEntryTime) / 3600000
			const calculatedPrice = totalTime * pricePerHour
			setTotalPrice(calculatedPrice.toFixed(2))
		} else {
			setTotalPrice(0)
		}
	}

	useEffect(() => {
		calculateTotalPrice()
		setTimeSlots(generateTimeSlots(parking.openTime, parking.closeTime))
	}, [
		entryDate,
		exitDate,
		entryTime,
		exitTime,
		parking.openTime,
		parking.closeTime,
	])

	function handleCheckout() {
		const validationErrors = validateBooking(
			vehiclePlate,
			carModel,
			phoneNumber,
			entryDate,
			entryTime,
			exitDate,
			exitTime
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
				<label className='booking-label'>Entry date:</label>
				<input
					type='date'
					className='booking-input'
					value={entryDate}
					onChange={ev => setEntryDate(ev.target.value)}
					required
				/>
				{errors.entryDate && (
					<div className='register-error'>
						<span>{errors.entryDate}</span>
					</div>
				)}

				<label className='booking-label'>Entry time:</label>
				<select
					className='booking-input'
					value={entryTime}
					onChange={ev => {
						setEntryTime(ev.target.value)
						calculateTotalPrice()
					}}
					required>
					<option value=''>Select entry time</option>
					{timeSlots.map(slot => (
						<option key={slot} value={slot}>
							{slot}
						</option>
					))}
				</select>
				{errors.entryTime && (
					<div className='register-error'>
						<span>{errors.entryTime}</span>
					</div>
				)}

				<label className='booking-label'>Exit date:</label>
				<input
					type='date'
					className='booking-input'
					value={exitDate}
					onChange={ev => setExitDate(ev.target.value)}
					required
				/>
				{errors.exitDate && (
					<div className='register-error'>
						<span>{errors.exitDate}</span>
					</div>
				)}

				<label className='booking-label'>Exit time:</label>
				<select
					className='booking-input'
					value={exitTime}
					onChange={ev => {
						setExitTime(ev.target.value)
						calculateTotalPrice()
					}}
					required>
					<option value=''>Select exit time</option>
					{timeSlots.map(slot => (
						<option key={slot} value={slot}>
							{slot}
						</option>
					))}
				</select>
				{errors.exitTime && (
					<div className='register-error'>
						<span>{errors.exitTime}</span>
					</div>
				)}

				<label className='booking-label'>Vehicle plate number:</label>
				<input
					type='text'
					className='booking-input'
					placeholder='AF73 PKD'
					value={vehiclePlate}
					onChange={ev => setVehiclePlate(ev.target.value)}
					required
				/>
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
					required
				/>
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
						required
					/>
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
					entryTime={entryTime}
					exitDate={exitDate}
					exitTime={exitTime}
					vehiclePlate={vehiclePlate}
					carModel={carModel}
					phoneNumber={phoneNumber}
					totalPrice={totalPrice}
					parking={parking}
					setParking={setParking}
					setRedirect={setRedirect}
				/>
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
