import { Link } from "react-router-dom"
import "../styles/listuserparking.css"
import { useEffect } from "react"
import { useState } from "react"

export default function Parkings() {
	const [parkings, setParkings] = useState([])
	const [parkingCount, setParkingCount] = useState(0)
	const [searchInput, setSearchInput] = useState("")

	useEffect(() => {
		const fetchParkings = async () => {
			try {
				const response = await fetch("http://localhost:4000/parkings", {
					credentials: "include",
				})
				if (!response.ok) {
					throw new Error()
				}
				const data = await response.json()
				setParkings(data)
				setParkingCount(data.length)
			} catch (error) {
				console.error("Error:", error)
			}
		}

		fetchParkings()
	}, [])

	const deleteParking = id => {
		fetch(`http://localhost:4000/parkings/${id}`, {
			method: "DELETE",
			credentials: "include",
		})
			.then(response => response.json())
			.then(() => {
				setParkings(values => {
					return values.filter(item => item._id !== id)
				})
				setParkingCount(prevCount => prevCount - 1)
			})
	}

	const filteredParkings = parkings.filter(parking =>
		parking.name.toLowerCase().includes(searchInput.toLowerCase())
	)

	return (
		<div className='main'>
			<div className='parkings-header-container'>
				<div className='parking-count'>
					<h2>You have {parkingCount} parkings</h2>
				</div>
				<div className='parkings-bttns-container'>
					<div>
						<input
							type='search'
							name='parking-search'
							className='parking-search'
							placeholder='Search by name'
							onChange={ev => setSearchInput(ev.target.value)}
							value={searchInput}></input>
					</div>
					<div className='link-wrap'>
						<Link className='parking-add-bttn' to={"/parkings/new"}>
							Add new parking
						</Link>
					</div>
				</div>
			</div>

			<div className='parkings-wrapper'>
				{filteredParkings.length > 0 &&
					filteredParkings.map(parking => (
						<div className='user-parking'>
							<div className='user-parking-photo'>
								{parking.photo.length && (
									<img
										src={"http://localhost:4000/uploads/" + parking.photo[0]}
										alt=''
									/>
								)}
							</div>
							<div className='user-parking-info'>
								<h2>{parking.name}</h2>
								<p>{parking.description}</p>
							</div>
							<div className='user-parking-buttons'>
								<Link
									to={"/parkings/" + parking._id}
									className='user-parking-button edit'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										style={{ width: "1.3rem" }}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
										/>
									</svg>
									<p>Edit</p>
								</Link>
								<button
									onClick={() => deleteParking(parking._id)}
									className='user-parking-button delete'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										style={{ width: "1.3rem" }}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
										/>
									</svg>
									<p>Delete</p>
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
