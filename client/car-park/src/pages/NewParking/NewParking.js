import { Link, Navigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Snackbar from "../../components/Snackbar"
import GoogleMapPicker from "./components/GoogleMapPicker"
import "../styles/newparking.css"
import NameInfo from "./components/NameInfo"
import ImportantInfo from "./components/ImportantInfo"
import PhotoInfo from "./components/PhotoInfo"
import validateParking from "./validators/NewParkingValidator"

export default function NewParking() {
	const { id } = useParams()
	const [name, setName] = useState("")
	const [address, setAddress] = useState("")
	const [addedPhoto, setAddedPhoto] = useState([])
	const [photoLink, setPhotoLink] = useState("")
	const [description, setDescription] = useState("")
	const [openTime, setOpenTime] = useState("")
	const [closeTime, setCloseTime] = useState("")
	const [maxCap, setMaxCap] = useState("")
	const [hourPrice, setHourPrice] = useState("")
	const [redirect, setRedirect] = useState("")
	const SnackbarType = {
		success: "success",
		fail: "fail",
	}
	const snackbarRef = useRef(null)
	const snackbarRefFail = useRef(null)
	const [selectedLocation, setSelectedLocation] = useState(null)
	const [selectedParkingLocation, setSelectedParkingLocation] = useState(null)
	const handleLocationSelect = location => {
		setSelectedLocation(location)
	}
	const [errors, setErrors] = useState({})

	useEffect(() => {
		if (!id) {
			return
		}

		fetch("http://localhost:4000/parkings/" + id)
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(data => {
				setName(data.name)
				setAddress(data.address)
				setAddedPhoto(data.photo)
				setDescription(data.description)
				setOpenTime(data.openTime)
				setCloseTime(data.closeTime)
				setMaxCap(data.maxCap)
				setHourPrice(data.hourPrice)

				const initialLocation = {
					lat: data.location.coordinates[1],
					lng: data.location.coordinates[0],
				}

				setSelectedLocation(initialLocation)
			})
			.catch(error => {
				console.error("Error fetching data:", error)
			})
	}, [id])

	async function addPhotoByLink(ev) {
		ev.preventDefault()

		try {
			const response = await fetch("http://localhost:4000/upload-by-link", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ link: photoLink }),
			})

			if (!response.ok) {
				throw new Error(`Failed to upload photo: ${response.statusText}`)
			}

			const filename = await response.json()

			setAddedPhoto(prev => {
				return [...prev, filename]
			})

			setPhotoLink("")
			snackbarRef.current.show()
		} catch (error) {
			console.error("Error uploading photo:", error)
			snackbarRefFail.current.show()
		}
	}

	async function uploadPhoto(ev) {
		ev.preventDefault()

		const formData = new FormData()
		for (let i = 0; i < ev.target.files.length; i++) {
			formData.append("images", ev.target.files[i])
		}

		try {
			const response = await fetch("http://localhost:4000/upload", {
				method: "POST",
				body: formData,
			})

			if (!response.ok) {
				throw new Error("Failed to upload photo")
			}

			const filenames = await response.json()

			setAddedPhoto(prev => {
				return [...prev, ...filenames]
			})
		} catch (error) {
			console.error("Error uploading photo:", error)
		}
	}

	async function saveParking(ev) {
		ev.preventDefault()

		const parkingInfo = {
			name,
			address,
			location: selectedLocation,
			addedPhoto,
			description,
			openTime,
			closeTime,
			maxCap,
			hourPrice,
		}

		const validationErrors = validateParking(
			name,
			address,
			selectedLocation,
			addedPhoto,
			description,
			openTime,
			closeTime,
			maxCap,
			hourPrice
		)
		if (Object.keys(validationErrors).length === 0) {
			if (id) {
				// if id (parking) exists, update the parking
				const parkingData = { id, parkingInfo }

				try {
					const response = await fetch("http://localhost:4000/parkings", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(parkingData),
						credentials: "include",
					})

					if (!response.ok) {
						throw new Error("Failed to add new parking")
					}

					setRedirect("/parkings")
				} catch (error) {
					throw error
				}
			} else {
				// else, add new parking
				try {
					const response = await fetch("http://localhost:4000/parkings", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(parkingInfo),
						credentials: "include",
					})

					if (!response.ok) {
						throw new Error("Failed to add new parking")
					}

					setRedirect("/parkings")
				} catch (error) {
					throw error
				}
			}
		} else {
			setErrors(validationErrors)
		}
	}

	function removePhoto(ev, index) {
		ev.preventDefault() // Prevent form from submitting when clicking button

		setAddedPhoto(prev => {
			const updatedPhotos = [...prev]
			updatedPhotos.splice(index, 1)
			return updatedPhotos
		})
	}

	function markPhoto(ev, index) {
		ev.preventDefault()

		setAddedPhoto(prev => {
			const updatedPhotos = [...prev]
			const markedPhoto = updatedPhotos.splice(index, 1)[0]
			updatedPhotos.unshift(markedPhoto)
			return updatedPhotos
		})
	}

	function inputHeader(text) {
		return (
			<>
				<h2 className='new-park-heading'>{text}</h2>
			</>
		)
	}

	function preInput(header) {
		return <>{inputHeader(header)}</>
	}

	if (redirect) {
		return <Navigate to={redirect} />
	}

	return (
		<div className='new-park-container'>
			<div className='new-park-header'>
				<Link className='parking-add-bttn' to={"/parkings"}>
					Go back
				</Link>
			</div>

			{/* Parking form declaration  */}

			<div className='new-park-form-container'>
				<form className='new-park-form' onSubmit={saveParking}>
					{/* Name of the parking */}

					{preInput("Name/title")}
					<NameInfo name={name} setName={setName} />
					{errors.name && (
						<div className='register-error'>
							<span>{errors.name}</span>
						</div>
					)}

					{/* Address of the parking */}

					{preInput("Address")}
					<input
						className='new-park-input'
						value={address}
						onChange={ev => setAddress(ev.target.value)}
						type='text'
						placeholder='Address (city, postcode, road, number)'></input>
					{errors.address && (
						<div className='register-error'>
							<span>{errors.address}</span>
						</div>
					)}

					{/* Location picker on google maps  */}

					{preInput("Location")}
					<h4>Select location by clicking on the map</h4>
					<GoogleMapPicker
						onLocationSelect={handleLocationSelect}
						initialLocation={selectedLocation}
					/>
					{errors.selectedLocation && (
						<div className='register-error'>
							<span>{errors.selectedLocation}</span>
						</div>
					)}

					{/* Adding photos */}

					{preInput("Photo")}
					<PhotoInfo
						addedPhoto={addedPhoto}
						addPhotoByLink={addPhotoByLink}
						uploadPhoto={uploadPhoto}
						photoLink={photoLink}
						setPhotoLink={setPhotoLink}
						snackbarRef={snackbarRef}
						snackbarRefFail={snackbarRefFail}
						removePhoto={removePhoto}
						markPhoto={markPhoto}
					/>
					{errors.addedPhoto && (
						<div className='register-error'>
							<span>{errors.addedPhoto}</span>
						</div>
					)}

					{/* Description of the parking  */}

					{preInput("Description")}
					<textarea
						className='new-park-input desc'
						value={description}
						onChange={ev => setDescription(ev.target.value)}
						type='text'
						placeholder='Short description'></textarea>
					{errors.description && (
						<div className='register-error'>
							<span>{errors.description}</span>
						</div>
					)}

					{/* Details about parking  */}

					{preInput("Important information")}
					<ImportantInfo
						openTime={openTime}
						setOpenTime={setOpenTime}
						closeTime={closeTime}
						setCloseTime={setCloseTime}
						maxCap={maxCap}
						setMaxCap={setMaxCap}
						hourPrice={hourPrice}
						setHourPrice={setHourPrice}
					/>

					{errors.openTime && (
						<div className='register-error'>
							<span>{errors.openTime}</span>
						</div>
					)}
					{errors.closeTime && (
						<div className='register-error'>
							<span>{errors.closeTime}</span>
						</div>
					)}
					{errors.maxCap && (
						<div className='register-error'>
							<span>{errors.maxCap}</span>
						</div>
					)}
					{errors.hourPrice && (
						<div className='register-error'>
							<span>{errors.hourPrice}</span>
						</div>
					)}

					{/* Saving or updating parking  */}

					<button className='new-park-button save-button'>Save</button>
					<Snackbar
						ref={snackbarRef}
						message='Success!'
						type={SnackbarType.success}></Snackbar>
					<Snackbar
						ref={snackbarRefFail}
						message='Something went wrong...'
						type={SnackbarType.fail}></Snackbar>
				</form>
			</div>
		</div>
	)
}
