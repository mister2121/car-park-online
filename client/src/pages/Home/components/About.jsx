const About = () => {
    return (
        <div className='info-three'>
            <h1>About us</h1>
            <div className='line'></div>
            <div className='aboutus-container'>
                <img src="./aboutus.jpg" alt="Company meeting" className="aboutus-image" />
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
    )
}

export default About