import React, { useCallback, useEffect, useState } from "react"
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
	InfoWindowF,
} from "@react-google-maps/api"
import "../../styles/listings.css"

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

// Styles for div with map
const containerStyle = {
	width: "50%",
	height: "100vh",
	top: "0",
	zIndex: "1",
	position: "sticky",
}

const defaultCenter = {
	lat: 52.635504,
	lng: -1.13213,
}

function GoogleMapListings({ initialLocation, listings }) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
	})

	const [map, setMap] = useState(null)
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [selectedListing, setSelectedListing] = useState(null)

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
			setMap(map)
		},
		[initialLocation]
	)

	const onUnmount = useCallback(function callback(map) {
		setMap(null)
	}, [])

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={defaultCenter}
			zoom={14}
			onLoad={onLoad}
			onUnmount={onUnmount}>
			{listings.map(listing => (
				<Marker
					key={listing.id}
					position={{
						lat: listing.location.coordinates[1],
						lng: listing.location.coordinates[0],
					}}
					icon={{
						url: "https://maps.google.com/mapfiles/ms/icons/parkinglot.png",
						scaledSize: new window.google.maps.Size(30, 30),
					}}
					onClick={() => {
						setSelectedMarker(listing)
						setSelectedListing(listing)
					}}
				/>
			))}
			{selectedMarker && (
				<InfoWindow
					position={{
						lat: selectedMarker.location.coordinates[1] + 0.0004,
						lng: selectedMarker.location.coordinates[0],
					}}>
					<div
						className='info-window'
						style={{
							padding: "10px",
							color: "black",
						}}>
						<h1 style={{ marginBottom: "5px" }}>{selectedListing?.name}</h1>
						<span>Price: £{selectedListing.hourPrice}.00 / hour</span>
						<br />
						<span>Spaces available: {selectedListing?.maxCap}</span>
						<button
							className='google-book-button'
							style={{
								marginTop: "5px",
								padding: "5px",
								cursor: "pointer",
							}}
							onClick={() => setSelectedMarker(null)}>
							Book now
						</button>
						<button
							className='google-close-button'
							style={{ marginTop: "5px", padding: "5px", cursor: "pointer" }}
							onClick={() => setSelectedMarker(null)}>
							Close
						</button>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	) : null
}

export default GoogleMapListings
