const express = require("express")
const router = express.Router()
const Parking = require("../models/Parking")

router.get("/", async (req, res) => {
	res.json(await Parking.find())
})

module.exports = router
