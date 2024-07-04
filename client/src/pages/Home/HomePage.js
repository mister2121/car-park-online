import { Link } from "react-router-dom"
import "./homepage.css"
import SearchBox from "./components/SearchBox"

export default function HomePage() {
	return (
		<main>
			<div className='intro'>
				<h1>Parking made simple.</h1>
				<SearchBox />
			</div>
			<div className='info-one-container'>
				<div className='info-header'>
					<h1>How it works?</h1>
					<div className='line'></div>
				</div>
				<div className='home-container'>
					<div className='info-one'>
						<div className='first-slide'>
							<span className='material-symbols-outlined'>manage_search</span>
							<h2>Search</h2>
							<p>Find available parking space just in few seconds.</p>
						</div>
						<div className='second-slide'>
							<span className='material-symbols-outlined'>payments</span>
							<h2>Pay</h2>
							<p>Quickly make payment online with just a few clicks!</p>
						</div>
						<div className='third-slide'>
							<span className='material-symbols-outlined'>event</span>
							<h2>Get on with your day</h2>
							<p>We know how time is valuable to you.</p>
						</div>
					</div>
				</div>

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
				<div className='info-three'>
					<h1>About us</h1>
					<div className='line'></div>
					<div className='aboutus-container'>
						<img
							src='./img/aboutus.jpg'
							alt='Company meeting'
							className='aboutus-image'
						/>
						<div className='aboutus-desc-container'>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse at laoreet nisl. Sed ultrices velit mattis ante
								blandit, eget mattis nisl feugiat. In eu lacinia ligula. Fusce
								accumsan nulla ac bibendum bibendum. Cras sodales lorem nec odio
								finibus viverra. Duis tincidunt, mi sed egestas commodo, nisl
								ipsum fermentum erat, a gravida tortor sapien pretium dolor.
								Etiam laoreet sed lacus sit amet elementum. Sed aliquet ac velit
								sed hendrerit.
							</p>
							<button type='button' className='aboutus-button'>
								Learn more
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
