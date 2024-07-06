const Password = ({ errors, setNewPassword, updatePassword, setOldPassword }) => {
    return (
        <div className='profile-password'>
					<h2>Password</h2>
					<div className='profile-password-input-wrapper'>
						<div className='profile-password-input'>
							<label htmlFor='newpassword'>New password</label>
							<input
								id='newpassword'
								name='newpassword'
								type='password'
								className='profile-input'
								onChange={ev => setNewPassword(ev.target.value)}></input>
							{errors.newPassword && (
								<div className='register-error'>
									<span>{errors.newPassword}</span>
								</div>
							)}
						</div>

						<div className='profile-password-input'>
							<label htmlFor='oldpassword'>Old password</label>
							<input
								id='oldpassword'
								name='oldpassword'
								type='password'
								className='profile-input'
								onChange={ev => setOldPassword(ev.target.value)}></input>
							{errors.oldPassword && (
								<div className='register-error'>
									<span>{errors.oldPassword}</span>
								</div>
							)}
						</div>
					</div>
					<div className='profile-password-reset'>
						<p>Can't remember your current password?</p>
						<span className='profile-link'>Reset it</span>
					</div>
					<button
						type='submit'
						className='profile-submit'
						onClick={updatePassword}>
						Save password
					</button>
				</div>
    )
}

export default Password