import React, { ReactNode } from 'react';

import { Character } from '../models/Character';
import { connect } from 'react-redux';
import { openCharacterSheet } from '../../redux/actions/characters';

const mapStateToProps = (state): any => ({
	characters: state.assets.playerCharacters
});

const mapDispatchToProps = (dispatch): any => ({
	openCharacterSheet: (characterId: string) => dispatch(openCharacterSheet(characterId))
});

interface DispatchFromProps {
	openCharacterSheet: (characterId: string) => void;
}

interface StateFromProps {
	characters: Character[];
}

type Props = DispatchFromProps & StateFromProps;

export class CharacterList extends React.Component<Props> {
	render(): ReactNode {
		return (
			<div>
				{this.props.characters.map(x => (
					<div className="character" key={x.id} onClick={e => this.openCharacterSheet(x)}>
						{x.name}
					</div>
				))}
			</div>
		);
	}

	openCharacterSheet(character: Character): void {
		this.props.openCharacterSheet(character.id);
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(CharacterList);
