const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET
const Booking = require("../models/Booking")

router.post("/", async (req, res) => {
	try {
		const token = req.cookies.token
		if (!token) {
			return res
				.status(401)
				.json({ error: "Unauthorized access, please log in" })
		}
		const userData = jwt.verify(token, secret)

		const {
			parkingName,
			parkingAddress,
			entryDate,
			entryTime,
			exitDate,
			exitTime,
			phoneNumber,
			vehiclePlate,
			carModel,
			totalPrice,
		} = req.body

		const bookingDoc = await Booking.create({
			owner: userData.id,
			parkingName,
			parkingAddress,
			entryDate,
			entryTime,
			exitDate,
			exitTime,
			phoneNumber,
			vehiclePlate,
			carModel,
			totalPrice,
		})

		res.json(bookingDoc)
	} catch (error) {
		console.error("Error creating booking:", error)
		res.status(500).json({ error: "Failed to create booking" })
	}
})

router.get("/", async (req, res) => {
	try {
		const token = req.cookies.token
		if (!token) {
			return res
				.status(401)
				.json({ error: "Unauthorized access, please log in" })
		}

		const userData = jwt.verify(token, secret)
		const ownerId = userData.id
		res.json(await Booking.find({ owner: ownerId }))
	} catch (error) {
		console.error("Error when fetching bookings:", error)
		res.status(500).json({ error: "internal server error" })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
		await Booking.findByIdAndDelete(id)
		res.json({ message: "Booking canceled successfully" })
	} catch (error) {
		console.error("Error canceling booking:", error)
		res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
