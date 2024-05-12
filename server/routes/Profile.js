const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET
const User = require("../models/User")
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => {
	const { token } = req.cookies

	if (!token) {
		return res.status(401).json({ error: "Not logged in" })
	}

	jwt.verify(token, secret, {}, (err, info) => {
		if (err) {
			console.error("Token verification error:", err)
			return res.status(401).json({ error: "Invalid token" })
		}

		res.json(info)
	})
})

router.put("/email/:id", async (req, res) => {
	const token = req.cookies.token
	const { email } = req.body
	const { id } = req.params
	try {
		const userData = jwt.verify(token, secret)

		// Check if the user exists
		const userDoc = await User.findById(id)
		if (!userDoc) {
			return res.status(404).json({ error: "User not found" })
		}

		// Check if the user making the request is the owner of the profile
		if (userData.id === userDoc.id.toString()) {
			// Check if the email already exists in the database
			const emailExists = await User.findOne({ email })
			if (emailExists) {
				return res.status(400).json({ error: "Email already exists" })
			}

			// Update the email
			userDoc.email = email
			await userDoc.save()
			return res.json("ok")
		} else {
			return res.status(403).json("Unauthorized")
		}
	} catch (error) {
		console.error("Error updating profile:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

router.put("/password/:id", async (req, res) => {
	const token = req.cookies.token
	const { oldPassword, newPassword } = req.body
	const { id } = req.params

	try {
		const userData = jwt.verify(token, secret)

		// Check if the user exists
		const userDoc = await User.findById(id)
		if (!userDoc) {
			return res.status(404).json({ error: "User not found" })
		}

		// Check if the user making the request is the owner of the profile
		if (userData.id === userDoc.id.toString()) {
			// Validate the old password
			const passOk = bcrypt.compareSync(oldPassword, userDoc.password)
			if (!passOk) {
				return res.status(400).json({ error: "Old password is incorrect" })
			}

			// Validate the new password
			if (
				newPassword.length < 5 ||
				!/[A-Z]/.test(newPassword) ||
				!/[^a-zA-Z0-9]/.test(newPassword)
			) {
				return res.status(400).json({ error: "New password is invalid" })
			}

			// Update the password
			userDoc.password = bcrypt.hashSync(newPassword, 10)
			await userDoc.save()
			return res.json("ok")
		} else {
			return res.status(403).json("Unauthorized")
		}
	} catch (error) {
		console.error("Error updating profile:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

router.delete("/:id", async (req, res) => {
	const token = req.cookies.token
	const { id } = req.params
	try {
		const userData = jwt.verify(token, secret)

		// Check if the user exists
		const userDoc = await User.findById(id)
		if (!userDoc) {
			return res.status(404).json({ error: "User not found" })
		}

		// Check if the user making the request is the actual user
		if (userData.id === userDoc.id.toString()) {
			// Delete the user
			await User.findByIdAndDelete(id)

			//TBC: delete everything related with the user - their bookings and parkings

			return res.json("Account deleted successfully")
		} else {
			return res.status(403).json("Unauthorized")
		}
	} catch (error) {
		console.error("Error deleting account:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
