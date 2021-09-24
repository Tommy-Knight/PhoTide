import Body from "./body";
import Navbar from "./navbar";
import { connect, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { useEffect } from "react";
import { userAction } from "../redux/actions";
import { UserInterface } from "../types";

interface Props extends RouteComponentProps {
	background?: string;
	focus?: string;
	searchValue?: {};
	user?: UserInterface;
}
const Mega = (props: Props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		loginFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.user?._id]);

	const loginFetch = async () => {
		const resp = await fetch(`http://localhost:3069/users/me`, {
			credentials: "include",
		});
		if (resp.ok) {
			const data = await resp.json();
			dispatch(userAction(data));
		}
		 else {
			props.history.push("/register");
		}
	};

	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<Body />

					<div className='footer'></div>

					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Mega);
