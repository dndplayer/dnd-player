import { Container, AppConsumer, Graphics } from '@inlet/react-pixi';
import React, { ReactNode } from 'react';

interface Props {
	app: PIXI.Application;
	position: PIXI.Point;
	thickness?: number;
}

interface State {
	scale: number;
	alpha: number;
	thickness: number;
}

export default class NewPing extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			scale: 1,
			alpha: 1,
			thickness: this.props.thickness || 15
		};
	}

	componentDidMount() {
		this.props.app.ticker.add(this.tick);
	}

	componentWillUnmount() {
		this.props.app.ticker.remove(this.tick);
	}

	tick = delta => {
		this.setState(({ scale, alpha, thickness }) => ({
			scale: scale + 3 * delta,
			alpha: alpha * 0.97 * delta,
			thickness: Math.max(thickness * 0.97 * delta, 1)
		}));
	};

	render(): ReactNode {
		return (
			<Graphics
				position={this.props.position}
				draw={g => {
					g.clear();
					g.lineStyle(this.state.thickness || 15, 0xff0000, this.state.alpha);
					g.drawCircle(0, 0, this.state.scale);
					g.endFill();
				}}
			/>
		);
	}
}
