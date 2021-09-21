export default function Login() {
	return (
		<form className='login-form'>
			<input type='email' name='email' placeholder='email' id='email'></input>
			<input type='password' name='password' placeholder='password' id='password'></input>
			<button type='submit'>LOGIN</button>
		</form>
	);
}
