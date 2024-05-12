const express = require("express")
const router = express.Router()
const download = require("image-downloader")
const path = require("path")

router.post("/", async (req, res) => {
	const { link } = req.body

	if (!link) {
		// Return a response indicating that the link is not provided
		return res.status(400).json({ error: "Link is not provided" })
	}

	const newName = "photo" + Date.now() + ".jpg"

	console.log("Downloading image from link:", link)

	try {
		await download.image({
			url: link,
			dest: path.join(__dirname, "../uploads", newName),
		})

		res.json(newName)
	} catch (error) {
		console.error("Error downloading image:", error)
		res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
