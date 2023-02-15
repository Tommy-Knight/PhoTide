import Navbar from "../navbar";
import { connect } from "react-redux";
import { Props } from "../../types";
import SnekeGame from "./snake";


const Profile = (props: Props) => {
	return (
		<>

						<SnekeGame />

		</>
	);
};

export default connect((s) => s)(Profile);
