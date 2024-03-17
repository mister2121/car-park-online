// Validation form for credit card payment

export default function validatePayment(name, cardNumber, expiryDate, cvv) {
	const errors = {}

	// Validate name
	if (!/^[a-zA-Z ]+$/.test(name)) {
		errors.name = "Name can't contain special signs"
	}

	// Validate card number
	if (!/^\d{16}$/.test(cardNumber)) {
		errors.cardNumber = "Card number must be 16 digits"
	}

	// Validate expiry date
	if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
		errors.expiryDate = "Expiry date must be in the format MM/YY"
	}

	// Validate CVV
	if (!/^\d{3}$/.test(cvv)) {
		errors.cvv = "CVV must be 3 digits"
	}

	return errors
}
