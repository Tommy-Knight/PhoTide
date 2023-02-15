import './style.scss';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Props } from '../../types';
import { userAction } from '../../redux/actions';
import Login from '../login';
// import { History, LocationState } from "history";

const Navbar = (props: Props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const logOut = async () => {
		dispatch(userAction(null));
		try {
			await fetch(`http://localhost:3069/auth/logout`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log(error);
		}
		history.push('/');
		console.log('byebye! 🍑');
	};

	const goToProfile = () => {
		if (props.user) {
			history.push('/profile');
		} else {
			history.push('/register');
		}
	};

	return (
		<>
			<div className='header nav navBar'>
				<div className='dropdown' data-dropdown>
					<Link style={{ textDecoration: 'none', letterSpacing: '-0.4rem' }} to='/'>
						<h1>📸🌊</h1>
					</Link>
					{/* <div className='dropdown-menu information-grid'>
						USER PROFILE
					</div> */}
				</div>
				{props.user && (
					<Link to='/photos' className='link'>
						PHOTOS
					</Link>
				)}
				{props.user && (
					<Link to='/favourites' className='link'>
						FAVOURITES
					</Link>
				)}
				<Link to='/maps' className='link'>
					MAPS
				</Link>
				<div
					style={{
						right: '50px',
						position: 'absolute',
						display: 'flex',
						alignItems: 'center',
					}}>
					{!props.user && (
						<div className='dropdown' data-dropdown>
							<button className='link' data-dropdown-button>
								LOGIN
							</button>
							<div className='dropdown-menu'>
								<Login />
							</div>
						</div>
					)}
					{!props.user && (
						<Link to='/register' style={{ padding: '20px' }} className='link'>
							REGISTER
						</Link>
					)}
					{props.user && (
						<Link to='/' style={{ padding: '20px' }} className='link'>
							{props.user.username}
						</Link>
					)}
					{props.user && (
						<button
							onClick={(e) => logOut()}
							title='Thanks for visiting! 🌞'
							style={{ padding: '20px' }}
							className='link'>
							LOGOUT
						</button>
					)}
				</div>
				<img
					onClick={(e) => goToProfile()}
					src={
						props.user
							? props.user.avatar
							: 'https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-user-internet-security-vitaliy-gorbachev-blue-vitaly-gorbachev.png'
					}
					style={{
						borderRadius: '100%',
						border: 'px solid white',
						width: '45px',
						right: '10px',
						position: 'absolute',
					}}
					alt={`📸`}
				/>
				
			</div>
		</>
	);
};
export default connect((s) => s)(Navbar);


