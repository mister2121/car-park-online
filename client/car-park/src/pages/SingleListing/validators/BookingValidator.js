// Validation form for booking

export default function validateBooking(
	vehiclePlate,
	carModel,
	phoneNumber,
	entryDate,
	exitDate
) {
	const errors = {}

	if (!entryDate) {
		errors.entryDate = "Entry date is required"
	}

	if (!exitDate) {
		errors.exitDate = "Exit date is required"
	}

	if (entryDate && exitDate) {
		const entryDateTime = new Date(entryDate)
		const exitDateTime = new Date(exitDate)

		if (entryDateTime >= exitDateTime) {
			errors.exitDate = "Exit time must be later than entry time"
		}

		// Booking must be at least 15 minutes long
		const timeDifference = (exitDateTime - entryDateTime) / (1000 * 60) // difference in minutes
		if (timeDifference < 15) {
			errors.exitDate = "Booking must be at least 15 minutes long"
		}
	}

	if (vehiclePlate.length < 3 || vehiclePlate.length > 8) {
		errors.vehiclePlate = "Vehicle plate is either too long or too short"
	} else if (!/^[a-zA-Z0-9\s]+$/.test(vehiclePlate)) {
		errors.vehiclePlate = "Vehicle plate can't contain special signs"
	}

	if (carModel.length < 2 || carModel.length > 12) {
		errors.carModel = "Car model is either too long or too short"
	} else if (!/^[a-zA-Z0-9\s]+$/.test(carModel)) {
		errors.carModel = "Car model can't contain special signs"
	}

	if (phoneNumber.length != 10) {
		errors.phoneNumber = "Provide valid phone number (10 digits)"
	}

	return errors
}
