export interface Journal {
	// lastUpdated?: string;
	data?: string;
}

export interface JournalData {
	public: Journal;
	private: Journal;
}

export interface User {
	id?: string; // Populated dynamically, no need to set
	name: string;
	dm?: boolean;
	colour?: number;
	journal?: JournalData;
}
