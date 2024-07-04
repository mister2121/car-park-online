import { useState } from "react"
import "./imageslider.css"

export default function ImageSlider({ parking, setParking }) {
	const [imageIndex, setImageIndex] = useState(0)

	function showPrevImage() {
		setImageIndex(prevIndex =>
			prevIndex === 0 ? parking.photo.length - 1 : prevIndex - 1
		)
	}

	function showNextImage() {
		setImageIndex(prevIndex =>
			prevIndex === parking.photo.length - 1 ? 0 : prevIndex + 1
		)
	}

	return (
		<section aria-label='Image slider' className='single-listing-photos'>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					overflow: "hidden",
				}}>
				{parking.photo &&
					parking.photo.map((photo, index) => (
						<img
							key={index}
							src={"http://localhost:4000/uploads/" + photo}
							aria-hidden={imageIndex !== index}
							className='single-photo'
							alt={`Parking photo ${index + 1}`}
							style={{ translate: `${-100 * imageIndex}%` }}></img>
					))}
			</div>
			<button
				onClick={showPrevImage}
				className='img-slider-btn'
				style={{ left: 0 }}
				aria-label='View previous image'>
				<svg
					aria-hidden
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15.75 19.5 8.25 12l7.5-7.5'
					/>
				</svg>
			</button>
			<button
				onClick={showNextImage}
				className='img-slider-btn'
				style={{ right: 0 }}
				aria-label='View next image'>
				<svg
					aria-hidden
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m8.25 4.5 7.5 7.5-7.5 7.5'
					/>
				</svg>
			</button>
			<div
				style={{
					position: "absolute",
					bottom: "0.5rem",
					left: "50%",
					translate: "-50%",
					display: "flex",
					gap: "0.25rem",
				}}>
				{parking.photo &&
					parking.photo.map((_, index) => (
						<button
							key={index}
							className='img-slider-dot-btn'
							aria-label={`View image ${index + 1}`}
							onClick={() => setImageIndex(index)}>
							{index === imageIndex ? (
								<svg
									aria-hidden
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'>
									<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
								</svg>
							) : (
								<svg
									aria-hidden
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'>
									<path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z' />
								</svg>
							)}
						</button>
					))}
			</div>
		</section>
	)
}
