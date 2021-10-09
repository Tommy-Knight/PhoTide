import Navbar from '../navbar';
import {useHistory} from "react-router-dom"
import { connect } from 'react-redux';
import { Props } from '../../types';
import './style.scss';

const Favourites = (props: Props) => {
	const history = useHistory()
	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<div className='app-box favs'>
						<h1 className='headline'>Favourites</h1>
						<div style={{ display: 'inline-block' }}>
							<form
								style={{ zIndex: 5 }}
								className='App'
								// onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
								// 	fetchSearchLocation(e)}
							>
								<input
									className='searchInput'
									spellCheck='false'
									type='text'
									placeholder='🔎 Location ...'
									// value={searchValue}
									// onChange={(e: ChangeEvent<HTMLInputElement>) => {
									// 	setSearchValue(e.target.value);
									// }}
								/>
							</form>
							<div className="weatherResult"
							onClick={e => history.push("/maps")}>hello</div>
						</div>
					</div>
					<div className='footer'></div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Favourites);
