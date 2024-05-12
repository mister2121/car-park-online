import "./Footer.css"

export default function Footer() {
	return (
		<footer>
			<div className='line'></div>
			<div className='footer-content'>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae
					felis scelerisque, gravida sapien non, cursus augue. Aenean id pretium
					turpis. Suspendisse eros nunc, sollicitudin nec.
				</p>
				<div>
					<ul className='socials'>
						<li>
							<a href='/'>
								<i className='fa fa-facebook'></i>
							</a>
						</li>
						<li>
							<a href='/'>
								<i className='fa fa-twitter'></i>
							</a>
						</li>
						<li>
							<a href='/'>
								<i className='fa fa-google-plus'></i>
							</a>
						</li>
						<li>
							<a href='/'>
								<i className='fa fa-youtube'></i>
							</a>
						</li>
						<li>
							<a href='/'>
								<i className='fa fa-linkedin-square'></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className='footer-bottom'>
				<p>Copyright &#169; 2023 Maciej Rudzki</p>
				<div className='footer-menu'>
					<ul className='f-menu'>
						<li>
							<a href='/'>Home</a>
						</li>
						<li>
							<a href='/'>About</a>
						</li>
						<li>
							<a href='/'>Contact</a>
						</li>
						<li>
							<a href='/'>Privacy</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
