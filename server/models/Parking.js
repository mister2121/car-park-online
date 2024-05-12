const mongoose = require("mongoose")

const parkingSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	name: String,
	address: String,
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	photo: [String],
	hourPrice: Number,
	openTime: String,
	closeTime: String,
	maxCap: Number,
	description: String,
})

parkingSchema.index({ location: "2dsphere" })

const ParkingModel = mongoose.model("Parking", parkingSchema)

module.exports = ParkingModel
