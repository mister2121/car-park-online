const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET
const Parking = require("../models/Parking")

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
			name,
			address,
			location,
			addedPhoto,
			description,
			openTime,
			closeTime,
			maxCap,
			hourPrice,
		} = req.body

		const parkingDoc = await Parking.create({
			owner: userData.id,
			name,
			address,
			location: {
				type: "Point",
				coordinates: [location.lng, location.lat],
			},
			photo: addedPhoto,
			description,
			openTime,
			closeTime,
			maxCap,
			hourPrice,
		})

		res.json(parkingDoc)
	} catch (error) {
		console.error("Error while adding new parking:", error)
		res.status(500).json({ error: "Failed to add new parking" })
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
		res.json(await Parking.find({ owner: ownerId }))
	} catch (error) {
		console.error("Error when fetching parkings:", error)
		res.status(500).json({ error: "internal server error" })
	}
})

router.get("/:id", async (req, res) => {
	const { id } = req.params
	res.json(await Parking.findById(id))
})

router.put("/", async (req, res) => {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ error: "Unauthorized access, please log in" })
	}

	const { id, parkingInfo } = req.body
	const userData = jwt.verify(token, secret)
	const parkingDoc = await Parking.findById(id)

	if (userData.id === parkingDoc.owner.toString()) {
		const {
			name,
			address,
			location,
			addedPhoto,
			description,
			openTime,
			closeTime,
			maxCap,
			hourPrice,
		} = parkingInfo

		parkingDoc.set({
			name,
			address,
			location: {
				type: "Point",
				coordinates: [location.lng, location.lat],
			},
			photo: addedPhoto,
			description,
			openTime,
			closeTime,
			maxCap,
			hourPrice,
		})

		await parkingDoc.save()
		res.json("ok")
	} else {
		res.status(403).json("Unauthorized")
	}
})

router.delete("/:id", async (req, res) => {
	const { id } = req.params
	const token = req.cookies.token

	try {
		const userData = jwt.verify(token, secret)
		const parkingDoc = await Parking.findById(id)

		if (!parkingDoc) {
			return res.status.json({ error: "Parking not found " })
		}

		if (userData.id === parkingDoc.owner.toString()) {
			await Parking.findByIdAndDelete(id)
			res.json({ message: "Parking deleted successfully" })
		} else {
			res.status(403).json({ error: "unauthorized" })
		}
	} catch (error) {
		console.error("Error deleting parking:", error)
		res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
