const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

// Importing routes
const parkingsRoute = require("./routes/Parkings")
const loginRoute = require("./routes/Login")
const registerRoute = require("./routes/Register")
const profileRoute = require("./routes/Profile")
const logoutRoute = require("./routes/Logout")
const uploadRoute = require("./routes/Upload")
const uploadByLinkRoute = require("./routes/UploadByLink")
const listingsRoute = require("./routes/Listings")
const bookingRoute = require("./routes/Booking")
const isLoggedInRoute = require("./routes/IsLoggedIn")

// Database connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Database connected"))
	.catch(err => console.log("Database not connected", err))

// Upload photos functionality
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())

// Middleware to check the token in cookies
app.use((req, res, next) => {
	const token = req.cookies.token
	if (token) {
		jwt.verify(token, secret, {}, (err, decoded) => {
			if (err) {
				console.error("Token verification error:", err)
				// Respond with 401 Unauthorized
				res.locals.authenticated = false
			} else {
				// Set decoded user information in the request
				req.user = decoded
				res.locals.authenticated = true
			}
			next()
		})
	} else {
		// No token present, continue
		next()
	}
})

// Check login status endpoint
app.get("/check-login", (req, res) => {
	if (res.locals.authenticated) {
		res.status(200).json({ loggedIn: true, user: req.user })
	} else {
		res.status(401).json({ loggedIn: false })
	}
})

// Routes
app.use("/parkings", parkingsRoute) // Parkings endpoint
app.use("/login", loginRoute) // Login endpoint
app.use("/register", registerRoute) // Register endpoint
app.use("/profile", profileRoute) // Profile endpoint
app.use("/logout", logoutRoute) // Logout endpoint
app.use("/upload", uploadRoute) // Upload endpoint
app.use("/upload-by-link", uploadByLinkRoute) // Upload-by-link endpoint
app.use("/listings", listingsRoute) // Listings endpoint
app.use("/booking", bookingRoute) // Bookings endpoint
app.use("/check-login", isLoggedInRoute) // Is User Logged In endpoint

// Start the server
app.listen(4000, () => {
	console.log("Server is listening on port 4000")
})
