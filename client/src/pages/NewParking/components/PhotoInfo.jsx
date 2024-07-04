import React from "react"

const PhotoInfo = ({
	photoLink,
	setPhotoLink,
	addPhotoByLink,
	addedPhoto,
	uploadPhoto,
	markPhoto,
	removePhoto,
}) => (
	<>
		<div className='new-park-photo-wrapper'>
			<input
				className='new-park-input'
				value={photoLink}
				onChange={ev => setPhotoLink(ev.target.value)}
				type='text'
				placeholder={"Add using a link ...jpg"}></input>
			<button onClick={addPhotoByLink} className='new-park-button add-photo'>
				Add photo
			</button>
		</div>
		<div className='new-park-photos'>
			{addedPhoto.length > 0 &&
				addedPhoto.map((link, index) => (
					<div className='new-park-photo-item' key={index}>
						<img src={"http://localhost:4000/uploads/" + link} alt=''></img>
						<button
							onClick={ev => removePhoto(ev, index)}
							className='remove-photo'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-6 h-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
								/>
							</svg>
						</button>
						<button onClick={ev => markPhoto(ev, index)} className='mark-photo'>
							{link === addedPhoto[0] && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='w-6 h-6'>
									<path
										fill-rule='evenodd'
										d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
										clip-rule='evenodd'
									/>
								</svg>
							)}
							{link !== addedPhoto[0] && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
									/>
								</svg>
							)}
						</button>
					</div>
				))}
			<div className='new-park-photo-item'>
				<label className='new-park-button file-photo'>
					<input type='file' multiple onChange={uploadPhoto} />
					<div className='upload-icon'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z'
							/>
						</svg>
					</div>
					<p>Upload from your device</p>
				</label>
			</div>
		</div>
	</>
)

export default PhotoInfo
