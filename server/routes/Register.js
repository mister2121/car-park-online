const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10) //generate salt to encrypt the password

router.post("/", async (req, res) => {
	const { username, password, email, type } = req.body

	try {
		// Check if the username or email already exists in the database

		const nameExists = await User.findOne({ username })
		if (nameExists) {
			return res.status(400).json({ error: "Username already exists" })
		}

		const emailExists = await User.findOne({ email })
		if (emailExists) {
			return res.status(400).json({ error: "Email already exists" })
		}

		// If it doesnt exist, proceed with register

		const userDoc = await User.create({
			username,
			password: bcrypt.hashSync(password, salt),
			email,
			type,
		})
		res.json(userDoc)
	} catch (e) {
		console.error("Registration error:", e)
		res.status(400).json(e)
	}
})

module.exports = router
