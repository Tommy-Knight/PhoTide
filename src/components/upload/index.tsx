import './style.scss';
import { useState } from 'react';
// import { useHistory } from "react-router";
import { connect, useDispatch } from 'react-redux';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Props } from '../../types';
import { photoAction } from '../../redux/actions';
// import Navbar from "../navbar";

const Upload = (props: Props) => {
	const [title, setTitle] = useState<string | null>(null);
	const [description, setDescription] = useState<string | null>(null);
	const [images, setImages] = useState([]);
	const maxNumber = 1;

	const dispatch = useDispatch();
	// const history = useHistory();

	const onChange = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		setImages(imageList as never[]);
	};

	const saveImage = () => {
		const image = {
			images,
			title,
			description,
			date: props.weather?.daily[0]?.dt,
			city: props.forecast?.city?.name,
			country: props.forecast?.city?.country,
			sunrise: props.forecast?.city?.sunrise,
			sunset: props.forecast?.city?.sunset,
			temp: props.weather?.daily[0]?.temp?.day,
			tempMin: props.weather?.daily[0]?.temp?.min,
			tempMax: props.weather?.daily[0]?.temp?.max,
			rain: props.weather?.daily[0]?.rain,
			wind: props.weather?.daily[0]?.wind_speed,
			clouds: props.weather?.daily[0]?.clouds,
			weather: props.weather?.daily[0]?.weather,
		};
		dispatch(photoAction(image));
		setImages([]);
	};

	return (
		<ImageUploading
			multiple
			value={images}
			onChange={onChange}
			maxNumber={maxNumber}>
			{({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
				<div title='📸' className='upload__image-wrapper'>
					<button
						className='weatherButtons photoButtons'
						title='Upload a Photo! 🏕'
						onClick={onImageUpload}
						{...dragProps}>
						📸
					</button>
					<br />

					{imageList.map((image, index) => (
						<div
							key={index}
							className='image-item'
							style={{ display: 'inline-block', marginBottom: '150px' }}>
							<img
								style={{
									border: '2px solid white',
									marginTop: '12px',
									height: '33vh',
								}}
								src={image.dataURL}
								alt=''
							/>
							<br />
							{imageList.length > 0 && (
								<div style={{ position: 'relative', left: '-20px' }}>
									<br />

									<big className='headline'>
										<b>Title:</b>{' '}
									</big>
									<input
										title='Add a Title!'
										placeholder='Your Picture'
										spellCheck='false'
										onFocus={(e) => (e.target.placeholder = '')}
										onChange={(e) => setTitle(e.target.value)}
										className='imagetextbox'
										type='text'></input>
									<br />
									<br />
									<div style={{ position: 'relative', left: '-2px' }}>
										<big className='headline'>
											<b>Note: </b>
										</big>
										<input
											title='Add a Description!'
											spellCheck='false'
											placeholder='Describe it!'
											onFocus={(e) => (e.target.placeholder = '')}
											onChange={(e) => setDescription(e.target.value)}
											className='imagetextbox'
											type='text'></input>
										{/* <textarea
											spellCheck='false'
											title='Add a Description!'
											name='textarea'
											className='textbox'
											placeholder='Write about it!'
											onFocus={(e) => (e.target.placeholder = '')}
											onChange={(e) => setDescription(e.target.value)}
											style={{ verticalAlign: 'top', marginTop:0 }}></textarea> */}
									</div>
									<br />
								</div>
							)}
							<div className='image-item__btn-wrapper'>
								<div style={{ display: 'inline-block' }}>
									<button
										className='weatherButtons photoButtons'
										onClick={() => onImageUpdate(index)}
										title='Switch Photo! ♻'>
										👎
									</button>{' '}
									<br />
									<b>Switch</b>
								</div>
								<div style={{ display: 'inline-block' }}>
									{' '}
									<button
										className='weatherButtons photoButtons'
										onClick={() => onImageRemove(index)}
										title='🚨 STOP UPLOADING 🚨'>
										💀
									</button>
									<br /> <b>Remove</b>
								</div>
								<div style={{ display: 'inline-block' }}>
									{' '}
									<button
										onClick={(e) => saveImage()}
										className='weatherButtons photoButtons'
										title='Nice! 🌈'>
										👍
									</button>
									<br /> <b>Upload</b>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</ImageUploading>
	);
};

export default connect((s) => s)(Upload);
