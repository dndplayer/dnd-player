import React, { Component, ReactNode } from 'react';
import css from './HoverPopup.module.scss';

interface Props {
	content: string;
}

export default class HoverPopup extends Component<Props> {
	render(): ReactNode {
		return (
			<div className={css.hoverContainer}>
				<div className={css.hover}>{this.props.content}</div>
				{this.props.children}
			</div>
		);
	}
}
