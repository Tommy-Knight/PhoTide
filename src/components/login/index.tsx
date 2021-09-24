export default function Login() {
	return (
		<form >
			<input
				className='searchInput'
				type='email'
				name='email'
				placeholder='email'
				id='email'></input>
			<input className='searchInput' type='password' placeholder='password' id='password'></input>
			<button className='searchInput' type='submit'>
				LOGIN
			</button>
		</form>
	);
}
