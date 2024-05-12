// Validation form for booking

export default function validateBooking(
	vehiclePlate,
	carModel,
	phoneNumber,
	entryDate,
	entryTime,
	exitDate,
	exitTime
) {
	const errors = {}

	if (!entryDate) {
		errors.entryDate = "Entry date is required"
	}

	if (!exitDate) {
		errors.exitDate = "Exit date is required"
	}

	if (!entryTime) {
		errors.entryTime = "Entry time is required"
	}

	if (!exitTime) {
		errors.exitTime = "Exit time is required"
	}

	// Check if exit date is before entry date
	if (entryDate && exitDate && entryDate > exitDate) {
		errors.exitDate = "Exit date must be after entry date"
	}

	// Check if exit time is before entry time
	if (entryDate === exitDate && entryTime >= exitTime) {
		errors.exitTime = "Exit time must be after entry time"
	}

	// Check if booking duration is at least 30 minutes
	if (entryDate && exitDate && entryTime && exitTime) {
		const entryDateTime = new Date(`${entryDate}T${entryTime}`)
		const exitDateTime = new Date(`${exitDate}T${exitTime}`)
		const timeDifferenceMinutes = (exitDateTime - entryDateTime) / (1000 * 60)

		if (timeDifferenceMinutes < 30) {
			errors.entryDate = "Booking must be at least 30 minutes long"
			errors.exitDate = "Booking must be at least 30 minutes long"
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
