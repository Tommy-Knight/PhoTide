import React from 'react'

// export default function search() {
//     return (
// 			<div style={{ display: "flex", justifyContent: "center" }}>
// 				<div style={{ display: "inline-block" }}>
// 					<form
// 						style={{ zIndex: 5 }}
// 						className='App'
// 						onSubmit={(e: React.FormEvent<HTMLFormElement>) => fetchSearchLocation(e)}>
// 						<input
// 							className='searchInput'
// 							spellCheck='false'
// 							type='text'
// 							placeholder='🔎 Location ...'
// 							value={searchValue}
// 							onChange={(e: ChangeEvent<HTMLInputElement>) => {
// 								setSearchValue(e.target.value);
// 							}}
// 						/>
// 					</form>
// 				</div>
// 				<div
// 					title='Current Location! 🧭'
// 					onClick={(e) => geolocate()}
// 					style={{ display: "inline-block" }}>
// 					<svg
// 						className='weatherButtons'
// 						style={{
// 							background: "rgba(255, 255, 255, 0.103)",
// 							borderRadius: "200%",
// 							border: "2px solid white",
// 							padding: "5px",
// 							marginLeft: "10px",
// 						}}
// 						xmlns='http://www.w3.org/2000/svg'
// 						width='24'
// 						height='24'
// 						viewBox='0 0 24 24'
// 						fill='none'
// 						stroke='currentColor'
// 						strokeWidth='2'
// 						strokeLinecap='round'
// 						strokeLinejoin='round'>
// 						<circle cx='12' cy='10' r='3' />
// 						<path d='M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z' />
// 					</svg>
// 				</div>
// 				<div title='Add to favourites! ❤' style={{ display: "inline-block" }}>
// 					<svg
// 						className='weatherButtons'
// 						style={{
// 							background: "rgba(255, 255, 255, 0.103)",
// 							borderRadius: "200%",
// 							border: "2px solid white",
// 							padding: "5px",
// 							marginLeft: "10px",
// 						}}
// 						xmlns='http://www.w3.org/2000/svg'
// 						width='24'
// 						height='24'
// 						viewBox='0 0 24 24'
// 						fill='none'
// 						stroke='currentColor'
// 						strokeWidth='2'
// 						strokeLinecap='round'
// 						strokeLinejoin='round'>
// 						<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
// 					</svg>
// 				</div>
// 				<div title='Upload a Photo! 📷' style={{ display: "inline-block" }}>
// 					<svg
// 						className='weatherButtons'
// 						style={{
// 							background: "rgba(255, 255, 255, 0.103)",
// 							borderRadius: "200%",
// 							border: "2px solid white",
// 							padding: "5px",
// 							marginLeft: "10px",
// 						}}
// 						xmlns='http://www.w3.org/2000/svg'
// 						width='24'
// 						height='24'
// 						viewBox='0 0 24 24'
// 						fill='none'
// 						stroke='currentColor'
// 						strokeWidth='2'
// 						strokeLinecap='round'
// 						strokeLinejoin='round'>
// 						<line x1='12' y1='5' x2='12' y2='19'></line>
// 						<line x1='5' y1='12' x2='19' y2='12'></line>
// 					</svg>
// 				</div>
// 				<br />
// 				{isLoading && <div className='focus-in-expand'> Oh Mama! We're searching ...</div>}
// 			</div>
// 		);
// }
