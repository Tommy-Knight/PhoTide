import { FormEvent, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, useLocation } from "react-router-dom";

interface Props extends RouteComponentProps {
	background?: string;
	focus?: string;
	searchValue?: {};
	user?: {};
}

const Register = (props: Props) => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const bodyJSON = JSON.stringify({
		email: email,
		password: password,
		username: username,
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resp = await fetch(`http://localhost:3069/auth/register`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: bodyJSON,
			});
			if (resp.ok) props.history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const location = useLocation();

	const bodyJSONLogin = JSON.stringify({
		email: email,
		password: password,
	});

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resp = await fetch(`http://localhost:3069/auth/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: bodyJSONLogin,
			});
			const data = await resp.json();
			if (resp.ok) {
				console.log(data);
			}
			if (location.pathname === "/register") {
				props.history.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={props.background}>
				<div
					style={{ height: "95vh", width: "75%", margin: "auto", marginTop: "2vh" }}
					className='app-box'>
					<h1> REGISTER</h1>
					<form
						onSubmit={(e) => handleSubmit(e)}
						style={{
							display: "flex",
							flexDirection: "column",
							width: "25%",
							margin: "Auto",
						}}>
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
							style={{ width: "150px", margin: "auto", marginBottom: "5px" }}
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
							width: "50%",
							margin: "auto",
							marginTop: "2vh",
							display: "flex",
							flexDirection: "column"
						}}>
						<input
							onChange={(e) => setEmail(e.target.value)}
							className='searchInput'
							type='email'
							name='email'
							placeholder='email'
							id='email'></input>
						<input
							onChange={(e) => setPassword(e.target.value)}
							className='searchInput'
							type='password'
							placeholder='password'
							id='password'></input>
						<button style={{ width: "50px", right:"0" }} className='searchInput' type='submit'>
							LOGIN
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Register);
