import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"

const SearchBox = () => {
	const [address, setAddress] = useState("")
	const [selectedLocation, setSelectedLocation] = useState(null)
	const navigate = useNavigate()

	const handleSelect = async value => {
		const results = await geocodeByAddress(value)
		const latLng = await getLatLng(results[0])
		setAddress(value)
		setSelectedLocation({ name: value, coordinates: latLng })
	}

	const navigateToListings = () => {
		if (selectedLocation) {
			const encodedLocation = encodeURIComponent(selectedLocation.name)
			const url = `/listings?search=${encodedLocation}`
			navigate(url, { state: { selectedLocation } })
		} else {
			alert("No location selected")
		}
	}

	return (
		<div className='intro-search'>
			<span>Where would you like to go?</span>
			<div className='intro-search-btns'>
				<PlacesAutocomplete
					value={address}
					onChange={setAddress}
					onSelect={handleSelect}>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading,
					}) => (
						<div>
							<input
								{...getInputProps({ placeholder: "Type address" })}
								className='search-input'
							/>
							<div className='suggestions-container'>
								{loading ? <div>...loading</div> : null}

								{suggestions.map((suggestion, index) => (
									<div
										key={index}
										{...getSuggestionItemProps(suggestion)}
										style={{ cursor: "pointer", padding: "5px" }}>
										{suggestion.description}
									</div>
								))}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
				<button className='book-now' onClick={navigateToListings}>
					Search nearby
				</button>
			</div>
		</div>
	)
}

export default SearchBox
