import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import validatePayment from "../validators/PaymentValidator"
import SuccessModal from "./SuccessModal"

const OVERLAY_STYLE = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	zIndex: 1000,
}

const CARD_STYLE = {
	display: "flex",
	flexDirection: "row",
	gap: 10,
}

export default function PaymentModal({
	open,
	children,
	onClose,
	entryDate,
	entryTime,
	exitDate,
	exitTime,
	vehiclePlate,
	carModel,
	phoneNumber,
	totalPrice,
	parking,
	setParking,
	setRedirect,
}) {
	const [name, setName] = useState("")
	const [cardNumber, setCardNumber] = useState("")
	const [expiryDate, setExpiryDate] = useState("")
	const [cvv, setCvv] = useState("")
	const [errors, setErrors] = useState({})
	const [paymentSuccess, setPaymentSuccess] = useState(false)

	if (!open) return null

	// Formatting the date and time for better user experience
	const formatDate = dateString => {
		const date = new Date(dateString)
		return date.toLocaleString("en-UK")
	}

	async function bookParking(ev) {
		ev.preventDefault()

		// Validate payment details
		const validationErrors = validatePayment(name, cardNumber, expiryDate, cvv)

		if (Object.keys(validationErrors).length === 0) {
			const data = {
				parkingName: parking.name,
				parkingAddress: parking.address,
				entryDate,
				entryTime,
				exitDate,
				exitTime,
				phoneNumber,
				vehiclePlate,
				carModel,
				totalPrice,
			}

			try {
				const response = await fetch("http://localhost:4000/booking", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
					credentials: "include",
				})
				if (!response.ok) {
					throw new Error("Failed to book")
				}
				setPaymentSuccess(true)
			} catch (error) {
				console.error("Failed to book:", error)
			}
		} else {
			setErrors(validationErrors)
		}
	}

	return ReactDOM.createPortal(
		<>
			<div style={OVERLAY_STYLE}></div>
			<div className='modal-payment'>
				{paymentSuccess ? ( // If payment is successful, display success message
					<SuccessModal open={paymentSuccess} onClose={onClose} />
				) : (
					<div>
						<div className='modal-payment-summary'>
							<h2>Your booking details:</h2>
							<div className='modal-payment-details'>
								<span>Entry date: {entryDate} </span>
								<span>Entry time: {entryTime} </span>
								<span>Exit date: {exitDate} </span>
								<span>Exit time: {exitTime} </span>
								<span>Plate number: {vehiclePlate} </span>
								<span>Car model: {carModel} </span>
								<span>Phone number: {phoneNumber} </span>
							</div>
						</div>
						<div className='modal-payment-card-info'>
							<h2>Payment:</h2>
							<form onSubmit={bookParking}>
								<label>Name on the card:</label>
								<input
									className='booking-input'
									type='text'
									placeholder='eg. John Smith'
									onChange={ev => setName(ev.target.value)}
									required></input>
								{errors.name && (
									<div className='register-error'>
										<span>{errors.name}</span>
									</div>
								)}
								<label>Card number:</label>
								<input
									className='booking-input'
									type='tel'
									placeholder='123123123123'
									onChange={ev => setCardNumber(ev.target.value)}
									required></input>
								{errors.cardNumber && (
									<div className='register-error'>
										<span>{errors.cardNumber}</span>
									</div>
								)}
								<div style={CARD_STYLE}>
									<div>
										<label>Expiry date:</label>
										<input
											className='booking-input'
											type='tel'
											placeholder='01/24'
											onChange={ev => setExpiryDate(ev.target.value)}
											required></input>
										{errors.expiryDate && (
											<div className='register-error'>
												<span>{errors.expiryDate}</span>
											</div>
										)}
									</div>
									<div>
										<label>CVV:</label>
										<input
											className='booking-input'
											type='tel'
											placeholder='123'
											onChange={ev => setCvv(ev.target.value)}
											required></input>
										{errors.cvv && (
											<div className='register-error'>
												<span>{errors.cvv}</span>
											</div>
										)}
									</div>
								</div>
								<div className='modal-payment-total'>
									<h2>Total to pay: </h2>
									<h2>£{totalPrice}</h2>
								</div>
								<div className='modal-payment-btns'>
									<button className='cancel-btn' onClick={onClose}>
										Cancel
									</button>
									<button className='pay-btn' type='submit'>
										Pay now
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</>,
		document.getElementById("portal")
	)
}
