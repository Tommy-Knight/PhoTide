import { FormEvent, useState, ChangeEvent } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Props } from '../../types';
import { userAction } from '../../redux/actions';

const Register = (props: Props) => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const dispatch = useDispatch();
	const history = useHistory();

	const bodyJSON = JSON.stringify({
		email: email,
		password: password,
		username: username,
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resp = await fetch(
				`https://photide-server.herokuapp.com/auth/register`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: bodyJSON,
				}
			);
			const data = await resp.json();
			dispatch(userAction(data));
			if (resp.ok) history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	const bodyJSONLogin = JSON.stringify({
		email: email,
		password: password,
	});

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resp = await fetch(
				`https://photide-server.herokuapp.com/auth/login`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: bodyJSONLogin,
				}
			);
			const data = await resp.json();
			if (resp.ok) {
				dispatch(userAction(data));
				history.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={props.background}>
				<div
					style={{
						height: '95vh',
						width: '75%',
						margin: 'auto',
						marginTop: '2vh',
					}}
					className='app-box'>
					<h1> REGISTER</h1>
					<form
						onSubmit={(e) => handleSubmit(e)}
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '25%',
							margin: 'Auto',
						}}>
						Email
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value);
							}}
							className='searchInput'
							type='email'
							name='email'
							placeholder='email...'
							id='email'></input>
						Username
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setUsername(e.target.value);
							}}
							className='searchInput'
							type='text'
							name='username'
							placeholder='username...'
							id='username'></input>
						Password
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value);
							}}
							className='searchInput'
							type='password'
							placeholder='password...'
							id='password'></input>
						{/* Check Password
							<input
								className='searchInput'
								type='password'
								placeholder='password again...'
								id='password'></input> */}
						<button
							style={{
								width: '150px',
								margin: 'auto',
								marginBottom: '5px',
								cursor: 'pointer',
							}}
							className='searchInput'
							type='submit'>
							Register
						</button>
					</form>
					<br />
					<h2>OR LOGIN</h2>
					<form
						onSubmit={(e) => handleLogin(e)}
						style={{
							width: '50%',
							margin: 'auto',
							marginTop: '2vh',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<input
							onChange={(e) => setEmail(e.target.value)}
							className='searchInput'
							type='email'
							name='email'
							placeholder='email'
							id='login-email'></input>
						<input
							onChange={(e) => setPassword(e.target.value)}
							className='searchInput'
							type='password'
							placeholder='password'
							id='login-password'></input>
						<button
							style={{ width: '150px', margin: 'auto', cursor: 'pointer' }}
							className='searchInput'
							type='submit'>
							Login
						</button>
					</form>
					<br/>
					<button
						style={{
							margin: 'auto',
							width: '150px',
							backgroundColor: 'whitesmoke',
						}}
						className='searchInput loginButton'
						type='submit'>
						Guest Login
					</button>
					<br />
					<br />
					<br />
					<div>
						<h4 className='headline'>Thanks for visiting PhoTide!</h4>
						<br />
						<br />
						<br />
						<small style={{ fontFamily: 'initial' }}>
							This Project was written fully in Typescript with Redux and
							CSS frontend.
							<br />
							Node, Express, MongoDB server with Cloudinary Image
							Uploading.
							<br />
							Utilising{' '}
							<a href='https://openweathermap.org/'>
								OpenWeatherMap
							</a>,{' '}
							<a href='https://rapidapi.com/apihood/api/tides/'>
								Global Tides
							</a>
							, <a href='https://leafletjs.com/'>Leaflet Maps</a> and
							Google Location Services.
							<br />
							Strive School Capstone. Created by{' '}
							<a href='https://www.tommyk.uk'>Tommy Knight</a>.
							<br />
						</small>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Register);
