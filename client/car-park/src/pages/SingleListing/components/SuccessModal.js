import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Navigate } from "react-router-dom"

const CARD_STYLE = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "black",
	padding: "20px",
	border: "1px solid rgba(255,255,255, 0.4)",
	borderRadius: "8px",
	maxWidth: "400px",
	fontSize: "1.1rem",
	zIndex: 1000,
}

export default function SuccessModal({ open, onClose }) {
	const [redirect, setRedirect] = useState(false)

	if (!open) return null

	if (redirect) {
		return <Navigate to={"/bookings"} />
	}

	return ReactDOM.createPortal(
		<>
			<div style={CARD_STYLE}>
				<div className='modal-success-wrapper'>
					<h2>Payment Successful!</h2>
					<p>Your payment has been processed successfully.</p>
					<p>Confirmation of the payment has been sent to your e-mail.</p>
				</div>
				<div className='modal-payment-btns'>
					<button className='cancel-btn' onClick={() => setRedirect(true)}>
						Close
					</button>
				</div>
			</div>
		</>,
		document.getElementById("portal")
	)
}
