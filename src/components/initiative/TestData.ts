import { InitiativeData } from '../../models/Initiative';

export const GetDefaultTestData = (): InitiativeData => {
	return {
		currentTurn: '111',
		rolls: {
			'111': {
				initiativeRoll: 5,
				npcId: null,
				pcId: '1'
			},
			'222': {
				initiativeRoll: 11,
				npcId: '-Ld_--DVpT1bG8X799GC',
				pcId: null
			},
			'333': {
				initiativeRoll: 19,
				npcId: null,
				pcId: '1'
			}
		}
	};
};
