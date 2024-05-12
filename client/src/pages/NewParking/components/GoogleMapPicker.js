import React, { useCallback, useEffect, useState } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

// Styles for div with map
const containerStyle = {
	width: "100%",
	maxWidth: "800px",
	height: "500px",
}

const defaultCenter = {
	lat: 52.635504,
	lng: -1.13213,
}

function GoogleMapPicker({ onLocationSelect, initialLocation }) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
	})

	const [map, setMap] = useState(null)
	const [markerPosition, setMarkerPosition] = useState(null)

	const onLoad = useCallback(
		function callback(map) {
			// initialize default bounds and zoom
			const initialBounds = new window.google.maps.LatLngBounds(
				new window.google.maps.LatLng(
					defaultCenter.lat - 0.005,
					defaultCenter.lng - 0.005
				),
				new window.google.maps.LatLng(
					defaultCenter.lat + 0.005,
					defaultCenter.lng + 0.005
				)
			)

			map.fitBounds(initialBounds)

			// Showing marker position if exists (for editing a parking)
			const initialMarkerPosition = initialLocation || null

			if (initialMarkerPosition) {
				setMarkerPosition(initialMarkerPosition)
				onLocationSelect(initialMarkerPosition)
			}

			// Get latitude and longitude from point of click, set marker on that pos
			map.addListener("click", ev => {
				const clickedLocation = {
					lat: ev.latLng.lat(),
					lng: ev.latLng.lng(),
				}
				setMarkerPosition(clickedLocation)
				onLocationSelect(clickedLocation)
			})

			setMap(map)
		},
		[onLocationSelect, initialLocation]
	)

	const onUnmount = useCallback(function callback(map) {
		setMap(null)
	}, [])

	useEffect(() => {
		if (map && initialLocation) {
			setMarkerPosition(initialLocation)
		}
	}, [map, initialLocation])

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={defaultCenter}
			zoom={14}
			onLoad={onLoad}
			onUnmount={onUnmount}>
			{markerPosition && <Marker position={markerPosition} />}
		</GoogleMap>
	) : null
}

export default GoogleMapPicker
