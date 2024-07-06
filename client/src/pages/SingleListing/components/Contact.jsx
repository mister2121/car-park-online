const Contact = () => {
    return (
        <div className='single-listing-contact'>
            <h1>Contact the owner</h1>
            <textarea
                className='message-text-area'
                rows='4'
                cols='50'
                placeholder='Write your message here'></textarea>
            <button className='send-btn'>Send message</button>
            <h2>Or call at: +44 1234 567890</h2>
        </div>
    )
}

export default Contact