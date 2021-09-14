import "./style.scss"

export function Left() {
    return (
			<div className='left-box'>
				LUNAR
				<img
					className={"puff-in-center"}
					style={{ width: "100%" }}
					alt={`icon`}
					src={window.location.origin + `/lunar.png`}
				/>
			</div>
		);
}


export  function Right() {
	return (
		<div className='right-box'>
			TIDAL
			<img
				className={"puff-in-center"}
				style={{ width: "100%" }}
				alt={`icon`}
				src={window.location.origin + `/tides.png`}
			/>
		</div>
	);
}

