import React, { Component, ReactNode } from 'react';

interface Props {
	visible?: boolean;
	selected: string[];
	map: any;
}

export default class PropertiesPanel extends Component<Props> {
	render(): ReactNode {
		const { visible } = this.props;

		// TODO: Animate the panel in/out from the side nicely

		return visible ? (
			<div
				style={{
					position: 'absolute' as 'absolute',
					right: 0,
					width: '300px',
					top: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)'
				}}
			>
				<h1>Properties</h1>
				<ul>
					<li>Position</li>
					<li>Rotation</li>
					<li>Layer</li>
				</ul>
			</div>
		) : (
			<div />
		);
	}
}
