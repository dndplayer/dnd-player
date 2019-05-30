import React, { Component, ReactNode } from 'react';
import css from './HoverPopup.module.scss';

interface Props {
	content: string;
	title: string;
}

export default class HoverPopup extends Component<Props> {
	render(): ReactNode {
		return (
			<div className={css.hoverContainer}>
				<div className={css.hoverChildren}>{this.props.children}</div>
				<div className={css.hover}>
					<div className={css.title}>{this.props.title}</div>
					<div>{this.props.content}</div>
				</div>
			</div>
		);
	}
}
