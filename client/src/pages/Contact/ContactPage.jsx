import "./contactus.css"
import ContactForm from "./components/ContactForm"
import ContactDetails from "./components/ContactDetails"

export default function ContactPage() {
	return (
		<div className='contact-wrapper'>
			<h2>Contact us</h2>
			<div className='contact-content'>
				<ContactForm />
				<ContactDetails />
			</div>
		</div>
	)
}
