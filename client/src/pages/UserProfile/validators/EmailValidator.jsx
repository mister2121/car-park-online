// Validation function for email address
export default function validateEmail(email) {
	const errors = {}

	if (!/^\S+@\S+\.\S+$/.test(email)) {
		errors.email = "Email must be in a valid format"
	}

	return errors
}
