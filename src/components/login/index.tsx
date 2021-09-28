import { useState, } from "react";
import { useLocation } from "react-router-dom";
import {Props} from "../../types"
import { History, LocationState } from "history";

export default function Login(props: Props, history:History<LocationState>) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const location = useLocation();

	const bodyJSON = JSON.stringify({
		email: email,
		password: password,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
				console.log(data);
			}
			if (location.pathname === "/register") {
				history.push("/")
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
