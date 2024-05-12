const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET
const User = require("../models/User")
const bcrypt = require("bcryptjs")

router.post("/", async (req, res) => {
	const { username, password } = req.body

	try {
		const userDoc = await User.findOne({ username })

		if (!userDoc) {
			// User with the provided username not found
			return res.status(400).json("Wrong credentials")
		}

		const passOk = bcrypt.compareSync(password, userDoc.password)

		if (passOk) {
			// Password is correct
			jwt.sign(
				{ type: userDoc.type, username, id: userDoc._id, email: userDoc.email },
				secret,
				{},
				(err, token) => {
					if (err) throw err
					res.cookie("token", token, { httpOnly: true }).json({
						id: userDoc._id,
						username,
						type: userDoc.type,
						email: userDoc.email,
					})
				}
			)
		} else {
			// Password is incorrect
			res.status(400).json("Wrong credentials")
		}
	} catch (error) {
		console.error("Login error:", error)
		res.status(500).json("Internal Server Error")
	}
})

module.exports = router
