import React from 'react'

export function Left() {
    return (
			<div className='left-box'>
				GO TO LUNAR INFO
				<img
					className={"roll-in-blurred-left"}
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
			GO TO TIDAL INFO
			<img
				className={"roll-in-blurred-left"}
				style={{ height: "100%" }}
				alt={`icon`}
				src={window.location.origin + `/tides.png`}
			/>
		</div>
	);
}

