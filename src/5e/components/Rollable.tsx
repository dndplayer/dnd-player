import React, { ReactNode } from 'react';

import css from './Rollable.module.scss';

interface Props {
	showAdvantage: boolean;
	onClick: (advantage: number) => void;
}

export default class Rollable extends React.Component<Props, {}> {
	render(): ReactNode {
		const { showAdvantage } = this.props;

		return (
			<div onClick={e => this.onClick(e, 0)}>
				<div className={css.rollable}>
					{showAdvantage && (
						<div>
							<div className={css.popupAdvantage} onClick={e => this.onClick(e, 1)}>
								A
							</div>
							<div
								className={css.popupDisadvantage}
								onClick={e => this.onClick(e, -1)}
							>
								D
							</div>
						</div>
					)}
					{this.props.children}
				</div>
			</div>
		);
	}

	onClick(e: React.MouseEvent, advantage: number) {
		e.stopPropagation();
		this.props.onClick(advantage);
	}
}
