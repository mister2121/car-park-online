import React, { useState } from "react"
import Select from "react-select"
const options = [
	{ value: "dateAdded", label: "oldest" },
	{ value: "price", label: "price" },
	{ value: "distance", label: "distance" },
]

const customStyles = {
	control: provided => ({
		...provided,
		backgroundColor: "#101010",
		color: "white",
		border: "none",
		cursor: "pointer",
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected
			? "#222"
			: state.isFocused
			? "#444"
			: "transparent",
		borderRadius: "4px",
		opacity: state.isFocused ? 0.7 : 1,
		padding: "8px",
		marginTop: "3px",
		color: "#fff",
		cursor: "pointer",
	}),
	singleValue: provided => ({
		...provided,
		color: "#fff",
		cursor: "pointer",
	}),
	menu: provided => ({
		...provided,
		padding: 0,
		margin: 0,
		backgroundColor: "#303030",
	}),
	indicatorSeparator: () => ({ display: "none" }),
}

const SortingOptions = ({
	setListings,
	listings,
	calculateDistance,
	userLocation,
}) => {
	const [selectedOption, setSelectedOption] = useState({
		value: "dateAdded",
		label: "oldest",
	})

	const handleSortChange = selectedOption => {
		setSelectedOption(selectedOption)
		sortListings(selectedOption.value)
	}

	const sortListings = sortBy => {
		let sortedListings = [...listings]

		if (sortBy === "price") {
			sortedListings.sort((a, b) => a.hourPrice - b.hourPrice)
		} else if (sortBy === "distance") {
			if (userLocation)
				sortedListings.sort(
					(a, b) =>
						calculateDistance(
							userLocation.latitude,
							userLocation.longitude,
							a.location.coordinates[1],
							a.location.coordinates[0]
						) -
						calculateDistance(
							userLocation.latitude,
							userLocation.longitude,
							b.location.coordinates[1],
							b.location.coordinates[0]
						)
				)
		} else if (sortBy === "dateAdded") {
			sortedListings.sort((a, b) => {
				return a._id.localeCompare(b._id)
			})
		}
		setListings(sortedListings)
	}

	return (
		<>
			<div className='listing-sort'>
				<p>Sort by</p>
				<Select
					defaultValue={selectedOption}
					options={options}
					styles={customStyles}
					isSearchable={false}
					onChange={handleSortChange}
				/>
			</div>
		</>
	)
}

export default SortingOptions
