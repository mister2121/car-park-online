import React from "react"

const NameInfo = ({ name, setName }) => (
	<>
		<input
			className='new-park-input'
			value={name}
			onChange={ev => setName(ev.target.value)}
			type='text'
			placeholder='Name of your parking'></input>
	</>
)

export default NameInfo
