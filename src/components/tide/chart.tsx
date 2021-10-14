import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Props } from '../../types';
import format from 'date-fns/format';
import {
	VictoryArea,
	VictoryAxis,
	VictoryChart,
	VictoryGroup,
	VictoryLabel,
	VictoryLine,
	VictoryTheme,
	VictoryTooltip,
	VictoryVoronoiContainer,
} from 'victory';

const Chart = (props: Props) => {
	return (
		<div>
			<VictoryChart
				containerComponent={<VictoryVoronoiContainer />}
				theme={{
					...VictoryTheme.grayscale,
					axis: {
						style: {
							grid: {
								fill: 'none',
								stroke: 'transparent',
							},
						},
					},
				}}
				padding={{ top: 10, left: 70, right: 30, bottom: 50 }}
				width={800}
				height={222}>
				<VictoryAxis
					style={{
						axis: {
							stroke: '#798393',
							strokeWidth: 0,
						},
						tickLabels: {
							fill: '#798393',
							fontFamily: 'Comfortaa',
							fontWeight: '600',
							fontSize: '8px',
							padding: '12',
						},
					}}
					dependentAxis
					tickFormat={(x) => `${x}m`}
				/>
				<VictoryGroup
					data={props.tide?.heights?.map((tide) => ({
						x: tide.datetime,
						y: tide.height,
						label: `${tide.height!.toFixed(2)}m at ${format(
							new Date(tide.datetime!),
							'ha'
						)}`,
					}))}
					labelComponent={
						<VictoryTooltip
							labelComponent={
								<VictoryLabel
									style={{
										fill: '#FFFFFF',
										fontFamily: 'Comfortaa',
										fontSize: 10,
										fontWeight: 600,
									}}
								/>
							}
							flyoutStyle={{ fill: 'rgb(255,142,0)', strokeWidth: 0 }}
							pointerLength={5}
						/>
					}>
					<VictoryArea
						interpolation='monotoneX'
						style={{
							data: { fill: 'url(#myGradient)' },
						}}
					/>
					<linearGradient id='myGradient'>
						<stop offset='0%' stopColor='rgb(217, 221, 223)' />
						<stop offset='50%' stopColor='rgb(140, 210, 252)' />
						<stop offset='100%' stopColor='rgb(217, 221, 223)' />
					</linearGradient>
					<VictoryLine
						animate={{
							onLoad: { duration: 2000 },
						}}
						interpolation='monotoneX'
						style={{
							data: { stroke: '#3442BF', strokeWidth: 2 },
						}}
					/>
				</VictoryGroup>
			</VictoryChart>
		</div>
	);
};

export default connect((s) => s)(Chart);
