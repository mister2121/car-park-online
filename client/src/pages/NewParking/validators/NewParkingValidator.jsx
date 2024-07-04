// Validator for adding new parking form

export default function validateParking(
	name,
	address,
	selectedLocation,
	addedPhoto,
	description,
	openTime,
	closeTime,
	maxCap,
	hourPrice
) {
	const errors = {}

	// Validate name
	if (name.length < 5) {
		errors.name = "Name of the parking must be at least 5 characters long"
	} else if (!/^[a-zA-Z ]+$/.test(name)) {
		errors.name = "Name can't contain any special signs"
	}

	// Validate address

	if (!address) {
		errors.address = "Address cannot be empty"
	}

	// Validate parking location on google maps
	if (!selectedLocation) {
		errors.selectedLocation = "You must select a location on the map"
	}

	// Validate photos

	if (addedPhoto.length === 0) {
		errors.addedPhoto = "You have to add at least 1 photo"
	}

	// Validate description

	if (description.length == 0) {
		errors.description = "Description cannot be empty"
	} else if (description.length > 60) {
		errors.description = "Description is too long"
	}

	// Validate open time

	if (openTime.length == 0) {
		errors.openTime = "You must provide open time"
	} else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(openTime)) {
		errors.openTime = "Open time must be in format HH:MM"
	}

	// Validate close time

	if (closeTime.length == 0) {
		errors.closeTime = "You must provide close time"
	} else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(closeTime)) {
		errors.closeTime = "Close time must be in format HH:MM"
	}

	// Validate maximum capacity

	if (maxCap.length == 0) {
		errors.maxCap = "You must provide maximum capacity"
	} else if (!/^[1-9]\d*$/.test(maxCap)) {
		errors.maxCap = "Provide valid capacity"
	}

	// Validate price per hour

	if (hourPrice.length == 0) {
		errors.hourPrice = "You must give a price"
	} else if (!/^\d+(\.\d{2})?$/.test(hourPrice)) {
		errors.hourPrice = "Price must be in 1.00 format"
	}

	return errors
}
