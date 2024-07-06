const Description = ({ parking }) => {
    return (
        <div className='single-listing-desc'>
            <h1>Description</h1>
            <p>{parking.description}</p>
        </div>
    )
}

export default Description