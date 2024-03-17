import React from "react"

const ImportantInfo = ({
	openTime,
	setOpenTime,
	closeTime,
	setCloseTime,
	maxCap,
	setMaxCap,
	hourPrice,
	setHourPrice,
}) => (
	<>
		<div className='new-park-input-wrapper'>
			<div className='open-time-input'>
				<h4>Opening time</h4>
				<input
					className='new-park-input'
					value={openTime}
					onChange={ev => setOpenTime(ev.target.value)}
					type='time'
					placeholder='08:00'></input>
			</div>
			<div className='close-time-input'>
				<h4>Closing time</h4>
				<input
					className='new-park-input'
					value={closeTime}
					onChange={ev => setCloseTime(ev.target.value)}
					type='time'
					placeholder='22:00'></input>
			</div>
			<div className='max-cap-input'>
				<h4>Maximum capacity</h4>
				<input
					className='new-park-input'
					value={maxCap}
					onChange={ev => setMaxCap(ev.target.value)}
					type='number'
					placeholder='120'></input>
			</div>
			<div className='hour-price-input'>
				<h4>Price per hour (£)</h4>
				<input
					className='new-park-input'
					value={hourPrice}
					onChange={ev => setHourPrice(ev.target.value)}
					type='number'
					step='0.01'
					placeholder='5.00'></input>
			</div>
		</div>
	</>
)

export default ImportantInfo
