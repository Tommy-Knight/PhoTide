import './style.scss';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Props } from '../../types';
import { removePhotoAction } from '../../redux/actions';
import { format, fromUnixTime, add } from 'date-fns';
import Navbar from '../navbar';
import Upload from '../upload';

const Photos = (props: Props) => {
	const [viewPhoto, setViewPhoto] = useState<number>(0);
	const [dragging, setDragging] = useState<boolean>(false);

	const dispatch = useDispatch();
	const removePhoto = (e: number) => {
		dispatch(removePhotoAction(e));
	};

	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<div className='app-box photos'>
						<big
							style={{
								display: 'inline-block',
								fontSize: '3rem',
								marginTop: '5px',
							}}
							className='headline'>
							Photos
						</big>
						<Upload />
						{props.photos[viewPhoto].images.length > 0 && (
							<div
								style={{ width: '90%', padding: '10px', marginBottom: 0 }}>
								<img
									title='📸'
									style={{
										position: 'relative',
										height: '40vh',
										border: '1px solid white',
										borderRadius: '5px',
									}}
									alt='nop'
									src={props.photos[viewPhoto]?.images[0].dataURL}
								/>
								<div
									style={{
										float: 'right',
										display: 'inline-block',
										verticalAlign: 'top',
										width: '35%',
									}}>
									<img
										className={'roll-in-blurred-left'}
										style={{ width: '9vw', float: 'right' }}
										alt={`icon`}
										src={
											window.location.origin +
											`/` +
											props.photos[viewPhoto]?.weather[0].icon +
											`.png`
										}
									/>

									<div
										className='headline'
										style={{ textAlign: 'center' }}>
										<h1 style={{ margin: 0 }}>
											<u>{props.photos[viewPhoto]?.title}</u>
										</h1>
										<big>
											{props.photos[viewPhoto]?.city},{' '}
											<i>{props.photos?.country}</i>
										</big>
									</div>
									<br />

									<div style={{ textAlign: 'left' }}>
										<i>
											{format(
												new Date(
													fromUnixTime(
														props.photos[viewPhoto]?.date
													).toString()
												),
												`EEEE do MMM`
											)}
										</i>
										<br />
										<br />
										<big>{props.photos[viewPhoto]?.weather[0].main}</big>,
										<i>
											{' '}
											{props.photos[viewPhoto]?.weather[0].description}
										</i>
										<br />
										<big>Sky Coverage </big>
										<i>{props.photos[viewPhoto]?.clouds} %</i>
										<br />
										<big>Temperature </big>
										<small> was </small>
										<i>{props.photos[viewPhoto]?.temp} °C</i>
										<br />
										<big>Highs </big>
										<small> of </small>{' '}
										<i>{props.photos[viewPhoto]?.tempMax} °C</i>
										<br />
										<big>Lows </big>
										<small> of </small>
										<i>{props.photos[viewPhoto]?.tempMin} °C</i>
										<br />
										<big>Rainfall </big>
										<small> approx </small>
										<i>{props.photos[viewPhoto]?.rain || 0} mm</i>
										<br />
										<big>Windspeeds </big>
										<small> of </small>
										<i>{props.photos[viewPhoto]?.wind} m/s</i>
										<br />
										<br />
										<big>Sunrise </big>
										<small> at </small>{' '}
										<i>
											{format(
												add(
													new Date(
														fromUnixTime(
															props.photos[viewPhoto]?.sunrise
														).toString()
													),
													{
														seconds: 0,
													}
												),
												`p`
											)}
										</i>
										<small> set </small>{' '}
										<i>
											{format(
												add(
													new Date(
														fromUnixTime(
															props.photos[viewPhoto]?.sunset
														).toString()
													),
													{
														seconds: 0,
													}
												),
												`p`
											)}
										</i>
										<br />
									</div>

									<div
										className='headline'
										style={{ textAlign: 'center' }}>
										<br />
										<big>{props.photos[viewPhoto]?.description} </big>
									</div>
								</div>
							</div>
						)}
						<br />
						<br/>
						{props.photos.length > 1 &&
							props.photos.map((item: any, i: number) => {
								return (
									<div
										onClick={(e) => setViewPhoto(i)}
										style={{
											width: '7rem',
											padding: '18px',
										}}
										className='weatherResult weatherForecast'>
										<img
											className={'bounce-in-fwd'}
											style={{ width: '6rem' }}
											alt={`icon`}
											src={item.images[0].dataURL}
											onDragStart={(e) => removePhoto(i)}
											onDragEnd={(e) => setDragging(!dragging)}
											onDragOver={(e) => e.preventDefault()}
										/>
									</div>
								);
							})}
					</div>

					<div className='footer'></div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Photos);
