import './style.scss';
import Chart from './chart';
import { Props } from '../../types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { useHistory } from 'react-router-dom';

const Tide = (props: Props) => {

	const history = useHistory();
	
	return (
		<>
			<div>
				<h2 className='headline'>Tidal</h2>
				<h1>Current Tide: </h1>
				<h2 className='headline'>{props.tide?.heights![0].state}</h2>
				<div className='weatherResult' onClick={(e) => history.push('/maps')}>
					<big className='headline'>
						<b>Your Location:</b>
					</big>{' '}
					{props.tide?.latitude}
					<i className='headline'> lat </i> {props.tide?.longitude}
					<i className='headline'> lon</i>
					<br />
					<br />
					<big className='headline'>
						<b>Tide Location:</b>
					</big>{' '}
					{props.tide?.origin?.latitude}
					<i className='headline'> lat </i>
					{props.tide?.origin?.longitude} <i className='headline'>lon </i>
					<br />
					<br />
					<big className='headline'>
						<b>Distance to Water: </b>
					</big>
					{props.tide?.origin?.distance}
					<i className='headline'> {props.tide?.origin?.unit}</i>
				</div>
				<div className='weatherResult' style={{ width: '50%' }}>
					<h2 style={{ marginTop: 0 }}>
						<u className='headline'>Todays Extremes:</u>
					</h2>
					<div style={{ width: '20%', display: 'inline-block' }}>
						{format(new Date(props.tide?.extremes![0].datetime!), 'h:mma')}
						<br />
						<br /> <b className='headline'>{props.tide?.extremes![0].state}</b>
					</div>
					<div
						style={{
							width: '20%',
							display: 'inline-block',
							margin: '0 10px 0 10px',
						}}>
						{format(new Date(props.tide?.extremes![1].datetime!), 'h:mma')}
						<br />
						<br /> <b className='headline'>{props.tide?.extremes![1].state}</b>
					</div>
					<div
						style={{
							width: '20%',
							display: 'inline-block',
							margin: '0 10px 0 10px',
						}}>
						{format(new Date(props.tide?.extremes![2].datetime!), 'h:mma')}
						<br />
						<br /> <b className='headline'>{props.tide?.extremes![2].state}</b>
					</div>
					<div style={{ width: '20%', display: 'inline-block' }}>
						{format(new Date(props.tide?.extremes![3].datetime!), 'h:mma')}
						<br />
						<br /> <b className='headline'>{props.tide?.extremes![3].state}</b>
					</div>
				</div>
				<br />
				<div style={{ textAlign: 'left', margin: '40px 0 0 20px' }}>
					<i>Hover the chart to see heights and times for the next 24 hours.</i>
				</div>
				<Chart />
			</div>
		</>
	);
};
export default connect((s) => s)(Tide);
