const ContactForm = () => {
    return (
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
    )
}

export default ContactForm