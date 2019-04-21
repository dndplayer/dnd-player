enum AssetType {
	Unknown = 0,
	Character,
	Npc
}

/**
 * A Global asset I.E. something that persists across all maps.
 * The primary examples being player characters, NPCs or certain
 * objects.
 * This shouldn't represent things that are local to a map with
 * no global state e.g. foliage / terrain on the map.
 */
export interface Asset {
	id: string;
	imageUrl: string;
	type: AssetType;
}

export class BaseAsset implements Asset {
	public id: string;
	public imageUrl: string;
	public type: AssetType = AssetType.Unknown;
}

export class CharacterAsset extends BaseAsset {
	public type: AssetType = AssetType.Character;
	public strength: number;
	public dexterity: number;
	public charisma: number;
	public constitution: number;
	public wisdom: number;
}

export class NpcAsset extends BaseAsset {
	public type: AssetType = AssetType.Npc;
}
