const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	parkingName: String,
	parkingAddress: String,
	entryDate: Date,
	entryTime: String,
	exitDate: Date,
	exitTime: String,
	phoneNumber: Number,
	vehiclePlate: String,
	carModel: String,
	totalPrice: Number
})

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel
