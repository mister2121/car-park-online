const Delete = ({ deleteAccount }) => {
    return (
        <div className='profile-delete'>
            <h2>Delete your account</h2>
            <p>You will receive an email to confirm your decision.</p>
            <p>
                Account deletion is final. There will be no way to restore your
                account.
            </p>
            <button
                type='submit'
                className='profile-delete-bttn'
                onClick={deleteAccount}>
                Delete account
            </button>
        </div>
    )
}

export default Delete