import React, { ReactNode, ReactElement } from 'react';

import { Character } from './Character';
import { connect } from 'react-redux';
import { openCharacterSheet } from '../../redux/actions/characters';

const mapStateToProps = (state): any => ({
	characters: state.characters.characters
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

class CharacterList extends React.Component<Props> {
	render(): ReactNode {
		return (
			<div>
				{this.props.characters.map(x => (
					<div key={x.id} onClick={e => this.openCharacterSheet(x)}>
						{x.name}
					</div>
				))}
			</div>
		);
	}

	openCharacterSheet(character: Character): void {
		this.props.openCharacterSheet(character.id);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(CharacterList);
