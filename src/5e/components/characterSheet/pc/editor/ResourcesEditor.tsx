import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import { CharacterResource } from '../../../../models/Character';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import ArrayEditor from './ArrayEditor';

export default class ResourcesEditor extends ArrayEditor<CharacterResource> {
	prop = 'resources';
	heading = 'Resources';

	mapItem(idx: string, item: CharacterResource): React.ReactNode {
		return (
			<ResourceEditor
				key={idx}
				resource={item}
				updateResourceProperty={(p, v) => this.updateItemProperty(idx, p, v)}
				removeResource={() => this.removeItem(idx)}
			/>
		);
	}
}

interface Props {
	updateResourceProperty: (property: string, value: any) => void;
	resource: CharacterResource;
	removeResource: () => void;
}

export class ResourceEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { resource } = this.props;

		return (
			<div className={css.resource}>
				<div
					className={css.button}
					onClick={this.props.removeResource}
					style={{ background: '#333' }}
				>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					value={resource.name}
					onChange={e => this.props.updateResourceProperty('name', e.target.value)}
				/>
				:
				<input
					value={resource.quantity}
					onChange={e =>
						this.props.updateResourceProperty('quantity', parseInt(e.target.value))
					}
				/>
				/
				<input
					value={resource.max}
					onChange={e =>
						this.props.updateResourceProperty('max', parseInt(e.target.value))
					}
				/>
			</div>
		);
	}
}
