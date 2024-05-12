import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"

const loadScript = (url, callback) => {
	const script = document.createElement("script")
	script.src = url
	script.async = true
	script.onload = callback
	document.body.appendChild(script)
}

const renderApp = () => {
	const root = ReactDOM.createRoot(document.getElementById("root"))
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	)
}

// Load Google Maps API script before rendering the app
loadScript(
	`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
	renderApp
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
