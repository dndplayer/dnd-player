import React, { Component, ReactNode } from 'react';

interface Props {
	text: string;
	name: string;
	onClick: () => void;
}
export default class OverlayTab extends Component<Props> {
	render(): ReactNode {
		const { text, onClick } = this.props;

		return (
			<div style={{ display: 'table' }}>
				<div style={{ padding: '50% 0', height: 0 }}>
					<div
						style={{
							display: 'block',
							padding: 10,
							backgroundColor: 'red',
							// marginLeft: 30,
							cursor: 'pointer',
							transform: 'rotate(-90deg)',
							// transformOrigin: 'right bottom 0',
							transformOrigin: 'left top',
							// marginTop: '-50%',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
							textAlign: 'center'
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
