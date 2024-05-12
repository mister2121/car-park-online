// Validation form for registration

export default function validateRegister(username, password, email, type) {
	const errors = {}

	// Username validations
	// Can't contain any special characters or white spaces
	if (username.length < 4) {
		errors.username = "Username must have at least 4 characters"
	} else if (!/^[a-zA-Z0-9]+$/.test(username)) {
		errors.username = "Username can only contain letters and numbers"
	}

	// Email validations
	// Must be in format abc@dgf.com
	if (!/^\S+@\S+\.\S+$/.test(email)) {
		errors.email = "Email must be in a valid format"
	}

	// Password validations
	if (password.length < 5) {
		errors.password = "Password must have at least 5 characters"
	} else {
		// At least one uppercase character
		if (!/[A-Z]/.test(password)) {
			errors.password = "Password must contain at least one uppercase character"
		}
		// At least one special character
		if (!/[^a-zA-Z0-9]/.test(password)) {
			errors.password = "Password must contain at least one special character"
		}
	}

	return errors
}
