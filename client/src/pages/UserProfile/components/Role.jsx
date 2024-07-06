const Role = ({ userInfo }) => {
    return (
        <div className='profile-type'>
            <h2>Role</h2>
            <p>
                Your role is
                <span style={{ fontWeight: "bold" }}> {userInfo.type}</span>.
            </p>
        </div>
    )
}

export default Role