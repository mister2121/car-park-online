const Details = ({ parking }) => {
    return (
        <div className='single-listing-details'>
            <div className='listing-card'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    style={{ width: "50px", height: "50px", fill: "white" }}>
                    <path d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
                </svg>
                <div className='listing-card-info'>
                    <span style={{ fontWeight: "bold" }}>Open:</span>
                    <span>
                        {parking.openTime} - {parking.closeTime}
                    </span>
                </div>
            </div>
            <div className='listing-card'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 640 512'
                    style={{ width: "50px", height: "50px", fill: "white" }}>
                    <path d='M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
                </svg>
                <div className='listing-card-info'>
                    <span style={{ fontWeight: "bold" }}>Capacity:</span>
                    <span>{parking.maxCap}</span>
                </div>
            </div>
            <div className='listing-card'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'
                    style={{ width: "50px", height: "50px", fill: "white" }}>
                    <path d='M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z' />
                </svg>
                <div className='listing-card-info'>
                    <span style={{ fontWeight: "bold" }}>Price per hour:</span>
                    <span>£{parking.hourPrice}</span>
                </div>
            </div>
        </div>
    )
}

export default Details