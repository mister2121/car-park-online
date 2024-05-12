const express = require("express")
const router = express.Router()

// Check login status endpoint
router.get("/check-login", (req, res) => {
	if (res.locals.authenticated) {
		res.status(200).json({ loggedIn: true, user: req.user })
	} else {
		res.status(401).json({ loggedIn: false })
	}
})

module.exports = router
