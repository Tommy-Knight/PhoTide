import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { userAction } from "../../redux/actions";
// import {Props} from "../../types"
// import { History, LocationState } from "history";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const bodyJSON = JSON.stringify({
			email: email,
			password: password,
		});
		try {
			const resp = await fetch(`http://localhost:3069/auth/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: bodyJSON,
			});
			const data = await resp.json();
			if (resp.ok) {
				dispatch(userAction(data));
				history.push("/");
			}
			if (location.pathname === "/register") {
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column" }}>
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
			<button style={{ width: "50px", margin: "auto" }} className='searchInput' type='submit'>
				LOGIN
			</button>
		</form>
	);
}
export default connect(s=>s)(Login)