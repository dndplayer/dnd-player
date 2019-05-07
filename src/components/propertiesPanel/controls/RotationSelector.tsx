import React, { Component, ReactNode, CSSProperties } from 'react';

const Spinner = props => {
	return (
		<div
			style={{
				backgroundColor: 'blue',
				width: props.width || '16px',
				height: props.diameter ? props.diameter / 2 : '64px',
				position: 'absolute',
				left: '50%',
				transform: `rotate(${props.rotation}deg) translate(-50%, 0)`,
				transformOrigin: '0% 100%'
			}}
		/>
	);
};

interface Props {
	diameter?: number;
	initialRotationRad?: number;
	rotationChanged: (rotDeg: number, rotRad: number) => void;
	style?: CSSProperties;
}

interface State {
	isActive: boolean;
	rotationDeg: number;
	rotationRad: number;
}

/**
 * A component to allow easy input of rotation via a drag spinner (like a compass).
 **/
export default class RotationSelector extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isActive: false,
			rotationDeg: (this.props.initialRotationRad || 0) * (180.0 / Math.PI),
			rotationRad: this.props.initialRotationRad || 0
		};
	}

	private _el: HTMLElement;

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.initialRotationRad !== this.props.initialRotationRad) {
			this.setState({
				rotationDeg: (this.props.initialRotationRad || 0) * (180.0 / Math.PI),
				rotationRad: this.props.initialRotationRad || 0
			});
		}
	}

	mouseDown = (e): void => {
		this.setState({
			isActive: true
		});
	};
	mouseMove = (e): void => {
		if (!this.state.isActive) {
			return;
		}

		this._updateRotation(e);
	};
	mouseUp = (e): void => {
		if (this.state.isActive) {
			this.setState({
				isActive: false
			});

			this._updateRotation(e);

			if (this.props.rotationChanged) {
				this.props.rotationChanged(this.state.rotationDeg, this.state.rotationRad);
			}
		}
	};

	_updateRotation = (e): void => {
		const centerX = this._el.clientWidth / 2;
		const centerY = this._el.clientHeight / 2;

		// console.log(e);
		// console.log(e.nativeEvent);

		// console.log(`centerX = ${centerX}, centerY = ${centerY}`);

		if (!e.currentTarget) {
			return;
		}

		const b = e.currentTarget.getBoundingClientRect();
		const currX = e.clientX - b.left;
		const currY = e.clientY - b.top;

		// console.log(`currX = ${currX}, currY = ${currY}`);

		const dX = currX - centerX;
		const dY = currY - centerY;

		const thetaRad = Math.atan2(dY, dX) + Math.PI / 2.0; // Add 90deg
		const thetaDeg = thetaRad * (180.0 / Math.PI);

		this.setState({
			rotationDeg: thetaDeg,
			rotationRad: thetaRad
		});
	};

	render(): ReactNode {
		return (
			<div
				ref={c => (this._el = c)}
				onMouseDown={this.mouseDown}
				onMouseMove={this.mouseMove}
				onMouseUp={this.mouseUp}
				style={{
					display: 'block',
					cursor: 'grab',
					position: 'relative',
					backgroundColor: 'red',
					width: this.props.diameter || '128px',
					height: this.props.diameter || '128px',
					borderRadius: '50%',
					overflow: 'hidden',
					...this.props.style
				}}
			>
				<Spinner
					diameter={this.props.diameter}
					width={8}
					rotation={this.state.rotationDeg}
				/>
			</div>
		);
	}
}
