import React, { Component, ReactNode } from 'react';
import { DropTargetMonitor, DropTarget } from 'react-dnd';

import types from '../../../constants/dragdroptypes';
import { Character } from '../../models/Character';

import css from './CharacterImage.module.css';

interface CollectProps {
	connectDropTarget: any;
}

interface OwnProps {
	character: Character;
	characterId: string;
	imageUrl?: string;
	updateCharacter?: (characterId: string, character: Character) => void;
}

type Props = CollectProps & OwnProps;

class CharacterImage extends Component<Props> {
	render(): ReactNode {
		const { connectDropTarget, imageUrl } = this.props;

		return connectDropTarget(
			<div className={css.wrapper}>
				<img src={imageUrl || 'https://placekitten.com/128/128'} />
			</div>
		);
	}
}

const charImageTargetSpec = {
	canDrop(props: Props, monitor: DropTargetMonitor): boolean {
		return true;
	},
	hover(props: Props, monitor: DropTargetMonitor, component: Component): void {},
	drop(props: Props, monitor: DropTargetMonitor, component: Component): void {
		const item = monitor.getItem();

		if (props.updateCharacter) {
			props.updateCharacter(props.characterId, {
				...props.character,
				imageRef: item.imageRef
			});
		}
	}
};

function collect(connect, monitor): CollectProps {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

export default DropTarget(types.UPLOAD_IMAGE, charImageTargetSpec, collect)(CharacterImage);
