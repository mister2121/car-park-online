const ECO = () => {
    return (
        <div className='info-two-container'>
					<div className='info-header eco-header'>
						<h1>
							Eco-<span className='eco-text'>friendly</span> travelling
						</h1>
						<div className='line'></div>
					</div>
					<div className='info-two'>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse at laoreet nisl. Sed ultrices velit mattis ante
							blandit, eget mattis nisl feugiat. In eu lacinia ligula. Fusce
							accumsan nulla ac bibendum bibendum.
						</p>
						<div className='eco-container'>
							<div className='first-slide-eco'>
								<div className='eco-square-left'>
									<h2>+46,000</h2>
									<p>hours saved</p>
								</div>
								<p>
									Avoided the hassle of searching for parking through Car
									Parking Online, preserving over
									<span className='eco-text'> 46,000 hours</span>.
								</p>
							</div>
							<div className='second-slide-eco'>
								<div className='eco-square-middle'>
									<h2>+230t</h2>
									<p>of CO2 emissions reduced</p>
								</div>
								<p>
									Efficient space booking and direct travel resulted in the
									conservation of <span className='eco-text'>233 tons</span> of
									CO2 emissions.
								</p>
							</div>
							<div className='third-slide-eco'>
								<div className='eco-square-right'>
									<h2>+70,000</h2>
									<p>gallons of fuel saved</p>
								</div>
								<p>
									Streamlined parking solutions through Car Parking Online
									conserved over{" "}
									<span className='eco-text'>70,000 gallons</span> of fuel.
								</p>
							</div>
						</div>
					</div>
				</div>
    )
}

export default ECO