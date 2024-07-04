import "./contactus.css"

export default function ContactPage() {
	return (
		<div className='contact-wrapper'>
			<h2>Contact us</h2>
			<div className='contact-content'>
				<div className='contact-inquiry'>
					<h2>Online inquiry</h2>
					<div className='contact-inquiry-form'>
						<form>
							<input
								name='name'
								id='name'
								type='text'
								placeholder='Name'
								className='contact-input'></input>
							<input
								name='email'
								id='email'
								type='email'
								placeholder='Email'
								className='contact-input'></input>
							<input
								name='phone'
								id='phone'
								type='phone'
								placeholder='Phone number'
								className='contact-input'></input>
							<select className='contact-input contact-select'>
								<option value=''>Select an Interest</option>
								<option value=''>Booking or payment</option>
								<option value=''>Listing a parking</option>
								<option value=''>Account</option>
								<option value=''>Other</option>
							</select>
							<textarea
								placeholder='Message'
								className='contact-text-area'></textarea>
						</form>
						<button type='submit' className='contact-submit'>
							Send message
						</button>
					</div>
				</div>

				<div className='contact-details'>
					<h2>Contact details</h2>
					<div className='contact-details-content'>
						<span className='contact-link'>carpark@leicester.co.uk</span>
						<span className='contact-link'>07477200300</span>
						<span className='contact-address-header'>Leicester Office</span>
						<span className='contact-address'>12 London Street</span>
						<span className='contact-address'>Leicester LE1 2XD</span>
					</div>
				</div>
			</div>
		</div>
	)
}
