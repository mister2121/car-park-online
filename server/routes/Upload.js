const express = require("express")
const router = express.Router()
const multer = require("multer") //middleware for uploading files
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/")
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage: storage })

router.post("/", upload.array("images"), (req, res) => {
	const filenames = req.files.map(file => file.filename)
	res.status(200).json(filenames)
})

module.exports = router
