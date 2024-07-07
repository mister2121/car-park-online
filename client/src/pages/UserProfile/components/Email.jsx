const Email = ({ userInfo, newEmail, setNewEmail, errors, updateEmail }) => {
    return (
        <div className='profile-email'>
            <h2>Email address</h2>
            <div className='profile-email-change'>
                <div className='profile-email-change-content'>
                    <p>
                        Your current email address is
                        <br />
                        <span style={{ fontWeight: "bold" }}>{userInfo.email}</span>
                    </p>
                    <div className="profile-password-input">
                        <label htmlFor='newemail'>New email</label>
                        <input
                            id='newemail'
                            name='newemail'
                            type='text'
                            className='profile-input'
                            onChange={ev => setNewEmail(ev.target.value)}></input>

                        {errors.email && (
                            <div className='register-error'>
                                <span>{errors.email}</span>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type='submit'
                    className='profile-submit'
                    onClick={updateEmail}>
                    Change email
                </button>
            </div>
        </div>
    )
}

export default Email