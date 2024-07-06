const Reviews = () => {
    return (
        <div className='single-listing-reviews'>
            <div className='review-rating-wrapper'>
                <h1>Reviews</h1>
                <div className='review-rating'>
                    <span>15 Reviews</span>
                    <div className='review-rating-icon'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 576 512'
                            style={{ width: "15px", height: "15px", fill: "gold" }}>
                            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z' />
                        </svg>
                        <span>5.0</span>
                    </div>
                </div>
            </div>
            <div className='review-card'>
                <div className='review-person'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        style={{ width: "40px", height: "40px", fill: "white" }}>
                        <path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
                    </svg>
                    <div className='review-details'>
                        <span className='review-card-name'>Cameron Williamson</span>
                        <span className='review-card-date'>2 months ago</span>
                    </div>
                </div>

                <p className='review-card-desc'>
                    Lovely place, especially the location. Clean and secure.
                    Definitely recommend.
                </p>
            </div>
            <div className='review-card'>
                <div className='review-person'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        style={{ width: "40px", height: "40px", fill: "white" }}>
                        <path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
                    </svg>
                    <div className='review-details'>
                        <span className='review-card-name'>Jenny Wilson</span>
                        <span className='review-card-date'>2 months ago</span>
                    </div>
                </div>

                <p className='review-card-desc'>
                    Lovely place, especially the location. Clean and secure.
                    Definitely recommend.
                </p>
            </div>
            <div className='review-card'>
                <div className='review-person'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        style={{ width: "40px", height: "40px", fill: "white" }}>
                        <path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
                    </svg>
                    <div className='review-details'>
                        <span className='review-card-name'>Jerome Bell</span>
                        <span className='review-card-date'>2 months ago</span>
                    </div>
                </div>
                <p className='review-card-desc'>
                    Lovely place, especially the location. Clean and secure.
                    Definitely recommend.
                </p>
            </div>
            <button className='send-btn'>Show all</button>
        </div>
    )
}

export default Reviews