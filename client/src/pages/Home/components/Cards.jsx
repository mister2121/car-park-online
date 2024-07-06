const Cards = () => {
    return (
        <section>
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
        </section>
    )
}

export default Cards