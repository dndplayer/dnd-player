import React, { Component, ReactNode } from 'react';

interface Props {
	text: string;
	name: string;
	active?: boolean;
	onClick: () => void;
}
export default class OverlayTab extends Component<Props> {
	render(): ReactNode {
		const { text, onClick, active } = this.props;

		return (
			// <div style={{ display: 'table' }}>
			<div style={{}}>
				<div style={{ padding: '50% 0', height: 0 }}>
					<div
						style={{
							display: 'block',
							padding: 10,
							backgroundColor: !active ? 'red' : 'purple',
							borderLeft: '1px dashed #444',
							// marginLeft: 30,
							cursor: 'pointer',
							transform: 'rotate(-90deg)',
							// transformOrigin: 'right bottom 0',
							transformOrigin: 'left top',
							// marginTop: '-50%',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
							textAlign: 'center',
							transition: 'background-color 500ms',
							transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
						}}
						onClick={() => onClick()}
					>
						{text}
					</div>
				</div>
			</div>
		);
	}
}
