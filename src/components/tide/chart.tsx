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
				width={800}
				height={200}>
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
				/>
				<VictoryAxis
					style={{
						axis: {
							stroke: '#798393',
							strokeWidth: 2,
						},
						tickLabels: {
							fill: '#798393',
							fontFamily: 'Comfortaa',
							fontSize: '8px',
							padding: '12',
						},
					}}
					tickValues={props.tide?.heights?.map((x) => {
						return x.datetime;
					})}
					tickFormat={(x) => format(new Date(x), 'ha')}
					orientation='top'
					offsetY={-2}
				/>
				<VictoryGroup
					data={props.tide?.heights?.map((datum) => ({
						x: datum.datetime,
						y: datum.height,
						label: `${datum.height!.toFixed(2)} m`,
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
							flyoutStyle={{ fill: '#3442BF', strokeWidth: 0 }}
							pointerLength={5}
							dy={0}
						/>
					}>
					<VictoryArea
						// interpolation="monotoneX"
						style={{
							data: { fill: 'url(#myGradient)' },
						}}
					/>
					<linearGradient id='myGradient' gradientTransform='rotate(0)'>
						<stop offset='0%' stopColor='#E3E6FF' />
						<stop offset='50%' stopColor='turquoise' />
						<stop offset='100%' stopColor='#E3E6FF' />
					</linearGradient>
					<VictoryLine
						animate={{
							onLoad: { duration: 1000 },
						}}
						interpolation='monotoneX'
						style={{
							data: { stroke: '#3442BF', strokeWidth: 1.5 },
						}}
					/>
				</VictoryGroup>
				{props.tide?.heights?.map((datum) => (
					<VictoryLine
						style={{
							data: {
								stroke: ({ active }) => (active ? '#3442BF' : 'transparent'),
								strokeDasharray: '5, 5',
							},
						}}
						data={[
							{ x: datum.datetime, y: 0 },
							{ x: datum.datetime, y: datum.height },
						]}
					/>
				))}
			</VictoryChart>
		</div>
	);
};

export default connect((s) => s)(Chart);
