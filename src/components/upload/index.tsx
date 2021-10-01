import "./style.scss";
import { useState } from "react";
import { useHistory } from "react-router";
import { connect, useDispatch } from "react-redux";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Props } from "../../types";
import { photoAction } from "../../redux/actions";
import Navbar from "../navbar";

const Upload = (props: Props) => {
	const [title, setTitle] = useState<string | null>(null);
	const [description, setDescription] = useState<string | null>(null);
	const [images, setImages] = useState([]);
	const maxNumber = 69;

	const dispatch = useDispatch();
	const history = useHistory();

	const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		console.log(imageList, addUpdateIndex);
		setImages(imageList as never[]);
	};

	const saveImage = () => {
		const image = {
			images,
			title,
			description,
			date: props.weather?.daily[0].dt,
			city: props.forecast?.city.name,
			country: props.forecast?.city.country,
			sunrise: props.forecast?.city.sunrise,
			sunset: props.forecast?.city.sunset,
			temp: props.weather?.daily[0].temp.day,
			tempMin: props.weather?.daily[0].temp.min,
			tempMax: props.weather?.daily[0].temp.max,
			rain: props.weather?.daily[0].rain,
			wind: props.weather?.daily[0].wind_speed,
			clouds: props.weather?.daily[0].clouds,
			weather: props.weather?.daily[0].weather,
		};
		dispatch(photoAction(image));
		history.push("/photos");
	};

	return (
		<>
			<div className='background'>
				<div className='app-grid'>
					<div className='app-box'>
						<h1 className='headline'>Photos</h1>
						<ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
							{({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
								<div title='📸' className='upload__image-wrapper'>
									<button
										className='weatherButtons photoButtons'
										title='Upload a Photo! 🏕'
										onClick={onImageUpload}
										{...dragProps}>
										📸
									</button>
									{imageList.length > 0 && (
										<div>
											<br />
											<big className='headline'>Title: </big>
											<input
												title='Add a Title!'
												onChange={(e) => setTitle(e.target.value)}
												className='textbox'
												type='text'></input>
											<br />
											<big className='headline'>Description: </big>
											<input
												title='Add a Description!'
												onChange={(e) => setDescription(e.target.value)}
												className='textbox'
												type='text'></input>
										</div>
									)}
									{imageList.map((image, index) => (
										<div key={index} className='image-item' style={{ display: "inline-block" }}>
											<img
												style={{ border: "2px solid white", marginTop: "12px" }}
												className='weatherButtons'
												src={image.dataURL}
												alt=''
												width='122'
											/>
											<div className='image-item__btn-wrapper'>
												<button
													className='weatherButtons photoButtons'
													onClick={() => onImageUpdate(index)}
													title='Switch Photo! ♻'>
													👎
												</button>{" "}
												<button
													className='weatherButtons photoButtons'
													onClick={() => onImageRemove(index)}
													title='🚨 DELETE! 🚨'>
													💀
												</button>
												<button
													onClick={(e) => saveImage()}
													className='weatherButtons photoButtons'
													title='Nice! 🌈'>
													👍
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</ImageUploading>
					</div>
					<div className='footer'></div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Upload);
