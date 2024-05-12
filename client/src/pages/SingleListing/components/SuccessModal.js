import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Navigate } from "react-router-dom"

export default function SuccessModal({ open, onClose }) {
	const [redirect, setRedirect] = useState(false)

	if (!open) return null

	if (redirect) {
		return <Navigate to={"/bookings"} />
	}

	return ReactDOM.createPortal(
		<>
			<div className="modal-success">
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
