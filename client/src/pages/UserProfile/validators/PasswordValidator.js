// Validation function for password
export default function validatePassword(oldPassword, newPassword) {
	const errors = {}

	// Password validations
	if (newPassword.length < 5) {
		errors.newPassword = "Password must have at least 5 characters"
	} else {
		// At least one uppercase character
		if (!/[A-Z]/.test(newPassword)) {
			errors.newPassword =
				"Password must contain at least one uppercase character"
		}
		// At least one special character
		if (!/[^a-zA-Z0-9]/.test(newPassword)) {
			errors.newPassword =
				"Password must contain at least one special character"
		}
	}

	return errors
}
